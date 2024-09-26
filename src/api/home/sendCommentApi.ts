import axios from 'axios'

interface CommentData {
    postId: number
    content: string
    isAnonymous: boolean
    reply: number | null
}

export const sendCommentApi = async (postData: CommentData): Promise<void> => {
    try {
        const apiUrl = 'api url';
        const response = await axios.post(apiUrl, postData);
    } catch (error) {
        console.error('댓글 전송 실패:', error);
    }
}
