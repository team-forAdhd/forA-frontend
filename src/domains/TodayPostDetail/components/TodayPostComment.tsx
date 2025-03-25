import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleProp,
    TextStyle,
    StyleSheet,
    Alert,
    FlatList,
} from 'react-native';
import { formatDate } from '@/common/formatDate';
import { LikedIcon, ClikedLikedIcon } from '@/public/assets/SvgComponents';
import { imagePathMerge } from '@/utils/imagePathMerge';
import { Comment } from '@/domains/TodayPostDetail/types/today.types';
import { useCommentLikeMutation } from '@/domains/TodayPostDetail/api/commentLike.api';
import { useDeleteCommentMutation } from '@/domains/TodayPostDetail/api/deleteComment.api';
import ConfirmModal from '@/components/common/modals/ConfirmModal';
import LoadingModal from '@/components/common/modals/loadingModal';
import { useTodayComments } from '@/domains/TodayPostDetail/api/comment.api';

interface CommentProps {
    postId: number;
    onReply: (commentId: number) => void;
}

const TodayPostComment: React.FC<CommentProps> = ({ postId, onReply }) => {
    const { t } = useTranslation('board');
    const { data, error, fetchNextPage } = useTodayComments(postId);
    const { mutate: likeComment, isPending: isLikePending } =
        useCommentLikeMutation();
    const { mutate: deleteComment, isPending: isDeletePending } =
        useDeleteCommentMutation();
    const [deleteCommentTarget, setDeleteCommentTarget] =
        useState<Comment | null>(null);

    if (!data) return null;
    if (error) return <Text>에러가 발생했습니다.</Text>;
    const comments = data.pages.map((page) => page.commentList).flat();

    return (
        <>
            <View style={styles.commentCountConatiner}>
                <Text style={text.commentCountText}>
                    {t('comment')} {comments.length}
                </Text>
            </View>
            <FlatList
                data={comments}
                renderItem={({ item }) => (
                    <PostCommentItem
                        comment={item}
                        deleteComment={deleteComment}
                        likeComment={likeComment}
                        onReply={onReply}
                        setDeleteCommentTarget={setDeleteCommentTarget}
                    />
                )}
                onEndReached={() => fetchNextPage()}
            />
            <ConfirmModal
                title="댓글 삭제"
                message="해당 댓글을 삭제하시겠습니까?"
                visible={!!deleteCommentTarget}
                onConfirm={() => {
                    deleteComment(deleteCommentTarget as Comment);
                    setDeleteCommentTarget(null);
                }}
                onCancel={() => setDeleteCommentTarget(null)}
            />
            <LoadingModal visible={isDeletePending || isLikePending} />
        </>
    );
};

function PostCommentItem({
    comment,
    deleteComment,
    likeComment,
    onReply,
    setDeleteCommentTarget,
}: {
    comment: Comment;
    likeComment: (comment: Comment) => void;
    onReply: (commentNum: number) => void;
    deleteComment: (commentNum: Comment) => void;
    setDeleteCommentTarget: (comment: Comment) => void;
}) {
    const { t } = useTranslation('board');
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
                            : comment.nickname}
                        {comment.isCommentAuthor && '(나)'}
                    </Text>
                    <View style={styles.actionContainer}>
                        <TouchableOpacity
                            style={styles.actionButton}
                            onPress={() => {
                                if (!comment.isCommentAuthor)
                                    likeComment(comment);
                            }}
                        >
                            <View style={styles.marginBox}>
                                {comment.isLiked ? (
                                    <ClikedLikedIcon />
                                ) : (
                                    <LikedIcon />
                                )}
                                <Text
                                    style={[
                                        text.countText,
                                        comment.isLiked && {
                                            color: '#52A55D',
                                        },
                                    ]}
                                >
                                    {comment.likeCount}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <Text style={text.commentText}>{comment.content}</Text>
                <View style={styles.commentBottom}>
                    <Text style={text.timestampText}>
                        {formatDate(comment.createdAt)}
                    </Text>
                    <TouchableOpacity
                        onPress={() =>
                            Alert.alert(
                                '답글 작성',
                                '답글을 작성하시겠습니까?',
                                [
                                    { text: '아니오', style: 'cancel' },
                                    {
                                        text: '네',
                                        onPress: () => onReply(comment.id),
                                    },
                                ],
                            )
                        }
                        style={styles.deleteButton}
                    >
                        <Text style={text.replyButtonText}>
                            {t('comment-reply')}
                        </Text>
                    </TouchableOpacity>
                    {comment.isCommentAuthor && (
                        <TouchableOpacity
                            onPress={() => setDeleteCommentTarget(comment)}
                            style={styles.deleteButton}
                        >
                            <Text style={text.deleteButtonText}>
                                {t('common-delete')}
                            </Text>
                        </TouchableOpacity>
                    )}
                </View>
                {comment.children.map((reply, index) => (
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
                                        uri: imagePathMerge(reply.profileImage),
                                    }}
                                    style={styles.profileImage}
                                />
                            )}
                            <Text style={text.nicknameText}>
                                {reply.anonymous
                                    ? t('post-anonymous')
                                    : reply.nickname}
                                {reply.isCommentAuthor && '(나)'}
                            </Text>
                            <View style={styles.actionContainer}>
                                <TouchableOpacity
                                    style={[styles.actionButton]}
                                    onPress={() => {
                                        if (!reply.isCommentAuthor)
                                            Alert.alert(
                                                '댓글 좋아요',
                                                '해당 댓글에 좋아요를 누르시겠습니까?',
                                                [
                                                    {
                                                        text: '아니오',
                                                        style: 'cancel',
                                                    },
                                                    {
                                                        text: '네',
                                                        onPress: () =>
                                                            likeComment(reply),
                                                    },
                                                ],
                                            );
                                    }}
                                >
                                    <View style={styles.marginBox}>
                                        {reply.isLiked ? (
                                            <ClikedLikedIcon />
                                        ) : (
                                            <LikedIcon />
                                        )}
                                        <Text
                                            style={[
                                                text.countText,
                                                reply.isLiked && {
                                                    color: '#52A55D',
                                                },
                                            ]}
                                        >
                                            {reply.likeCount}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <Text style={text.commentText}>{reply.content}</Text>
                        <View style={styles.commentBottom}>
                            <Text style={text.timestampText}>
                                {formatDate(reply.createdAt)}
                            </Text>
                            {/* <TouchableOpacity
                                onPress={() => onReply(comment.id)}
                                style={styles.deleteButton}
                            >
                                <Text style={text.replyButtonText}>
                                    {t('comment-reply')}
                                </Text>
                            </TouchableOpacity> */}
                            {reply.isCommentAuthor && (
                                <TouchableOpacity
                                    onPress={() =>
                                        setDeleteCommentTarget(reply)
                                    }
                                    style={styles.deleteButton}
                                >
                                    <Text style={text.deleteButtonText}>
                                        {t('common-delete')}
                                    </Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    </View>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    commentCountConatiner: {
        marginHorizontal: 16,
        marginVertical: 16,
    },
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
    actionContainer: {
        position: 'absolute',
        flexDirection: 'row',
        alignItems: 'center',
        right: 0,
    },
    actionButton: {
        alignItems: 'center',
        justifyContent: 'center',
        gap: 5,
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
    commentCountText: {
        color: '#232323',
        fontSize: 18,
        fontWeight: '600',
        lineHeight: 22.4,
    },
} as {
    [key: string]: StyleProp<TextStyle>;
};

export default TodayPostComment;
