///api/v1/posts/scraps?category=TWENTIES&sortOption=NEWEST_FIRST
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { apiClient } from '../login/loginApi'

export const getSavedPosts = async (
    category: string,
    sortOption: 'NEWEST_FIRST' | 'OLDEST_FIRST',
) => {
    try {
        const token = await AsyncStorage.getItem('accessToken')
        const response = await apiClient.get(
            `/posts/scraps?category=${category}&sortOption=${sortOption}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        )
        return response.data.postList
    } catch (error) {
        console.error('Error fetching comments:', error)
        throw error
    }
}
