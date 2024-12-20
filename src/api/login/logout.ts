import { apiClient } from './loginApi'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const logout = async () => {
    try {
        await apiClient.delete('/auth/logout')
        await AsyncStorage.removeItem('accessToken')
        delete apiClient.defaults.headers.common['Authorization']
    } catch (error) {
        console.error('Error logging out:', error)
        throw error
    }
}
