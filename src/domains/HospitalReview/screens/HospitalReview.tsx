import React, { useState } from 'react';
import {
    TouchableOpacity,
    Text,
    View,
    TextInput,
    Image,
    ScrollView,
    TextStyle,
    StyleProp,
    StyleSheet,
} from 'react-native';
import { DefaultCameraIcon, DeleteIcon } from '@/public/assets/SvgComponents';
import { StackScreenProps } from '@react-navigation/stack';
import { HospitalStackParams } from '@/navigation/stacks/hospitalStack';
import { useImagePicker } from '@/hooks/useImagePicker';
import LoadingModal from '@/components/common/modals/loadingModal';
import { useUploadReviewMutation } from '@/domains/HospitalReview/api/hospitalReview.api';
import useModal from '@/hooks/useModal';
import GeneralModal from '@/components/common/modals/modal';

export default function HospitalReview({
    navigation,
    route,
}: StackScreenProps<HospitalStackParams, 'HospitalReview'>) {
    const { hospitalInfo, price, choosedDoctor } = route.params;

    let forA = false;
    const [inputValue, setInputValue] = useState<string>('');
    // 제출 상태

    const formValidity = inputValue.length > 20;

    const [includePrice, setIncludePrice] = useState<boolean>(true);
    const {
        displayModal: pushError,
        informText: error,
        modalVisible: errorModal,
        switchModal,
    } = useModal();

    const { launchImagePicker, attachedPhotos, handleDeletePhoto } =
        useImagePicker({
            options: {
                allowsEditing: false,
                selectionLimit: 10,
                allowsMultipleSelection: true,
            },
        });

    const { mutate, isPending } = useUploadReviewMutation({
        onError: (err) => {
            console.log(err);
            pushError(
                '리뷰 등록중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.',
            );
        },
    });

    const submitReview = () => {
        mutate({
            content: inputValue,
            hospitalId: hospitalInfo.hospitalId,
            imageList: attachedPhotos,
            medicalExpense: includePrice ? price : 0,
        });
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image
                        source={require('@/public/assets/x.png')}
                        style={styles.cancelIcon}
                    />
                </TouchableOpacity>
                <Text style={text.titleText}>칭찬남기기</Text>
            </View>
            <View
                style={{
                    width: '100%',
                    flexDirection: 'row',
                }}
            >
                <View style={styles.greenLine} />
                <View style={styles.grayLine} />
            </View>
            {/*병원 및 의사 정보 */}
            <ScrollView>
                <View style={styles.hospitalContainer}>
                    {forA && (
                        <View style={styles.flexRow}>
                            <Image
                                source={require('@/public/assets/ribbonIcon.png')}
                                style={styles.foraRibbonIcon}
                            />
                            <Text style={text.foraRibbonText}>
                                포에이 리본 병원
                            </Text>
                        </View>
                    )}
                    <Text style={text.borderText}>{hospitalInfo.name}</Text>
                    <Text
                        style={[
                            text.normalText,
                            { marginTop: 3, width: '100%', padding: 7 },
                        ]}
                    >
                        {hospitalInfo.address}
                    </Text>
                    <View
                        style={[
                            styles.flexRow,
                            {
                                padding: 10,
                                marginBottom: 15,
                                justifyContent: 'center',
                            },
                        ]}
                    >
                        <Text style={{ textAlign: 'center' }}>
                            <Text style={text.bordernormalText}>
                                {choosedDoctor?.name ?? '선택안함'}
                            </Text>
                            <Text style={text.normalText}> 선생님</Text>
                        </Text>
                        <TouchableOpacity
                            style={styles.grayButton}
                            onPress={() => navigation.goBack()}
                        >
                            <Text style={text.normalText}>변경</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.middleContainer}>
                    <Text style={text.bordernormalText}>
                        어떤 점이 좋았나요?
                    </Text>
                    <Text style={text.normalText}>20자 이상 작성해주세요</Text>
                </View>
                <View
                    style={
                        inputValue
                            ? [
                                  styles.InputContainer,
                                  { borderColor: '#52A55D' },
                              ]
                            : [
                                  styles.InputContainer,
                                  { borderColor: '#949494' },
                              ]
                    }
                >
                    <TextInput
                        placeholder={
                            'ADHD에 대해 잘 헤아려 주셨나요?\n상세한 경험을 공유해주세요!'
                        }
                        multiline={true}
                        numberOfLines={7}
                        value={inputValue}
                        onChangeText={(text) => {
                            setInputValue(text);
                        }}
                        returnKeyType="search"
                        style={styles.InputStyles}
                        selectionColor="#52A55D"
                        placeholderTextColor="#949494"
                        maxLength={5000}
                    />
                </View>
                <View
                    style={{
                        width: '100%',
                        justifyContent: 'flex-end',
                        alignItems: 'flex-end',
                        padding: 15,
                    }}
                >
                    <Text style={text.inputCountText}>
                        {inputValue.length + '/5000'}
                    </Text>
                </View>
                <ScrollView
                    horizontal={true} // 수평 스크롤을 활성화
                    showsHorizontalScrollIndicator={false}
                    style={styles.contents}
                >
                    {/* 사진 첨부 */}
                    <View style={styles.photoUploadContainer}>
                        {/* 사진 첨부 버튼 */}
                        <TouchableOpacity
                            style={styles.photoPreview}
                            onPress={launchImagePicker}
                        >
                            <DefaultCameraIcon />
                            <Text
                                style={[
                                    text.photoPreviewText,
                                    {
                                        color:
                                            attachedPhotos.length > 0
                                                ? '#52A55D'
                                                : '#555',
                                    },
                                ]}
                            >
                                {`${attachedPhotos.length}/10`}
                            </Text>
                        </TouchableOpacity>
                        {/* 첨부된 사진 미리보기 */}
                        {attachedPhotos.map((photo, index) => (
                            <View key={index} style={styles.photoPreview}>
                                <Image
                                    source={{ uri: photo.uri }}
                                    style={{
                                        width: '100%',
                                        aspectRatio: 1,
                                        borderRadius: 12,
                                    }}
                                />
                                <TouchableOpacity
                                    style={styles.deleteIcon}
                                    onPress={() => handleDeletePhoto(index)}
                                >
                                    <DeleteIcon />
                                </TouchableOpacity>
                            </View>
                        ))}
                    </View>
                </ScrollView>
                <View style={styles.bottomContainer}>
                    <Text style={text.bordernormalText}>
                        가격{' '}
                        <Text
                            style={[
                                text.bordernormalText,
                                { color: '#52A55D' },
                            ]}
                        >
                            {price}
                        </Text>
                        원을
                    </Text>
                    <Text style={text.bordernormalText}>
                        리뷰에 포함하시겠습니까?
                    </Text>
                    <Text style={[text.normalText, { marginBottom: 10 }]}>
                        리뷰 내용 하단에 표시됩니다
                    </Text>
                    <View style={styles.flexRow}>
                        <TouchableOpacity
                            style={[
                                styles.chooseButton,
                                {
                                    backgroundColor: includePrice
                                        ? '#F4F9D9'
                                        : '#fff',
                                    borderColor: includePrice
                                        ? '#52A55D'
                                        : '#949494',
                                },
                            ]}
                            onPress={() => {
                                setIncludePrice(true);
                            }}
                        >
                            <Text
                                style={
                                    includePrice
                                        ? text.clickText
                                        : text.faintText
                                }
                            >
                                예
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                styles.chooseButton,
                                {
                                    backgroundColor: includePrice
                                        ? '#fff'
                                        : '#F4F9D9',
                                    borderColor: includePrice
                                        ? '#949494'
                                        : '#52A55D',
                                },
                            ]}
                            onPress={() => {
                                setIncludePrice(false);
                            }}
                        >
                            <Text
                                style={
                                    includePrice
                                        ? text.faintText
                                        : text.clickText
                                }
                            >
                                아니오
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
            {/* 리뷰 등록*/}
            <View style={styles.reviewActionContainer}>
                <TouchableOpacity
                    onPress={() => navigation.pop(3)}
                    style={[
                        styles.cancelButtonContainer,
                        { backgroundColor: '#EEEEEE' },
                    ]}
                >
                    <Text style={[text.buttonText, { color: '#232323' }]}>
                        취소
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    disabled={!formValidity}
                    onPress={submitReview}
                    style={[
                        styles.submitButtonContainer,
                        {
                            backgroundColor: formValidity
                                ? '#52A55D'
                                : '#949494',
                        },
                    ]}
                >
                    <Text style={[text.buttonText, { color: '#fff' }]}>
                        리뷰 등록
                    </Text>
                </TouchableOpacity>
            </View>
            <LoadingModal visible={isPending} />
            <GeneralModal
                informText={error}
                modalVisible={errorModal}
                switchModal={switchModal}
            />
        </View>
    );
}

