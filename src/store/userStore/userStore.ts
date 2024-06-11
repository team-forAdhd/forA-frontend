import { makeAutoObservable } from 'mobx';

class UserStore {
    isLoggedIn = false
    userId: number | string = ''
    nickname = ''

    constructor() {
        makeAutoObservable(this)
    }

    login(userId: number | string, nickname: string) {
        this.isLoggedIn = true
        this.userId = userId
        this.nickname = nickname
    }

    logout() {
        this.isLoggedIn = false;
        this.userId = ''
        this.nickname = ''
    }
}

const userStore = new UserStore()
export default userStore
