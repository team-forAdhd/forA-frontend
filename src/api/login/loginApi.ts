import axios, { AxiosRequestConfig } from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useAuthStore } from '@/store/authStore'
import userStore from '@/store/userStore/userStore'

export const apiClient = axios.create({
    baseURL: 'https://foradhd.site/api/v1',
    timeout: 5000,
})

apiClient.interceptors.request.use((config: AxiosRequestConfig) => {
    const accessToken = useAuthStore.getState().accessToken
    config.headers.Authorization = `Bearer ${accessToken}`
    return config
})

// 로그인 함수
export const Login = async (userId: string, userPw: string) => {
    try {
        const response = await apiClient.post('/auth/login', {
            username: userId,
            password: userPw,
        })
        const token = response.data.accessToken
        useAuthStore.getState().login(token)
    } catch (error) {
        console.error('Error logging in:', error)
        throw error
    }
}
