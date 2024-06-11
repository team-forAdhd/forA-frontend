import { makeAutoObservable } from 'mobx'

class TabBarStore {
    clickTab: string = 'home-tab'

    constructor() {
        makeAutoObservable(this)
    }

    setClickTab = (tab: string) => {
        this.clickTab = tab
    }
}

const tabBarStore = new TabBarStore()
export default tabBarStore
