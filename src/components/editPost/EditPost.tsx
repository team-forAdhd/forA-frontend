import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import {
    TouchableOpacity,
    Text,
    View,
    TextInput,
    Image,
    Modal,
} from 'react-native'
import {
    LeftArrowIcon,
    DefaultCameraIcon,
    DeleteIcon,
} from '@/public/assets/SvgComponents'
import CategoryButton from './CategoryButton'
import AlertModal from '../common/alertModal/AlertModal'
import { useNavigation } from '@react-navigation/native'
import { styles, text } from './EditPostStyle'
import * as ImagePicker from 'expo-image-picker'
import { getPostDetail } from '@/api/home/getPostsDetailsApi'
import { updatePostApi } from '@/api/home/updatePostApi'
import userStore from '@/store/userStore/userStore'

const mockPostDetail = {
    postId: 1,
    category: '10대',
    images: null,
    authorProfile: null,
    authorNickname: '작성자',
    isAnonymous: true,
    createdAt: '2023-05-01T12:00:00Z',
    title: '아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아',
    content:
        '나도 동아리 선후배들이랑 친해지고 싶어. 나도 동아리 선후배들이랑 친해지고 싶어. 나도 동아리 선후배들이랑 친해지고 싶어. 나도 동아리 선후배들이랑 친해지고 싶어. 나도 동아리 선후배들이랑 친해지고 싶어. 나도 동아리 선후배들이랑 친해지고 싶어. 나도 동아리 선후배들이랑 친해지고 싶어. 나도 동아리 선후배들이랑 친해지고 싶어. 나도 동아리 선후배들이랑 친해지고 싶어. 나도 동아리 선후배들이랑 친해지고 싶어. 나도 동아리 선후배들이랑 친해지고 싶어. 나도 동아리 선후배들이랑 친해지고 싶어. 나도 동아리 선후배들이랑 친해지고 싶어. 나도 동아리 선후배들이랑 친해지고 싶어. 나도 동아리 선후배들이랑 친해지고 싶어. 나도 동아리 선후배들이랑 친해지고 싶어. 나도 동아리 선후배들이랑 친해지고 싶어. 나도 동아리 선후배들이랑 친해지고 싶어.',
}

