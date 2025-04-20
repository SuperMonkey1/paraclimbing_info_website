/**
 * Cloud Functions for sending confirmation emails when new contacts are added
 */

// Load environment variables from .env file
import * as dotenv from "dotenv";
dotenv.config();

import {onDocumentCreated} from "firebase-functions/v2/firestore";
import * as admin from "firebase-admin";

import * as logger from "firebase-functions/logger";

// Import email templates and service
import {subscriptionConfirmationEmail} from "./utils/email-templates";
import {sendEmail} from "./utils/email-service";

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
      // Send confirmation email using the email service
      await sendEmail(
        email,
        subscriptionConfirmationEmail.subject,
        subscriptionConfirmationEmail.generateHtml()
      );
      logger.info(`Confirmation email sent to ${email}`);

      // Update the document to record that the confirmation email was sent
      await admin.firestore()
        .collection("contacts")
        .doc(snapshot.id)
        .update({
          confirmationEmailSent: true,
          confirmationEmailSentAt: admin.firestore.FieldValue.serverTimestamp(),
        });

      return {success: true};
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      logger.error("Error sending confirmation email:", error);
      return {error: errorMessage};
    }
  }
);
