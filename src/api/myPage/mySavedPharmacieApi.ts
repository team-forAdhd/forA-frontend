///api/v1/posts/scraps?category=TWENTIES&sortOption=NEWEST_FIRST
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { apiClient } from '../login/loginApi'

export const getSavedPharmacies = async () => {
    try {
        const token = await AsyncStorage.getItem('accessToken')
        const response = await apiClient.get(`/medicine/bookmarks/my`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        return response.data
    } catch (error) {
        console.error('Error fetching comments:', error)
        throw error
    }
}
