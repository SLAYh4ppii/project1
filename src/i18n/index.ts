import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      login: {
        title: 'Game Launcher Login',
        accessKeyId: 'AWS Access Key ID',
        secretKey: 'AWS Secret Access Key',
        region: 'AWS Region',
        submit: 'Login'
      },
      play: 'Play',
      install: 'Install',
      settings: {
        theme: 'Theme',
        language: 'Language'
      },
      games: {
        library: 'Game Library',
        installed: 'Installed',
        available: 'Available'
      }
    }
  },
  de: {
    translation: {
      login: {
        title: 'Spiel-Launcher Anmeldung',
        accessKeyId: 'AWS Zugangsschlüssel-ID',
        secretKey: 'AWS Geheimer Schlüssel',
        region: 'AWS Region',
        submit: 'Anmelden'
      },
      play: 'Spielen',
      install: 'Installieren',
      settings: {
        theme: 'Design',
        language: 'Sprache'
      },
      games: {
        library: 'Spielebibliothek',
        installed: 'Installiert',
        available: 'Verfügbar'
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;