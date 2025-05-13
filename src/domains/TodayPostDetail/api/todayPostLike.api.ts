import axios from 'axios';
import { API_URL } from '@env';
import { apiClient } from '@/api/login/loginApi';
import { Post } from '@/domains/TodayPostDetail/types/today.types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Alert } from 'react-native';

export const getPostLikedCount = async () => {
    //postId: number
    const response = await axios.get(`/api/posts//likedCount`);
    return response.data.likedCount;
};

export const todayPostLike = async (post: Post) => {
    return apiClient.post(`${API_URL}/api/v1/posts/${post.id}/like`, {
        writerId: post.userId,
        writerName: post.nickname,
        postId: post.id,
        content: post.content,
        anonymous: post.anonymous,
        likeCount: post.likeCount,
        createdAt: post.createdAt,
        lastModifiedAt: post.lastModifiedAt,
    });
};

export function usePostLikeMutation(post: Post) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (post: Post) => todayPostLike(post),
        onMutate: async (post) => {
            await queryClient.cancelQueries({
                queryKey: ['todayPostDetail', post.id],
            });
            const previousPost = queryClient.getQueryData<Post>([
                'todayPostDetail',
                post.id,
            ]);
            if (previousPost) {
                queryClient.setQueryData(['todayPostDetail', post.id], {
                    ...previousPost,
                    isLiked: !previousPost.isLiked,
                    likeCount: previousPost.isLiked
                        ? previousPost.likeCount - 1
                        : previousPost.likeCount + 1,
                });
            }
            return { previousPost };
        },
        onError: (err, variables, context) => {
            Alert.alert(
                '좋아요 도중 오류가 발생했습니다.',
                '잠시 후 다시 시도해주세요',
            );
            if (context?.previousPost) {
                queryClient.setQueryData(
                    ['todayPostDetail', context.previousPost.id],
                    context.previousPost,
                );
            }
        },
    });
}
