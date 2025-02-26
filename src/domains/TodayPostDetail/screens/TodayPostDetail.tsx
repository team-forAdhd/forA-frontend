import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Modal,
    TouchableWithoutFeedback,
    ActivityIndicator,
    StyleSheet,
    StyleProp,
    TextStyle,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useState, useEffect, Key } from 'react';
import { useNavigation } from '@react-navigation/native';
import { formatDate } from '@/common/formatDate';
import SimpleModal from '@/components/common/simpleModal/SimpleModal';
import AlertModal from '@/components/common/modals/AlertModal';
import TodayPostComment from '../components/TodayPostComment';
import { ScrollView } from 'react-native-gesture-handler';
import {
    LikedIcon,
    ScrapIcon,
    ShareIcon,
    DeleteIcon2,
    EditIcon,
    LeftArrowIcon,
    ClikedLikedIcon,
} from '@/public/assets/SvgComponents';
import * as Clipboard from 'expo-clipboard';
import { deletePostApi } from '@/api/home/deletePostApi';
import { API_URL } from '@env';
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import BottomSheet from '@/components/medicine/medBottomSheet/BottomSheet';
import BlockModal from '@/components/common/block/blockModal';
import { imagePathMerge } from '@/utils/imagePathMerge';
import { TodayStackParams } from '@/navigation/stacks/TodayStack';
import { useTodayPostDetail } from '@/domains/TodayPostDetail/api/getTodayPostDetail.api';
import CommentInput from '@/domains/TodayPostDetail/components/CommentInput';
import { useAuthStore } from '@/store/authStore';
import { usePostLikeMutation } from '@/domains/TodayPostDetail/api/todayPostLike.api';
import { Post } from '@/domains/TodayPostDetail/types/todayPostDetail.types';
import { useTodayPostScrapMutation } from '@/domains/TodayPostDetail/api/todayPostScrap.api';

const reportList = [
    '특정인에 대한 욕설 및 비하',
    '잘못된 정보',
    '개인정보 유출',
    '상업적 광고 및 판매글',
    '타인에게 혐오감을 주는 게시글',
];

