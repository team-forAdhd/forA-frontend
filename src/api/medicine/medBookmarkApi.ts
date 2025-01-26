import AsyncStorage from '@react-native-async-storage/async-storage'
import { apiClient } from '../login/loginApi'

export const medBookmarkApi = async (medId: number) => {
    try {
        const response = await apiClient.post(
            `/medicine/bookmarks/toggle?medicineId=${medId}`,
        )
        if (response.status === 200) {
            console.log('약 북마크 성공')

            return response
        } else {
            console.log('응답 실패, 상태 코드:', response.status)
        }
    } catch (error) {
        console.error('Error posting medicine bookmark:', error)
        throw error
    }
}
