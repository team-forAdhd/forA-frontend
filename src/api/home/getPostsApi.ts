import axios, { AxiosError, AxiosResponse } from 'axios'
import { API_URL } from '@env'
import userStore from '@/store/userStore/userStore'
import { formatDateForPostList } from '@/common/formatDate'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { apiClient } from '../login/loginApi'

const categoryMap: { [key: string]: string } = {
    TEENS: '10대',
    TWENTIES: '20대',
    PARENTS: '학부모',
    THIRTIES_AND_ABOVE: '30대↑',
}
const convertCategory = (category: string): string => {
    return categoryMap[category] || category
}
const formatCreatedAt = (createdAt: number): string => {
    const currentDate = new Date()
    const createdAtDate = new Date(createdAt * 1000)
    const diffInMilliseconds = currentDate.getTime() - createdAtDate.getTime()
    const diffInHours = Math.floor(diffInMilliseconds / (1000 * 60 * 60))

    if (diffInHours < 24) {
        // 1일 이내인 경우 "n시간 전"으로 표기
        return `${diffInHours}시간 전`
    } else {
        // 1일 이상 지난 경우 월/일 형식으로 표기
        return formatDateForPostList(createdAtDate)
    }
}

export interface Post {
    id: number
    userId: string | null
    title: string
    category: string
    viewCount: number
    likeCount: number
    createdAt: number
    formattedCreatedAt: string
    images: string[] | null
}

interface ApiResponse {
    category: string | null
    paging: {
        page: number
        size: number
        totalPages: number
        numberOfElements: number
        totalElements: number
        isFirst: boolean
        isLast: boolean
        isEmpty: boolean
    }
    postList: Post[]
}

export const getMainRealtimeApi = async () => {
    try {
        const token = await AsyncStorage.getItem('accessToken')
        const response = await apiClient.get(`/posts/main/top`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        if (response.status === 200) {
            console.log('홈 랭킹별 게시글 불러오기 성공')
            const transformedData = response.data.postList.map((post: any) => ({
                ...post,
                category: convertCategory(post.category),
                formattedCreatedAt: formatCreatedAt(post.createdAt),
            }))

            return transformedData
        } else {
            console.log('응답 실패, 상태 코드:', response.status)
        }
    } catch (error) {
        console.error('Error fetching 실시간 게시글:', error)
        throw error
    }
}
/*
    const response: AxiosResponse<ApiResponse> = await axios.get(`${API_URL}/api/v1/posts/main/top`, {
      headers: {
        'Authorization': `Bearer ${userStore.accessToken}`,
      }
    });

    const transformedData = response.data.postList.map((post) => ({
      ...post,
      category: convertCategory(post.category),
      formattedCreatedAt: formatCreatedAt(post.createdAt),
    }));

    return transformedData;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      throw new Error('Error while fetching PostList: ' + axiosError.message);
    } else {
      throw new Error('Error while fetching PostList');
    }
    */

export const getMainCategoryApi = async (category: string) => {
    try {
        const token = await AsyncStorage.getItem('accessToken')
        const response = await apiClient.get(
            `/posts/main/top/category?category=${category}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        )
        if (response.status === 200) {
            console.log('홈 카테고리별 게시글 불러오기 성공')

            const transformedData = response.data.postList.map((post: any) => ({
                ...post,
                category: convertCategory(post.category),
                formattedCreatedAt: formatCreatedAt(post.createdAt),
            }))

            return transformedData
        } else {
            console.log('응답 실패, 상태 코드:', response.status)
        }
    } catch (error) {
        console.error('Error fetching 카테고리별 게시글:', error)
        throw error
    }
}

/*
  try {
    const response: AxiosResponse<ApiResponse> = await axios.get(`${API_URL}/api/v1/posts/main/top/category?category=${category}`, {
      headers: {
        'Authorization': `Bearer ${userStore.accessToken}`,
      }
    });

    const transformedData = response.data.postList.map((post) => ({
      ...post,
      category: convertCategory(post.category),
      formattedCreatedAt: formatCreatedAt(post.createdAt),
    }))

    return transformedData
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      console.error('Axios error:', axiosError.response?.data);
      throw new Error('Error while fetching PostList: ' + axiosError.message);
    } else {
      console.error('Unknown error:', error);
      throw new Error('Error while fetching PostList');
    }
  }
*/
