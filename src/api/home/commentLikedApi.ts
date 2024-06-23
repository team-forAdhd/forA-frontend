import axios from 'axios'

export const getCommentLikedCount = async (commentId: number) => {
  const response = await axios.get(`/api/posts/comments/${commentId}/likedCount`)
  return response.data.likedCount
}

export const toggleCommentLike = async (commentId: number, currentLiked: boolean) => {
  const response = await axios.post(`/api/posts/comments/${commentId}/toggleLike`, { liked: !currentLiked })
  return response.data.likedCount
}

// TODO api 논의 필요. postId와 commentId 둘 다 필요할 듯
// /api/posts/${postId}/comments/${commentId}/likedCount