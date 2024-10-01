import { makeAutoObservable } from 'mobx';

class UserStore {
    isLoggedIn = false
    accessToken = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyZTZhODU5N2I5MWQ0OWQ4ODg2OTc5NTE5YTBjOTUxOCIsImF1dGhvcml0aWVzIjoiUk9MRV9VU0VSIiwiZW1haWwiOiJqa2RlNzcyMUBnbWFpbC5jb20iLCJpYXQiOjE3Mjc3ODY0NDcsImV4cCI6MTcyNzc5MDA0N30._PVIPN8sZAUSFRFt9mWyeknQ7PxYwgAQ9cDdwnhpty4'
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
