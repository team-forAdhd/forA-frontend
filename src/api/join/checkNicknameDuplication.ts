import { apiClient } from '@/api/login/loginApi';

type NicknameDuplicationCheckResponse = {
    isValidNickname: boolean;
};
export async function checkNicknameDuplication(
    nickname: string,
): Promise<NicknameDuplicationCheckResponse> {
    try {
        const { data } = await apiClient.get(
            `https://foradhd.site/api/v1/user/nickname-check?nickname=${nickname}`,
        );
        return data;
    } catch {
        return {
            isValidNickname: false,
        };
    }
}
