import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Modal,
    TextInput,
} from 'react-native'
import { useTranslation } from 'react-i18next'
import { useState, useEffect, Key } from 'react'
import { useNavigation } from '@react-navigation/native'
import { styles, text } from './PostDetailStyle'
import { getPostDetail } from '@/src/api/home/getPostsDetailsApi'
import { sendCommentApi } from '@/src/api/home/sendCommentApi'
import { getCommentApi } from '@/src/api/home/getCommentApi'
import { formatDate } from '@/src/common/formatDate'
import SimpleModal from '@/src/component/common/simpleModal/SimpleModal'
import AlertModal from '@/src/component/common/alertModal/AlertModal'
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
} from '@/resources/assets/SvgComponents'
import userStore from '@/src/store/userStore/userStore'
import * as Clipboard from 'expo-clipboard'
import { getPostLikedCount, togglePostLike } from '@/src/api/home/postLikedApi'
import { deletePostApi } from '@/src/api/home/deletePostApi'

const mockData = {
    postId: 1,
    categoryName: '10대',
    images: null,
    authorProfile: null,
    authorNickname: '작성자',
    isAnonymous: false,
    createdAt: '2023-05-01T12:00:00Z',
    title: '아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아',
    content:
        '나도 동아리 선후배들이랑 친해지고 싶어. 나도 동아리 선후배들이랑 친해지고 싶어. 나도 동아리 선후배들이랑 친해지고 싶어. 나도 동아리 선후배들이랑 친해지고 싶어. 나도 동아리 선후배들이랑 친해지고 싶어. 나도 동아리 선후배들이랑 친해지고 싶어. 나도 동아리 선후배들이랑 친해지고 싶어. 나도 동아리 선후배들이랑 친해지고 싶어. 나도 동아리 선후배들이랑 친해지고 싶어. 나도 동아리 선후배들이랑 친해지고 싶어. 나도 동아리 선후배들이랑 친해지고 싶어. 나도 동아리 선후배들이랑 친해지고 싶어. 나도 동아리 선후배들이랑 친해지고 싶어. 나도 동아리 선후배들이랑 친해지고 싶어. 나도 동아리 선후배들이랑 친해지고 싶어. 나도 동아리 선후배들이랑 친해지고 싶어. 나도 동아리 선후배들이랑 친해지고 싶어. 나도 동아리 선후배들이랑 친해지고 싶어.',
    likedCount: 10, // 좋아요 개수 (API에서 받아올 것) getPostLikedApi.ts, getCommentLikedApi.ts
    scrapCount: 5, // 스크랩 개수 (API에서 받아올 것) getPostScrappedApi.ts
}

const mockComments = [
    {
        commentId: 1,
        userId: '이야얍',
        userProfilePicture: 'http://example.com/user1.jpg',
        content: '첫 번째 댓글입니다.',
        createdAt: '2024-05-23T12:00:00Z',
        anonymous: true,
        likes: 5,
        replies: [], // 답글이 없는 경우 빈 배열로 표시
    },
    {
        commentId: 2,
        userId: '헤이',
        userProfilePicture: '',
        content: '두 번째 댓글입니다.',
        createdAt: '2024-05-23T12:15:00Z',
        anonymous: true,
        likes: 3,
        replies: [], // 답글이 없는 경우 빈 배열로 표시
    },
    {
        commentId: 1,
        userId: '와웅',
        userProfilePicture: '',
        content: '첫 번째 댓글입니다.',
        createdAt: '2024-05-23T12:00:00Z',
        anonymous: true,
        likes: 5,
        replies: [
            {
                replyId: 101,
                userId: '예예',
                userProfilePicture: 'http://example.com/user3.jpg',
                content: '첫 번째 댓글에 대한 답글입니다.',
                createdAt: '2024-05-23T12:10:00Z',
                anonymous: true,
                likes: 2,
            },
        ],
    },
    {
        commentId: 2,
        userId: 456,
        userProfilePicture: 'http://example.com/user2.jpg',
        content: '두 번째 댓글입니다.',
        createdAt: '2024-05-23T12:15:00Z',
        anonymous: true,
        likes: 3,
        replies: [
            {
                replyId: 102,
                userId: 987,
                userProfilePicture: 'http://example.com/user4.jpg',
                content: '두 번째 댓글에 대한 답글입니다.',
                createdAt: '2024-05-23T12:20:00Z',
                anonymous: true,
                likes: 1,
            },
        ],
    },
    // 추가 코멘트 데이터
]

interface PostDetailProps {
    postId: number
}

