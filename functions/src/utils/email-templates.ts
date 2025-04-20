/**
 * E-mailsjablonen en configuratie voor Belgische Paraclimbing-website
 */

/**
 * Configuratie voor bevestigingsmail inschrijving
 */
export const subscriptionConfirmationEmail = {
  subject: "Bedankt voor je inschrijving bij Paraclimbing.be",

  /**
   * Genereert de HTML-inhoud voor de bevestigingsmail
   * @return {string} HTML-string voor de e-mailbody
   */
  generateHtml: () => {
    const currentYear = new Date().getFullYear();
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #3498db; color: white; padding: 20px; text-align: center;">
          <h1>Welkom tot de wondere wereld van het Paraklimmen!</h1>
        </div>
        <div style="padding: 20px; background-color: #f9f9f9;">
          <p>Hallo,</p>
          <p>
            Bedankt om je in te schrijven op de nieuwsbrief van Paraclimbing.be!
          </p>
          <p>
            We houden je op de hoogte van het laatste nieuws, evenementen en kansen binnen de Belgische
            paraclimbing-gemeenschap.
          </p>
          <p>Heb je vragen? Aarzel niet om deze e-mail te beantwoorden.</p>
          <p>Met sportieve groeten,<br>Fré Leys (voorzitter Paraclimbing.be)</p>
        </div>
        <div
          style="background-color: #34495e; color: white; padding: 15px; text-align: center; font-size: 12px;"
        >
          <p>
            &copy; ${currentYear} Paraclimbing.be Alle rechten voorbehouden.
          </p>
          <p>
            Wil je je uitschrijven? <a href="#" style="color: #3498db;">Klik hier</a>.
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
  subject: "New subscriber on Paraclimbing.be",

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
          <h1>New Paraclimbing.be Subscriber</h1>
        </div>
        <div style="padding: 20px; background-color: #f9f9f9;">
          <p>Hello Frederik,</p>
          <p>
            You have a new subscriber to the Paraclimbing.be newsletter!
          </p>
          <p>
            <strong>Subscriber Email:</strong> ${subscriberEmail}
          </p>
          <p>
            <strong>Date:</strong> ${currentDate}<br>
            <strong>Time:</strong> ${currentTime}
          </p>
          <p>This is an automated notification.</p>
        </div>
        <div
          style="background-color: #3498db; color: white; padding: 15px; text-align: center; font-size: 12px;"
        >
          <p>
            &copy; ${new Date().getFullYear()} Paraclimbing.be Admin System
          </p>
        </div>
      </div>
    `;
  },
};

/**
 * Maakt een aangepast e-mailsjabloon
 * @param {string} subject Onderwerp van de e-mail
 * @param {Function} contentGenerator Functie die HTML-inhoud retourneert
 * @return {Object} E-mailsjabloon object
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
