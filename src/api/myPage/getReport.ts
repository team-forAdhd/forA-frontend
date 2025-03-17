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

export const postHandleReport = async (email, postId, handleReportType) => {
    try {
        const payload = {
            email: email,
            postId: postId,
            handleReportType: handleReportType
        };
        console.log("API 요청 데이터:", JSON.stringify(payload, null, 2));
        const response = await apiClient.post(`${API_URL}/api/v1/posts/handleReport`,
            payload,
            // {
            //     email: email,
            //     postId: postId,
            //     handleReportType: handleReportType
            // }, 
            {
                headers: {
                    'Authorization': `Bearer ${userStore.accessToken}`,
                    'Content-Type': 'application/json'
                }
            }
        );
        console.log("성공 응답:", response.data);
        return response.data
    } catch (error) {
        console.error('Error handling report:', error.response?.data || error);
        throw error
    }
}
