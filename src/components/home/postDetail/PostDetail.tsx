import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Modal,
    TextInput,
    TouchableWithoutFeedback,
} from 'react-native'
import { useTranslation } from 'react-i18next'
import { useState, useEffect, Key } from 'react'
import { useNavigation } from '@react-navigation/native'
import { styles, text } from './PostDetailStyle'
import { getPostDetail } from '@/api/home/getPostsDetailsApi'
import { sendCommentApi } from '@/api/home/sendCommentApi'
import { getCommentsApi } from '@/api/home/getCommentApi'
import { formatDate } from '@/common/formatDate'
import SimpleModal from '@/components/common/simpleModal/SimpleModal'
import AlertModal from '@/components/common/alertModal/AlertModal'
import Comment from '../comment/Comment'
import { ScrollView } from 'react-native-gesture-handler'
import {
    LikedIcon,
    ScrapIcon,
    ShareIcon,
    DeleteIcon2,
    EditIcon,
    LeftArrowIcon,
    ClikedLikedIcon,
} from '@/public/assets/SvgComponents'
import userStore from '@/store/userStore/userStore'
import * as Clipboard from 'expo-clipboard'
import { sendPostLike } from '@/api/home/postLikedApi'
import { deletePostApi } from '@/api/home/deletePostApi'
import { handleScrapApi } from '@/api/home/postScrappedApi'
import { API_URL } from '@env'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '@/components/navigation'

interface PostDetailProps {
    postId: number
}

type PostDetailNavigationProp = StackNavigationProp<
    RootStackParamList,
    'PostDetail'
>

