import axios, { AxiosError } from 'axios'
import { API_URL } from '@env'
import AsyncStorage from '@react-native-async-storage/async-storage'

const categoryMap: { [key: string]: string } = {
    '10대': 'TEENS',
    '20대': 'TWENTIES',
    '30대 이상': 'THIRTIES_AND_ABOVE',
    학부모: 'PARENTS',
}

const convertCategory = (category: string): string => {
    return categoryMap[category] || category
}

export const sendNewPostApi = async (postInfo: any): Promise<void> => {
    try {
        const transformedPostInfo = {
            ...postInfo,
            category: convertCategory(postInfo.category),
        }
        console.log(`${API_URL}/api/v1/posts`)
        const token = await AsyncStorage.getItem('accessToken')
        await axios.post(`${API_URL}/api/v1/posts`, transformedPostInfo, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError
            throw new Error(
                'Error while sending authentication request: ' +
                    axiosError.message,
            )
        } else {
            throw new Error(
                'Unknown error occurred while sending authentication request.',
            )
        }
    }
}
