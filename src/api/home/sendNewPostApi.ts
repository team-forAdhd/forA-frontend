import axios, { AxiosError } from 'axios';
import { API_URL } from '@env';
import { apiClient } from '@/api/login/loginApi';

const categoryMap: { [key: string]: string } = {
    '10대': 'TEENS',
    '20대': 'TWENTIES',
    '30대 이상': 'THIRTIES_AND_ABOVE',
    학부모: 'PARENTS',
};

const convertCategory = (category: string): string => {
    return categoryMap[category] || category;
};

export const sendNewPostApi = async (postInfo: any): Promise<void> => {
    try {
        const transformedPostInfo = {
            ...postInfo,
            category: convertCategory(postInfo.category),
        };
        await apiClient.post(`${API_URL}/api/v1/posts`, transformedPostInfo);
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError;
            throw new Error(
                'Error while sending authentication request: ' +
                    axiosError.response?.data,
            );
        } else {
            throw new Error(
                'Unknown error occurred while sending authentication request.',
            );
        }
    }
};
