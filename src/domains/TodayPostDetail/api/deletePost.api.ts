import { apiClient } from '@/api/login/loginApi';
import { TodayStackParams } from '@/navigation/stacks/TodayStack';
import { StackScreenProps } from '@react-navigation/stack';
import { useMutation } from '@tanstack/react-query';
import { Alert } from 'react-native';

export function deletePostApi({ postId }: { postId: number }) {
    return apiClient.delete(`/posts/${postId}`);
}

export function useDeletePostMutation({
    navigation,
}: Pick<StackScreenProps<TodayStackParams, 'PostDetail'>, 'navigation'>) {
    return useMutation({
        mutationFn: deletePostApi,
        onSuccess: () => {
            Alert.alert('게시글 삭제 완료', '게시글이 삭제되었습니다.', [
                { text: '확인', onPress: () => navigation.goBack() },
            ]);
        },
        onError: () => {
            Alert.alert(
                '게시글 삭제 오류',
                '게시글 삭제 중 오류가 발생했습니다.',
            );
        },
    });
}
