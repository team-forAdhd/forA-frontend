import axios, { AxiosError } from 'axios'
import { useEffect, useState } from 'react'
import { View } from 'react-native'

const SocialLogin: React.FC = () => {
    const [response, getResponse] = useState()
    const apiClient = axios.create({
        baseURL: 'https://428d5c97-d536-4b2c-9520-a1f46ef5a2b0.mock.pstmn.io',
        headers: {
            'Content-Type': 'application/json',
        },
    })

    const loginWithNaver = async (authToken: string) => {
        try {
            const response = await apiClient.post('/api/v1/auth/sns-login', {
                authToken: authToken,
                provider: 'NAVER',
            })

            console.log('로그인 성공:', response.data)
            getResponse(response.data)
        } catch (error) {
            const axiosError = error as AxiosError

            if (axiosError.response) {
                console.error('로그인 실패:', axiosError.response.data)
            } else if (axiosError.request) {
                console.error('응답 없음:', axiosError.request)
            } else {
                console.error('Error', axiosError.message)
            }

            // 추가적으로 에러를 핸들링하는 로직을 여기에 구현할 수 있습니다.
        }
        useEffect(() => {
            loginWithNaver('testAuthToken')
        }, [])
    }

    return <View>{response}</View>
}

export default SocialLogin
