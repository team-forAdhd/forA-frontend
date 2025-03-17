import React, { useState, useRef, useEffect } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    Image,
    Modal,
} from 'react-native'
import { styles, text } from './EditMedReviewStyle'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import { Rating } from 'react-native-elements' 
import { TextInput } from 'react-native-gesture-handler' 
import { DefaultCameraIcon, DeleteIcon } from '@/public/assets/SvgComponents'
import * as ImagePicker from 'expo-image-picker' 
import { sendMedReviewApi } from '@/api/medicine/medReviewApi' 
import MedSelectModal from '../medNewReview/MedSelectModal/MedSelectModal' 
import medStore from '@/state/medState/medStore' 
import { getMedReviewApi } from '@/api/medicine/medReviewApi' 

const truncateItemName = (name: string) => {
    const bracketIndex = name.indexOf('(') 
    return bracketIndex !== -1 ? name.substring(0, bracketIndex) : name 
}

interface EditMedReviewProps { 
    reviewId: number
}

const EditMedReview: React.FC<EditMedReviewProps> = ({ reviewId }) => {
    const { t } = useTranslation('medicine')

    const navigation = useNavigation()
    const scrollViewRef = useRef<ScrollView>(null)
    const route = useRoute() 

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
        const fetchReviewData = async () => {
            try { 
                const reviewData = await getMedReviewApi(reviewId) 
                if (reviewData) { 
                    setRating(reviewData.grade) 
                    setContent(reviewData.content) 
                    setAttachedPhotos(reviewData.images) 
                    setIsCoMed(reviewData.coMedications.length > 0)
                    if (reviewData.coMedications.length > 0) { 
                        setCoMedId(reviewData.coMedications[0]) 
                        setCoMedName(medStore.selectedMed?.itemName || '') 
                    }
                }
            } catch (error) {
                console.error('Error fetching review data:', error)
            }
        }

        fetchReviewData() 
    }, [reviewId]) 

    const gotoMedDetail = () => {
        navigation.navigate('MedDetail' as never)
    }

    const handleReviewSend = () => { 
        const reviewData = { 
            // reviewId,
            coMedications:
                isCoMed && medStore.selectedMed
                    ? [medStore.selectedMed.medId]
                    : [], 
            content: content,
            images: attachedPhotos, 
            grade: rating,
        }
        sendMedReviewApi(reviewData) 
        navigation.navigate('MedDetail' as never) 
    }

    const onRatingCompleted = (rating: number) => { 
        const roundedRating = Math.round(rating * 2) / 2 
        setRating(roundedRating) 
    }

    // 공동복용약 여부
    const handleCoMed = () => { 
        setIsCoMed((prev) => !prev) 
        if (!isCoMed) {
            // "없음" 선택 시, 선택된 약을 초기화
            medStore.setSelectedMed(null); // 선택된 약을 null로 초기화
            setCoMedName(''); // 공동 복용 약 이름 초기화
            setCoMedId(0); // 공동 복용 약 ID 초기화
        }
    }

    const handleFocus = () => { 
        setIsFocused(true)
    }
    const handleBlur = () => { 
        setIsFocused(false)
    }
    const uploadImage = async () => {
        if (!status?.granted) { 
            const permission = await requestPermission() 
            if (!permission.granted) { 
                return null 
            }
        }
        const result = await ImagePicker.launchImageLibraryAsync({ 
            mediaTypes: ImagePicker.MediaTypeOptions.Images, 
            allowsEditing: false, 
            quality: 1, 
        })
        if (result.canceled) { 
            return null 
        }
        setAttachedPhotos((prevPhotos) => [...prevPhotos, result.assets[0].uri])
    }

    const handleDeletePhoto = (index: number) => { 
        const updatedPhotos = [...attachedPhotos] 
        updatedPhotos.splice(index, 1) 
        setAttachedPhotos(updatedPhotos) 
    }
    // 옵션 로직
    const handleAgeOption = (option: string) => { // 나이 옵션 선택 시 호출
        setAge(option) // option을 age 상태로 설정해서 선택된 나이 옵션 반영
    }
    const handleSexOption = (option: string) => {
        setSex(option)
    }

    // 리뷰 버튼 활성화
    const isReviewButtonEnabled = () => {
        return (
            rating > 0 && // 평점이 0보다 큰 경우에만 버튼 활성화
            content.length >= 20 && // 리뷰 내용 길이가 20자 이상일 경우에만 버튼 활성화
            (isCoMed ? coMedName.length > 0 : true) // 공동복용약 이름이 1자 이상
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
                    {/* t는 번역함수 */}
                    <Text style={text.titleText}>{t('review-title')}</Text>
                </View>
            </View>
            <ScrollView ref={scrollViewRef} style={styles.scrollStyle}>
                {/* 약 이름, 약 사진 */}
                <View style={styles.contentBox1}>
                    {/* data 객체에서 itemName 속성 값 표시 (약 이름) */}
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
                        // 별점 개수 5로 설정
                        ratingCount={5}
                        // 각 별의 크기 56으로 설정
                        imageSize={56}
                        // 처음 표시되는 별점의 값을 rating 상태 값에 설정
                        startingValue={rating}
                        // 소수점 단위로 별점을 표시할 수 있도록 설정
                        fractions={1}
                        // 사용자가 별점을 선택하고 끝내면 호출. onRatingCompleted는 별점이 선택될 때마다 실행되는 함수
                        onFinishRating={onRatingCompleted}
                        // 별점 색상
                        ratingColor="#52A55D"
                        // 별점의 배경색
                        ratingBackgroundColor="#EEEEEE"
                        // 별점 배경에 덧칠 색
                        tintColor="#FFFFFF"
                        style={styles.rating}
                    />
                    {/* {rating}점은 rating 상태 값을 표시해서 별점 숫자를 보여줌 */}
                    <Text style={text.rateNumText}>{rating}점</Text>
                </View>
                {/* 함께 복용중인 약 */}
                <View style={styles.contentBox3}>
                    <Text style={text.subTitleText}>{t('other-med')}</Text>
                    {medStore.selectedMed ? (
                        <TouchableOpacity onPress={() => setModalVisible(true)}>
                            <View style={styles.searchBar}>
                                <Image
                                    style={styles.IconImage}
                                    source={require('@/public/assets/greenSearch.png')}
                                />
                                {/* 현재 선택된 약의 이름을 표시하는 부분 */}
                                <Text style={text.coMedText}>
                                    {medStore.selectedMed.itemName}
                                    {/* medStore.selectedMed에 저장된 약의 이름을 표시. 만약 사용자가 약을 선택하지 않았다면 빈 문자열이나 기본 값이 표시될 수 있음. */}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    ): (
                        <TouchableOpacity onPress={() => setModalVisible(true)}>
                            <Text style={text.coMedText}>{t('none-selected')}</Text> {/* "없음" 표시 */}
                        </TouchableOpacity>)}
                    {/* 있/없 확인 */}
                    {/* 사용자가 이 영역을 클릭하면 handleCoMed 함수가 실행됨 */}
                    <TouchableOpacity
                        style={styles.coMedClick}
                        onPress={() => {
                            handleCoMed();
                            if (isCoMed) {
                                medStore.setSelectedMed(null); // 공동 복용 약 초기화
                            }
                        }}
                    >
                        <Image
                            source={
                                // isCoMed 값에 따라 다르게 이미지를 표시함
                                isCoMed
                                    // true
                                    ? require('@/public/assets/check-icon.png')
                                    // false
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
                            // 입력된 텍스트를 content 상태로 관리하여 표시
                            value={content}
                            // 사용자가 텍스트를 변경할 때마다 setContent를 호출해서 content 상태를 업데이트
                            onChangeText={setContent}
                            // 텍스트 선택 시 표시되는 색
                            selectionColor={'#52A55D'}
                            // 입력창이 포커스 되었을 때 호출되는 핸들러
                            onFocus={handleFocus}
                            // 입력창 벗어날 때 호출되는 핸들러
                            onBlur={handleBlur}
                            maxLength={5000}
                            // 여러 줄 텍스트 입력 허용
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
                            {/* 사진을 찍을 수 있는 카메라 아이콘. 사용자가 사진을 업로드 할 수 있음을 나타냄 */}
                            <DefaultCameraIcon />
                            <Text
                                style={[
                                    text.photoPreviewText,
                                    {
                                        color:
                                            // 첨부된 사진 수
                                            attachedPhotos.length > 0
                                                // 첨부된 사진이 있음
                                                ? '#52A55D'
                                                // 없음
                                                : '#555',
                                    },
                                ]}
                            >
                                {/* 최대 첨부 가능한 수 */}
                                {`${attachedPhotos.length}/5`}
                            </Text>
                        </TouchableOpacity>
                        {/* 첨부된 사진 미리보기 */}
                        {/* 첨부된 사진이 여러 개 있을 수 있으므로 map 함수를 사용해서 각 사진을 화면에 표시 */}
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
                        onPress={handleReviewSend}
                        disabled={!isReviewButtonEnabled()}
                    >
                        <Text style={text.submitButtonText}>
                            {t('review-write-1')}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            <Modal
                // 모달이 화면에 나타날 때 슬라이드 애니메이션 효과 적용
                animationType="slide"
                // 모달 배경 투명
                transparent={true}
                // modalVisible 상태가 true일 때 모달이 보이도록 함
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    {/* 약 선택 관련 UI 제공하는 컴포넌트 */}
                    <MedSelectModal onClose={() => setModalVisible(false)} />
                </View>
            </Modal>
        </View>
    )
}

export default EditMedReview
