import { makeAutoObservable } from 'mobx' 
// MobX 라이브러리에서 makeAutoObservable 함수를 가져옴. 상태 관리 설정.
// makeAutoObservable은 객체 상태(state)와 그 상태를 변경하는 메서드(actions)를 자동으로 추적할 수 있도록 설정해 주는 함수.

interface MedListItem {
    id: number
    itemName: string
}

class MedStore { // selectedMed 상태 관리
    selectedMed: MedListItem | null = null // selectedMed는 MedListItem 타입의 객체이거나 null일 수 있음(약 정보), 기본 값 null (현재 선택된 약 정보가 없음)

    constructor() { // 클래스가 인스턴스화될 때 makeAutoObservable(this)가 호출되어 selectedMed와 그 값을 변경하는 메서드 setSelectedMed를 자동으로 관찰하게 됨.
        makeAutoObservable(this)
    }

    setSelectedMed = (med: MedListItem | null) => { // 매개변수로 MedListItem 타입 객체 또는 null을 받을 수 있고, 이 값을 selectedMed 상태에 저장함
        this.selectedMed = med
    }
}

const medStore = new MedStore()
export default medStore
