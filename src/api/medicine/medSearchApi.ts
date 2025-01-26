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

        const response = await apiClient.get(`/medicines/search?${queryString}`)

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
