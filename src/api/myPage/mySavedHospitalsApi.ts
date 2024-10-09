import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { apiClient } from '../login/loginApi'

export const getSavedHospitals = async (sort: 'createdAt' | 'desc') => {
    try {
        const token = await AsyncStorage.getItem('accessToken')
        const response = await apiClient.get(
            `/hospitals/bookmark?page=0&size=10&sort=${sort}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        )
        return response.data
    } catch (error) {
        console.error('Error fetching comments:', error)
        throw error
    }
}
