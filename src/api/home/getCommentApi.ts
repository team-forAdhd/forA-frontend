import axios from 'axios';

export async function getCommentApi(postId: number): Promise<any[]> {
    try {
        const response = await axios.get(`/api/comments/${postId}`);
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch comments');
    }
}
