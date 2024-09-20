import { makeAutoObservable } from 'mobx';

class UserStore {
    isLoggedIn = false
    userId: number | string = ''
    nickname = ''
    profileImageUrl = ''

    constructor() {
        makeAutoObservable(this)
    }

    login(userId: number | string, nickname: string, profileImageUrl: string) {
        this.isLoggedIn = true
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
