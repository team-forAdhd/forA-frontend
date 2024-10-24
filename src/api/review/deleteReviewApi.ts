import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { apiClient } from '../login/loginApi'


export async function deleteReviewApi(hospitalReceiptReviewId: string): Promise<void> {
    try {
        const token = await AsyncStorage.getItem('accessToken')
        const response = await apiClient.delete(`/hospitals/receipt-reviews/${hospitalReceiptReviewId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )

        if (response.status === 204) {
            console.log(`리뷰 삭제 성공: ${hospitalReceiptReviewId}`)
        } else {
            console.log('응답 실패, 상태 코드:', response.status)
        }

    } catch (error) {
        console.log('Error deleting review: ', error)
        throw error
    }
}
