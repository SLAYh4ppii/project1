import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      login: {
        title: 'Game Launcher Login',
        profile: 'AWS Profile',
        profilePlaceholder: 'Enter your AWS profile name',
        submit: 'Login'
      },
      header: {
        title: 'Game Launcher',
        login: 'Login'
      },
      games: {
        play: 'Play',
        install: 'Install'
      },
      settings: {
        theme: 'Theme',
        language: 'Language',
        themes: {
          light: 'Light',
          dark: 'Dark'
        },
        languages: {
          en: 'English',
          de: 'Deutsch'
        }
      }
    }
  },
  de: {
    translation: {
      login: {
        title: 'Spiel-Launcher Anmeldung',
        profile: 'AWS-Profil',
        profilePlaceholder: 'Geben Sie Ihren AWS-Profilnamen ein',
        submit: 'Anmelden'
      },
      header: {
        title: 'Spiel-Launcher',
        login: 'Anmelden'
      },
      games: {
        play: 'Spielen',
        install: 'Installieren'
      },
      settings: {
        theme: 'Design',
        language: 'Sprache',
        themes: {
          light: 'Hell',
          dark: 'Dunkel'
        },
        languages: {
          en: 'Englisch',
          de: 'Deutsch'
        }
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;