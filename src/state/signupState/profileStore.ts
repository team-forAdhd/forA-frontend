import { makeAutoObservable } from 'mobx'

class ProfileStore {
    nickname: string = ''
    imageUrl: any = null
    name: string = ''
    birthYearMonth: string = ''
    gender: string = ''
    email: string = ''
    password: string = ''
    passwordConfirm: string = ''
    forAdhdType: string = ''
    termsApprovals: { termsId: number; approved: boolean }[] = [
        { termsId: 1, approved: true },
        { termsId: 2, approved: true },
        { termsId: 3, approved: true },
    ]
    pushNotificationApprovals: {
        pushNotificationApprovalId: number
        approved: boolean
    }[] = [
        {
            pushNotificationApprovalId: 1,
            approved: true,
        },
    ]
    isPushNotiOn = false
    isLocationAllowed = false

    constructor() {
        makeAutoObservable(this)
    }

    setNickName(name: string) {
        this.nickname = name
    }

    setImageUrl(image: any) {
        this.imageUrl = image
    }

    setName(name: string) {
        this.name = name
    }

    setBirthYearMonth(birthYearMonth: string) {
        this.birthYearMonth = birthYearMonth
    }

    setGender(gender: string) {
        this.gender = gender
    }

    setEmail(email: string) {
        this.email = email
    }

    setPassword(password: string, passwordConfirm: string) {
        this.password = password
        this.passwordConfirm = passwordConfirm
    }

    setIsAdhd(forAdhdType: string) {
        this.forAdhdType = forAdhdType
    }

    setTermsApprovals(
        termsApprovals: { termsId: number; approved: boolean }[],
    ) {
        this.termsApprovals = termsApprovals
    }

    setPushNotificationApprovals(
        pushNotificationApprovals: {
            pushNotificationApprovalId: number
            approved: boolean
        }[],
    ) {
        this.pushNotificationApprovals = pushNotificationApprovals
    }

    setIsPushNotiOn() {
        this.isPushNotiOn = !this.isPushNotiOn
    }

    setIsLocationAllowed() {
        this.isLocationAllowed = !this.isLocationAllowed
    }
}

const profileStore = new ProfileStore()
export default profileStore
