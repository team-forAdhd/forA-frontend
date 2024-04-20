import { makeAutoObservable } from 'mobx'

class ProfileStore {
    nickName: string = '' // default 작성
    imageUrl: string = '' // default 작성
    name: string = ''
    birthYearMonth: string = ''
    gender: string = ''
    email: string = ''
    password: string = ''
    isAdhd: string = ''

    constructor() {
        makeAutoObservable(this)
    }

    setNickName = (name: string) => {
        this.nickName = name
    }

    setImageUrl = (url: string) => {
        this.imageUrl = url
    }
    setName(name: string) {
        this.name = name;
      }
    
    setBirthYearMonth(birthYearMonth: string) {
        this.birthYearMonth = birthYearMonth;
    }
    
    setGender(gender: string) {
        this.gender = gender;
    }
    
    setEmail(email: string) {
        this.email = email;
    }
    
    setPassword(password: string) {
       this.password = password;
    }

    setIsAdhd(isAdhd: string) {
        this.isAdhd = isAdhd;
    }
    
}

const profileStore = new ProfileStore()
export default profileStore
