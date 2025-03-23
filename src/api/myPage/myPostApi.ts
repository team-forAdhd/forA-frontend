import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiClient } from '../login/loginApi';

export const getMyPosts = async (
    category: string,
    sortOption: 'NEWEST_FIRST' | 'OLDEST_FIRST' | 'MOST_VIEWED' | 'MOST_LIKED',
    page: number = 0,
    size: number = 10,
) => {
    try {
        const response = await apiClient.get(
            `/posts/my-posts?category=${category}&sortOption=${sortOption}&page=${page}&size=${size}`,
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};
