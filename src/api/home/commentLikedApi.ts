import axios from 'axios'
import { API_URL } from '@env'
import userStore from '@/store/userStore/userStore'

export const getCommentLikedCount = async (commentId: number) => {
  const response = await axios.get(`${API_URL}/api/posts/comments/${commentId}/likedCount`)
  return response.data.likedCount
}

export const toggleCommentLike = async (commentId: number, postId: number, content: any, anonymous: boolean) => {
  const response = await axios.post(`${API_URL}/api/v1/comments/${commentId}/like`, {
    postId,
    content,
    anonymous
  }, {
    headers: {
      'Authorization': `Bearer ${userStore.accessToken}`,

    }
  });
  return response.data.likedCount;
};