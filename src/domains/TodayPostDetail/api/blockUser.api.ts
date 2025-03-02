import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { apiClient } from '../../../api/login/loginApi';
import { StackScreenProps } from '@react-navigation/stack';
import { TodayStackParams } from '@/navigation/stacks/TodayStack';
import { AxiosResponse } from 'axios';

type BlockUserRequest = {
    blockedUserId: string;
};
export function postBlockUser({ blockedUserId }: BlockUserRequest) {
    return apiClient.post('/user/block', {
        blockedUserId: blockedUserId,
        isBlocked: true,
    });
}

export function useBlockUserMutation({
    navigation,
    options,
}: Pick<StackScreenProps<TodayStackParams, 'PostDetail'>, 'navigation'> & {
    options: UseMutationOptions<AxiosResponse<any>, unknown, BlockUserRequest>;
}) {
    return useMutation({ mutationFn: postBlockUser, ...options });
}
