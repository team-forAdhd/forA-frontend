import { useState, useRef, useCallback } from 'react';
import { Alert, Linking } from 'react-native';
import { CameraCapturedPicture, useCameraPermissions } from 'expo-camera';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

export const useCameraPermission = () => {
    const [permission, requestPermission] = useCameraPermissions();
    const navigation = useNavigation();

    const checkPermissions = async () => {
        if (!permission) return;

        if (permission.status !== 'granted') {
            if (!permission.canAskAgain) {
                Alert.alert(
                    '알림',
                    '영수증 인식을 위해서는 카메라 권한이 필요합니다.',
                    [
                        { text: '취소', onPress: () => navigation.goBack() },
                        {
                            text: '설정 열기',
                            onPress: () => Linking.openSettings(),
                        },
                    ],
                    { cancelable: false },
                );
            } else {
                requestPermission();
            }
        }
    };

    useFocusEffect(
        useCallback(() => {
            checkPermissions();
        }, [permission]),
    );

    return { permission, checkPermissions };
};

export const useCameraActions = () => {
    const [facing, setFacing] = useState<'front' | 'back'>('back');
    const cameraRef = useRef<any>(null);

    const toggleCameraFacing = () => {
        setFacing((current) => (current === 'back' ? 'front' : 'back'));
    };

    const takePictureHandler = async (): Promise<
        CameraCapturedPicture | undefined
    > => {
        if (!cameraRef.current) return;
        const result = await cameraRef.current.takePictureAsync({
            quality: 0.4,
            base64: true,
        });
        return result;
    };

    const updateCameraRef = (newRef: any) => {
        cameraRef.current = newRef;
    };

    return {
        cameraRef,
        facing,
        toggleCameraFacing,
        takePictureHandler,
        updateCameraRef,
    };
};

export const useCamera = () => {
    const { cameraRef, facing, takePictureHandler, toggleCameraFacing } =
        useCameraActions();
    const { permission } = useCameraPermission();

    return {
        permission,
        cameraRef,
        facing,
        takePictureHandler,
        toggleCameraFacing,
    };
};
