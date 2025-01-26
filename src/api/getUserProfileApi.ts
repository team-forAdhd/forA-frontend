import { apiClient } from './login/loginApi'

interface UserProfile {
    accessToken: string
    userId: string
    nickname: string
    email: string
    profileImageUrl: string
}

export const getUserProfileApi = async () => {
    try {
        const response = await apiClient.get(`/user`)

        if (response.status === 200) {
            console.log('유저 상세 프로필 불러오기 성공')
            return response.data
        } else {
            console.log('응답 실패, 상태 코드:', response.status)
        }
    } catch (error) {
        console.error('Error fetching user profile detail:', error)
        throw error
    }
}
