import { apiClient } from '@/api/login/loginApi';
import { API_URL } from '@env';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Alert } from 'react-native';

type PostCommentRequest = {
    postId: number;
    content: string;
    anonymous: boolean;
    parentCommentId?: number;
};

export function sendCommentApi(commentData: PostCommentRequest) {
    return apiClient.post(`${API_URL}/api/v1/comments`, commentData);
}

export function useCommentMutation(postId: number) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: sendCommentApi,
        onSuccess: async () => {
            Alert.alert('댓글이 등록되었습니다.');
            await queryClient.invalidateQueries({
                queryKey: ['todayPostDetail', postId],
            });
        },
        onError: () => {
            Alert.alert(
                '댓글 등록 중 오류가 발생했습니다.',
                '다시 시도해주세요.',
            );
        },
    });
}
