import { makeAutoObservable } from 'mobx'

interface MedListItem {
    medId: number
    itemName: string
}

class MedStore {
    selectedMed: MedListItem | null = null

    constructor() {
        makeAutoObservable(this)
    }

    setSelectedMed = (med: MedListItem | null) => {
        this.selectedMed = med
    }
}

const medStore = new MedStore()
export default medStore
