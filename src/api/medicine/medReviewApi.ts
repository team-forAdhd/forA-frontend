import axios from 'axios';
import { API_URL } from '@env';
import userStore from '@/store/userStore/userStore';

export const getMedReviewApi = async (medicineId: number) => {
  try {
    const response = await axios.get(`${API_URL}/api/v1/medicines/reviews/medicine/${medicineId}`, {
      headers: {
        Authorization: `Bearer ${userStore.accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching medicine reviews:', error);
    return null;
  }
};

export const medReviewHelpApi = async (reviewId: number) => {
  try {
    const response = await axios.post(`${API_URL}/api/v1/medicines/reviews/${reviewId}/help`, {}, {
      headers: {
        Authorization: `Bearer ${userStore.accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error marking review as helpful:', error);
    return null;
  }
};

export const sendMedReviewApi = async (reviewData: { medicineId: number; coMedications: number[]; content: string; images: string[]; grade: number; }) => {
  try {
    const response = await axios.post(`${API_URL}/api/v1/medicines/reviews`, reviewData, {
      headers: {
        Authorization: `Bearer ${userStore.accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error sending medicine review:', error);
    return null;
  }
};

export const deleteMedReviewApi = async (reviewId: number) => {
  try {
    const response = await axios.delete(`${API_URL}/api/v1/medicines/reviews/${reviewId}`, {
      headers: {
        Authorization: `Bearer ${userStore.accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting medicine review:', error);
    return null;
  }
};
