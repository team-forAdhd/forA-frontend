import { apiClient } from '../login/loginApi'

export const getMedSearchResult = async (itemName: string) => {
    try {
        const response = await apiClient.get(
            `/medicines/search?itemName=${itemName}`,
        )
        if (response.status === 200) {
            console.log(`약 검색 성공 (검색어: ${itemName})`)
            return response.data.data
        } else {
            console.log('응답 실패, 상태 코드:', response.status)
        }
    } catch (error) {
        console.error('Error searching medicine by name:', error)
        throw error
    }
}

export const getShapeColorSearchResult = async (
    shape: string,
    tabletType: string,
    color: string,
) => {
    try {
        // 쿼리 파라미터를 동적으로 추가
        let queryParams = []

        if (tabletType) {
            queryParams.push(`tabletType=${tabletType}`)
        }
        if (shape) {
            queryParams.push(`shape=${encodeURIComponent(shape)}`)
        }
        if (color) {
            queryParams.push(`color1=${encodeURIComponent(color)}`)
        }

        // 셋 중 하나는 반드시 있음
        const queryString =
            queryParams.length > 0 ? `?${queryParams.join('&')}` : ''

        console.log('API 요청 URL:', `/medicines/search${queryString}`)

        const response = await apiClient.get(`/medicines/search?${queryString}`)

        console.log('응답 상태 코드:', response.status)
        console.log('응답 데이터:', response.data)

        if (response.status === 200) {
            console.log('모양, 색상별 약 찾기 성공')
            return response.data
        } else {
            console.log('응답 실패, 상태 코드:', response.status)
        }
    } catch (error) {
        console.error('Error searching medicine by shape, color:', error)
        throw error
    }
}

export const getMedRecentSearchApi = async () => {
    try {
        const response = await apiClient.get(`/medicines/recent-searches`)

        if (response.status === 200) {
            console.log('최근 검색어 불러오기 성공')

            return response.data
        } else {
            console.log('응답 실패, 상태 코드:', response.status)
        }
    } catch (error) {
        console.error('Error fetching recent searches:', error)
        throw error
    }
}

export const deleteMedRecentSearchApi = async (searchId: number) => {
    // searchId가 아닌, 각 검색어 인덱스 배열 num
    try {
        const response = await apiClient.delete(
            `/medicines/recent-searches/${searchId}`,
        )

        console.log('최근 검색어 삭제 성공')
    } catch (error) {
        console.error('Error deleting recent search:', error)
        throw error
    }
}

// 약 게시글 목록 조회 API
export const getMedSortedListApi = async (
    itemName?: string,
    shape?: string,
    color1?: string,
    tabletTypes?: string[],
) => {
    try {
        // 쿼리 파라미터 동적으로 추가
        let queryParams = [];

        if (itemName) {
            queryParams.push(`itemName=${itemName}`); 
        }
        if (shape) {
            queryParams.push(`shape=${shape}`); 
        }
        if (color1) {
            queryParams.push(`color1=${color1}`);
        }
        if (tabletTypes && tabletTypes.length > 0) {
            tabletTypes.forEach((type) => {
                queryParams.push(`tabletType=${type}`);
            });
        }

        const queryString = queryParams.length > 0 ? `?${queryParams.join('&')}` : '';
        
        console.log('API 요청 URL:', `https://foradhd.site/api/v1/medicines/sorted${queryString}`)

        const response = await apiClient.get(`/api/v1/medicines/sorted${queryString}`);

        if (response.status === 200) {
            console.log('약 목록 조회 성공:', response.data);
            return response.data;
        } else {
            console.error('약 목록 조회 실패, 상태 코드:', response.status);
            return [];
        }
    } catch (error) {
        console.error('Error fetching sorted medicines:', error);
        throw error;
    }
};
