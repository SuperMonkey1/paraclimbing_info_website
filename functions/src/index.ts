/**
 * Cloud Functions for sending confirmation emails when new contacts are added
 */

// Load environment variables from .env file
import * as dotenv from "dotenv";
dotenv.config();

import { onDocumentCreated } from "firebase-functions/v2/firestore";
import * as admin from "firebase-admin";
import * as nodemailer from "nodemailer";
import * as logger from "firebase-functions/logger";

// Initialize Firebase Admin SDK
admin.initializeApp();

// Configure nodemailer with your Gmail account
// NOTE: For Gmail, you'll need to create an 'App Password' in your Google Account
// settings if you have 2-factor authentication enabled

// Using environment variables for email configuration
// Set these using Firebase CLI: firebase functions:config:set gmail.user="youremail@gmail.com" gmail.pass="yourapppassword"
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS
  }
});

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
      // Define email options
      const mailOptions = {
        from: `${process.env.FROM_NAME || 'Belgian Paraclimbing'} <${process.env.GMAIL_USER}>`,
        to: email,
        subject: "Thank you for subscribing to Belgian Paraclimbing updates",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background-color: #3498db; color: white; padding: 20px; text-align: center;">
              <h1>Welcome to Belgian Paraclimbing!</h1>
            </div>
            <div style="padding: 20px; background-color: #f9f9f9;">
              <p>Hello,</p>
              <p>Thank you for subscribing to the Belgian Paraclimbing newsletter!</p>
              <p>We'll keep you updated with the latest news, events, and opportunities in the Belgian paraclimbing community.</p>
              <p>If you have any questions, feel free to reply to this email.</p>
              <p>Best regards,<br>The Belgian Paraclimbing Team</p>
            </div>
            <div style="background-color: #34495e; color: white; padding: 15px; text-align: center; font-size: 12px;">
              <p>&copy; ${new Date().getFullYear()} Belgian Paraclimbing. All rights reserved.</p>
              <p>If you wish to unsubscribe, please <a href="#" style="color: #3498db;">click here</a>.</p>
            </div>
          </div>
        `
      };

      // Send the email
      await transporter.sendMail(mailOptions);
      logger.info(`Confirmation email sent to ${email}`);

      // Update the document to record that the confirmation email was sent
      await admin.firestore()
        .collection("contacts")
        .doc(snapshot.id)
        .update({
          confirmationEmailSent: true,
          confirmationEmailSentAt: admin.firestore.FieldValue.serverTimestamp()
        });

      return { success: true };
    } catch (error) {
      logger.error("Error sending confirmation email:", error);
      return { error: error.message };
    }
  }
);
