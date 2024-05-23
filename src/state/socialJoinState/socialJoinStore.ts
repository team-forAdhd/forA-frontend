import { makeAutoObservable } from 'mobx'

class SocialJoinStore {
    agreeCheckList: boolean[] = [false, false, false, false]

    constructor() {
        makeAutoObservable(this)
    }

    setCheckAll() {
        if (this.agreeCheckList.every((check) => check === true)) {
            //이미 사용자가 전체동의를 누른 경우 전체 동의 취소
            this.agreeCheckList.fill(false)
        } else {
            //사용자가 아직 전체 동의를 누르지 않은 경우 전체 동의
            this.agreeCheckList.fill(true)
        }
    }

    setCheckEach(index: number) {
        this.agreeCheckList[index] = !this.agreeCheckList[index] //지금 들어있는 boolean값의 반대
    }
}

const socialJoinStore = new SocialJoinStore()
export default socialJoinStore
