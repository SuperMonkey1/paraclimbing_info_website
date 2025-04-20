import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  // Load translation using http -> see /public/locales
  .use(HttpBackend)
  // Detect user language
  .use(LanguageDetector)
  // Pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // Init i18next
  .init({
    fallbackLng: 'en', // Use English if detected language is not available
    debug: process.env.NODE_ENV === 'development', // Enable debug output in development
    supportedLngs: ['en', 'nl', 'fr'], // Supported languages
    interpolation: {
      escapeValue: false, // React already safes from xss
    },
    backend: {
      // Path where translation files will be stored
      loadPath: '/locales/{{lng}}/{{ns}}.json',
      defaultNS: 'translation',
      ns: ['translation', 'events'],
    },
    detection: {
      // Order and from where user language should be detected
      order: ['querystring', 'cookie', 'localStorage', 'navigator', 'htmlTag', 'path', 'subdomain'],
      caches: ['localStorage', 'cookie'], // Cache the language preference
    }
  });

export default i18n;