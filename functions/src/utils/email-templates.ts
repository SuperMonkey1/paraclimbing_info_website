/**
 * Email templates and configuration for Paraclimbing.info website
 */

/**
 * Configuration for subscription confirmation email
 */
export const subscriptionConfirmationEmail = {
  subject: "Welcome to the Paraclimbing.info community!",

  /**
   * Generates the HTML content for the confirmation email
   * @return {string} HTML string for the email body
   */
  generateHtml: () => {
    const currentYear = new Date().getFullYear();
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #3498db; color: white; padding: 20px; text-align: center;">
          <h1>Welcome to the world of Paraclimbing!</h1>
        </div>
        <div style="padding: 20px; background-color: #f9f9f9;">
          <p>Hello,</p>
          <p>
            Thank you for subscribing to the Paraclimbing.info newsletter!
          </p>
          <p>
            <strong>About Paraclimbing.info</strong><br>
            Paraclimbing.info is an initiative founded by a group of international paraclimbers who met at the Paraclimbing World Cups. United by a shared passion, we aim to raise awareness and visibility for the sport of paraclimbing.
          </p>
          <p>
            Our platform serves as an information hub—both for aspiring paraclimbers and for the broader climbing community. We're also committed to supporting athletes on their journey to international competitions, helping grow the sport and share its unique spirit.
          </p>
          <p>
            We'll keep you updated with the latest news, events, and opportunities within the international paraclimbing community.
          </p>
          <p>
            Want to support our mission? Visit our Partners page to learn how you can get involved.
          </p>
          <p>Have questions? Don't hesitate to reply to this email.</p>
          <p>With sporting regards,<br>The Paraclimbing.info Team</p>
        </div>
        <div
          style="background-color: #34495e; color: white; padding: 15px; text-align: center; font-size: 12px;"
        >
          <p>
            &copy; ${currentYear} Paraclimbing.info All rights reserved.
          </p>
          <p>
            Want to unsubscribe? <a href="#" style="color: #3498db;">Click here</a>.
          </p>
        </div>
      </div>
    `;
  },
};

/**
 * Configuration for admin notification email when a new subscriber signs up
 */
export const adminNotificationEmail = {
  subject: "New subscriber on Paraclimbing.info",

  /**
   * Generates the HTML content for the admin notification email
   * @param {string} subscriberEmail The email address of the new subscriber
   * @return {string} HTML string for the email body
   */
  generateHtml: (subscriberEmail: string) => {
    const currentDate = new Date().toLocaleDateString();
    const currentTime = new Date().toLocaleTimeString();
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #34495e; color: white; padding: 20px; text-align: center;">
          <h1>New Paraclimbing.info Subscriber</h1>
        </div>
        <div style="padding: 20px; background-color: #f9f9f9;">
          <p>Hello,</p>
          <p>
            You have a new subscriber to the Paraclimbing.info newsletter!
          </p>
          <p>
            <strong>Subscriber Email:</strong> ${subscriberEmail}
          </p>
          <p>
            <strong>Date:</strong> ${currentDate}<br>
            <strong>Time:</strong> ${currentTime}
          </p>
          <p>This is an automated notification from the Paraclimbing.info platform.</p>
        </div>
        <div
          style="background-color: #3498db; color: white; padding: 15px; text-align: center; font-size: 12px;"
        >
          <p>
            &copy; ${new Date().getFullYear()} Paraclimbing.info Admin System
          </p>
        </div>
      </div>
    `;
  },
};

/**
 * Creates a custom email template
 * @param {string} subject Email subject
 * @param {Function} contentGenerator Function that returns HTML content
 * @return {Object} Email template object
 */
export const createEmailTemplate = (
  subject: string,
  contentGenerator: () => string,
) => {
  return {
    subject,
    generateHtml: contentGenerator,
  };
};
