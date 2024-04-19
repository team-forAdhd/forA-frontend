import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import homeLocale from './ko/home.json'
import loginjoinLocale from './ko/login-join.json'
import signupProfile from './ko/signup-profile.json'

const resources = {
    ko: {
        home: homeLocale,
        'login-join': loginjoinLocale,
        'signup-profile': signupProfile,
    },
}

i18n.use(initReactI18next).init({
    resources,
    lng: 'ko',
    fallbackLng: 'ko',
    interpolation: {
        escapeValue: false,
    },
    react: {
        useSuspense: false,
    },
})

export default i18n
