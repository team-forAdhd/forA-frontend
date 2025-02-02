import AsyncStorage from '@react-native-async-storage/async-storage'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface AuthStore extends User {
    accessToken: string
    login: (accessToken: string) => void
    logout: () => void
    updateUser: ({ nickname, profileImageUrl, userId }: User) => void
}
export const useAuthStore = create<AuthStore>()(
    persist(
        (set) => ({
            accessToken: '',
            nickname: '',
            profileImageUrl: '',
            userId: '',
            login: (accessToken) => set({ accessToken: accessToken }),
            logout: () =>
                set({
                    accessToken: '',
                    nickname: '',
                    profileImageUrl: '',
                    userId: '',
                }),
            updateUser: ({ nickname, profileImageUrl, userId }) =>
                set({ nickname, profileImageUrl, userId }),
        }),
        {
            name: 'user-sotrage',
            storage: createJSONStorage(() => AsyncStorage),
        },
    ),
)
