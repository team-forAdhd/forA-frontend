import { apiClient } from '@/api/login/loginApi';

export function withdrawAccount() {
    return apiClient.delete('/user/withdraw');
}
