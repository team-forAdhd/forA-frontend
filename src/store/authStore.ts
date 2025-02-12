import AsyncStorage from '@react-native-async-storage/async-storage'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface AuthStore extends User {
    accessToken: string
    refreshToken: string
    login: (accessToken: string, refreshToken: string) => void
    logout: () => void
    updateUser: ({ nickname, profileImageUrl, userId }: User) => void
    reIssue: (accessToken: string, refreshToken: string) => void
}
export const useAuthStore = create<AuthStore>()(
    persist(
        (set) => ({
            refreshToken: '',
            accessToken: '',
            nickname: '',
            profileImageUrl: '',
            userId: '',
            login: (accessToken, refreshToken) =>
                set({ accessToken: accessToken, refreshToken: refreshToken }),
            logout: () =>
                set({
                    accessToken: '',
                    nickname: '',
                    profileImageUrl: '',
                    userId: '',
                }),
            updateUser: ({ nickname, profileImageUrl, userId }) =>
                set({ nickname, profileImageUrl, userId }),
            reIssue: (accessToken, refreshToken) => {
                set({ accessToken, refreshToken })
            },
        }),
        {
            name: 'user-sotrage',
            storage: createJSONStorage(() => AsyncStorage),
        },
    ),
)
