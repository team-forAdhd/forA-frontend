import {
    View,
    TouchableOpacity,
    Image,
    Text,
    Modal,
    Pressable,
} from 'react-native';
import { CameraView } from 'expo-camera';
import React, { useState, useEffect } from 'react';
import { styles, text } from './CameraScreenStyle';
import {
    receiptValidationCheck,
    ValidationError,
} from '@/api/review/cameraOcrApi';
import { StackScreenProps } from '@react-navigation/stack';
import { HospitalStackParams } from '@/navigation/stacks/hospitalStack';
import LoadingModal from '@/components/common/modals/loadingModal';
import { useCamera } from '@/hooks/useCamera';
import useModal from '@/hooks/useModal';
import GeneralModal from '@/components/common/modals/modal';

export default function CameraScreen({
    navigation,
    route,
}: StackScreenProps<HospitalStackParams, 'CameraScreen'>) {
    const hospitalInfo = route.params.hospitalInfo;
    const { cameraRef, facing, takePictureHandler, toggleCameraFacing } =
        useCamera();

    const [price, setPrice] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [imageData, setImageData] = useState<any>(null);
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const { displayModal, informText, modalVisible, switchModal } = useModal();

    const takePicture = async () => {
        try {
            setLoading(true);
            // const result = await takePictureHandler();
            // if (!result || (result && !result?.base64)) return;

            // const response = await receiptValidationCheck(
            //     result?.base64 ?? '',
            //     hospitalInfo.name,
            // );

            const hospitalPrice = await receiptValidationCheck(
                '',
                hospitalInfo.name,
            );
            setPrice(hospitalPrice);
            setIsModalVisible(true);
        } catch (error) {
            if (error instanceof ValidationError) {
                displayModal(error.message);
            } else {
                displayModal(
                    '서버와의 오류가 발생했습니다. 다시 시도해 주세요.',
                );
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setImageData(imageData);
    }, []);

    useEffect(() => {
        setIsModalVisible(isModalVisible);
    }, []);

    /* 의사 선택 화면으로 넘기는 함수 */
    const pressModalButton = () => {
        setIsModalVisible(false);
        navigation.navigate('ChooseDoctor', {
            hospitalInfo: hospitalInfo,
            price: price ?? 0,
        });
    };

    return (
        <>
            <View style={styles.container}>
                <CameraView
                    style={styles.camera}
                    facing={facing}
                    ref={cameraRef}
                >
                    {/* HEADER */}
                    <View style={styles.headerTextContainer}>
                        <Text style={text.headerText}>간단리뷰</Text>
                    </View>
                    <TouchableOpacity
                        activeOpacity={1}
                        style={styles.headerButtonContainer}
                        onPress={() => {
                            navigation.goBack();
                        }}
                    >
                        <Image
                            source={require('@/public/assets/x_white.png')}
                            style={styles.iconHeaderImage}
                        />
                    </TouchableOpacity>

                    {/* MESSAGE BOX */}
                    <View style={styles.messageBox}>
                        <Text style={text.messageText}>영수증의 글자가</Text>
                        <Text style={text.messageText}>
                            잘 보이게 찍어주세요
                        </Text>
                    </View>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => {
                                navigation.goBack();
                            }}
                        >
                            <Image
                                source={require('@/public/assets/x_white.png')}
                                style={styles.iconImage}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={takePicture}
                        >
                            <Image
                                source={require('@/public/assets/shoot.png')}
                                style={styles.iconShootImage}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={toggleCameraFacing}
                        >
                            <Image
                                source={require('@/public/assets/refresh-ccw.png')}
                                style={styles.iconImage}
                            />
                        </TouchableOpacity>
                    </View>
                </CameraView>

                <View style={{ position: 'absolute' }}>
                    <Modal
                        animationType="fade"
                        visible={isModalVisible}
                        transparent={true}
                    >
                        <Pressable
                            style={styles.modalBackGround}
                            onPress={pressModalButton}
                        >
                            <View style={styles.modalView}>
                                <Text
                                    style={[
                                        text.modalText,
                                        { color: '#52A35D' },
                                    ]}
                                >
                                    영수증 인증
                                </Text>
                                <Text
                                    style={[
                                        text.modalText,
                                        { color: '#232323' },
                                    ]}
                                >
                                    이 완료되었습니다
                                </Text>
                            </View>
                        </Pressable>
                    </Modal>
                </View>
            </View>
            <GeneralModal
                informText={informText}
                modalVisible={modalVisible}
                switchModal={switchModal}
            />
            <LoadingModal visible={loading} />
        </>
    );
}
