import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';

i18n
  // Load translation using http -> see /public/locales
  .use(HttpBackend)
  // Pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // Init i18next
  .init({
    lng: 'en', // Set English as the default language
    fallbackLng: 'en', // Use English if detected language is not available
    debug: process.env.NODE_ENV === 'development', // Enable debug output in development
    supportedLngs: ['en'], // Only support English
    interpolation: {
      escapeValue: false, // React already safes from xss
    },
    backend: {
      // Path where translation files will be stored
      loadPath: '/locales/{{lng}}/{{ns}}.json',
      defaultNS: 'translation',
      ns: ['translation', 'events'],
    }
  });

export default i18n;