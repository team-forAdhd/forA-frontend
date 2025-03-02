import { apiClient } from '@/api/login/loginApi';
import { useQuery } from '@tanstack/react-query';

export function refreshUser() {
    return apiClient.get(`/user`);
}

export function usehUser() {
    return useQuery({ queryKey: ['user'], queryFn: refreshUser });
}
