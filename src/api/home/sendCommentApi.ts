import { API_URL } from '@env';
import { apiClient } from '@/api/login/loginApi';

interface CommentData {
    postId: number;
    content: string;
    isAnonymous: boolean;
}

export const sendCommentApi = async (
    commentData: CommentData,
): Promise<void> => {
    await apiClient.post(`${API_URL}/api/v1/comments`, commentData);
};
