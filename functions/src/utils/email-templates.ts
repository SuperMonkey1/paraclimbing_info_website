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
          <h1>Welkom bij Paraclimbing!</h1>
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
