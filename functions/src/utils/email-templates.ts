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
 * Configuration for admin notification email when a new event is submitted
 */
export const eventSubmissionNotificationEmail = {
  subject: "New event submitted on Paraclimbing.info",

  /**
   * Generates the HTML content for the event submission notification email
   * @param {Object} eventData The event data
   * @param {string} eventData.title Event title
   * @param {string} eventData.date Event date
   * @param {string} eventData.location Event location
   * @param {string} eventData.organiser Event organiser
   * @param {string} eventData.submittedBy Email of the person who submitted the event
   * @return {string} HTML string for the email body
   */
  generateHtml: (eventData: {
    title: string;
    date: string;
    location: string;
    organiser: string;
    submittedBy?: string;
  }) => {
    const currentDate = new Date().toLocaleDateString();
    const currentTime = new Date().toLocaleTimeString();
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #e74c3c; color: white; padding: 20px; text-align: center;">
          <h1>New Event Submitted</h1>
        </div>
        <div style="padding: 20px; background-color: #f9f9f9;">
          <p>Hello,</p>
          <p>
            A new event has been submitted on Paraclimbing.info and is awaiting review.
          </p>
          <div style="background-color: white; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #2c3e50;">${eventData.title}</h3>
            <p><strong>Date:</strong> ${eventData.date}</p>
            <p><strong>Location:</strong> ${eventData.location}</p>
            <p><strong>Organiser:</strong> ${eventData.organiser}</p>
            ${eventData.submittedBy ? `<p><strong>Submitted by:</strong> ${eventData.submittedBy}</p>` : ''}
          </div>
          <p>
            <strong>Submission Details:</strong><br>
            <strong>Date:</strong> ${currentDate}<br>
            <strong>Time:</strong> ${currentTime}
          </p>
          <p>Please review this event in the admin panel and approve or reject it accordingly.</p>
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
 * Configuration for event approval notification email to the submitter
 */
export const eventApprovalNotificationEmail = {
  subject: "Your event has been approved on Paraclimbing.info!",

  /**
   * Generates the HTML content for the event approval notification email
   * @param {Object} eventData The event data
   * @param {string} eventData.title Event title
   * @param {string} eventData.date Event date
   * @param {string} eventData.location Event location
   * @param {string} eventData.organiser Event organiser
   * @return {string} HTML string for the email body
   */
  generateHtml: (eventData: {
    title: string;
    date: string;
    location: string;
    organiser: string;
  }) => {
    const currentYear = new Date().getFullYear();
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #27ae60; color: white; padding: 20px; text-align: center;">
          <h1>🎉 Your Event Has Been Approved!</h1>
        </div>
        <div style="padding: 20px; background-color: #f9f9f9;">
          <p>Congratulations!</p>
          <p>
            Your event submission has been reviewed and approved. It's now live on Paraclimbing.info and visible to the paraclimbing community worldwide.
          </p>
          <div style="background-color: white; padding: 15px; border-radius: 5px; margin: 20px 0; border-left: 4px solid #27ae60;">
            <h3 style="margin-top: 0; color: #2c3e50;">${eventData.title}</h3>
            <p><strong>📅 Date:</strong> ${eventData.date}</p>
            <p><strong>📍 Location:</strong> ${eventData.location}</p>
            <p><strong>👥 Organiser:</strong> ${eventData.organiser}</p>
          </div>
          <p>
            Your event is now part of our growing database of paraclimbing activities. Athletes, coaches, and enthusiasts from around the world will be able to discover and participate in your event.
          </p>
          <div style="background-color: #ecf0f1; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p style="margin: 0;"><strong>What's next?</strong></p>
            <ul style="margin: 10px 0 0 20px; padding: 0;">
              <li>Your event is now visible on our events page</li>
              <li>Consider sharing the Paraclimbing.info link on your social media</li>
              <li>Feel free to submit future events anytime</li>
            </ul>
          </div>
          <p>
            Thank you for contributing to the growth of the paraclimbing community. Your efforts help make our sport more accessible and visible worldwide.
          </p>
          <p>
            Have questions or want to submit another event? Simply reply to this email or visit our website.
          </p>
          <p>With sporting regards,<br>The Paraclimbing.info Team</p>
        </div>
        <div
          style="background-color: #34495e; color: white; padding: 15px; text-align: center; font-size: 12px;"
        >
          <p>
            &copy; ${currentYear} Paraclimbing.info All rights reserved.
          </p>
          <p>
            Visit us at <a href="https://paraclimbing.info" style="color: #3498db;">paraclimbing.info</a>
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
