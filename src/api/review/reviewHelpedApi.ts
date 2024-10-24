import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { apiClient } from '../login/loginApi'


export async function reviewHelpedApi(hospitalReceiptReviewId: string): Promise<void> {
    try {
        const token = await AsyncStorage.getItem('accessToken')
        const response = await apiClient.post(`/hospitals/receipt-reviews/${hospitalReceiptReviewId}/help?help=true`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )

        if (response.status === 200) {
            console.log('리뷰 도움돼요 성공: ', hospitalReceiptReviewId)
        } else {
            console.log('응답 실패, 상태 코드:', response.status)
        }

    } catch (error) {
        console.log('Error pressing bookmark: ', error)
        throw error
    }
}
