import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Modal,
    StyleProp,
    TextStyle,
    StyleSheet,
} from 'react-native';
import { deleteCommentApi, deleteReplyApi } from '@/api/home/deleteCommentApi';
import { formatDate } from '@/common/formatDate';
import SimpleModal from '@/components/common/simpleModal/SimpleModal';
import AlertModal from '@/components/common/modals/AlertModal';
import userStore from '@/store/userStore/userStore';
import { LikedIcon, ClikedLikedIcon } from '@/public/assets/SvgComponents';
import { toggleCommentLike } from '@/api/home/commentLikedApi';
import { imagePathMerge } from '@/utils/imagePathMerge';
import { Comment } from '@/domains/TodayPostDetail/types/todayPostDetail.types';

interface CommentProps {
    comment: Comment;
    postId: number;
    onReply: (commentId: number) => void;
}

const TodayPostComment: React.FC<CommentProps> = ({
    comment,
    onReply,
    postId,
}) => {
    const { t } = useTranslation('board');
    const [showAlert, setShowAlert] = useState(false);
    const [liked, setLiked] = useState(false);
    const [likedCount, setLikedCount] = useState(comment.likeCount);
    const [replyLiked, setReplyLiked] = useState<boolean[]>([]);
    const [replyLikedCount, setReplyLikedCount] = useState<number[]>([]);
    const [deleteId, setDeleteId] = useState<number | null>(null);
    const [isReply, setIsReply] = useState(false);

    useEffect(() => {
        setReplyLiked(comment.children.map(() => false));
        setReplyLikedCount(comment.children.map((reply) => reply.likeCount));
    }, [comment.children]);

    const handleLike = async () => {
        try {
            const newLikedCount = await toggleCommentLike(
                comment.id,
                postId,
                comment.content,
                comment.anonymous,
            );
            setLikedCount(newLikedCount);
            setLiked(!liked);
        } catch (error) {
            console.error(error);
        }
    };

    const handleReplyLike = async (index: number, replyId: number) => {
        try {
            const newReplyLikedCount = await toggleCommentLike(
                comment.id,
                postId,
                comment.content,
                comment.anonymous,
            );
            setReplyLikedCount((prev) => {
                const newCounts = [...prev];
                newCounts[index] = newReplyLikedCount;
                return newCounts;
            });
            setReplyLiked((prev) => {
                const newLikes = [...prev];
                newLikes[index] = !newLikes[index];
                return newLikes;
            });
        } catch (error) {
            console.error(error);
        }
    };

    const isLoggedInUser =
        userStore.isLoggedIn && userStore.userId === comment.userId;

    const onDelete = (id: number, isReply: boolean) => {
        setDeleteId(id);
        setIsReply(isReply);
        setShowAlert(true);
    };

    const handleDelete = async () => {
        if (deleteId !== null) {
            try {
                if (isReply) {
                    await deleteReplyApi(deleteId);
                } else {
                    await deleteCommentApi(deleteId);
                }
            } catch (error) {
                console.error(error);
            }
        }
    };
    const handleNothing = () => {
        setShowAlert(false);
    };
    console.log(comment.children);
    return (
        <View style={styles.commentContainer}>
            <View style={styles.commentContent}>
                <View style={styles.commentHeader}>
                    {comment.anonymous || !comment.profileImage ? (
                        <Image
                            source={require('@/public/assets/defaultProfile.png')}
                            style={styles.profileImage}
                        />
                    ) : (
                        <Image
                            source={{
                                uri: imagePathMerge(comment.profileImage),
                            }}
                            style={styles.profileImage}
                        />
                    )}
                    <Text style={text.nicknameText}>
                        {comment.anonymous
                            ? t('post-anonymous')
                            : comment.userId}
                        {isLoggedInUser && '(나)'}
                    </Text>
                    <TouchableOpacity
                        style={styles.actionButton}
                        onPress={handleLike}
                    >
                        <View style={styles.marginBox}>
                            {liked ? <ClikedLikedIcon /> : <LikedIcon />}
                            <Text
                                style={[
                                    text.countText,
                                    liked && { color: '#52A55D' },
                                ]}
                            >
                                {liked
                                    ? comment.likeCount + 1
                                    : comment.likeCount}
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <Text style={text.commentText}>{comment.content}</Text>
                <View style={styles.commentBottom}>
                    <Text style={text.timestampText}>
                        {formatDate(comment.createdAt)}
                    </Text>
                    <TouchableOpacity
                        onPress={() => onReply(comment.id)}
                        style={styles.deleteButton}
                    >
                        <Text style={text.replyButtonText}>
                            {t('comment-reply')}
                        </Text>
                    </TouchableOpacity>
                    {isLoggedInUser && (
                        <TouchableOpacity
                            onPress={() => onDelete(comment.id, false)}
                            style={styles.deleteButton}
                        >
                            <Text style={text.deleteButtonText}>
                                {t('comment-delete')}
                            </Text>
                        </TouchableOpacity>
                    )}
                </View>
                {Array.isArray(comment.children) &&
                    comment.children.map((reply, index) => (
                        <View key={reply.id} style={styles.replyBox}>
                            <View style={styles.commentHeader}>
                                {reply.anonymous || !reply.profileImage ? (
                                    <Image
                                        source={require('@/public/assets/defaultProfile.png')}
                                        style={styles.profileImage}
                                    />
                                ) : (
                                    <Image
                                        source={{
                                            uri: imagePathMerge(
                                                reply.profileImage,
                                            ),
                                        }}
                                        style={styles.profileImage}
                                    />
                                )}
                                <Text style={text.nicknameText}>
                                    {reply.anonymous
                                        ? t('post-anonymous')
                                        : reply.userId}
                                    {isLoggedInUser && '(나)'}
                                </Text>
                                <TouchableOpacity
                                    style={styles.actionButton}
                                    onPress={() =>
                                        handleReplyLike(index, reply.id)
                                    }
                                >
                                    <View style={styles.marginBox}>
                                        <LikedIcon />
                                        {/* {replyLiked ? (
                                            <ClikedLikedIcon />
                                        ) : (
                                            <LikedIcon />
                                        )} */}
                                        <Text style={[text.countText]}>
                                            {reply.likeCount}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <Text style={text.commentText}>
                                {reply.content}
                            </Text>
                            <View style={styles.commentBottom}>
                                <Text style={text.timestampText}>
                                    {formatDate(reply.createdAt)}
                                </Text>
                                <TouchableOpacity
                                    onPress={() => onReply(comment.id)}
                                    style={styles.deleteButton}
                                >
                                    <Text style={text.replyButtonText}>
                                        {t('comment-reply')}
                                    </Text>
                                </TouchableOpacity>
                                {isLoggedInUser && (
                                    <TouchableOpacity
                                        onPress={() => onDelete(reply.id, true)}
                                        style={styles.deleteButton}
                                    >
                                        <Text style={text.deleteButtonText}>
                                            {t('comment-delete')}
                                        </Text>
                                    </TouchableOpacity>
                                )}
                            </View>
                        </View>
                    ))}
            </View>

            {/* 댓글 삭제 모달-alert */}
            <Modal visible={showAlert} transparent animationType="fade">
                <View style={styles.overlay}>
                    <View style={styles.modalContainer}>
                        <AlertModal
                            message={t('comment-delete-ing')}
                            leftButtonText={t('post-yes')}
                            rightButtonText={t('post-no')}
                            onLeftClicked={handleDelete}
                            onRightClicked={handleNothing}
                        />
                    </View>
                </View>
            </Modal>
            {/* 댓글 삭제 완료 모달 */}
            <Modal visible={showAlert} transparent animationType="fade">
                <View style={styles.overlay}>
                    <View style={styles.modalContainer}>
                        <SimpleModal
                            visible={false}
                            baseText={t('comment-delet')}
                            highlightText={t('common-delete')}
                        />
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    commentContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderColor: '#eee',
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
    profileImage: {
        width: 30,
        height: 30,
        borderRadius: 20,
        marginRight: 8,
    },
    replyProfileImage: {
        width: 23,
        height: 23,
        borderRadius: 20,
        marginRight: 8,
    },
    commentContent: {
        flex: 1,
    },
    commentHeader: {
        flexDirection: 'row',
    },
    actionButton: {
        position: 'absolute',
        right: 0,
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
    marginBox: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 8,
        marginTop: 2,
    },
    commentBottom: {
        flexDirection: 'row',
        marginLeft: 38,
    },
    deleteButton: {
        alignSelf: 'flex-start',
        marginLeft: 8,
    },
    replyBox: {
        marginLeft: 16,
        marginTop: 16,
    },
});

const text = {
    fontFamily: 'Pretendard',
    fontStyle: 'normal',
    nicknameText: {
        color: '#232323',
        fontSize: 16,
        fontWeight: '600',
        lineHeight: 22.4,
    },
    timestampText: {
        color: '#949494',
        fontSize: 14,
        fontWeight: '400',
        lineHeight: 19.6,
        letterSpacing: -0.7,
    },
    commentText: {
        color: '#232323',
        fontSize: 16,
        fontWeight: '400',
        lineHeight: 22.4,
        letterSpacing: -0.9,
        marginBottom: 4,
        marginLeft: 38,
    },
    replyButtonText: {
        color: '#232323',
        fontSize: 14,
        fontWeight: '400',
        lineHeight: 19.6,
        letterSpacing: -0.7,
    },
    deleteButtonText: {
        color: '#555',
        fontSize: 14,
        fontWeight: '400',
        lineHeight: 19.6,
        letterSpacing: -0.7,
    },
} as {
    [key: string]: StyleProp<TextStyle>;
};

export default TodayPostComment;
