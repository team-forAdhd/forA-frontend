import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import homeLocale from './ko/home.json'
import loginjoinLocale from './ko/login-join.json'
import signupProfile from './ko/signup-profile.json'
import notificationLocale from './ko/notification.json'
import searchLocale from './ko/search.json'
import socialLogin from './ko/socialLogin.json'
import hospitalDetail from './ko/hospitalDetail.json'
const resources = {
    ko: {
        home: homeLocale,
        'login-join': loginjoinLocale,
        'signup-profile': signupProfile,
        notification: notificationLocale,
        search: searchLocale,
        socialLogin: socialLogin,
        hospitalDetail: hospitalDetail,
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
