import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Import des fichiers JSON de traduction
import enHero from "./locales/en/hero.json";
import frHero from "./locales/fr/hero.json";
import enQuote from "./locales/en/quote.json";
import frQuote from "./locales/fr/quote.json";
import enExploration from "./locales/en/exploration.json";
import frExploration from "./locales/fr/exploration.json";
import enProjects from "./locales/en/projects.json";
import frProjects from "./locales/fr/projects.json";
import enHeader from "./locales/en/header.json";
import frHeader from "./locales/fr/header.json";
import enGallery from "./locales/en/gallery.json";
import frGallery from "./locales/fr/gallery.json";
import enAbout from "./locales/en/about.json";
import frAbout from "./locales/fr/about.json";
import enFooter from "./locales/en/footer.json";
import frFooter from "./locales/fr/footer.json";

i18n
  .use(LanguageDetector) // Utilisation du détecteur de langue
  .use(initReactI18next) // Liaison avec React
  .init({
    resources: {
      en: {
        hero: enHero,
        quote: enQuote,
        exploration: enExploration,
        projects: enProjects,
        header: enHeader,
        gallery: enGallery,
        about: enAbout,
        footer: enFooter,
      },
      fr: {
        hero: frHero,
        quote: frQuote,
        exploration: frExploration,
        projects: frProjects,
        header: frHeader,
        gallery: frGallery,
        about: frAbout,
        footer: frFooter,
      },
    },
    fallbackLng: "en", // Langue de secours si la langue détectée n'est pas disponible
    interpolation: {
      escapeValue: false,
    },
    detection: {
      // Configuration des options de détection
      order: [
        "navigator",
        "cookie",
        "localStorage",
        "sessionStorage",
        "htmlTag",
        "path",
        "subdomain",
      ],
      caches: ["localStorage", "cookie"], // Cacher la langue détectée dans le localStorage ou les cookies
    },
  });

export default i18n;