const color = {
    primary: '#52A55D',
    normal: '#232323',
    inactiveBottom: '#EFEFF0',
    ribbon: '#FF5D5D',
    faintBlack: '#555555',
    backgroundGray: '#EDEDEA',
    faintGray: '#EEEEEE',
    gray: '#949494',
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 20,
        flexDirection: 'column',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingTop: 40,
        width: '100%',
        marginBottom: 15,
    },
    cancelIcon: {
        width: 24,
        height: 24,
        marginLeft: -8,
    },
    greenLine: {
        width: '50%',
        height: 2,
        backgroundColor: color.primary,
    },
    grayLine: {
        width: '50%',
        height: 1,
        backgroundColor: color.faintGray,
    },
    hospitalContainer: {
        paddingTop: 20,
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        borderBottomWidth: 1,
        borderBottomColor: color.faintGray,
    },
    flexRow: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    middleContainer: {
        width: '100%',
        padding: 20,
        justifyContent: 'center',
    },
    grayButton: {
        paddingHorizontal: 10,
        height: 24,
        borderRadius: 500,
        backgroundColor: color.faintGray,
        marginLeft: 6,
    },
    foraRibbonIcon: {
        width: 14,
        height: 11,
        marginRight: 4,
    },
    InputContainer: {
        width: '92.2%',
        height: 179,
        borderRadius: 8,
        borderWidth: 1,
        paddingHorizontal: 13,
        marginHorizontal: 16,
        justifyContent: 'center',
    },
    InputStyles: {
        width: '100%',
        color: color.normal,
        fontSize: 15,
        lineHeight: 24,
        letterSpacing: -0.5,
        fontFamily: 'Pretendard',
        textAlign: 'left',
        textAlignVertical: 'top',
    },
    uploadButton: {
        width: 100,
        height: 35,
        marginRight: -25,
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalContainer: {
        position: 'absolute',
        top: 360,
        left: 13,
        justifyContent: 'center',
        alignItems: 'center',
    },
    overlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // 흐림 효과를 위한 반투명 배경
    },
    contents: {
        paddingHorizontal: 16,
        paddingTop: 20,
        width: '100%',
    },
    photoUploadContainer: {
        flexDirection: 'row',
        marginBottom: 20,
        alignItems: 'flex-start',
    },
    photoPreview: {
        width: 70,
        height: 70,
        borderRadius: 12,
        backgroundColor: '#FFF',
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: 'rgba(0, 0, 0, 0.15)',
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.5,
        shadowRadius: 3,
        elevation: 2,
    },
    deleteIcon: {
        position: 'absolute',
        top: 0,
        right: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        borderRadius: 10,
        padding: 5,
    },
    categoryContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    categoryButton: {
        display: 'flex',
        width: 70,
        height: 33,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 500,
        backgroundColor: '#EEE',
        marginRight: 8,
    },
    selectedCategoryButton: {
        backgroundColor: '#52A55D',
    },
    titleContainer: {
        width: '99%',
        height: 48,
        flexDirection: 'column',
        marginBottom: 20,
        marginTop: 12,
    },
    titleBar: {
        width: '100%',
        height: 0,
        marginTop: 11,
        borderBottomWidth: 1,
        borderBottomColor: '#232323',
    },
    contentContainer: {
        width: '99%',
        height: 459,
        marginBottom: 20,
    },
    contentInput: {
        width: '100%',
        height: '100%',
        textAlignVertical: 'top',
        padding: 10,
    },
    bottomContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        justifyContent: 'center',
        borderTopColor: color.faintGray,
        borderTopWidth: 1,
        paddingTop: 20,
        paddingBottom: 40,
    },
    chooseButton: {
        borderRadius: 44,
        borderWidth: 1,
        width: 69,
        height: 34,
        marginHorizontal: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cancelButtonContainer: {
        paddingHorizontal: 40,
        height: 60,
        alignContent: 'center',
        justifyContent: 'center',
        borderRadius: 10,
    },
    submitButtonContainer: {
        flex: 1,
        height: 60,
        alignContent: 'center',
        justifyContent: 'center',
        borderRadius: 10,
    },
    reviewActionContainer: {
        flexDirection: 'row',
        paddingHorizontal: 16,
        paddingTop: 10,
        borderTopColor: color.faintGray,
        borderTopWidth: 1,
        justifyContent: 'space-between',
        height: 115,
        width: '100%',
        gap: 10,
    },
    bottomCheckbox: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 20,
        width: '100%',
        justifyContent: 'center',
    },
    checkboxIcon: {
        width: 20,
        height: 20,
        marginRight: 5,
    },
});

