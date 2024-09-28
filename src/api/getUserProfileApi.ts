import axios, { AxiosError } from 'axios';
import { API_URL } from '@env';

interface UserProfile {
  accessToken: string;
  userId: string;
  nickname: string;
  email: string;
  profileImageUrl: string;
}

export const getUserProfileApi = async (accessToken: string): Promise<UserProfile> => {
  try {
    const response = await axios.get<UserProfile>(`${API_URL}/api/v1/user/profile/detail`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      timeout: 5000, // 5초 타임아웃 설정
    });

    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      throw new Error('Error while fetching user profile: ' + axiosError.message);
    } else {
      throw new Error('Unknown error occurred while fetching user profile.');
    }
  }
};
