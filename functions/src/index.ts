/**
 * Cloud Functions for sending confirmation emails when new contacts are added
 */

// Load environment variables from .env file
import * as dotenv from "dotenv";
dotenv.config();

import {onDocumentCreated, onDocumentUpdated} from "firebase-functions/v2/firestore";
import * as admin from "firebase-admin";

import * as logger from "firebase-functions/logger";

// Import email templates and service
import {subscriptionConfirmationEmail, adminNotificationEmail, eventSubmissionNotificationEmail, eventApprovalNotificationEmail, newEventSubscriberNotificationEmail} from "./utils/email-templates";
import {sendEmail} from "./utils/email-service";

// Admin email addresses for notifications
const ADMIN_EMAIL = "frederik.leys@gmail.com";
const INFO_EMAIL = "info@paraclimbing.be";

// Initialize Firebase Admin SDK
admin.initializeApp();

// NOTE: For Gmail, you'll need to create an 'App Password' in your Google Account
// settings if you have 2-factor authentication enabled

// Using environment variables for email configuration
// Set these using Firebase CLI: firebase functions:config:set
// gmail.user="youremail@gmail.com" gmail.pass="yourapppassword"



/**
 * Cloud Function that triggers when a new document is created in the 'contacts' collection
 * and sends a confirmation email to the subscriber
 */
export const sendConfirmationEmail = onDocumentCreated(
  "contacts/{contactId}",
  async (event) => {
    // Get the email data from the new document
    const snapshot = event.data;
    if (!snapshot) {
      logger.error("No data associated with the event");
      return;
    }

    const data = snapshot.data();
    const email = data.email;

    if (!email) {
      logger.error("No email found in the contact document");
      return;
    }

    try {
      // Send confirmation email to the subscriber
      await sendEmail(
        email,
        subscriptionConfirmationEmail.subject,
        subscriptionConfirmationEmail.generateHtml()
      );
      logger.info(`Confirmation email sent to subscriber: ${email}`);
      // Send notification email to the admin
      await sendEmail(
        ADMIN_EMAIL,
        adminNotificationEmail.subject,
        adminNotificationEmail.generateHtml(email)
      );
      logger.info(`Admin notification email sent to: ${ADMIN_EMAIL}`);

      // Update the document to record that the confirmation email was sent
      await admin.firestore()
        .collection("contacts")
        .doc(snapshot.id)
        .update({
          confirmationEmailSent: true,
          confirmationEmailSentAt: admin.firestore.FieldValue.serverTimestamp(),
          adminNotificationSent: true,
          adminNotificationSentAt: admin.firestore.FieldValue.serverTimestamp(),
        });

      return {success: true};
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      logger.error("Error sending confirmation email:", error);
      return {error: errorMessage};
    }
  }
);

/**
 * Helper function to send event notifications to all subscribers
 * @param {Object} eventData The event data
 * @param {string} eventData.title Event title
 * @param {string} eventData.date Event date
 * @param {string} eventData.location Event location
 * @param {string} eventData.organiser Event organiser
 * @param {string} eventData.description Event description (optional)
 * @param {string} eventData.time Event time (optional)
 */
async function sendEventNotificationToSubscribers(eventData: {
  title: string;
  date: string;
  location: string;
  organiser: string;
  description?: string;
  time?: string;
}) {
  try {
    // Get all subscribers from the contacts collection
    const contactsSnapshot = await admin.firestore()
      .collection("contacts")
      .get();

    if (contactsSnapshot.empty) {
      logger.info("No subscribers found in contacts collection");
      return;
    }

    // Extract email addresses from the contacts
    const subscriberEmails: string[] = [];
    contactsSnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.email) {
        subscriberEmails.push(data.email);
      }
    });

    if (subscriberEmails.length === 0) {
      logger.info("No valid email addresses found in contacts collection");
      return;
    }

    logger.info(`Sending event notification to ${subscriberEmails.length} subscribers`);

    // Send email to each subscriber
    const emailPromises = subscriberEmails.map(async (email) => {
      try {
        await sendEmail(
          email,
          newEventSubscriberNotificationEmail.subject,
          newEventSubscriberNotificationEmail.generateHtml(eventData)
        );
        logger.info(`Event notification sent to subscriber: ${email}`);
      } catch (error) {
        logger.error(`Failed to send event notification to ${email}:`, error);
        // Continue with other emails even if one fails
      }
    });

    // Wait for all emails to be sent (or fail)
    await Promise.allSettled(emailPromises);
    logger.info(`Finished sending event notifications to subscribers`);
  } catch (error) {
    logger.error("Error sending event notifications to subscribers:", error);
    throw error;
  }
}

