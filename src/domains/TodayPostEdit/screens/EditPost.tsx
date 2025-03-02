import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
    TouchableOpacity,
    Text,
    View,
    TextInput,
    Image,
    Modal,
    TextStyle,
    StyleProp,
    StyleSheet,
    SafeAreaView,
    ScrollView,
} from 'react-native';
import { DefaultCameraIcon, DeleteIcon } from '@/public/assets/SvgComponents';
import AlertModal from '../../../components/common/modals/AlertModal';
import { getPostDetail } from '@/api/home/getPostsDetailsApi';
import userStore from '@/store/userStore/userStore';
import { uploadImageApi } from '@/api/image/imageApi';
import { useImagePicker } from '@/hooks/useImagePicker';
import { useUpdatePostMutation } from '@/domains/TodayPostEdit/api/updatePostApi';
import { StackScreenProps } from '@react-navigation/stack';
import { TodayStackParams } from '@/navigation/stacks/TodayStack';
import { TodayPostCategory } from '@/types/Today/TodayNewPost';
import Header from '@/components/common/ui/header';
import { imagePathMerge } from '@/utils/imagePathMerge';
import CategoryButton from '@/domains/Today/components/CategoryButton';
import LoadingModal from '@/components/common/modals/loadingModal';

export default function EditPost({
    route,
    navigation,
}: StackScreenProps<TodayStackParams, 'EditPost'>) {
    const { t: t } = useTranslation('board');
    const { t: tabT } = useTranslation('home');
    const { postId } = route.params;

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [prevPhotos, setPrevPhotos] = useState<string[]>([]);
    const { attachedPhotos, handleDeletePhoto, launchImagePicker } =
        useImagePicker({});
    const [isAnonymous, setIsAnonymous] = useState(false);
    const [selectedCategory, setSelectedCategory] =
        useState<TodayPostCategory>('TEENS');
    const [createdAt, setCreatedAt] = useState(0);
    const [showAlert, setShowAlert] = useState(false);
    const { mutate } = useUpdatePostMutation(postId, { navigation });
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchPostDetail = async () => {
            try {
                const data = await getPostDetail(postId);
                // 받아온 값을 useState의 기본값으로 설정
                setTitle(data.title);
                setContent(data.content);
                setPrevPhotos(data.images || []);
                setIsAnonymous(data.anonymous);
                setSelectedCategory(data.category as TodayPostCategory);
                setCreatedAt(data.createdAt);
            } catch (error) {
                console.error(error);
            }
        };

        fetchPostDetail();
    }, [postId]);

    const handleCancel = () => {
        setShowAlert(false);
        navigation.navigate('PostDetail' as never);
    };

    const handleContinue = () => {
        setShowAlert(false);
    };

    const isUploadButtonDisabled = () => {
        return !title.trim() || !content.trim(); // 제목 또는 내용 중 하나라도 입력이 없으면 버튼 비활성
    };

    const handleCategorySelect = (category: string) => {
        setSelectedCategory(category as TodayPostCategory);
    };

    const handlePostInfo = async () => {
        try {
            setIsLoading(true);
            let imagePathList = [];
            if (attachedPhotos) {
                imagePathList = await Promise.all(
                    attachedPhotos.map((photo) => uploadImageApi(photo)),
                );
            }

            const postInfo = {
                postId: postId,
                category: selectedCategory,
                title: title,
                nickname: userStore.nickname,
                content: content,
                images: prevPhotos.concat(imagePathList),
                anonymous: isAnonymous,
            };
            mutate({ postInfo, postId });
            console.log('PostInfo sent successfully:', postInfo);
        } catch (error) {
            console.error('Error sending PostInfo:', error);
        } finally {
            setIsLoading(false);
        }
    };
    console.log(selectedCategory);

    const handleDeletePrevPhoto = (idx: number) => {
        setPrevPhotos(prevPhotos.filter((_, i) => i !== idx));
    };

    return (
        <SafeAreaView style={styles.container}>
            <Header
                backIconType="text"
                headerText={t('post-correct')}
                navigation={navigation}
            >
                <TouchableOpacity
                    style={[styles.uploadButton]}
                    disabled={isUploadButtonDisabled()} // 버튼 비활성 상태 설정
                    onPress={handlePostInfo}
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
            </Header>

            <ScrollView style={styles.contents}>
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
                            {`${attachedPhotos.length}/20`}
                        </Text>
                    </TouchableOpacity>
                    {/* 첨부된 사진 미리보기 */}
                    {prevPhotos.map((uri, index) => (
                        <View key={index} style={styles.photoPreview}>
                            <Image
                                source={{ uri: imagePathMerge(uri) }}
                                style={{
                                    width: '100%',
                                    aspectRatio: 1,
                                    borderRadius: 12,
                                }}
                            />
                            <TouchableOpacity
                                style={styles.deleteIcon}
                                onPress={() => handleDeletePrevPhoto(index)}
                            >
                                <DeleteIcon />
                            </TouchableOpacity>
                        </View>
                    ))}
                    {attachedPhotos.map(({ uri }, index) => (
                        <View key={index} style={styles.photoPreview}>
                            <Image
                                source={{ uri }}
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
                        selected={selectedCategory}
                    />
                    <CategoryButton
                        category={tabT('20s-tab')}
                        onSelectCategory={handleCategorySelect}
                        selected={selectedCategory}
                    />
                    <CategoryButton
                        category={tabT('30s-tab')}
                        onSelectCategory={handleCategorySelect}
                        selected={selectedCategory}
                    />
                    <CategoryButton
                        category={tabT('parents-tab')}
                        onSelectCategory={handleCategorySelect}
                        selected={selectedCategory}
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
            </ScrollView>

            {/* 익명 체크 */}
            <View style={styles.anonymousContainer}>
                <TouchableOpacity
                    style={styles.anonymousCheckbox}
                    onPress={() => setIsAnonymous((prev) => !prev)}
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
            <LoadingModal visible={isLoading} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    leftArrow: {
        width: 35,
        height: 35,
        marginLeft: -8,
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
        paddingTop: 40,
    },
    photoUploadContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
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
        width: '100%',
        padding: 10,
    },
    contentInput: {
        width: '100%',
        height: '100%',
        textAlignVertical: 'top',
        padding: 10,
    },
    anonymousContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 27,
        justifyContent: 'flex-end',
    },
    anonymousCheckbox: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 20,
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
        marginLeft: 45,
    },
    uploadButtonText: {
        color: '#232323',
        textAlign: 'right',
        fontSize: 18,
        fontWeight: '400',
        lineHeight: 22.4,
        letterSpacing: -0.9,
    },
    disabledButtonText: {
        color: '#949494',
        textAlign: 'right',
        fontSize: 18,
        fontWeight: '400',
        lineHeight: 22.4,
        letterSpacing: -0.9,
    },
    photoPreviewText: {
        color: '#555',
        fontSize: 14,
        fontWeight: '400',
        lineHeight: 19.6,
        letterSpacing: -0.7,
    },
    contentTitleText: {
        marginTop: 13,
        color: '#232323',
        fontSize: 18,
        fontWeight: '600',
        lineHeight: 24,
    },
    contentText: {
        color: '#232323',
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
} as {
    [key: string]: StyleProp<TextStyle>;
};
