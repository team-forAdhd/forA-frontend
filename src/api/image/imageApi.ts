import { API_URL } from '@env';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { ImagePickerAsset } from 'expo-image-picker';

export const uploadImageApi = async (
    imageFile: ImagePickerAsset,
    imagePathPrefix: string = 'DEFAULT_IMAGE',
) => {
    try {
        const formData = new FormData();

        formData.append('imageFileList', {
            uri: imageFile.uri,
            name: imageFile.fileName,
            type: imageFile.mimeType,
        } as any);

        formData.append('request', JSON.stringify({}));

        const response = await fetch(`${API_URL}/api/v1/files/images`, {
            method: 'POST',
            body: formData,
        });

        if (response.ok) {
            const { imagePathList } = await response.json();
            return imagePathList[0];
        }

        const result = await response.text();
        console.error(result);
        throw new Error('이미지 업로드에 실패했습니다. 다시 시도해 주세요.');
    } catch (error) {
        console.error('이미지 업로드 실패:', error);
        throw error;
    }
};

export function useImageUploadMutation(
    options?: UseMutationOptions<string, any, ImagePickerAsset, any>,
) {
    return useMutation({
        mutationFn: uploadImageApi,
        ...options,
    });
}
