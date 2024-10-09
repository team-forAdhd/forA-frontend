import AsyncStorage from '@react-native-async-storage/async-storage'
import { apiClient } from '../login/loginApi'

export const postBookmark = async (hospitalId: string, bookmark: boolean) => {
    try {
        const token = await AsyncStorage.getItem('accessToken')
        const response = await apiClient.post(
            `/hospitals/${hospitalId}/bookmark?bookmark=${bookmark}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        )
        if (response.status === 200) {
            console.log('응답 성공:')
        } else {
            console.log('응답 실패, 상태 코드:', response.status)
        }
    } catch (error) {
        console.error('Error bookmark post:', error)
        throw error
    }
}
