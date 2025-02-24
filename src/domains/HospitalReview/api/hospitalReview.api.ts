import { uploadImageApi } from '@/api/image/imageApi';
import { apiClient } from '@/api/login/loginApi';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { ImagePickerAsset } from 'expo-image-picker';

type UploadHospitalReviewProps = {
    hospitalId: string;
    content: string;
    imageList: Array<ImagePickerAsset>;
    medicalExpense?: number;
};

type PostHospitalReviewProps = Omit<UploadHospitalReviewProps, 'imageList'> & {
    imageList: Array<string>;
};
export function postHospitalReview({
    hospitalId,
    content,
    imageList,
    medicalExpense,
}: PostHospitalReviewProps) {
    return apiClient.post(`/hospitals/${hospitalId}/receipt-reviews`, {
        content,
        imageList,
        medicalExpense: medicalExpense ?? 0,
    });
}

export async function uploadReview({
    content,
    imageList,
    hospitalId,
    medicalExpense,
}: UploadHospitalReviewProps) {
    const imagePathList = imageList.length
        ? await Promise.all(imageList.map((img) => uploadImageApi(img)))
        : [];

    await postHospitalReview({
        content,
        hospitalId,
        imageList: imagePathList,
        medicalExpense,
    });
}

export function useUploadReviewMutation(
    options?: UseMutationOptions<void, unknown, UploadHospitalReviewProps>,
) {
    return useMutation({
        mutationFn: uploadReview,
        ...options,
    });
}
