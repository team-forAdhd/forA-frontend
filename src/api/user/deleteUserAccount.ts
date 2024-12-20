import { apiClient } from '../login/loginApi'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const deleteUserAccount = async () => {
    try {
        await apiClient.delete('/user/delete')
        await AsyncStorage.removeItem('accessToken')
        delete apiClient.defaults.headers.common['Authorization']
    } catch (error) {
        console.error('Error deleting user account:', error)
        throw error
    }
}
