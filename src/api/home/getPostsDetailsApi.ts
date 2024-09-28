import axios, { AxiosError, AxiosResponse } from 'axios';
import { API_URL } from '@env';
import userStore from '@/store/userStore/userStore';

const categoryMap: { [key: string]: string } = {
  TEENS: '10대',
  TWENTIES: '20대',
  PARENTS: '학부모',
  THIRTIES_AND_ABOVE: '30대↑',
}
const convertCategory = (category: string): string => {
  return categoryMap[category] || category;
}

interface Comment {
  id: number;
  content: string;
  userId: string;
  postId: number;
  anonymous: boolean;
  likeCount: number;
  createdAt: number;
  lastModifiedAt: number;
  parentCommentId: number | null;
  children: Comment[];
  nickname: string;
  profileImage: string;
}

interface PostDetail {
  id: number;
  userId: string;
  title: string;
  content: string;
  anonymous: boolean;
  images: string[] | null;
  likeCount: number;
  commentCount: number;
  scrapCount: number;
  viewCount: number;
  category: string;
  comments: Comment[];
  nickname: string | null;
  profileImage: string | null;
  createdAt: number;
  lastModifiedAt: number;
}

export const getPostDetail = async (postId: number): Promise<PostDetail> => {
  try {
    const response: AxiosResponse<PostDetail> = await axios.get(`${API_URL}/api/v1/posts/${postId}`, {
      headers: {
        'Authorization': `Bearer ${userStore.accessToken}`
      },
    });

    const postDetail = response.data;
    postDetail.category = convertCategory(postDetail.category);

    return postDetail;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      throw new Error('Error while fetching PostDetail: ' + axiosError.message);
    } else {
      throw new Error('Error while fetching PostDetail');
    }
  }
};