export default function TodayPostDetail({
    route,
}: StackScreenProps<TodayStackParams, 'PostDetail'>) {
    const { t } = useTranslation('board');
    const { postId } = route.params;
    const navigation = useNavigation();
    const userId = useAuthStore((state) => state.userId);
    const postNavigation =
        useNavigation<StackNavigationProp<TodayStackParams, 'PostDetail'>>();

    const handleEdit = async () => {
        postNavigation.navigate('EditPost', { postId });
    };
    const { data: postDetail, isPending } = useTodayPostDetail(postId);

    const [showSharedAlert, setShowSharedAlert] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [showDeleteDoneAlert, setShowDeleteDoneAlert] = useState(false);

    const [rangeBottomSheet, setRangeBottomSheet] = useState<boolean>(false);
    const rangeList = ['차단하기', '신고하기', '공유하기'];
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const [replyCommentId, setReplyCommentId] = useState();

    const isAuthor = postDetail?.userId === userId;

    const { mutate: postLike } = usePostLikeMutation(postDetail as Post);
    const { mutate: postScrap } = useTodayPostScrapMutation(postId);

    const handleReport = () => {
        setIsModalVisible(false);
        console.log('게시글 신고 완료');
    };

    const [range, setRange] = useState<string>(rangeList[0]);

    const handleSendReply = async (commentId: any) => {
        setReplyCommentId(commentId);
    };

    const handleShare = () => {
        const postLink = `${API_URL}posts/${postId}`; // postId에 따라 실제 주소 생성
        Clipboard.setString(postLink);
        setShowSharedAlert(true);
    };

    const onDelete = () => {
        handleDelete();
    };

    const handleDelete = async () => {
        try {
            await deletePostApi(postId);
            setShowDeleteDoneAlert(true);
        } catch (error) {
            console.error(error);
        }
    };

    const handleNothing = () => {
        setShowAlert(false);
    };

    const handleGoback = () => {
        navigation.goBack();
    };
    if (!postDetail || isPending)
        return <ActivityIndicator size={'large'} color={'green'} />;

    return (
        <View style={styles.container}>
            {rangeBottomSheet ||
                (modalVisible && (
                    <View style={styles.bottomActivatedContainer}>
                        <TouchableOpacity
                            onPress={() => setRangeBottomSheet(false)}
                            style={{ flex: 1 }}
                        />
                    </View>
                ))}
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.gobackIcon}
                    onPress={handleGoback}
                >
                    <LeftArrowIcon />
                </TouchableOpacity>
                <Text style={text.categoryText}>{postDetail.category}</Text>
                <TouchableOpacity
                    onPress={() => {
                        setRangeBottomSheet(true);
                    }}
                >
                    <Image
                        source={require('@/public/assets/more.png')}
                        style={{ width: 24, height: 26 }}
                    />
                </TouchableOpacity>
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
                <View style={styles.bodyConatiner}>
                    {/* 작성자 정보 */}
                    <View style={styles.userInfoContainer}>
                        {postDetail && postDetail.profileImage ? (
                            <Image
                                source={{
                                    uri: imagePathMerge(
                                        postDetail.profileImage,
                                    ),
                                }}
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
                                {postDetail.anonymous
                                    ? '익명'
                                    : postDetail.nickname}
                            </Text>
                            {/* 작성 날짜 및 시간 */}
                            <Text style={text.createdAt}>
                                {formatDate(postDetail.createdAt)}
                            </Text>
                        </View>
                        {postDetail.id !== -1 && (
                            <View style={styles.actionButtonContainer}>
                                {/* 좋아요 버튼 */}
                                <TouchableOpacity
                                    style={styles.actionButton}
                                    onPress={() => postLike()}
                                >
                                    <View style={styles.marginBox}>
                                        {/* {liked ? (
                                            <ClikedLikedIcon />
                                        ) : ( */}
                                        <LikedIcon />
                                        {/* )} */}
                                        <Text
                                            style={[
                                                text.countText,
                                                // liked && { color: '#52A55D' },
                                            ]}
                                        >
                                            {/* {likeCount} */}
                                            {postDetail.likeCount}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                                {/* 스크랩 버튼 */}
                                <TouchableOpacity
                                    style={styles.actionButton}
                                    onPress={() => postScrap()}
                                >
                                    <View style={styles.marginBox}>
                                        <ScrapIcon />
                                        <Text
                                            style={[
                                                text.countText,
                                                // scrapped === 1 && {
                                                //     color: '#52A55D',
                                                // },
                                            ]}
                                        >
                                            {postDetail.scrapCount}
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
                        )}
                    </View>

                    {/* 본문 */}
                    <View style={styles.titleContainer}>
                        <Text style={text.titleText}>{postDetail.title}</Text>
                        <View style={styles.titleUnderBar} />
                    </View>
                    <View style={styles.contentContainer}>
                        {/* 첨부 사진이 있는 경우 나타나는 첨부사진 view */}
                        {postDetail.images && postDetail.images.length > 0 && (
                            <View style={styles.imageContainer}>
                                {postDetail.images.map(
                                    (
                                        img: any,
                                        index: Key | null | undefined,
                                    ) => (
                                        <Image
                                            key={index}
                                            source={{
                                                uri: imagePathMerge(img),
                                            }}
                                            style={styles.imageBox}
                                        />
                                    ),
                                )}
                            </View>
                        )}
                        <Text style={text.contentText}>
                            {postDetail.content}
                        </Text>
                    </View>
                </View>
                <View style={styles.endOfPostBox} />

                {/* 댓글 */}
                <View style={styles.commentCountConatiner}>
                    <Text style={text.commentCountText}>
                        {t('comment')} {postDetail.comments.length}
                    </Text>
                </View>
                {postDetail &&
                    (postDetail.comments && Array.isArray(postDetail.comments)
                        ? postDetail.comments
                        : []
                    ).map((comment: any) => (
                        <TodayPostComment
                            key={comment.commentId}
                            comment={comment}
                            postId={postDetail.id}
                            onReply={handleSendReply}
                        />
                    ))}
                <View style={styles.endOfCommentBox} />
            </ScrollView>
            {/* 댓글 작성 */}
            <CommentInput
                postId={postDetail.id}
                replyCommentId={replyCommentId}
            />
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

            {/* 신고하기 모달 */}
            <Modal
                transparent={true}
                visible={isModalVisible}
                animationType="fade"
                onRequestClose={() => {
                    setIsModalVisible(!isModalVisible);
                }}
            >
                <View
                    style={[
                        styles.overlay,
                        { justifyContent: 'center', alignItems: 'center' },
                    ]}
                >
                    <View style={styles.reportModalContainer}>
                        <Text style={text.reportModalTitleText}>
                            게시글 신고
                        </Text>
                        <View style={styles.reportModalLine} />

                        {reportList.map((report) => (
                            <TouchableOpacity
                                style={styles.reportModalContent}
                                onPress={handleReport}
                            >
                                <Text style={text.reportModalContentText}>
                                    {report}
                                </Text>
                            </TouchableOpacity>
                        ))}

                        <View style={styles.reportModalExitContainer}>
                            <TouchableOpacity
                                activeOpacity={1}
                                style={styles.reportModalExit}
                                onPress={() => {
                                    setIsModalVisible(!isModalVisible);
                                }}
                            >
                                <Text style={text.reportModalExitText}>
                                    닫기
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            {rangeBottomSheet && (
                <BottomSheet
                    visible={rangeBottomSheet}
                    onClose={() => setRangeBottomSheet(false)}
                    options={rangeList}
                    onSelect={(range) => {
                        setRange(range);
                        if (range == '차단하기') {
                            setModalVisible(!modalVisible);
                        }
                        if (range == '신고하기') {
                            setIsModalVisible(true);
                        }
                    }}
                    selectedOption={range}
                />
            )}
            {modalVisible && (
                <BlockModal
                    modalVisible={modalVisible}
                    setModalVisible={setModalVisible}
                    question={
                        '이 멤버가 포에이에서 쓴 글과 댓글이 보이지 않고,\n 알림도 발송되지 않습니다.\n(차단을 하면 다시 해제하실 수 없습니다.)'
                    }
                    userId=""
                />
            )}
        </View>
    );
}

const notification = {
    id: -1,
    userId: '',
    title: '오늘탭 작성가이드 (필독!)',
    content: `안녕하세요, 포에이 담당자입니다.
‘포에이’ 이용에 불편이 없기를 바라며, 오늘탭 작성가이드를 알려드립니다\n
1. 카테고리에 맞게 글을 작성해주세요. ADHD의 증상은 나이대별로 상이하기에 10대, 20대, 30대 이상, 학부모용으로 나뉩니다.\n
2. 민감한 글, 욕설, 혐짤, 수위가 있는 내용은 반드시 5칸 이상 내려쓰세요. (밑에 예시 참고)
제목은 [!]으로 표시해주세요. 어길 시 게시글은 삭제됩니다.
.
.
.
.
.\n
3. 자살, 살인, 담당자 판단하에 수위가 높은 글 등의 내용을 담은 게시글은 무조건 삭제됩니다. 예를 들어, 힘들다, 우울하다 정도는 괜찮으나 죽고 싶어, 죽이고 싶어 혹은 자살방법을 묻는 글은 금지됩니다.\n`,
    anonymous: true,
    images: null,
    likeCount: 0,
    commentCount: 2,
    scrapCount: 0,
    viewCount: 1,
    category: '공지',
    comments: [],
    nickname: null,
    profileImage: null,
    createdAt: 1723046942,
    lastModifiedAt: 1723046949,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    bottomActivatedContainer: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        zIndex: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        opacity: 10,
        justifyContent: 'center',
        flexDirection: 'column',
    },
    header: {
        position: 'absolute',
        top: 52,
        width: '100%',
        height: 36,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        paddingRight: 16,
        paddingLeft: 16,
        zIndex: 20,
    },
    gobackIcon: {
        position: 'absolute',
        left: 10,
        zIndex: 30,
    },
    isAuthorButtonBox: {
        position: 'absolute',
        right: 10,
        flexDirection: 'row',
        alignItems: 'center',
        width: 82,
        height: 35,
    },
    overlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // 흐림 효과를 위한 반투명 배경
    },
    modalContainer: {
        position: 'absolute',
        top: 360,
        left: 13,
        justifyContent: 'center',
        alignItems: 'center',
    },
    reportModalContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 250,
        height: 300,
        borderRadius: 12,
        backgroundColor: 'white',
    },
    reportModalLine: {
        marginVertical: 10,
        width: '100%',
        height: 1,
        backgroundColor: '#EDEDEA',
    },
    reportModalContent: {
        marginVertical: 5,
        paddingLeft: 15,
        width: '100%',
        height: 30,
    },
    reportModalExitContainer: {
        marginTop: 10,
        width: '100%',
        alignItems: 'flex-end',
    },
    reportModalExit: {
        marginRight: 15,
    },
    scrollViewContainer: {
        flexGrow: 1,
        paddingBottom: 0,
    },
    imageBox: {
        width: '100%',
        height: 300,
        objectFit: 'contain',
    },
    imageContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
    },
    imageCountBox: {
        width: 70,
        height: 20,
        flexShrink: 0,
        borderRadius: 500,
        backgroundColor: 'rgba(0, 0, 0, 0.80)',
        right: 16,
        bottom: 16,
    },
    bodyConatiner: {
        marginTop: 100,
    },
    userInfoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    userInfoTextContainer: {
        flexDirection: 'column',
        marginLeft: 8,
        marginBottom: 12,
    },
    icon: {
        width: 43,
        height: 43,
        borderRadius: 16,
        marginLeft: 16,
    },
    actionButtonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginLeft: 'auto',
        marginRight: 16,
        marginBottom: 11,
    },
    actionButton: {
        alignItems: 'center',
        justifyContent: 'space-between',
        width: 48,
        height: 24,
        marginHorizontal: 5,
        borderRadius: 4,
        backgroundColor: '#fff',
        shadowColor: 'rgba(0, 0, 0, 0.15)',
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.5,
        shadowRadius: 3,
        elevation: 2,
    },
    actionButton2: {
        flexDirection: 'row',
        alignItems: 'center',
        width: 20,
        height: 20,
        borderRadius: 4,
        backgroundColor: '#fff',
        shadowColor: 'rgba(0, 0, 0, 0.15)',
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.5,
        shadowRadius: 3,
        elevation: 2,
    },
    titleContainer: {
        marginHorizontal: 16,
        marginVertical: 12,
    },
    titleUnderBar: {
        width: '100%',
        height: 1,
        borderBottomWidth: 1,
        borderBottomColor: '#555555',
        flexShrink: 0,
        marginTop: 12,
    },
    marginBox: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 8,
        marginTop: 2,
    },
    contentContainer: {
        marginHorizontal: 16,
        marginVertical: 13,
    },
    endOfPostBox: {
        width: '100%',
        height: 40,
        backgroundColor: '#EEE',
    },
    commentContainer: {
        marginTop: 16,
    },
    commentCountConatiner: {
        marginHorizontal: 16,
        marginVertical: 16,
    },
    commentAnonymousContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: 42,
        height: 17,
        marginRight: 10,
        marginLeft: 12,
    },
    endOfCommentBox: {
        width: '100%',
        height: 20,
        backgroundColor: '#EEE',
    },
});

