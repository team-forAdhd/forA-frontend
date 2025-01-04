import axios from 'axios'
import { API_URL } from '@env'

export const checkAuthApi = async (
    email: string,
    authCode: string,
): Promise<{ accessToken: string; refreshToken: string } | null> => {
    try {
        const response = await axios.post(`${API_URL}/api/v1/user/phone-auth`, {
            email,
            authCode,
        })
        const { accessToken, refreshToken } = response.data
        return { accessToken, refreshToken }
    } catch (error) {
        console.error('Error while checking auth code: ', error)
        return null
    }
}
