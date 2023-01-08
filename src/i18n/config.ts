import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";

import translation_en from "./en.json";
import translation_ja from "./ja.json";

const resources = {
  ja: {
    translation: translation_ja,
  },
  en: {
    translation: translation_en,
  },
};

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
    detection: {
      order: [
        "querystring",
        "navigator",
        "cookie",
        "localStorage",
        "sessionStorage",
        "htmlTag",
        "path",
        "subdomain",
      ],
    },
  });

export default i18n;
