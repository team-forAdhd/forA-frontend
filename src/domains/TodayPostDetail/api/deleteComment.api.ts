import { apiClient } from '@/api/login/loginApi';
import { Comment } from '@/domains/TodayPostDetail/types/todayPostDetail.types';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Alert } from 'react-native';

export function deleteComment(comment: Comment) {
    return apiClient.delete(`/comments/${comment.id}`);
}

export function useDeleteCommentMutation() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteComment,
        onSuccess: (_, comment) => {
            queryClient.invalidateQueries({
                queryKey: ['todayPostDetail', comment.postId],
            });
            Alert.alert('댓글 삭제 완료', '댓글이 삭제되었습니다.', [
                { text: '확인' },
            ]);
        },
        onError: () => {
            Alert.alert('댓글 삭제 오류', '댓글 삭제 중 오류가 발생했습니다.');
        },
    });
}
