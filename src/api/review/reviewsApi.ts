import AsyncStorage from '@react-native-async-storage/async-storage'
import { apiClient } from '../login/loginApi'


export const getDoctorsApi = async (hospitalId: string) => {
  try {
      const token = await AsyncStorage.getItem('accessToken')
      const response = await apiClient.get(`/hospitals/${hospitalId}/doctors/brief`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )

      if (response.status === 200) {
        console.log('병원 리뷰 목록 불러오기 성공')
        return response.data.doctorList;
      } else {
          console.log('응답 실패, 상태 코드:', response.status)
      }
  } catch (error) {
      console.error('Error fetching hospital doctor list:', error)
      throw error
  }
};


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
          console.log('병원 리뷰 목록 불러오기 성공')
          console.log(response.data)
          
          return response.data.hospitalReceiptReviewList;
        } else {
            console.log('응답 실패, 상태 코드:', response.status)
        }
    } catch (error) {
        console.error('Error fetching hospital review list:', error)
        throw error
    }
};


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
        console.log(`영수증 리뷰 삭제 성공 (Review Id: ${hospitalReceiptReviewId})`)
      } else {
        console.log('응답 실패, 상태 코드:', response.status)
      }

  } catch (error) {
    console.error('Error deleting receipt review:', error)
    throw error
  }
};


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
        console.log(`도움돼요 누르기 성공 (Review Id: ${hospitalReceiptReviewId})`)
      } else {
        console.log('응답 실패, 상태 코드:', response.status)
      }

  } catch (error) {
    console.error('Error pressing review is helped:', error)
    throw error
  }
}

