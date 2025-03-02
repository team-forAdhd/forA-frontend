import { API_URL } from '@env';
import { apiClient } from '@/api/login/loginApi';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { StackScreenProps } from '@react-navigation/stack';
import { TodayStackParams } from '@/navigation/stacks/TodayStack';
import { Alert } from 'react-native';
import { TodayNewPostOrEdit } from '@/types/Today/TodayNewPost';

const categoryMap: { [key: string]: string } = {
    '10대': 'TEENS',
    '20대': 'TWENTIES',
    '30대 이상': 'THIRTIES_AND_ABOVE',
    학부모: 'PARENTS',
};

export function updateTodayPost({
    postInfo,
    postId,
}: {
    postInfo: TodayNewPostOrEdit;
    postId: number;
}) {
    const request = {
        ...postInfo,
        category: categoryMap[postInfo.category],
    } as TodayNewPostOrEdit;
    console.log(request);
    return apiClient.put(`${API_URL}/api/v1/posts/${postId}`, request);
}

export function useUpdatePostMutation(
    postId: number,
    {
        navigation,
    }: Pick<StackScreenProps<TodayStackParams, 'EditPost'>, 'navigation'>,
) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateTodayPost,
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['todayPostDetail', postId],
            });
            Alert.alert('게시물 수정', '게시물이 수정되었습니다.');
            navigation.pop();
        },
        onError: (err) => {
            Alert.alert(
                '게시물 수정 오류',
                '게시물 수정 중 오류가 발생했습니다.',
            );
        },
    });
}
