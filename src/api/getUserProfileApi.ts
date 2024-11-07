import AsyncStorage from '@react-native-async-storage/async-storage'
import { apiClient } from './login/loginApi'

interface UserProfile {
  accessToken: string;
  userId: string;
  nickname: string;
  email: string;
  profileImageUrl: string;
}


export const getUserProfileApi = async () => {
  try {
    const token = await AsyncStorage.getItem('accessToken')

    const response = await apiClient.get<UserProfile>(`/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      timeout: 5000, // 5초 타임아웃 설정
    });

    if (response.status === 200) {
      console.log('유저 상세 프로필 불러오기 성공')

      return response.data

    } else {
      console.log('응답 실패, 상태 코드:', response.status)
    }
  } catch (error) {
    console.error('Error fetching user profile detail:', error)
    throw error
  }
};
