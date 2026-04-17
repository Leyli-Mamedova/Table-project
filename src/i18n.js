import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en.json";
import ru from "./locales/ru.json";
import az from "./locales/az.json";;

const resources = {
    en: { translation: en },
    ru: { translation: ru },
    az: { translation: az }
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: localStorage.getItem("lang") || "en",
        fallbackLng: "en",
        interpolation: {
            escapeValue: false
        }
    })

export default i18n;