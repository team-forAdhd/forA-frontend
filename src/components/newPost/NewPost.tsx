import React, { useState } from 'react'
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
import { styles, text } from './NewPostStyle'
import * as ImagePicker from 'expo-image-picker'
import { sendNewPostApi } from '@/api/home/sendNewPostApi'
import userStore from '@/store/userStore/userStore'
import { uploadImageApi } from '@/api/image/imageApi'

export default function NewPost() {
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

    const handleLeftArrowPress = () => {
        setShowAlert(true)
    }

    const handleCancel = () => {
        setShowAlert(false)
        navigation.navigate('Home' as never)
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

    const handleImageUpload = async (imageFile: any) => {
        try {
            const response = await uploadImageApi(imageFile)
            const imagePathList = response.imagePathList
            return imagePathList
        } catch (error) {
            console.error('Error uploading image:', error)
            throw error
        }
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

    // const handlePostInfo = async () => {
    //     try {
    //         const postInfo = {
    //             title: title,
    //             nickname: userStore.nickname,
    //             content: content,
    //             images: attachedPhotos,
    //             anonymous: isAnonymous,
    //             category: selectedCategory,
    //             createdAt: new Date(),
    //         }
    //         await sendNewPostApi(postInfo)
    //         console.log('PostInfo sent successfully:', postInfo)
    //     } catch (error) {
    //         console.error('Error sending PostInfo:', error)
    //     }
    // }
    const handlePostInfo = async () => {
        try {
            const imagePathList = await Promise.all(
                attachedPhotos.map((photo) =>
                    handleImageUpload({ uri: photo }),
                ),
            )

            const postInfo = {
                title: title,
                nickname: userStore.nickname,
                content: content,
                images: imagePathList.flat(),
                anonymous: isAnonymous,
                category: selectedCategory,
                createdAt: new Date(),
            }
            await sendNewPostApi(postInfo)
            console.log('PostInfo sent successfully:', postInfo)
        } catch (error) {
            console.error('Error sending PostInfo:', error)
        }
    }

    const handleUploadButton = () => {
        handlePostInfo()
        navigation.navigate('Home' as never)
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.leftArrow}
                    onPress={handleLeftArrowPress}
                >
                    <LeftArrowIcon />
                </TouchableOpacity>
                <Text style={text.titleText}>{t('post-new')}</Text>
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
                        {t('post-upload')}
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
                    />
                    <CategoryButton
                        category={tabT('20s-tab')}
                        onSelectCategory={handleCategorySelect}
                    />
                    <CategoryButton
                        category={tabT('30s-tab')}
                        onSelectCategory={handleCategorySelect}
                    />
                    <CategoryButton
                        category={tabT('parents-tab')}
                        onSelectCategory={handleCategorySelect}
                    />
                </View>

                {/* 게시글 입력 */}
                <View style={styles.titleContainer}>
                    <TextInput
                        style={text.contentTitleText}
                        placeholder={t('post-title')}
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
