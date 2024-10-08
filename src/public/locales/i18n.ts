import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import homeLocale from './ko/home.json'
import loginjoinLocale from './ko/login-join.json'
import signupProfile from './ko/signup-profile.json'
import notificationLocale from './ko/notification.json'
import boardLocale from './ko/board.json'
import searchLocale from './ko/search.json'
import socialLogin from './ko/socialLogin.json'
import hospitalDetail from './ko/hospitalDetail.json'
import hospitalReviewList from './ko/hospitalReviewList.json'
import MyPage from './ko/myPage.json'
import AccountSettings from './ko/accountSettings.json'
import ribbonEvaluation from './ko/ribbonEvaluation.json'
import ribbonDescription from './ko/ribbonDescription.json'
import HospitalModal from './ko/hospitalModal.json'
import medLocale from './ko/medicine.json'
import onboard from './ko/onboard.json'
import medDetail from './ko/medDetail.json'

const resources = {
    ko: {
        home: homeLocale,
        'login-join': loginjoinLocale,
        'signup-profile': signupProfile,
        notification: notificationLocale,
        board: boardLocale,
        search: searchLocale,
        socialLogin: socialLogin,
        hospitalDetail: hospitalDetail,
        hospitalReviewList: hospitalReviewList,
        MyPage: MyPage,
        AccountSettings: AccountSettings,
        ribbonEvaluation: ribbonEvaluation,
        ribbonDescription: ribbonDescription,
        HospitalModal: HospitalModal,
        medicine: medLocale,
        Onboard: onboard,
        medDetail: medDetail
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
