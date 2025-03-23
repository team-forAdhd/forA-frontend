import {
    View,
    TouchableOpacity,
    Image,
    Text,
    Modal,
    Pressable,
    TextStyle,
    StyleProp,
    StyleSheet,
} from 'react-native';
import { CameraView } from 'expo-camera';
import React, { useState, useEffect } from 'react';
import {
    receiptValidationCheck,
    ValidationError,
} from './receiptValidation.api';
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
    const { hospitalInfo, ribbonEvaluation } = route.params;
    const {
        cameraRef,
        facing,
        takePictureHandler,
        toggleCameraFacing,
        permission,
    } = useCamera();

    const [price, setPrice] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [imageData, setImageData] = useState<any>(null);
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const { displayModal, informText, modalVisible, switchModal } = useModal();

    const takePicture = async () => {
        try {
            setLoading(true);
            const result = await takePictureHandler();
            if (!result || (result && !result?.base64)) return;

            const hospitalPrice = await receiptValidationCheck(
                result?.base64 ?? '',
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
        if (ribbonEvaluation) {
            navigation.push('RibbonEvaluation', {
                hospitalInfo: hospitalInfo,
            });
        } else {
            navigation.push('ChooseDoctor', {
                hospitalInfo: hospitalInfo,
                price: price ?? 0,
            });
        }
    };
    const cameraPermission = permission?.status === 'granted';

    return (
        <>
            <View style={styles.container}>
                {/* 카메라 뷰 */}
                {cameraPermission ? (
                    <CameraView
                        style={styles.camera}
                        facing={facing}
                        ref={cameraRef}
                    />
                ) : (
                    <View
                        style={[styles.camera, { backgroundColor: 'black' }]}
                    />
                )}
                {/* HEADER */}
                <View style={styles.headerTextContainer}>
                    <Text style={text.headerText}>{hospitalInfo.name}</Text>
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
                </View>

                {/* MESSAGE BOX */}
                <View style={styles.messageBoxContainer}>
                    <View style={styles.informMessageBox}>
                        <Text style={text.messageText}>영수증의 글자가</Text>
                        <Text style={text.messageText}>
                            잘 보이게 찍어주세요
                        </Text>
                    </View>
                    {ribbonEvaluation && (
                        <View style={styles.ribbonMessageBox}>
                            <Image
                                source={require('@/public/assets/ribbon.png')}
                                style={styles.ribbon}
                            />
                            <Text
                                style={{
                                    color: color.ribbon,
                                    fontWeight: 'bold',
                                }}
                            >
                                포에이 리본 달아주기
                            </Text>
                            <Image
                                source={require('@/public/assets/ribbon.png')}
                                style={styles.ribbon}
                            />
                        </View>
                    )}
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

const color = {
    primary: '#52A35D',
    inactive: '#949494',
    inactiveBottom: '#EFEFF0',
    ribbon: '#FF5D5D',
    normal: '#232323',
    faintBlack: '#555555',
    backgroundGray: '#EDEDEA',
    faintGray: '#EEEEEE',
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    headerTextContainer: {
        position: 'absolute',
        top: 52,
        width: '100%',
        height: 36,
        zIndex: 20,
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center',
    },
    headerButtonContainer: {
        position: 'absolute',
        top: 0,
        right: 0,
        height: 36,
        paddingRight: 20,
        alignSelf: 'flex-end',
        alignItems: 'flex-end',
    },
    camera: {
        zIndex: 10,
        width: '100%',
        height: '100%',
    },
    messageBoxContainer: {
        position: 'absolute',
        top: 120,
        width: '80%',
        zIndex: 20,
        height: 80,
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        gap: 10,
    },
    informMessageBox: {
        width: '100%',
        padding: 15,
        borderRadius: 85,
        opacity: 0.8,
        backgroundColor: 'white',
    },
    ribbonMessageBox: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 30,
        gap: 10,
    },
    buttonContainer: {
        alignSelf: 'center',
        position: 'absolute',
        bottom: 85,
        width: '95%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        zIndex: 20,
    },
    button: {
        flex: 1,
        alignSelf: 'flex-end',
        alignItems: 'center',
        zIndex: 20,
    },
    iconHeaderImage: {
        width: 42,
        height: 42,
        objectFit: 'contain',
    },
    iconImage: {
        width: 45,
        height: 45,
        objectFit: 'contain',
    },
    ribbon: {
        color: color.ribbon,
        width: 20,
        height: 20,
    },
    iconShootImage: {
        width: 80,
        height: 80,
        objectFit: 'contain',
    },
    modalBackGround: {
        flex: 1,
        backgroundColor: 'black',
        opacity: 0.85,
    },
    modalView: {
        marginTop: 340,
        margin: 30,
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 15,
        padding: 28,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
});

const baseText = {
    fontFamily: 'Pretendard',
    fontStyle: 'normal',
    fontWeight: '400',
};

const text = {
    headerText: {
        color: 'white',
        fontSize: 19,
        fontWeight: 'bold',
        letterSpacing: -0.7,
        lineHeight: 22.4,
        textAlign: 'center',
    },
    messageText: {
        ...baseText,
        color: color.normal,
        fontSize: 19,
        letterSpacing: -0.7,
        lineHeight: 22.4,
        textAlign: 'center',
    },
    modalText: {
        fontSize: 19,
        fontWeight: '600',
        lineHeight: 22.4,
        letterSpacing: -0.7,
    },
    boxText: {
        ...baseText,
        fontSize: 18,
        lineHeight: 22.4,
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '600',
        lineHeight: 22.4,
    },
} as {
    [key: string]: StyleProp<TextStyle>;
};
