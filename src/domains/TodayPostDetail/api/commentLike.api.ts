import { apiClient } from '@/api/login/loginApi';
import { CommentResponse } from '@/domains/TodayPostDetail/api/comment.api';
import { Comment, Post } from '@/domains/TodayPostDetail/types/today.types';
import {
    InfiniteData,
    useMutation,
    useQueryClient,
} from '@tanstack/react-query';
import { propagateMaybeChanged } from 'mobx/dist/internal';
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
            await queryClient.cancelQueries({
                queryKey: ['todayComment', comment.postId],
            });
            const previousPost = queryClient.getQueryData<
                InfiniteData<CommentResponse, number>
            >(['todayComment', comment.postId]);
            console.log(previousPost);
            if (previousPost) {
                queryClient.setQueryData(['todayComment', comment.postId], {
                    ...previousPost,
                    pages: previousPost.pages.map((page) => ({
                        ...page,
                        commentList: page.commentList.map((c) => {
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
                    })),
                });
            }
            return { previousPost };
        },
        onError: (err, comment, context) => {
            Alert.alert(
                '좋아요 도중 오류가 발생했습니다.',
                '잠시 후 다시 시도해주세요',
            );
            if (context?.previousPost) {
                queryClient.setQueryData(
                    ['todayPostDetail', comment.postId],
                    context.previousPost,
                );
            }
        },
    });
}
