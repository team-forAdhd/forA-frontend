import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiClient } from '../login/loginApi';

export const getMyComment = async (
    sortOption: 'NEWEST_FIRST' | 'OLDEST_FIRST',
) => {
    try {
        const response = await apiClient.get(
            `/comments/my-comments?sortOption=${sortOption}`,
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};
