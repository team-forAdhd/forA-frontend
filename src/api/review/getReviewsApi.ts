import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { apiClient } from '../login/loginApi'


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

export const getReviewsApi = async (hospitalId: string, page: number, size: number, sort: string) => {
  try {
    const token = await AsyncStorage.getItem('accessToken')
    const response = await apiClient.get(`/hospitals/${hospitalId}/receipt-reviews?page=${page}&size=${size}&sort=${sort}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )

    if (response.status === 200) {
        console.log('병원 리뷰 불러오기 성공')

        return response.data.hospitalReceiptReviewList;

    } else {
      console.log('응답 실패, 상태 코드:', response.status)
    }
  } catch (error) {
    console.log('Error fetching review list: ', error)
    throw error
  }
};
