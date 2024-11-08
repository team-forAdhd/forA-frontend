import AsyncStorage from '@react-native-async-storage/async-storage'
import { apiClient } from '../login/loginApi'

export const getMedReviewApi = async (medicineId: number) => {
  try {
    const token = await AsyncStorage.getItem('accessToken')
    const response = await apiClient.get(`/medicines/reviews/medicine/${medicineId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )

    return response.data

  } catch (error) {
    console.error('Error fetching medicine reviews:', error)
    throw error
  }
};

export const medReviewHelpApi = async (reviewId: number) => {
  try {
    const token = await AsyncStorage.getItem('accessToken')
    const response = await apiClient.get(`medicines/reviews/${reviewId}/help`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )

    return response.data

  } catch (error) {
    console.error('Error marking review as helpful:', error)
    throw error
  }
};

export const sendMedReviewApi = async (reviewData: { medicineId: number; coMedications: number[]; content: string; images: string[]; grade: number; }) => {
  try {
    const token = await AsyncStorage.getItem('accessToken')
    const response = await apiClient.post(`medicines/reviews`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )

    return response.data

  } catch (error) {
    console.error('Error sending medicine review:', error)
    throw error
  }
};

export const deleteMedReviewApi = async (reviewId: number) => {
  try {
    const token = await AsyncStorage.getItem('accessToken')
    const response = await apiClient.get(`medicines/reviews/${reviewId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )

    return response.data

  } catch (error) {
    console.error('Error deleting medicine review:', error)
    throw error
  }
};