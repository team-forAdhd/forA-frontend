import axios, { AxiosError } from 'axios';

export const updatePostApi = async (postInfo: any): Promise<void> => {
  try {
    const apiUrl = 'api address';
    await axios.put(apiUrl);
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      throw new Error('Error while sending authentication request: ' + axiosError.message);
    } else {
      throw new Error('Unknown error occurred while sending authentication request.');
    }
  }
}