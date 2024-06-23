import axios from 'axios';

export async function deletePostApi(postId: number): Promise<void> {
    try {
        await axios.delete(`/api/posts/${postId}`)
    } catch (error) {
        throw new Error('Failed to delete post')
    }
}
