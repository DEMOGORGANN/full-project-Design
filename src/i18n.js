import i18n from "i18next";
import { initReactI18next } from "react-i18next";
// import Backend from "i18next-http-backend";
// import LanguageDetector from 'i18next-browser-languagedetector';
import translationEN from './locales/en/translation.json';
import translationRU from './locales/ru/translation.json';
import translationUA from './locales/ua/translation.json';

i18n
	// .use(Backend)
  .use(initReactI18next)
   //  .use(LanguageDetector)

  .init({
	resources: {
		en: {
			translation: translationEN,
		 },
		 ru: {
			translation: translationRU,
		 },
		 ua: {
			translation: translationUA,
		 }
    },
    lng: "ru",
    fallbackLng: "ru",
	 supportedLngs: ['en', 'ru', 'ua'],
    debug: true,

	//  detection: {
   //    order: ['path', 'cookie', 'htmlTag'],
   //    caches: ['cookie'],
   //  },

    interpolation: {
      escapeValue: false,
    },
	//  react: {
	// 	wait: true,
	// 	useSuspense: false,
	// },
   
  });

export default i18n;
