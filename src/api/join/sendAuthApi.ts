import axios, { AxiosError } from 'axios'
import { API_URL } from '@env'

export const sendAuthApi = async (email: string): Promise<void> => {
    try {
        await axios.post(`${API_URL}/api/v1/user/email-auth`, { email })
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
