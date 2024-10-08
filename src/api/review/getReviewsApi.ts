import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';


interface Review {
    hospitalReceiptReviewId: string,
    writerId: string,
    writerName: string,
    writerImage: string,
    doctorName: string,
    createdAt: number,
    content: string,
    imageList: [],
    medicalExpense: number,
    helpCount: number,
    isHelped: boolean,
    isMine: boolean
}

export const getReviewsApi = async (doctorId: string, page: number, size: number, sort: string): Promise<Review[]> => {
    const API_URL = 'https://428d5c97-d536-4b2c-9520-a1f46ef5a2b0.mock.pstmn.io'
    
    try {
        const token = await AsyncStorage.getItem('accessToken')
        const response = await axios.get(
            `${API_URL}/api/v1/hospitals/${doctorId}/receipt-reviews?page=${page}&size=${size}&sort=${sort}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            },
        )

        if (response.status === 200) {
            console.log('Success: ', response.data)
        } else {
            console.log('Fail to get review list: ', response.status)
        }

        return response.data.hospitalReceiptReviewList;

    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Axios Error:', error.message);
        } else {
            console.error('Unknown Error:', error);
        }
        throw error
    }
};