export default function PostDetail({ postId }: PostDetailProps) {
    const { t } = useTranslation('board')
    const navigation = useNavigation()

    const [showSharedAlert, setShowSharedAlert] = useState(false)
    const [showAlert, setShowAlert] = useState(false)
    const [showDeleteDoneAlert, setShowDeleteDoneAlert] = useState(false)
    const [postDetail, setPostDetail] = useState<any>(mockData)
    const [liked, setIsLiked] = useState(false)
    const [scrapped, setIsScrapped] = useState(false)
    const [comments, setComments] = useState<any>(mockComments)
    const [commentIsAnonymous, setCommentIsAnonymous] = useState<boolean>(true)
    const [commentContent, setCommentContent] = useState<string>('')
    const [isAuthor, setIsAuthor] = useState(false)

    // useEffect(() => {
    //     const fetchPostDetail = async () => {
    //         try {
    //             const data = await getPostDetail(postId) // 실제 postId 사용
    //             setPostDetail(data)
    //             setIsAuthor(data.authorNickname === userStore.nickname)
    //         } catch (error) {
    //             console.error(error)
    //             setPostDetail(mockData) // API 실패 시 mock 데이터 사용
    //         }
    //     }

    //     fetchPostDetail()

    //     const fetchComments = async () => {
    //         try {
    //             const data = await getCommentApi(postId)
    //             setComments(data)
    //         } catch (error) {
    //             console.error(error)
    //             setComments([mockComments])
    //         }
    //     }

    //     fetchComments()
    // }, [postId])

    const {
        categoryName,
        images,
        authorProfile,
        authorNickname,
        isAnonymous,
        createdAt,
        title,
        content,
        likedCount,
        scrapCount,
    } = postDetail

    const toggleCommentAnonymous = () => {
        setCommentIsAnonymous((prevState) => !prevState)
    }

    const sendComment = (commentId: any) => {
        const postData = {
            postId: postId,
            content: commentContent,
            isAnonymous: commentIsAnonymous,
            reply: commentId ? commentId : null, // 답글인 경우, 답글의 ID
        }
        sendCommentApi(postData)
    }

    const handleReply = (commentId: any) => {
        sendComment(commentId)
    }

    const handleShare = () => {
        const postLink = `https://example.com/posts/${postId}` // postId에 따라 실제 주소 생성
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
            const newLikedCount = await togglePostLike(
                postId,
                postDetail.likedCount,
            )
            setPostDetail((prevPostDetail: any) => ({
                ...prevPostDetail,
                likedCount: newLikedCount,
            }))
            setIsLiked(!liked)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.gobackIcon}
                    onPress={() => navigation.goBack()}
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
                    {categoryName}
                </Text>
                {isAuthor && (
                    <View style={styles.isAuthorButtonBox}>
                        <TouchableOpacity>
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
                        <Image
                            source={
                                require('@/resources/assets/defaultProfile.png')
                                // authorProfile ? { uri: authorProfile } : require('@/resources/assets/defaultProfile.png')
                            }
                            style={styles.icon}
                        />
                        <View style={styles.userInfoTextContainer}>
                            <Text style={text.userText}>
                                {commentIsAnonymous ? '익명' : authorNickname}
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
                                        {likedCount}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                            {/* 스크랩 버튼 */}
                            <TouchableOpacity style={styles.actionButton}>
                                <View style={styles.marginBox}>
                                    <ScrapIcon />
                                    <Text style={text.countText}>
                                        {scrapCount}
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
                {comments.map((comment: any) => (
                    <Comment
                        key={comment.commentId}
                        comment={comment}
                        onReply={handleReply}
                    />
                ))}
                <View style={styles.endOfCommentBox} />
            </ScrollView>
            {/* 댓글 작성 */}
            <View style={styles.addComment}>
                <TouchableOpacity onPress={toggleCommentAnonymous}>
                    <View style={styles.commentAnonymousContainer}>
                        <Image
                            source={
                                commentIsAnonymous
                                    ? require('@/resources/assets/checkbox-icon.png')
                                    : require('@/resources/assets/check-icon.png')
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
                    onPress={sendComment}
                >
                    <Image
                        source={require('@/resources/assets/comment.png')}
                        style={styles.sendIcon}
                    />
                </TouchableOpacity>
            </View>

            {/* 게시글 삭제 모달-alert */}
            <Modal visible={showAlert} transparent animationType="fade">
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
            </Modal>
            {/* 공유하기 완료 모달 */}
            <Modal visible={showSharedAlert} transparent animationType="fade">
                <View style={styles.overlay}>
                    <View style={styles.modalContainer}>
                        <SimpleModal
                            visible={false}
                            baseText={t('post-copied')}
                            highlightText={t('post-url')}
                        />
                    </View>
                </View>
            </Modal>
        </View>
    )
}
