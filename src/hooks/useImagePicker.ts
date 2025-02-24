import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { Alert } from 'react-native';

type ImagePickerHookProps = {
    options?: ImagePicker.ImagePickerOptions;
    fileLimitMB?: number;
};

export function useImagePicker({ options, fileLimitMB }: ImagePickerHookProps) {
    const [attachedPhotos, _setAttachedPhotos] = useState<
        ImagePicker.ImagePickerAsset[]
    >([]);

    const FILE_LIMIT = fileLimitMB
        ? fileLimitMB * 1024 * 1024
        : 50 * 1024 * 1024;

    const [status, requestPermission] =
        ImagePicker.useMediaLibraryPermissions();

    async function launchImagePicker(): Promise<undefined> {
        if (!status?.granted) {
            const permission = await requestPermission();
            if (!permission.granted) {
                return;
            }
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            ...options,
        });

        if (result.canceled) {
            return;
        }

        if (
            result.assets?.some(
                (image) => image.fileSize && image.fileSize > FILE_LIMIT,
            )
        ) {
            Alert.alert(`파일 사이즈는 ${FILE_LIMIT}MB를 넘을 수 없습니다.`);
            _setAttachedPhotos(
                result.assets.filter(
                    (image) => image.fileSize && image.fileSize < FILE_LIMIT,
                ),
            );
            return;
        }

        _setAttachedPhotos(result.assets);

        return;
    }
    const handleDeletePhoto = (index: number) => {
        const updatedPhotos = [...attachedPhotos];
        updatedPhotos.splice(index, 1);
        _setAttachedPhotos(updatedPhotos);
    };
    return { launchImagePicker, attachedPhotos, handleDeletePhoto };
}
