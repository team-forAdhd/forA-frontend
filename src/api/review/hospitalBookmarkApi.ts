import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { apiClient } from '../login/loginApi'


export async function hospitalBookmarkApi(hospitalId: string): Promise<void> {
    try {
        const token = await AsyncStorage.getItem('accessToken')
        const response = await apiClient.post(`/hospitals/${hospitalId}/bookmark?bookmark=true`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )

        if (response.status === 200) {
            console.log(`병원 북마크 성공: ${hospitalId}`)
        } else {
            console.log('응답 실패, 상태 코드:', response.status)
        }

    } catch (error) {
        console.log('Error pressing bookmark: ', error)
        throw error
    }
}
