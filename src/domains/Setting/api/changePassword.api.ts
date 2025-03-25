import { apiClient } from '@/api/login/loginApi';

type ChangePasswordRequest = {
    prevPassword: string;
    password: {
        password: string;
        passwordConfirm: string;
    };
};
export function changePassword(changePasswordRequest: ChangePasswordRequest) {
    return apiClient.put('/user/password', changePasswordRequest);
}
