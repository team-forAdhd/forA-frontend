import React, { useState } from 'react'
import {
    TouchableOpacity,
    Text,
    View,
    TextInput,
    Image,
    ScrollView,
} from 'react-native'
import { DefaultCameraIcon, DeleteIcon } from '@/public/assets/SvgComponents'
import { useNavigation } from '@react-navigation/native'
import { styles, text } from './HospitalReviewStyle'
import * as ImagePicker from 'expo-image-picker'

export default function HospitalReview() {
    const navigation = useNavigation()

    let forA = false
    const [inputValue, setInputValue] = useState<string>('')
    // 제출 상태
    const [submit, setSubmit] = useState<boolean>(false)

    const [includePrice, setIncludePrice] = useState<boolean[]>([false, false])
    const handleInput = () => {
        setSubmit(true)
    }
    const [attachedPhotos, setAttachedPhotos] = useState<string[]>([])
    const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions()

    const uploadImage = async () => {
        // 갤러리 접근 권한
        if (!status?.granted) {
            const permission = await requestPermission()
            if (!permission.granted) {
                return null
            }
        }
        // 이미지 업로드 기능
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            quality: 1,
        })
        if (result.canceled) {
            return null // 이미지 업로드 취소한 경우
        }
        // 이미지 업로드 결과 및 이미지 경로 업데이트
        setAttachedPhotos((prevPhotos) => [...prevPhotos, result.assets[0].uri])
    }

    const handleDeletePhoto = (index: number) => {
        const updatedPhotos = [...attachedPhotos]
        updatedPhotos.splice(index, 1) // 해당 인덱스의 사진 삭제
        setAttachedPhotos(updatedPhotos)
    }

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
                <View style={styles.cancelIcon} />
            </View>
            <View
                style={{
                    flex: 1,
                    flexDirection: 'row',
                    position: 'absolute',
                    top: 94,
                }}
            >
                <View style={styles.greenLine} />
                <View style={styles.grayLine} />
            </View>
            {/*병원 및 의사 정보 */}
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
                <Text style={text.borderText}>용산구 정신건강의학원</Text>
                <Text style={[text.normalText, { marginTop: 3 }]}>
                    서울특별시 용산구 한강대로 257
                </Text>
                <View
                    style={[
                        styles.flexRow,
                        {
                            marginTop: 30,
                            marginBottom: 15,
                            justifyContent: 'center',
                        },
                    ]}
                >
                    <Text style={{ textAlign: 'center' }}>
                        <Text style={text.bordernormalText}>김코코</Text>
                        <Text style={text.normalText}> 선생님</Text>
                    </Text>
                    <View style={styles.grayButton}>
                        <Text style={text.normalText}>변경</Text>
                    </View>
                </View>
            </View>
            <View style={styles.middleContainer}>
                <Text style={text.bordernormalText}>어떤 점이 좋았나요?</Text>
                <Text style={text.normalText}>20자 이상 작성해주세요</Text>
            </View>
            <View
                style={
                    inputValue
                        ? [styles.InputContainer, { borderColor: '#52A55D' }]
                        : [styles.InputContainer, { borderColor: '#949494' }]
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
                        setSubmit(false)
                        setInputValue(text)
                    }}
                    returnKeyType="search"
                    onSubmitEditing={handleInput}
                    style={styles.InputStyles}
                    selectionColor="#52A55D"
                    placeholderTextColor="#949494"
                    maxLength={5000}
                />
            </View>
            <View
                style={{
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
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
                        onPress={uploadImage}
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
                            {`${attachedPhotos.length}/20`}
                        </Text>
                    </TouchableOpacity>
                    {/* 첨부된 사진 미리보기 */}
                    {attachedPhotos.map((photoUri, index) => (
                        <View key={index} style={styles.photoPreview}>
                            <Image
                                source={{ uri: photoUri }}
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
                    가격
                    <Text style={[text.bordernormalText, { color: '#52A55D' }]}>
                        34000
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
                                backgroundColor: includePrice[0]
                                    ? '#F4F9D9'
                                    : '#fff',
                                borderColor: includePrice[0]
                                    ? '#52A55D'
                                    : '#949494',
                            },
                        ]}
                        onPress={() => {
                            const tmp = [false, false]
                            tmp[0] = true
                            setIncludePrice(tmp)
                        }}
                    >
                        <Text
                            style={
                                includePrice[0]
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
                                backgroundColor: includePrice[1]
                                    ? '#F4F9D9'
                                    : '#fff',
                                borderColor: includePrice[1]
                                    ? '#52A55D'
                                    : '#949494',
                            },
                        ]}
                        onPress={() => {
                            const tmp = [false, false]
                            tmp[1] = true
                            setIncludePrice(tmp)
                        }}
                    >
                        <Text
                            style={
                                includePrice[1]
                                    ? text.clickText
                                    : text.faintText
                            }
                        >
                            아니오
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            {/* 리뷰 등록*/}
            <View style={styles.reviewActionContainer}>
                <TouchableOpacity
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
                    onPress={() => {
                        setSubmit(true)
                    }}
                    style={[
                        styles.submitButtonContainer,
                        {
                            backgroundColor:
                                includePrice[0] || includePrice[1]
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
        </View>
    )
}
