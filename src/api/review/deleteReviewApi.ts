import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';


export async function deleteReviewApi(hospitalReceiptReviewId: string): Promise<void> {
    const API_URL = 'https://428d5c97-d536-4b2c-9520-a1f46ef5a2b0.mock.pstmn.io'

    try {
        const token = await AsyncStorage.getItem('accessToken')
        const response = await axios.delete(
            `${API_URL}/api/v1/hospitals/receipt-reviews/${hospitalReceiptReviewId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            },
        )

        if (response.status === 204) {
            console.log(`Delete Success: ${hospitalReceiptReviewId}`)
        } else {
            console.log('Fail to delete review: ', response.status)
        }

    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Axios Error:', error.message);
        } else {
            console.error('Unknown Error:', error);
        }
        throw error
    }
}
