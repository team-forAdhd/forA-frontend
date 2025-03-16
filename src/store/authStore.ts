import { UserInfo } from '@/types/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface AuthStore extends UserInfo {
    accessToken: string;
    refreshToken: string;
    login: (accessToken: string, refreshToken: string) => void;
    logout: () => void;
    updateUser: (userInfo: UserInfo) => void;
    reIssue: (accessToken: string, refreshToken: string) => void;
}
export const useAuthStore = create<AuthStore>()(
    persist(
        (set) => ({
            refreshToken: '',
            accessToken: '',
            email: '',
            profileImage: '',
            nickname: '',
            forAdhdType: '',
            login: (accessToken, refreshToken) => {
                set({ accessToken: accessToken, refreshToken: refreshToken }),
                console.log('Access Token:', accessToken)
                console.log('Refresh Token:', refreshToken)
            },
            logout: () =>
                set({
                    accessToken: '',
                    nickname: '',
                    email: '',
                    profileImage: '',
                    forAdhdType: '',
                    refreshToken: '',
                }),
            updateUser: ({ email, forAdhdType, nickname, profileImage }) =>
                set({
                    email,
                    forAdhdType,
                    nickname,
                    profileImage,
                }),
            reIssue: (accessToken, refreshToken) => {
                set({ accessToken, refreshToken });
            },
        }),
        {
            name: 'user-sotrage',
            storage: createJSONStorage(() => AsyncStorage),
        },
    ),
);
