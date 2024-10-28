import React, { useState, useRef, useEffect } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    Image,
    Modal,
} from 'react-native'
import { styles, text } from './MedNewReivewStyle'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import { Rating } from 'react-native-elements'
import { TextInput } from 'react-native-gesture-handler'
import { DefaultCameraIcon, DeleteIcon } from '@/public/assets/SvgComponents'
import * as ImagePicker from 'expo-image-picker'
import { sendMedReviewApi } from '@/api/medicine/medReviewApi'
import MedSelectModal from './MedSelectModal/MedSelectModal'
import medStore from '@/state/medState/medStore'
import { getSingleMedInfoApi } from '@/api/medicine/medListApi'
import { uploadImageApi } from '@/api/image/imageApi'

interface MedNewReviewProps {
    medId: number
}

const MedNewReview: React.FC<MedNewReviewProps> = ({ medId }) => {
    // prop으로 medId 받아와야 함
    const { t } = useTranslation('medicine')

    const navigation = useNavigation()
    const scrollViewRef = useRef<ScrollView>(null)
    const [data, setData] = useState<any>(null)

    const [rating, setRating] = useState(0)
    const [isCoMed, setIsCoMed] = useState(false)
    const [coMedName, setCoMedName] = useState('')
    const [coMedId, setCoMedId] = useState(0)
    const [content, setContent] = useState('')
    const [attachedPhotos, setAttachedPhotos] = useState<string[]>([])
    const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions()
    const [isFocused, setIsFocused] = useState(false)
    const [age, setAge] = useState('')
    const [sex, setSex] = useState('')
    const [modalVisible, setModalVisible] = useState(false)

    useEffect(() => {
        // API 호출
        const fetchData = async () => {
            try {
                const medicine = await getSingleMedInfoApi(medId)
                setData(medicine)
            } catch (error) {
                console.error('Error fetching medication data:', error)
            }
        }

        fetchData()
    }, [medId])

    const handleImageUpload = async (imageFile: any) => {
        try {
            const response = await uploadImageApi(imageFile)
            const imagePathList = response.data.imagePathList // response.data로 접근
            return imagePathList
        } catch (error) {
            console.error('Error uploading image:', error)
            throw error
        }
    }

    //MedDetail로 이동
    const gotoMedDetail = () => {
        navigation.navigate('MedDetail' as never)
    }

    const handleReviewSend = async () => {
        try {
            const imagePathList = await Promise.all(
                attachedPhotos.map((photo) =>
                    handleImageUpload({ uri: photo }),
                ),
            )

            const reviewData = {
                medicineId: medId,
                coMedications:
                    isCoMed && medStore.selectedMed
                        ? [medStore.selectedMed.id]
                        : [],
                content: content,
                images: imagePathList.flat(), // 이미지 경로를 배열로 포함
                grade: rating,
            }
            await sendMedReviewApi(reviewData)
            navigation.navigate('MedDetail' as never)
            console.log('Review sent successfully:', reviewData)
        } catch (error) {
            console.error('Error sending review:', error)
        }
    }

    const handleReviewButton = () => {
        handleReviewSend()
        navigation.navigate('MedDetail' as never)
    }

    const onRatingCompleted = (rating: number) => {
        const roundedRating = Math.round(rating * 2) / 2 // 반올림
        setRating(roundedRating)
    }

    const handleCoMed = () => {
        setIsCoMed((prev) => !prev)
    }

    // TextInput 관련 로직
    const handleFocus = () => {
        setIsFocused(true)
    }
    const handleBlur = () => {
        setIsFocused(false)
    }
    // 사진 업로드 로직
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
    // 옵션 로직
    const handleAgeOption = (option: string) => {
        setAge(option)
    }
    const handleSexOption = (option: string) => {
        setSex(option)
    }

    // 리뷰 버튼 활성화
    const isReviewButtonEnabled = () => {
        return (
            rating > 0 &&
            content.length >= 20 &&
            (isCoMed ? coMedName.length > 0 : true)
        )
    }

    return (
        <View style={styles.container}>
            {/* 헤더 */}
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.gobackIcon}
                    onPress={gotoMedDetail}
                >
                    <Image
                        style={styles.gobackSize}
                        source={require('@/public/assets/cancel-black.png')}
                    />
                </TouchableOpacity>
                <View style={styles.titleStyle}>
                    <Text style={text.titleText}>{t('review-title')}</Text>
                </View>
            </View>
            <ScrollView ref={scrollViewRef} style={styles.scrollStyle}>
                {/* 약 이름, 약 사진 */}
                <View style={styles.contentBox1}>
                    <Text style={text.medTitleText}>{data.itemName}</Text>
                    <View style={styles.imageContainer}>
                        <Image
                            source={{
                                uri: data.itemImage,
                            }}
                            style={styles.pillImage}
                        />
                    </View>
                </View>
                {/* 별점 */}
                <View style={styles.contentBox2}>
                    <Text style={text.subTitleText}>{t('review-rate')}</Text>
                    <Rating
                        type="custom"
                        ratingCount={5}
                        imageSize={56}
                        startingValue={rating}
                        fractions={1}
                        onFinishRating={onRatingCompleted}
                        ratingColor="#52A55D"
                        ratingBackgroundColor="#EEEEEE"
                        tintColor="#FFFFFF"
                        style={styles.rating}
                    />
                    <Text style={text.rateNumText}>{rating}점</Text>
                </View>
                {/* 함께 복용중인 약 */}
                <View style={styles.contentBox3}>
                    <Text style={text.subTitleText}>{t('other-med')}</Text>
                    <TouchableOpacity onPress={() => setModalVisible(true)}>
                        <View style={styles.searchBar}>
                            <Image
                                style={styles.IconImage}
                                source={require('@/public/assets/greenSearch.png')}
                            />
                            <Text style={text.coMedText}>
                                {medStore.selectedMed?.itemName}
                            </Text>
                        </View>
                    </TouchableOpacity>
                    {/* 있/없 확인 */}
                    <TouchableOpacity
                        style={styles.coMedClick}
                        onPress={handleCoMed}
                    >
                        <Image
                            source={
                                isCoMed
                                    ? require('@/public/assets/check-icon.png')
                                    : require('@/public/assets/checkbox-icon.png')
                            }
                            style={styles.checkboxIcon}
                        />
                        <Text>{t('other-med-no')}</Text>
                    </TouchableOpacity>
                </View>
                {/* 어떤 점이 좋았나요 */}
                <View style={styles.contentBox4}>
                    <Text style={text.subTitleText}>{t('review-pro')}</Text>
                    <Text style={text.descripText}>{t('review-char')}</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={[
                                styles.input,
                                isFocused && styles.inputFocused,
                                text.inputText,
                            ]}
                            placeholder={t('review-placeholder')}
                            placeholderTextColor="#CCCCCC"
                            value={content}
                            onChangeText={setContent}
                            selectionColor={'#52A55D'}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            maxLength={5000}
                            multiline={true}
                        />
                        <Text style={text.inputNumText}>
                            {content.length}/5000
                        </Text>
                    </View>
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
                                {`${attachedPhotos.length}/5`}
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
                </View>
                {/* 나이 성별 (선택) */}
                <View style={styles.contentBox5}>
                    <Text style={text.subTitleText}>
                        {t('review-option')}
                        <Text style={text.optionText}>
                            {t('review-option-1')}
                        </Text>
                    </Text>
                    <Text style={text.descripText}>
                        {t('review-option-des')}
                    </Text>
                    <Text style={text.subTitleText}>{t('age')}</Text>
                    <View style={styles.optionButtonContainer}>
                        <TouchableOpacity
                            style={
                                age === 'NO'
                                    ? styles.clickedButton
                                    : styles.generalButton
                            }
                            onPress={() => handleAgeOption('NO')}
                        >
                            <Text
                                style={
                                    age === 'NO'
                                        ? text.activeButtonText
                                        : text.inactiveButtonText
                                }
                            >
                                {t('no')}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={
                                age === 'UNDER10'
                                    ? styles.clickedButton
                                    : styles.generalButton
                            }
                            onPress={() => handleAgeOption('UNDER10')}
                        >
                            <Text
                                style={
                                    age === 'UNDER10'
                                        ? text.activeButtonText
                                        : text.inactiveButtonText
                                }
                            >
                                {t('under10')}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={
                                age === '10s'
                                    ? styles.clickedButton
                                    : styles.generalButton
                            }
                            onPress={() => handleAgeOption('10s')}
                        >
                            <Text
                                style={
                                    age === '10s'
                                        ? text.activeButtonText
                                        : text.inactiveButtonText
                                }
                            >
                                {t('10')}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={
                                age === '20s'
                                    ? styles.clickedButton
                                    : styles.generalButton
                            }
                            onPress={() => handleAgeOption('20s')}
                        >
                            <Text
                                style={
                                    age === '20s'
                                        ? text.activeButtonText
                                        : text.inactiveButtonText
                                }
                            >
                                {t('20')}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={
                                age === '30s'
                                    ? styles.clickedButton
                                    : styles.generalButton
                            }
                            onPress={() => handleAgeOption('30s')}
                        >
                            <Text
                                style={
                                    age === '30s'
                                        ? text.activeButtonText
                                        : text.inactiveButtonText
                                }
                            >
                                {t('30')}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={
                                age === '40s'
                                    ? styles.clickedButton
                                    : styles.generalButton
                            }
                            onPress={() => handleAgeOption('40s')}
                        >
                            <Text
                                style={
                                    age === '40s'
                                        ? text.activeButtonText
                                        : text.inactiveButtonText
                                }
                            >
                                {t('40')}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={text.subTitleText}>{t('sex')}</Text>
                    <View style={styles.optionButtonContainer}>
                        <TouchableOpacity
                            style={
                                sex === 'NO'
                                    ? styles.clickedButton
                                    : styles.generalButton
                            }
                            onPress={() => handleSexOption('NO')}
                        >
                            <Text
                                style={
                                    sex === 'NO'
                                        ? text.activeButtonText
                                        : text.inactiveButtonText
                                }
                            >
                                {t('no')}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={
                                sex === 'FEMALE'
                                    ? styles.clickedButton
                                    : styles.generalButton
                            }
                            onPress={() => handleSexOption('FEMALE')}
                        >
                            <Text
                                style={
                                    sex === 'FEMALE'
                                        ? text.activeButtonText
                                        : text.inactiveButtonText
                                }
                            >
                                {t('female')}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={
                                sex === 'MALE'
                                    ? styles.clickedButton
                                    : styles.generalButton
                            }
                            onPress={() => handleSexOption('MALE')}
                        >
                            <Text
                                style={
                                    sex === 'MALE'
                                        ? text.activeButtonText
                                        : text.inactiveButtonText
                                }
                            >
                                {t('male')}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
            {/* 리뷰버튼 */}
            <View style={styles.revivewButtonContainer}>
                {/* 취소버튼 */}
                <View style={styles.cancelButton}>
                    <TouchableOpacity onPress={gotoMedDetail}>
                        <Text style={text.cancelButtonText}>
                            {t('cancel-button')}
                        </Text>
                    </TouchableOpacity>
                </View>
                {/* 리뷰 등록 버튼 */}
                <View
                    style={
                        !isReviewButtonEnabled()
                            ? styles.reviewDisabledButton
                            : styles.reviewButton
                    }
                >
                    <TouchableOpacity
                        onPress={handleReviewButton}
                        disabled={!isReviewButtonEnabled()}
                    >
                        <Text style={text.submitButtonText}>
                            {t('review-write-1')}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <MedSelectModal onClose={() => setModalVisible(false)} />
                </View>
            </Modal>
        </View>
    )
}

export default MedNewReview
