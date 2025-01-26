import { apiClient } from '../login/loginApi'

export const getUserProfile = async () => {
    try {
        const response = await apiClient.get(`/user`)
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
