///api/v1/posts/scraps?category=TWENTIES&sortOption=NEWEST_FIRST
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { apiClient } from '../login/loginApi'

export const getSavedPharmacies = async () => {
    try {
        const response = await apiClient.get(`/medicine/bookmarks/my`)
        return response.data
    } catch (error) {
        console.error('Error fetching comments:', error)
        throw error
    }
}
