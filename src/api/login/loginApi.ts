import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { useAuthStore } from '@/store/authStore';
import { Alert } from 'react-native';

declare module 'axios' {
    interface AxiosRequestConfig {
        _retry?: boolean;
    }
}
const API_BASE_URL = 'https://foradhd.site/api/v1';
export const apiClient = axios.create({
    baseURL: API_BASE_URL,
    timeout: 5000,
});

// 요청 Interceptor: 매 요청에 토큰 추가
apiClient.interceptors.request.use((config: AxiosRequestConfig) => {
    const accessToken = useAuthStore.getState().accessToken;
    config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
});

//응답 Interceptor: 401 에러시 토큰 reissue
apiClient.interceptors.response.use(
    (response: AxiosResponse) => {
        const { method, url } = response.config;
        const { status } = response;

        return response;
    },
    async (error: AxiosError | Error) => {
        if (axios.isAxiosError(error)) {
            const originalRequest = error.config;

            if (!originalRequest) {
                return Promise.reject(error);
            }

            if (!error.response) {
                return Promise.reject(error);
            }

            if (error.response.status === 401) {
                if (!originalRequest._retry) {
                    try {
                        originalRequest._retry = true;
                        const { accessToken, refreshToken } =
                            await tokenReissue();
                        useAuthStore
                            .getState()
                            .reIssue(accessToken, refreshToken);
                        originalRequest.headers['Authorization'] =
                            `Bearer ${accessToken}`;
                        return apiClient(originalRequest);
                    } catch (err) {
                        if (axios.isAxiosError(err)) {
                            console.log('reissue error', err.response?.data);
                        }
                        useAuthStore.getState().logout();
                        Alert.alert(
                            '로그아웃 되었습니다. 다시 로그인 해주세요.',
                        );
                        return Promise.reject(err);
                    }
                }
            }

            return Promise.reject(error);
        }

        return Promise.reject(error);
    },
);

const loginInstance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 3500,
});
// 로그인 함수
export const login = async (email: string, password: string) => {
    try {
        const response = await loginInstance.post('/auth/login', {
            username: email,
            password: password,
        });
        const { accessToken, refreshToken } = response.data;
        return { accessToken, refreshToken };
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response?.status === 401) {
                throw new Error('아이디와 비밀번호가 일치하지 않습니다.');
            } else throw new Error('서버와의 오류가 발생했습니다.');
        }
        throw new Error('서버와의 오류가 발생했습니다.');
    }
};

export const tokenReissue = async (): Promise<{
    accessToken: string;
    refreshToken: string;
}> => {
    const { accessToken, refreshToken } = useAuthStore.getState();
    const { data } = await axios.put(`${API_BASE_URL}/auth/reissue`, {
        accessToken,
        refreshToken,
    });
    console.log('reissue', accessToken, refreshToken);
    return data;
};
