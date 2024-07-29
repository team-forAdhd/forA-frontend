import { computed, makeAutoObservable } from 'mobx'

class ForaRibonCount {
    count = 0

    constructor() {
        makeAutoObservable(this)
    }

    setCount(newCount: number) {
        this.count = newCount
    }
}

const foraRibonCount = new ForaRibonCount()
export default foraRibonCount
