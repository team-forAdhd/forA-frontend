import { apiClient } from '../login/loginApi'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const postBlockUser = async (
    blockedUserId: string,
    isBlocked: boolean,
) => {
    try {
        const token = await AsyncStorage.getItem('accessToken')
        const response = await apiClient.post(
            '/user/block',
            {
                blockedUserId: blockedUserId,
                isBlocked: isBlocked,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        )
        console.log('차단 상태:', response.data)
    } catch (error) {
        console.error('Error blocking user:', error)
        throw error
    }
}
