/**
 * Email service for sending emails from the Belgian Paraclimbing website
 */

import * as nodemailer from "nodemailer";
import * as logger from "firebase-functions/logger";

// Configure nodemailer with your Gmail account
const createTransporter = () => {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });
};

/**
 * Send an email using the configured transporter
 *
 * @param {string} to Recipient email address
 * @param {string} subject Email subject
 * @param {string} htmlContent HTML content of the email
 * @return {Promise<nodemailer.SentMessageInfo>} Promise resolving to the send mail result
 */
export const sendEmail = async (
  to: string,
  subject: string,
  htmlContent: string
): Promise<nodemailer.SentMessageInfo> => {
  try {
    const transporter = createTransporter();
    const mailOptions = {
      from: `${process.env.FROM_NAME || "Paraclimbing.be"} <${process.env.GMAIL_USER}>`,
      to,
      subject,
      html: htmlContent,
    };

    // Send the email
    const result = await transporter.sendMail(mailOptions);
    logger.info(`Email sent to ${to}`);
    return result;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logger.error("Error sending email:", error);
    throw new Error(`Failed to send email: ${errorMessage}`);
  }
};
