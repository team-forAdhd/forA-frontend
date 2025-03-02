import { apiClient } from '@/api/login/loginApi';
import { useAuthStore } from '@/store/authStore';
import { UserInfo } from '@/types/auth';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect } from 'react';

export default function AuthWrapper<T extends object>(
    WrappedComponent: React.ComponentType<T>,
) {
    return function AuthGuard(props: T) {
        const { data } = useQuery<UserInfo>({
            queryKey: ['user'],
            queryFn: async () => {
                const { data } = await apiClient.get('/user');
                return data;
            },
        });

        const updateUser = useAuthStore((state) => state.updateUser);

        useEffect(() => {
            if (data) updateUser(data);
        }, [data]);

        return <WrappedComponent {...props} />;
    };
}
