import axios from 'axios';
import { API_URL } from '@env';
import userStore from '@/store/userStore/userStore';
import { apiClient } from '@/api/login/loginApi';

export const getScrapCount = async (postId: number) => {
    const response = await axios.get(`/api/posts/${postId}/scrapCount`);
    return response.data.scrapCount;
};

export const handleScrapApi = async (
    postId: number,
    userId: string,
    currentScrapped: number,
) => {
    const response = await apiClient.post(
        `${API_URL}/api/v1/posts/${postId}/scrap`,
        {
            scrapped: !currentScrapped,
            userId,
        },
    );
    return response.data.scrapCount;
};
