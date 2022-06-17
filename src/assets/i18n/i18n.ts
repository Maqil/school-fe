import i18n from "i18next";
import en from "./en.json";
import fr from "./fr.json";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { DETECTION_OPTIONS } from "../../constants/i18n";
export const resources = {
  en: {
    translation: {
      ...en
    }
  },
  fr: {
    translation: {
      ...fr
    }
  }
} as const;

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    detection: DETECTION_OPTIONS,
    fallbackLng: "fr",
    interpolation: {
      escapeValue: false
    }
  });
