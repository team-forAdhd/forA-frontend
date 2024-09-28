import axios from 'axios'
import { API_URL } from '@env'
import userStore from '@/store/userStore/userStore'

interface CommentData {
    postId: number
    content: string
    isAnonymous: boolean
}

export const sendCommentApi = async (commentData: CommentData): Promise<void> => {
    try {
        await axios.post(`${API_URL}/api/v1/comments`, commentData, {
            headers: {
                'Authorization': `Bearer ${userStore.accessToken}`,
            }
        })
    } catch (error) {
        console.error('댓글 전송 실패:', error);
    }
}
