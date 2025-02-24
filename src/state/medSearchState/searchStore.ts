import { makeAutoObservable } from 'mobx';

class MedSearchStore {
    recentSearchTerm: string[] = [];
    searchTermDates: string[] = []; //검색 기록의 생성일을 저장

    constructor() {
        makeAutoObservable(this);
        setInterval(() => {
            this.deleteOldSearchTerms();
        }, 86400000); // 매일 함수 호출
    }

    setSearchTerm(searchInput: string) {
        const currentDate = new Date().toISOString();
        this.recentSearchTerm.unshift(searchInput); //최근 검색어이므로 배열의 앞에 원소를 추가해줌
        this.searchTermDates.unshift(currentDate);
    }

    deleteOldSearchTerms() {
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7); // 일주일 전 날짜 설정

        this.recentSearchTerm = this.recentSearchTerm.filter((_, index) => {
            const searchTermDate = new Date(this.searchTermDates[index]);
            return searchTermDate > weekAgo; // 일주일 이내의 검색 기록만 유지
        });

        this.searchTermDates = this.searchTermDates.filter((dateString) => {
            const searchTermDate = new Date(dateString);
            return searchTermDate > weekAgo; //검색 일자도 일주일 이내인 경우에만 유지
        });
    }

    deleteAll() {
        this.recentSearchTerm = [];
    }

    deleteSearchTerm(searchInput: string) {
        // 지우려고 하는 검색어의 해당 인덱스
        const index = this.recentSearchTerm.indexOf(searchInput);

        // 해당 검색어가 배열에 존재하는 경우
        if (index !== -1) {
            // 해당 인덱스의 검색어와 날짜를 배열에서 제거
            this.recentSearchTerm.splice(index, 1);
            this.searchTermDates.splice(index, 1);
        }
    }
}

const medSearchStore = new MedSearchStore();
export default medSearchStore;