/**
 * Cloud Function that triggers when an event document is updated
 * and sends an approval email to the submitter if the status changed to approved
 */
export const sendEventApprovalNotification = onDocumentUpdated(
  "events/{eventId}",
  async (event) => {
    // Get the before and after data
    const beforeData = event.data?.before.data();
    const afterData = event.data?.after.data();

    if (!beforeData || !afterData) {
      logger.error("Missing before or after data in event update");
      return;
    }

    // Check if status changed to approved ('a')
    if (beforeData.status !== 'a' && afterData.status === 'a') {
      // Event was just approved
      const eventTitle = afterData.title;
      const eventDate = afterData.date;
      const eventLocation = afterData.location;
      const eventOrganiser = afterData.organiser;
      const submittedBy = afterData.submittedBy;

      if (!eventTitle || !eventDate || !eventLocation || !eventOrganiser) {
        logger.error("Missing required event data for approval notification");
        return;
      }

      if (!submittedBy) {
        logger.error("No submitter email found - cannot send approval notification");
        return;
      }

      try {
        // Send approval notification email to the submitter
        await sendEmail(
          submittedBy,
          eventApprovalNotificationEmail.subject,
          eventApprovalNotificationEmail.generateHtml({
            title: eventTitle,
            date: eventDate,
            location: eventLocation,
            organiser: eventOrganiser,
          })
        );
        logger.info(`Event approval notification sent to submitter: ${submittedBy}`);

        // Send notification to all subscribers
        await sendEventNotificationToSubscribers({
          title: eventTitle,
          date: eventDate,
          location: eventLocation,
          organiser: eventOrganiser,
          description: afterData.description,
          time: afterData.time,
        });

        // Update the document to record that the approval notification was sent
        if (event.data) {
          await admin.firestore()
            .collection("events")
            .doc(event.data.after.id)
            .update({
              approvalNotificationSent: true,
              approvalNotificationSentAt: admin.firestore.FieldValue.serverTimestamp(),
              subscriberNotificationSent: true,
              subscriberNotificationSentAt: admin.firestore.FieldValue.serverTimestamp(),
            });
        }

        return {success: true};
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        logger.error("Error sending event approval notification:", error);
        return {error: errorMessage};
      }
    } else {
      // Status didn't change to approved, so no action needed
      logger.info("Event status update detected, but not a new approval");
      return;
    }
  }
);

/**
 * Cloud Function that triggers when a new document is created in the 'events' collection
 * and sends a notification email to info@paraclimbing.be
 */
export const sendEventSubmissionNotification = onDocumentCreated(
  "events/{eventId}",
  async (event) => {
    // Get the event data from the new document
    const snapshot = event.data;
    if (!snapshot) {
      logger.error("No data associated with the event");
      return;
    }

    const data = snapshot.data();
    const eventTitle = data.title;
    const eventDate = data.date;
    const eventLocation = data.location;
    const eventOrganiser = data.organiser;
    const submittedBy = data.submittedBy;

    if (!eventTitle || !eventDate || !eventLocation || !eventOrganiser) {
      logger.error("Missing required event data");
      return;
    }

    try {
      // Send notification email to info@paraclimbing.be
      await sendEmail(
        INFO_EMAIL,
        eventSubmissionNotificationEmail.subject,
        eventSubmissionNotificationEmail.generateHtml({
          title: eventTitle,
          date: eventDate,
          location: eventLocation,
          organiser: eventOrganiser,
          submittedBy: submittedBy,
        })
      );
      logger.info(`Event submission notification email sent to: ${INFO_EMAIL}`);

      // Update the document to record that the notification email was sent
      await admin.firestore()
        .collection("events")
        .doc(snapshot.id)
        .update({
          eventNotificationSent: true,
          eventNotificationSentAt: admin.firestore.FieldValue.serverTimestamp(),
        });

      return {success: true};
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      logger.error("Error sending event submission notification email:", error);
      return {error: errorMessage};
    }
  }
);
