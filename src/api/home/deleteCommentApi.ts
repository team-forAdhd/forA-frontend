import axios from 'axios';

export async function deleteCommentApi(commentId: number): Promise<void> {
    try {
        await axios.delete(`/api/comments/${commentId}`)
    } catch (error) {
        throw new Error('Failed to delete comment')
    }
}