export default function PostDetail({ postId }: PostDetailProps) {
    const { t } = useTranslation('board')
    const navigation = useNavigation()
    const postNavigation = useNavigation<PostDetailNavigationProp>()

    const handleEdit = async () => {
        postNavigation.navigate('EditPost', { postId })
    }

    const [showSharedAlert, setShowSharedAlert] = useState(false)
    const [showAlert, setShowAlert] = useState(false)
    const [showDeleteDoneAlert, setShowDeleteDoneAlert] = useState(false)
    const [postDetail, setPostDetail] = useState<any>(null)
    const [liked, setIsLiked] = useState(false)
    const [scrapped, setIsScrapped] = useState(0)
    const [comments, setComments] = useState<any>('')
    const [commentIsAnonymous, setCommentIsAnonymous] = useState<boolean>(true)
    const [commentContent, setCommentContent] = useState<string>('')
    const [isAuthor, setIsAuthor] = useState(false)

    useEffect(() => {
        const fetchPostDetail = async () => {
            try {
                const data = await getPostDetail(postId)
                setPostDetail(data)
                setIsAuthor(data.userId === userStore.nickname)
            } catch (error) {
                console.error(error)
            }
        }

        const fetchComments = async () => {
            try {
                const data = await getCommentsApi(postId)
                setComments(data.commentList)
            } catch (error) {
                console.error(error)
            }
        }

        fetchPostDetail()
        fetchComments()
    }, [postId])

    const {
        category,
        images,
        profileImage,
        nickname,
        anonymous,
        createdAt,
        title,
        content,
        likeCount,
        scrapCount,
    } = postDetail || {}

    const toggleCommentAnonymous = () => {
        setCommentIsAnonymous((prevState) => !prevState)
    }

    const handleSendComment = (commentId: any) => {
        const commentData = {
            postId: postId,
            content: commentContent,
            isAnonymous: commentIsAnonymous,
            reply: commentId ? commentId : null, // 답글인 경우, 답글의 ID
        }
        sendCommentApi(commentData)
    }

    const handleReply = (commentId: any) => {
        handleSendComment(commentId)
    }

    const handleShare = () => {
        const postLink = `${API_URL}posts/${postId}` // postId에 따라 실제 주소 생성
        Clipboard.setString(postLink)
        setShowSharedAlert(true)
    }

    const onDelete = () => {
        handleDelete
    }

    const handleDelete = async () => {
        try {
            await deletePostApi(postId)
            setShowDeleteDoneAlert(true)
        } catch (error) {
            console.error(error)
        }
    }

    const handleNothing = () => {
        setShowAlert(false)
    }

    const handleLike = async () => {
        try {
            const newLikedCount = await sendPostLike(
                postId,
                postDetail.id,
                postDetail.nickname,
                postDetail.content,
                postDetail.anonymous,
                postDetail.likedCount,
                postDetail.createdAt,
                new Date().toISOString(), // lastModifiedAt
            )
            setPostDetail((prevPostDetail: any) => ({
                ...prevPostDetail,
                likedCount: liked ? newLikedCount + 1 : newLikedCount,
                lastModifiedAt: new Date().toISOString(), // 업데이트된 시간 설정
            }))
            setIsLiked(!liked)
        } catch (error) {
            console.error(error)
        }
    }

    const handleScrap = async () => {
        try {
            const newScrapCount = await handleScrapApi(
                postDetail.id,
                userStore.userId,
                scrapped,
            )
            setPostDetail((prevPostDetail: any) => ({
                ...prevPostDetail,
                scrapCount: scrapped ? newScrapCount + 1 : newScrapCount,
            }))
            setIsScrapped(scrapped ? 0 : 1)
        } catch (error) {
            console.error(error)
        }
    }

    const handleGoback = () => {
        navigation.goBack()
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.gobackIcon}
                    onPress={handleGoback}
                >
                    <LeftArrowIcon />
                </TouchableOpacity>
                <Text
                    style={[
                        text.categoryText,
                        (images &&
                            images.length > 0 &&
                            text.categoryWithImageText) ||
                            null,
                    ]}
                >
                    {category}
                </Text>
                {isAuthor && (
                    <View style={styles.isAuthorButtonBox}>
                        <TouchableOpacity onPress={handleEdit}>
                            <EditIcon />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={onDelete}>
                            <DeleteIcon2 />
                        </TouchableOpacity>
                    </View>
                )}
            </View>
            <ScrollView contentContainerStyle={styles.scrollViewContainer}>
                {/* 첨부 사진이 있는 경우 나타나는 첨부사진 view */}
                {images && images.length > 0 && (
                    <View>
                        {images.map(
                            (img: any, index: Key | null | undefined) => (
                                <Image
                                    key={index}
                                    source={{ uri: img }}
                                    style={styles.imageBox}
                                />
                            ),
                        )}
                        <View style={styles.imageCountBox}>
                            <Text>{`1/${images.length}`}</Text>
                        </View>
                    </View>
                )}

                <View style={styles.bodyConatiner}>
                    {/* 작성자 정보 */}
                    <View style={styles.userInfoContainer}>
                        {postDetail && postDetail.profileImage ? (
                            <Image
                                source={{ uri: postDetail.profileImage }}
                                style={styles.icon}
                            />
                        ) : (
                            <Image
                                source={require('@/public/assets/defaultProfile.png')}
                                style={styles.icon}
                            />
                        )}
                        <View style={styles.userInfoTextContainer}>
                            <Text style={text.userText}>
                                {anonymous ? '익명' : nickname}
                            </Text>
                            {/* 작성 날짜 및 시간 */}
                            <Text style={text.createdAt}>
                                {formatDate(createdAt)}
                            </Text>
                        </View>
                        <View style={styles.actionButtonContainer}>
                            {/* 좋아요 버튼 */}
                            <TouchableOpacity
                                style={styles.actionButton}
                                onPress={handleLike}
                            >
                                <View style={styles.marginBox}>
                                    {liked ? (
                                        <ClikedLikedIcon />
                                    ) : (
                                        <LikedIcon />
                                    )}
                                    <Text
                                        style={[
                                            text.countText,
                                            liked && { color: '#52A55D' },
                                        ]}
                                    >
                                        {/* {likeCount} */}
                                        {liked ? likeCount + 1 : likeCount}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                            {/* 스크랩 버튼 */}
                            <TouchableOpacity
                                style={styles.actionButton}
                                onPress={handleScrap}
                            >
                                <View style={styles.marginBox}>
                                    <ScrapIcon />
                                    <Text
                                        style={[
                                            text.countText,
                                            scrapped === 1 && {
                                                color: '#52A55D',
                                            },
                                        ]}
                                    >
                                        {scrapped === 1
                                            ? scrapCount + 1
                                            : scrapCount}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                            {/* 공유 버튼 */}
                            <TouchableOpacity
                                style={styles.actionButton2}
                                onPress={handleShare}
                            >
                                <ShareIcon />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* 본문 */}
                    <View style={styles.titleContainer}>
                        <Text style={text.titleText}>{title}</Text>
                        <View style={styles.titleUnderBar} />
                    </View>
                    <View style={styles.contentContainer}>
                        <Text style={text.contentText}>{content}</Text>
                    </View>
                </View>
                <View style={styles.endOfPostBox} />

                {/* 댓글 */}
                <View style={styles.commentCountConatiner}>
                    <Text style={text.commentCountText}>
                        {t('comment')} {comments.length}
                    </Text>
                </View>
                {postDetail &&
                    (comments && Array.isArray(comments) ? comments : []).map(
                        (comment: any) => (
                            <Comment
                                key={comment.commentId}
                                comment={comment}
                                postId={postDetail.id}
                                onReply={handleReply}
                            />
                        ),
                    )}
                <View style={styles.endOfCommentBox} />
            </ScrollView>
            {/* 댓글 작성 */}
            <View style={styles.addComment}>
                <TouchableOpacity onPress={toggleCommentAnonymous}>
                    <View style={styles.commentAnonymousContainer}>
                        <Image
                            source={
                                commentIsAnonymous
                                    ? require('@/public/assets/checkbox-icon.png')
                                    : require('@/public/assets/check-icon.png')
                            }
                            style={styles.anonymousIcon}
                        />
                        <Text
                            style={
                                commentIsAnonymous
                                    ? text.notAnonymousText
                                    : text.anonymousText
                            }
                        >
                            {t('post-anonymous')}
                        </Text>
                    </View>
                </TouchableOpacity>
                <TextInput
                    style={[text.commentBoxText, styles.commentBox]}
                    placeholder={t('post-give-comment')}
                    placeholderTextColor="#949494"
                />
                <TouchableOpacity
                    style={styles.commentButton}
                    onPress={handleSendComment}
                >
                    <Image
                        source={require('@/public/assets/comment.png')}
                        style={styles.sendIcon}
                    />
                </TouchableOpacity>
            </View>

            {/* 게시글 삭제 모달-alert */}
            <Modal
                visible={showAlert}
                transparent
                animationType="fade"
                onRequestClose={() => setShowSharedAlert(false)}
            >
                <View style={styles.overlay}>
                    <View style={styles.modalContainer}>
                        <AlertModal
                            message={t('post-delete-ing')}
                            leftButtonText={t('post-yes')}
                            rightButtonText={t('post-no')}
                            onLeftClicked={onDelete}
                            onRightClicked={handleNothing}
                        />
                    </View>
                </View>
            </Modal>
            {/* 게시글 삭제 완료 모달 */}
            <Modal
                visible={showDeleteDoneAlert}
                transparent
                animationType="fade"
                onRequestClose={() => setShowSharedAlert(false)}
            >
                <TouchableWithoutFeedback
                    onPress={() => setShowSharedAlert(false)}
                >
                    <View style={styles.overlay}>
                        <View style={styles.modalContainer}>
                            <SimpleModal
                                visible={false}
                                baseText={t('post-delete')}
                                highlightText={t('common-delete')}
                            />
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
            {/* 공유하기 완료 모달 */}
            <Modal
                visible={showSharedAlert}
                transparent
                animationType="fade"
                onRequestClose={() => setShowSharedAlert(false)}
            >
                <TouchableWithoutFeedback
                    onPress={() => setShowSharedAlert(false)}
                >
                    <View style={styles.overlay}>
                        <View style={styles.modalContainer}>
                            <SimpleModal
                                visible={false}
                                baseText={t('post-copied')}
                                highlightText={t('post-url')}
                            />
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </View>
    )
}
