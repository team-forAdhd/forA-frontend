import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';


export async function reviewHelpedApi(hospitalReceiptReviewId: string): Promise<void> {
    const API_URL = 'https://428d5c97-d536-4b2c-9520-a1f46ef5a2b0.mock.pstmn.io'

    try {
        const token = await AsyncStorage.getItem('accessToken')
        const response = await axios.post(
            `${API_URL}/api/v1/hospitals/receipt-reviews/${hospitalReceiptReviewId}/help?help=true`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            },
        )

        if (response.status === 200) {
            console.log('Helped Success: ', hospitalReceiptReviewId)
        } else {
            console.log('Fail to click help: ', response.status)
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
