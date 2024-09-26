import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { apiClient } from '../login/loginApi'

export const getMyComment = async (
    userId: number | string,
    sortOption: 'NEWEST_FIRST' | 'OLDEST_FIRST',
) => {
    try {
        const token = await AsyncStorage.getItem('accessToken')
        const response = await apiClient.get(
            `/comments/my-comments?sortOption=${sortOption}`,
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

export const getMyPosts = async () => {
    try {
        const token = await AsyncStorage.getItem('accessToken')
        const response = await axios.get(
            `https://foradhd.site/api/v1/comments/my-comments?sortOption=NEWEST_FIRST`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        )
        return response.data
    } catch (error) {
        console.error('Error fetching test:', error)
        throw error
    }
}
