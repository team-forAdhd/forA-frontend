import axios from 'axios';
import { API_URL } from '@env';
import { apiClient } from '@/api/login/loginApi';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Post } from '@/domains/TodayPostDetail/types/today.types';
import { Alert } from 'react-native';

export const getScrapCount = async (postId: number) => {
    const response = await axios.get(`/api/posts/${postId}/scrapCount`);
    return response.data.scrapCount;
};

export function todayPostScrap(postId: number) {
    return apiClient.post(`${API_URL}/api/v1/posts/${postId}/scrap`);
}

export function useTodayPostScrapMutation(postId: number) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: () => todayPostScrap(postId),
        onMutate: async () => {
            await queryClient.cancelQueries({
                queryKey: ['todayPostDetail', postId],
            });

            const previousPost = queryClient.getQueryData<Post>([
                'todayPostDetail',
                postId,
            ]);
            if (previousPost) {
                queryClient.setQueryData(['todayPostDetail', postId], {
                    ...previousPost,
                    isScrapped: !previousPost.isScrapped,
                    scrapCount: previousPost.isScrapped
                        ? previousPost.scrapCount - 1
                        : previousPost.scrapCount + 1,
                });
            }
            return { previousPost };
        },
        onError: (err, variables, context) => {
            Alert.alert(
                '스크랩 도중 오류가 발생했습니다.',
                '잠시 후 다시 시도해주세요',
            );
            if (context?.previousPost) {
                queryClient.setQueryData(
                    ['todayPostDetail', postId],
                    context.previousPost,
                );
            }
        },
    });
}
