import axios, { AxiosError, AxiosResponse } from 'axios'

interface PostDetail {
  postId: number
  category: string
  images: string[]
  authorProfile: string
  authorNickname: string
  isAnonymous: boolean
  createdAt: string
  title: string
  content: string
}

export const getPostDetail = async (postId: number): Promise<PostDetail> => {
  try {
    const apiUrl = `api url/${postId}`

    const response: AxiosResponse<PostDetail> = await axios.get(apiUrl)

    return response.data
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      throw new Error('Error while fetching PostDetail: ' + axiosError.message)
    } else {
      throw new Error('Error while fetching PostDetail')
    }
  }
};
