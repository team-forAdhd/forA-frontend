import axios, { AxiosError, AxiosResponse } from 'axios'
import { API_URL } from '@env'
import AsyncStorage from '@react-native-async-storage/async-storage'
interface Comment {
    id: number
    content: string
    userId: string
    postId: number
    anonymous: boolean
    likeCount: number
    createdAt: number
    lastModifiedAt: number
    parentCommentId: number | null
    children: Comment[]
    nickname: string
    profileImage: string
}

interface CommentResponse {
    commentList: Comment[]
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
}

export const getCommentsApi = async (
    postId: number,
    sortOption: string = 'NEWEST_FIRST',
): Promise<CommentResponse> => {
    try {
        const token = await AsyncStorage.getItem('accessToken')
        const apiUrl = `${API_URL}/api/v1/comments/posts/${postId}?sortOption=${sortOption}`

        const response: AxiosResponse<CommentResponse> = await axios.get(
            apiUrl,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        )

        return response.data
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError
            throw new Error(
                'Error while fetching comments: ' + axiosError.message,
            )
        } else {
            throw new Error('Error while fetching comments')
        }
    }
}
