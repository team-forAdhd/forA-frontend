import axios from 'axios'

export const getPostLikedCount = async (postId: number) => {
  const response = await axios.get(`/api/posts/${postId}/likedCount`)
  return response.data.likedCount
}

export const togglePostLike = async (postId: number, currentLiked: boolean) => {
  const response = await axios.post(`/api/posts/${postId}/toggleLike`, { liked: !currentLiked })
  return response.data.likedCount
}
