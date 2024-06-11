import axios, { AxiosError, AxiosResponse } from 'axios';

interface Post {
  postId: string;
  title: string;
  views: number;
  category: string;
}

export const getPostsApi = async (): Promise<Post[]> => {
  try {
    const apiUrl = 'api url';

    const response: AxiosResponse<Post[]> = await axios.get(apiUrl);

    return response.data; // 받아온 데이터를 반환합니다.
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      throw new Error('Error while fetching PostList: ' + axiosError.message);
    } else {
      throw new Error('Error while fetching PostList');
    }
  }
};
