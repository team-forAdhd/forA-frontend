import AsyncStorage from '@react-native-async-storage/async-storage'
import { apiClient } from '../login/loginApi'

export const putUserNewProfile = async () => {
    try {
        const response = await apiClient.put(`/user/profile`)

        if (response.status === 200) {
            console.log('회원 프로필 변경 성공')

            return response.data
        } else {
            console.log('응답 실패, 상태 코드:', response.status)
        }
    } catch (error) {
        console.error('Error setting new profile:', error)
        throw error
    }
}
