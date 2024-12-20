import AsyncStorage from '@react-native-async-storage/async-storage'
import { apiClient } from '../login/loginApi'

export const getUserProfile = async () => {
    try {
        const token = await AsyncStorage.getItem('accessToken')
        const response = await apiClient.get(`/user`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        if (response.status === 200) {
            console.log('응답 성공:')
        } else {
            console.log('응답 실패, 상태 코드:', response.status)
        }
        return response.data
    } catch (error) {
        console.error('Error user profile:', error)
        throw error
    }
}
