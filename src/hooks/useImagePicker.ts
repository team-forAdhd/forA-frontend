import * as ImagePicker from 'expo-image-picker';
import { Alert } from 'react-native';

type ImagePickerHookProps = {
    options?: ImagePicker.ImagePickerOptions;
    fileLimitMB?: number;
    setter: React.Dispatch<
        React.SetStateAction<ImagePicker.ImagePickerAsset[]>
    >;
};

export function useImagePicker({
    options,
    fileLimitMB,
    setter,
}: ImagePickerHookProps) {
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
            setter(
                result.assets.filter(
                    (image) => image.fileSize && image.fileSize < FILE_LIMIT,
                ),
            );
        }

        setter(result.assets);

        return;
    }
    return { launchImagePicker };
}
