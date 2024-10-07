import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { AxiosError, AxiosResponse } from 'axios';

interface Review {
    hospitalReceiptReviewList: [],
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

export const getReviewsApi = async (doctorId: string, page: number, size: number, sort: string) => {
    try {
        const token = await AsyncStorage.getItem('accessToken')
        const response = await axios.get(
            `https://foradhd.site/api/v1/hospitals/${doctorId}/receipt-reviews?page=${page}&size=${size}&sort=${sort}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            },
        )

        if (response.status === 200) {
            console.log('Success : ', response.data)
        } else {
            console.log('Fail to get review list : ', response.status)
        }

        return response.data;

    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Axios Error:', error.message);
        } else {
            console.error('Unknown Error:', error);
        }
        throw error
    }
};
