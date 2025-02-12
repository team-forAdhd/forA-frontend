import axios, { AxiosError } from 'axios';
import { API_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ApiResponse {
    accessToken: string;
    refreshToken: string;
    hasVerifiedEmail: boolean;
}

export const loginApi = async (
    username: string,
    password: string,
): Promise<ApiResponse> => {
    try {
        const response = await axios.post<ApiResponse>(
            `${API_URL}/api/v1/auth/login`,
            {
                username,
                password,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
                timeout: 5000, // 5초 타임아웃
            },
        );
        await AsyncStorage.setItem('accessToken', response.data.accessToken);
        return response.data;
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError;
            throw new Error('Error while logging in: ' + axiosError.message);
        } else {
            throw new Error('Unknown error occurred while logging in.');
        }
    }
};
