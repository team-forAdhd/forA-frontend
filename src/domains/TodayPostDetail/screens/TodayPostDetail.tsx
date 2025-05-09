import {
    View,
    TouchableOpacity,
    Modal,
    TouchableWithoutFeedback,
    StyleSheet,
    StyleProp,
    TextStyle,
    SafeAreaView,
    Alert,
    FlatList,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import SimpleModal from '@/components/common/simpleModal/SimpleModal';

import { useDeletePostMutation } from '@/domains/TodayPostDetail/api/deletePost.api';
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import { TodayStackParams } from '@/navigation/stacks/TodayStack';
import { useTodayPostDetail } from '@/domains/TodayPostDetail/api/getTodayPostDetail.api';
import CommentInput from '@/domains/TodayPostDetail/components/CommentInput';
import { usePostLikeMutation } from '@/domains/TodayPostDetail/api/todayPostLike.api';
import { Post } from '@/domains/TodayPostDetail/types/today.types';
import { useTodayPostScrapMutation } from '@/domains/TodayPostDetail/api/todayPostScrap.api';
import { LoadingScreen } from '@/components/common/Loading';
import { NotFound } from '@/components/common/NotFound';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Header from '@/components/common/ui/header';
import TodayPostOptions from '@/domains/TodayPostDetail/components/TodayPostOptions';

import { getUserProfileApi } from '@/api/getUserProfileApi';
import { useAuthStore } from '@/store/authStore';
import TodayPostBody from '@/domains/TodayPostDetail/components/TodayPostBody';
import AdminActionModal from '@/domains/TodayPostDetail/components/AdminActionModal';
import { getCommentsApi } from '@/api/home/getCommentApi.ts';
import { useQuery } from '@tanstack/react-query';

// const reportList = [
//     '특정인에 대한 욕설 및 비하',
//     '잘못된 정보',
//     '개인정보 유출',
//     '상업적 광고 및 판매글',
//     '타인에게 혐오감을 주는 게시글',
// ];

export default function TodayPostDetail({
    route,
    navigation,
}: StackScreenProps<TodayStackParams, 'PostDetail'>) {
    const { t } = useTranslation('board');
    const { postId } = route.params;

    const userId = useAuthStore((state) => state.email);
    const user = useAuthStore((state) => state.user);
    const [userRole, setUserRole] = useState<string | undefined>();
    // const postNavigation =
    //     useNavigation<StackNavigationProp<TodayStackParams, 'PostDetail'>>();

    const handleEdit = async () => {
        navigation.navigate('EditPost', { postId });
    };

    const postLikeMutation = usePostLikeMutation();
    const postScrapMutation = useTodayPostScrapMutation();
    const deletePostMutation = useDeletePostMutation({ navigation });

    const {
        data: postDetail,
        isPending,
        isError,
        error,
    } = useTodayPostDetail(postId);

    const { data: commentData, isLoading: isCommentsLoading } = useQuery({
        queryKey: ['comments', postId],
        queryFn: () => getCommentsApi(postId),
    });
    console.log('commentData:', commentData);
    const comments = commentData?.commentList ?? [];

    useEffect(() => {
        if (postDetail) {
            console.log(
                'postDetail 전체:',
                JSON.stringify(postDetail, null, 2),
            );
        }
    }, [postDetail]);

    const shouldShowOptions = !!postDetail;

    const [showSharedAlert, setShowSharedAlert] = useState(false);

    const [rangeBottomSheet, setRangeBottomSheet] = useState<boolean>(false);
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [replyCommentId, setReplyCommentId] = useState();

    const postLike = () => {
        if (postDetail) {
            postLikeMutation.mutate(postDetail);
        }
    };

    const postScrap = () => {
        postScrapMutation.mutate(postId);
    };

    const handleSelectReply = async (commentId: any) => {
        setReplyCommentId(commentId);
    };

    const onDelete = () => {
        handleDelete();
    };

    const handleDelete = async () => {
        Alert.alert('게시글 삭제', '게시글을 삭제하시겠습니까?', [
            { text: '아니오', style: 'cancel' },
            {
                text: '확인',
                onPress: () => deletePostMutation.mutate({ postId }),
            },
        ]);
    };

    const commentLength = postDetail?.comments
        ? postDetail?.comments.reduce((acc: number, cur: any) => {
              if (cur.children.length) {
                  return acc + cur.children.length + 1;
              }
              return acc + 1;
          }, 0)
        : 0;

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const userProfile = await getUserProfileApi();
                setUserRole(userProfile.userRole);
            } catch (e) {
                console.log('유저 역할 조회 실패', e);
            }
        };

        fetchUserProfile();
    }, []);

    useEffect(() => {
        console.log(' 상세조회 postId:', postId);
    }, []);

    if (isPending) {
        return <LoadingScreen />;
    }

    if (isError || !postDetail) {
        return <NotFound informText="게시물을 찾을 수 없습니다." />;
    }

    return (
        <SafeAreaView style={styles.container}>
            {rangeBottomSheet ||
                (modalVisible && (
                    <View style={styles.bottomActivatedContainer}>
                        <TouchableOpacity
                            onPress={() => setRangeBottomSheet(false)}
                            style={{ flex: 1 }}
                        />
                    </View>
                ))}
            <Header
                backIconType="chevron"
                headerText={postDetail.category}
                navigation={navigation}
            >
                <View style={styles.postOptionsContainer}>
                    {postDetail.isAuthor && (
                        <View style={styles.isAuthorButtonBox}>
                            <TouchableOpacity onPress={handleEdit}>
                                <FontAwesome name="pencil" size={24} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={onDelete}>
                                <FontAwesome name="trash" size={24} />
                            </TouchableOpacity>
                        </View>
                    )}
                    <TodayPostOptions
                        userId={postDetail?.userId ?? ''}
                        navigation={navigation}
                        postId={postId}
                        userRole={userRole}
                    />
                </View>
            </Header>
            <FlatList
                data={[postDetail]}
                renderItem={({ item }) => (
                    <TodayPostBody
                        //post={item}
                        post={postDetail}
                        postLike={postLike}
                        postScrap={postScrap}
                        onReply={handleSelectReply}
                        comments={comments}
                    />
                )}
            />
            {/* 댓글 작성 */}
            <CommentInput
                postId={postDetail.id}
                replyCommentId={replyCommentId}
            />

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
        backgroundColor: 'white',
        zIndex: 20,
    },
    gobackIcon: {
        position: 'absolute',
        left: 10,
        zIndex: 30,
    },
    postOptionsContainer: {
        flexDirection: 'row',
        gap: 10,
    },
    isAuthorButtonBox: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
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
        marginTop: 40,
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
