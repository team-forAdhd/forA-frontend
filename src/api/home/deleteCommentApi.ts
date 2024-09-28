import axios from 'axios';
import { API_URL } from '@env';
import userStore from '@/store/userStore/userStore';

export async function deleteCommentApi(commentId: number): Promise<void> {
    try {
        await axios.delete(`${API_URL}/api/v1/comments/${commentId}`, {
            headers: {
                'Authorization': `Bearer ${userStore.accessToken}`,
            }
        })
    } catch (error) {
        throw new Error('Failed to delete comment')
    }
}

export async function deleteReplyApi(commentId: number): Promise<void> {
    try {
        await axios.delete(`${API_URL}/api/v1/comments/${commentId}`, {
            headers: {
                'Authorization': `Bearer ${userStore.accessToken}`,
            }
        })
    } catch (error) {
        throw new Error('Failed to delete comment')
    }
}
