import { makeAutoObservable } from 'mobx'

class SearchStore {
    recentSearchTerm: string[] = []

    constructor() {
        makeAutoObservable(this)
    }

    setSearchTerm(searchInput: string) {
        this.recentSearchTerm.unshift(searchInput) //최근 검색어이므로 배열의 앞에 원소를 추가해줌
    }

    deleteAll() {
        this.recentSearchTerm = []
    }
}

const searchStore = new SearchStore()
export default searchStore
