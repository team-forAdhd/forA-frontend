import { makeAutoObservable } from 'mobx'

class ProfileStore {
    nickName: string = '' // default 작성
    imageUrl: string = '' // default 작성

    constructor() {
        makeAutoObservable(this)
    }

    setNickName = (name: string) => {
        this.nickName = name
    }

    setImageUrl = (url: string) => {
        this.imageUrl = url
    }
}

const profileStore = new ProfileStore()
export default profileStore
