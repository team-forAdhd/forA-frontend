import { makeAutoObservable } from 'mobx';

class UserStore {
    isLoggedIn = false
    accessToken = ''
    userId = ''
    nickname = ''
    profileImageUrl = ''

    constructor() {
        makeAutoObservable(this)
    }

    login(accessToken: string, userId: string, nickname: string, profileImageUrl: string) {
        this.isLoggedIn = true
        this.accessToken = this.accessToken
        this.userId = userId
        this.nickname = nickname
        this.profileImageUrl = profileImageUrl
    }

    logout() {
        this.isLoggedIn = false;
        this.userId = ''
        this.nickname = ''
        this.profileImageUrl = ''

    }
}

const userStore = new UserStore()
export default userStore
