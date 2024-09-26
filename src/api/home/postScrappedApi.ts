import axios from 'axios'

export const getScrapCount = async (postId: number) => {
  const response = await axios.get(`/api/posts/${postId}/scrapCount`)
  return response.data.scrapCount;
}

export const toggleScrap = async (postId: number, userId: number, currentScrapped: boolean) => {
  const response = await axios.post(`/api/posts/${postId}/toggleScrap`, { scrapped: !currentScrapped, userId })
  return response.data.scrapCount
}
