import { apiClient } from '@/api/login/loginApi';
import {
    Comment,
    Post,
} from '@/domains/TodayPostDetail/types/todayPostDetail.types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Alert } from 'react-native';

export const todayCommentLike = async (comment: Comment) => {
    return apiClient.post(
        `/comments/${comment.parentCommentId ?? comment.id}/like`,
    );
};

export function useCommentLikeMutation() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: todayCommentLike,
        onMutate: async (comment) => {
            console.log('qwrqwrqwr');
            await queryClient.cancelQueries({
                queryKey: ['todayPostDetail', comment.postId],
            });
            const previousPost = queryClient.getQueryData<Post>([
                'todayPostDetail',
                comment.postId,
            ]);
            if (previousPost) {
                queryClient.setQueryData(['todayPostDetail', comment.postId], {
                    ...previousPost,
                    comments: [
                        ...previousPost.comments.map((c) => {
                            if (c.id === comment.id) {
                                return {
                                    ...c,
                                    isLiked: !c.isLiked,
                                    likeCount: c.isLiked
                                        ? c.likeCount - 1
                                        : c.likeCount + 1,
                                };
                            } else if (c.children.length) {
                                return {
                                    ...c,
                                    children: c.children.map((cc) => {
                                        if (cc.id === comment.id) {
                                            return {
                                                ...cc,
                                                isLiked: !cc.isLiked,
                                                likeCount: cc.isLiked
                                                    ? cc.likeCount - 1
                                                    : cc.likeCount + 1,
                                            };
                                        }
                                        return cc;
                                    }),
                                };
                            }
                            return c;
                        }),
                    ],
                });
            }
            return { previousPost };
        },
        onError: (err, comment, context) => {
            Alert.alert(
                '좋아요 도중 오류가 발생했습니다.',
                '잠시 후 다시 시도해주세요',
            );
            console.log(err);
            if (context?.previousPost) {
                queryClient.setQueryData(
                    ['todayPostDetail', comment.postId],
                    context.previousPost,
                );
            }
        },
    });
}
