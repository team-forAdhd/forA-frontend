import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const apiClient = axios.create({
    baseURL: 'https://foradhd.site/api/v1',
})

// 로그인 함수
export const Login = async (userId: string, userPw: string) => {
    try {
        const response = await apiClient.post('/auth/login', {
            username: userId,
            password: userPw,
        })
        const token = response.data.accessToken
        AsyncStorage.setItem('accessToken', token) // 토큰 저장


        const token2 = await AsyncStorage.getItem('accessToken')
        console.log(token2)
        
        apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}` // 모든 요청 헤더에 토큰 설정

    } catch (error) {
        console.error('Error logging in:', error)
        throw error
    }
}
