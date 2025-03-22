import { apiClient } from '../login/loginApi';

export const getMedReviewApi = async (medicineId: number) => {
    try {
        const response = await apiClient.get(
            `/medicines/reviews/medicine/${medicineId}`,
        );

        return response.data;
    } catch (error) {
        console.error('Error fetching medicine reviews:', error);
        throw error;
    }
};

export const medReviewHelpApi = async (reviewId: number) => {
    try {
        const response = await apiClient.post(
            `medicines/reviews/${reviewId}/help`,
        );

        return response.data;
    } catch (error) {
        console.error('Error marking review as helpful:', error);
        throw error;
    }
};

export const sendMedReviewApi = async (reviewData: {
    userId: string;
    nickname: string;
    profileImage: string;
    medicineId: number;
    coMedications: number[];
    content: string;
    images: string[];
    grade: number;
    ageRange: string;
    gender: string;
    createdAt: number;
    lastModifiedAt: number;
    helpCount: number;
    averageGrade: number;
}) => {
    try {
        const response = await apiClient.post(`medicines/reviews`, reviewData);

        return response.data;
    } catch (error) {
        console.error('Error sending medicine review:', error);
        throw error;
    }
};

export const deleteMedReviewApi = async (reviewId: number) => {
    try {
        const response = await apiClient.delete(
            `medicines/reviews/${reviewId}`,
        );

        return response.data;
    } catch (error) {
        console.error('Error deleting medicine review:', error);
        throw error;
    }
};
