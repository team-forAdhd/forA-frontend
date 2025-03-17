import { apiClient } from '../login/loginApi'
import { API_URL } from '@env';
import userStore from '@/store/userStore/userStore';

export const getReport = async () => {
    try {
        const response = await apiClient.get(`${API_URL}/api/v1/posts/report`);
        return response.data;
    } catch (error) {
        console.error('Error fetching reported posts:', error);
        throw error;
    }
}

export const getHandleReport = async (email, postId, handleReportType) => {
    try {
        const url = `${API_URL}/api/v1/posts/handleReport?email=${email}&postId=${postId}&handleReportType=${handleReportType}`
        console.log("API 요청 URL:", url)
        const response = await apiClient.get(`${API_URL}/api/v1/posts/handleReport`, {
            params: {
                email,
                postId,
                handleReportType
            },
            headers: {
                'Authorization': `Bearer ${userStore.accessToken}`,
            }
        })
        return response.data
    } catch (error) {
        console.error('Error handling report:', error)
        throw error
    }
}
