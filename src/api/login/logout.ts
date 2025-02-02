import { useAuthStore } from '@/store/authStore'
import { apiClient } from './loginApi'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const logout = async () => {
    try {
        await apiClient.delete('/auth/logout')
        useAuthStore.getState().logout()
    } catch (error) {
        console.error('Error logging out:', error)
        throw error
    }
}
