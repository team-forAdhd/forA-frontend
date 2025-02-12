import { ImagePickerAsset } from 'expo-image-picker';
import { apiClient } from '../login/loginApi';
import { uploadImageApi } from '@/api/image/imageApi';

export const getDoctorsApi = async (hospitalId: string) => {
    try {
        const response = await apiClient.get(
            `/hospitals/${hospitalId}/doctors/brief`,
        );

        if (response.status === 200) {
            console.log('병원 리뷰 목록 불러오기 성공');
            return response.data.doctorList;
        } else {
            console.log('응답 실패, 상태 코드:', response.status);
        }
    } catch (error) {
        console.error('Error fetching hospital doctor list:', error);
        throw error;
    }
};

export const getReviewsApi = async (
    hospitalId: string,
    page: number,
    size: number,
    sort: string,
) => {
    try {
        const response = await apiClient.get(
            `/hospitals/${hospitalId}/receipt-reviews?page=${page}&size=${size}&sort=${sort}`,
        );

        if (response.status === 200) {
            console.log('병원 리뷰 목록 불러오기 성공');
            console.log(response.data);

            return response.data.hospitalReceiptReviewList;
        } else {
            console.log('응답 실패, 상태 코드:', response.status);
        }
    } catch (error) {
        console.error('Error fetching hospital review list:', error);
        throw error;
    }
};

export async function deleteReviewApi(
    hospitalReceiptReviewId: string,
): Promise<void> {
    try {
        const response = await apiClient.delete(
            `/hospitals/receipt-reviews/${hospitalReceiptReviewId}`,
        );

        if (response.status === 204) {
            console.log(
                `영수증 리뷰 삭제 성공 (Review Id: ${hospitalReceiptReviewId})`,
            );
        } else {
            console.log('응답 실패, 상태 코드:', response.status);
        }
    } catch (error) {
        console.error('Error deleting receipt review:', error);
        throw error;
    }
}

export async function reviewHelpedApi(
    hospitalReceiptReviewId: string,
): Promise<void> {
    try {
        const response = await apiClient.post(
            `/hospitals/receipt-reviews/${hospitalReceiptReviewId}/help?help=true`,
        );

        if (response.status === 200) {
            console.log(
                `도움돼요 누르기 성공 (Review Id: ${hospitalReceiptReviewId})`,
            );
        } else {
            console.log('응답 실패, 상태 코드:', response.status);
        }
    } catch (error) {
        console.error('Error pressing review is helped:', error);
        throw error;
    }
}

type PostNewReceiptReviewsRequest = {
    hospitalId: string;
    content: string;
    imageList: ImagePickerAsset[];
    medicalExpense: number;
    doctorId?: string;
};
export async function postNewReceiptReviews({
    content,
    imageList,
    medicalExpense,
    hospitalId,
    doctorId,
}: PostNewReceiptReviewsRequest) {
    const REQUEST_URL = doctorId
        ? `/hospitals/${hospitalId}/receipt-reviews`
        : `/hospitals/${hospitalId}/doctors/${doctorId}/receipt-reviews`;
    let imagePathList = imageList;
    if (imageList.length) {
        imagePathList = await Promise.all(
            imageList.map((image) => uploadImageApi(image)),
        );
    }
    apiClient.post(REQUEST_URL, {
        content,
        imagePath: imagePathList,
        medicalExpense,
    });
}
