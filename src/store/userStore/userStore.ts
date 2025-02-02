import { makeAutoObservable } from 'mobx'

class UserStore {
    isLoggedIn = false
    accessToken =
        'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyZTZhODU5N2I5MWQ0OWQ4ODg2OTc5NTE5YTBjOTUxOCIsImVtYWlsIjoiamtkZTc3MjFAZ21haWwuY29tIiwiYXV0aG9yaXRpZXMiOiJST0xFX1VTRVIiLCJpYXQiOjE3Mjc3OTQyNzMsImV4cCI6MTcyNzc5Nzg3M30.NCyt9qz0ih2v6MH2lVlK-15D4Im8kBOUNmqrVPV0Fx0'
    userId = ''
    nickname = ''
    profileImageUrl = ''

    constructor() {
        makeAutoObservable(this)
    }

    login(
        accessToken: string,
        userId: string,
        nickname: string,
        profileImageUrl: string,
    ) {
        this.isLoggedIn = true
        this.accessToken = accessToken
        this.userId = userId
        this.nickname = nickname
        this.profileImageUrl = profileImageUrl
    }

    logout() {
        this.isLoggedIn = false
        this.userId = ''
        this.nickname = ''
        this.profileImageUrl = ''
    }
}

const userStore = new UserStore()
export default userStore