interface EditPostProps {
    postId: number
}
export default function EditPost({ postId }: EditPostProps) {
    const { t: t } = useTranslation('board')
    const { t: tabT } = useTranslation('home')
    const navigation = useNavigation()

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [attachedPhotos, setAttachedPhotos] = useState<string[]>([])
    const [isAnonymous, setIsAnonymous] = useState(false)
    const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions()
    const [selectedCategory, setSelectedCategory] = useState<string>('')
    const [showAlert, setShowAlert] = useState(false)

    useEffect(() => {
        const fetchPostDetail = async () => {
            try {
                // const data = await getPostDetail(postId)
                // setTitle(data.title)
                // setContent(data.content)
                // setSelectedCategory(data.category)
                // setIsAnonymous(data.isAnonymous)
                // setAttachedPhotos(data.images)
                setTitle(mockPostDetail.title)
                setContent(mockPostDetail.content)
                setSelectedCategory(mockPostDetail.category)
                setIsAnonymous(mockPostDetail.isAnonymous)
                // setAttachedPhotos(mockPostDetail.images)
            } catch (error) {
                console.error('Error fetching post detail for Edit:', error)
            }
        }
        fetchPostDetail()
    }, [])

    const handleLeftArrowPress = () => {
        setShowAlert(true)
    }

    const handleCancel = () => {
        setShowAlert(false)
        navigation.navigate('PostDetail' as never)
    }

    const handleContinue = () => {
        setShowAlert(false)
    }

    const isUploadButtonDisabled = () => {
        return !title.trim() || !content.trim() // 제목 또는 내용 중 하나라도 입력이 없으면 버튼 비활성
    }

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

    const handleCategorySelect = (category: string) => {
        setSelectedCategory(category) // 선택된 카테고리 상태 업데이트
    }

    const handleAnonymousClick = () => {
        setIsAnonymous((prev) => !prev)
    }

    const handlePostInfo = async () => {
        try {
            const postInfo = {
                postId: postId,
                category_name: selectedCategory,
                title: title,
                nickname: userStore.nickname,
                content: content,
                images: attachedPhotos.join(','),
                anonymous: isAnonymous,
                createdAt: mockPostDetail.createdAt,
            }
            await updatePostApi(postInfo)
            console.log('PostInfo sent successfully:', postInfo)
        } catch (error) {
            console.error('Error sending PostInfo:', error)
        }
    }

    const handleUploadButton = () => {
        handlePostInfo
        navigation.navigate('Home' as never)
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.leftArrow}
                    onPress={handleLeftArrowPress}
                >
                    <Text
                        style={[
                            text.uploadButtonText,
                            isUploadButtonDisabled()
                                ? text.disabledButtonText
                                : null,
                        ]}
                    >
                        {t('post-cancel')}
                    </Text>
                </TouchableOpacity>
                <Text style={text.titleText}>{t('post-correct')}</Text>
                <TouchableOpacity
                    style={[styles.uploadButton]}
                    disabled={isUploadButtonDisabled()} // 버튼 비활성 상태 설정
                    onPress={handleUploadButton}
                >
                    <Text
                        style={[
                            text.uploadButtonText,
                            isUploadButtonDisabled()
                                ? text.disabledButtonText
                                : null,
                        ]}
                    >
                        {t('post-finished')}
                    </Text>
                </TouchableOpacity>
            </View>

            <View style={styles.contents}>
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

                {/* 카테고리 선택 */}
                <View style={styles.categoryContainer}>
                    <CategoryButton
                        category={tabT('10s-tab')}
                        onSelectCategory={handleCategorySelect}
                        isSelected={selectedCategory === tabT('10s-tab')}
                    />
                    <CategoryButton
                        category={tabT('20s-tab')}
                        onSelectCategory={handleCategorySelect}
                        isSelected={selectedCategory === tabT('20s-tab')}
                    />
                    <CategoryButton
                        category={tabT('30s-tab')}
                        onSelectCategory={handleCategorySelect}
                        isSelected={selectedCategory === tabT('30s-tab')}
                    />
                    <CategoryButton
                        category={tabT('parents-tab')}
                        onSelectCategory={handleCategorySelect}
                        isSelected={selectedCategory === tabT('parents-tab')}
                    />
                </View>

                {/* 게시글 입력 */}
                <View style={styles.titleContainer}>
                    <TextInput
                        style={text.contentTitleText}
                        maxLength={50}
                        value={title}
                        onChangeText={setTitle}
                    />
                    <View style={styles.titleBar} />
                </View>

                <View style={styles.contentContainer}>
                    <TextInput
                        style={text.contentText}
                        placeholder={t('post-enter-content')}
                        multiline
                        maxLength={2000}
                        value={content}
                        onChangeText={setContent}
                    />
                </View>
            </View>

            {/* 익명 체크 */}
            <View style={styles.anonymousContainer}>
                <TouchableOpacity
                    style={styles.anonymousCheckbox}
                    onPress={handleAnonymousClick}
                >
                    <Image
                        source={
                            isAnonymous
                                ? require('@/public/assets/check-icon.png')
                                : require('@/public/assets/checkbox-icon.png')
                        }
                        style={styles.checkboxIcon}
                    />
                    <Text
                        style={[
                            text.anonymousText,
                            { color: isAnonymous ? '#52A55D' : '#949494' },
                        ]}
                    >
                        {t('post-anonymous')}
                    </Text>
                </TouchableOpacity>
            </View>
            <Modal visible={showAlert} transparent animationType="fade">
                <View style={styles.overlay}>
                    <View style={styles.modalContainer}>
                        <AlertModal
                            message={t('post-ing')}
                            leftButtonText={t('post-out')}
                            rightButtonText={t('post-writing')}
                            onLeftClicked={handleCancel}
                            onRightClicked={handleContinue}
                        />
                    </View>
                </View>
            </Modal>
        </View>
    )
}
