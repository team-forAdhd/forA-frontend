import axios, { AxiosError } from 'axios';
import { API_URL } from '@env';

export const updatePostApi = async (postInfo: any, postId: number): Promise<void> => {
  try {
    await axios.put(`${API_URL}/api/v1/posts/${postId}`, postInfo);
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      throw new Error('Error while sending authentication request: ' + axiosError.message);
    } else {
      throw new Error('Unknown error occurred while sending authentication request.');
    }
  }
}