const text = {
    fontFamily: 'Pretendard',
    fontStyle: 'normal',
    titleText: {
        color: '#000',
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '600',
        lineHeight: 22.4,
        letterSpacing: 0,
        flex: 1,
    },
    foraRibbonText: {
        color: color.ribbon,
        textAlign: 'left',
        fontSize: 14,
        fontWeight: '400',
        lineHeight: 19.6,
        letterSpacing: -0.5,
    },
    borderText: {
        color: color.normal,
        textAlign: 'center',
        fontSize: 20,
        fontWeight: '700',
        lineHeight: 28,
    },
    bordernormalText: {
        color: color.normal,
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '700',
        lineHeight: 28,
    },
    normalText: {
        color: color.normal,
        textAlign: 'center',
        fontSize: 14,
        lineHeight: 22.4,
        letterSpacing: -0.5,
    },
    faintText: {
        color: color.gray,
        textAlign: 'center',
        fontSize: 14,
        lineHeight: 19.5,
        letterSpacing: -0.5,
    },
    clickText: {
        color: color.primary,
        textAlign: 'center',
        fontSize: 14,
        lineHeight: 19.5,
        letterSpacing: -0.5,
    },
    photoPreviewText: {
        color: '#555',
        fontSize: 14,
        fontWeight: '400',
        lineHeight: 19.6,
        letterSpacing: -0.7,
    },
    categoryButtonText: {
        color: '#232323',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '400',
        lineHeight: 22.4,
        letterSpacing: -0.8,
    },
    selectedCategoryButtonText: {
        color: '#FFF',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '600',
        lineHeight: 22.4,
        letterSpacing: -0.8,
    },
    contentTitleText: {
        marginTop: 13,
        color: '#949494',
        fontSize: 18,
        fontWeight: '600',
        lineHeight: 24,
    },
    contentText: {
        color: '#949494',
        fontSize: 18,
        fontWeight: '400',
        lineHeight: 26,
        letterSpacing: -0.9,
    },
    anonymousText: {
        color: '#949494',
        fontSize: 14,
        fontWeight: '400',
        lineHeight: 19.6,
        letterSpacing: -0.7,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: '400',
        lineHeight: 19.6,
        letterSpacing: -0.7,
        marginLeft: 2,
        textAlign: 'center',
    },
} as {
    [key: string]: StyleProp<TextStyle>;
};
