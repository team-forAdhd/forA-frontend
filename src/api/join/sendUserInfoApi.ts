import axios, { AxiosError } from 'axios'
import { API_URL } from '@env'

type SignupResponse = {
    accessToken: string
    refreshToken: string
    hasVerifiedEmail: boolean
}
export const sendUserInfoApi = async (
    userInfo: any,
): Promise<SignupResponse> => {
    const response = await axios.post(
        `${API_URL}/api/v1/user/sign-up`,
        userInfo,
        { timeout: 3000 },
    )
    return response.data
}
