import axios from 'axios';
import { API_URL } from '@env';
import { apiClient } from '@/api/login/loginApi';

export const getPostLikedCount = async () => {
    //postId: number
    const response = await axios.get(`/api/posts//likedCount`);
    return response.data.likedCount;
};

export const sendPostLike = async (
    postId: number,
    writerId: number,
    writerName: string,
    content: string,
    anonymous: boolean,
    likeCount: number,
    createdAt: string,
    lastModifiedAt: string,
) => {
    const response = await apiClient.post(
        `${API_URL}/api/v1/posts/${postId}/like`,
        {
            writerId,
            writerName,
            postId,
            content,
            anonymous,
            likeCount,
            createdAt,
            lastModifiedAt,
        },
    );
    return response.data.likedCount;
};
