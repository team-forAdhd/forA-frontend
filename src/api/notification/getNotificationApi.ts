import { apiClient } from '../login/loginApi';
import { API_URL } from '@env';
import { useAuthStore } from '@/store/authStore';
import axios from 'axios';

interface UserProfile {
    nickname: string;
    profileImageUrl: string;
}

export interface NotificationItem {
    id: number;
    content: string;
    notificationType: string;
    createdAt: string;
    userProfile: UserProfile;
    read: boolean;
}

export const getNotification = async (): Promise<NotificationItem[]> => {
    const token = useAuthStore.getState().accessToken;
    try {
        const response = await axios.get<NotificationItem[]>(
            `${API_URL}/api/v1/notifications/all`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const markNotificationAsRead = async (
    notificationId: number,
): Promise<void> => {
    const token = useAuthStore.getState().accessToken;
    try {
        await axios.post(
            `${API_URL}/api/v1/notifications/mark-as-read/${notificationId}`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );
    } catch (error) {
        throw error;
    }
};
