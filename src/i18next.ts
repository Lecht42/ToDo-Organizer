import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import translationEN from "./locales/en/translation.json";
import translationFR from "./locales/fr/translation.json";
import translationUK from "./locales/uk/translation.json";
import i18next from "i18next";

// Define the translations
const resources = {
  en: {
    translation: translationEN,
  },
  fr: {
    translation: translationFR,
  },
  uk: {
    translation: translationUK,
  },
};

export const preloadLanguages = ["en", "fr", "uk"];

i18next
  // Use LanguageDetector to detect the user's language
  .use(LanguageDetector)
  // Pass the i18n instance to react-i18next
  .use(initReactI18next)
  // Initialize i18next
  .init({
    resources,
    fallbackLng: preloadLanguages[0],
    preload: preloadLanguages,
    debug: true,
    keySeparator: false,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18next;