const text = {
    fontFamily: 'Pretendard',
    fontStyle: 'normal',
    categoryText: {
        color: '#000',
        fontSize: 18,
        fontWeight: '600',
        lineHeight: 22.4,
        textAlign: 'center',
        flex: 1,
    },
    categoryWithImageText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: '600',
        lineHeight: 22.4,
        textAlign: 'center',
        flex: 1,
    },
    userText: {
        color: '#232323',
        fontSize: 16,
        fontWeight: '600',
        lineHeight: 22.4,
    },
    createdAtText: {
        color: '#232323',
        fontSize: 14,
        fontWeight: '400',
        lineHeight: 19.6,
        letterSpacing: -0.7,
    },
    countText: {
        color: '#232323',
        fontSize: 14,
        fontWeight: '400',
        lineHeight: 19.6,
        letterSpacing: -0.7,
        marginLeft: 2,
    },
    titleText: {
        color: '#232323',
        fontSize: 18,
        fontWeight: '600',
        lineHeight: 22.4,
    },
    contentText: {
        color: '#232323',
        fontSize: 18,
        fontWeight: '400',
        lineHeight: 26,
        letterSpacing: -0.9,
    },
    commentCountText: {
        color: '#232323',
        fontSize: 18,
        fontWeight: '600',
        lineHeight: 22.4,
    },
    anonymousText: {
        color: '#52A55D',
        fontSize: 12,
        fontWeight: '400',
        lineHeight: 16.8,
        letterSpacing: -0.6,
        marginLeft: 4,
    },
    notAnonymousText: {
        color: '#949494',
        fontSize: 12,
        fontWeight: '400',
        lineHeight: 16.8,
        letterSpacing: -0.6,
        marginLeft: 4,
    },
    reportModalTitleText: {
        color: '#52A35D',
        fontSize: 20,
        fontWeight: '700',
    },
    reportModalContentText: {
        color: '#232323',
        fontSize: 16,
        fontWeight: '500',
    },
    reportModalExitText: {
        color: '#232323',
        fontSize: 16,
        fontWeight: '500',
    },
} as {
    [key: string]: StyleProp<TextStyle>;
};
