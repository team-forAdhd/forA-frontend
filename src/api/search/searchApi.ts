import AsyncStorage from '@react-native-async-storage/async-storage'
import { apiClient } from '../login/loginApi'

export const getSearch = async (title: string) => {
    try {
        const response = await apiClient.get(`/posts/search?title=${title}`)

        if (response.status === 200) {
            console.log('검색 응답 성공:', response.data.data)
        } else {
            console.log('응답 실패, 상태 코드:', response.status)
        }
        return response.data.data
    } catch (error) {
        console.error('Error fetching comments:', error)
        throw error
    }
}
