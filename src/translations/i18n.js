// src/i18n/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as RNLocalize from 'react-native-localize'; // pour détection device
// import AsyncStorage from '@react-native-async-storage/async-storage'; (optionnel si tu veux mémoriser la langue choisie)
import en from './en.json';
import fr from './fr.json';
import it from './it.json';

// (Optionnel) détecter la langue du device
const locales = RNLocalize.getLocales();
const systemLanguage = locales[0]?.languageCode; // par ex. "en" ou "fr"

i18n
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',
    lng: systemLanguage || 'en',    // on force la langue par défaut (ici on met "en")
    fallbackLng: 'en',             // si la langue du device n'est pas gérée, on fallback sur en
    resources: {
      en: { translation: en },
      fr: { translation: fr },
      it: { translation: it },
    },
    interpolation: { escapeValue: false },
    // si tu souhaites stocker la langue choisie par l'utilisateur:
    // react: { useSuspense: false }, // pour éviter des warnings RN
  });

export default i18n;
