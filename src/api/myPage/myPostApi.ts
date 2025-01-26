import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { apiClient } from '../login/loginApi'

export const getMyPosts = async (
    category: string,
    sortOption: 'NEWEST_FIRST' | 'OLDEST_FIRST',
) => {
    try {
        const response = await apiClient.get(
            `/posts/my-posts?sortOption=${sortOption}&category=${category}`,
        )
        return response.data.postList
    } catch (error) {
        console.error('Error fetching comments:', error)
        throw error
    }
}
