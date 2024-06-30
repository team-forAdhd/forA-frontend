import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { View, Text, Image, TouchableOpacity, Modal } from 'react-native'
import { styles, text } from './CommentStyle'
import { deleteCommentApi } from '@/src/api/home/deleteCommentApi'
import { Timestamp } from 'react-native-reanimated/lib/typescript/reanimated2/commonTypes'
import { formatDate } from '@/src/common/formatDate'
import SimpleModal from '@/src/component/common/simpleModal/SimpleModal'
import AlertModal from '@/src/component/common/alertModal/AlertModal'
import userStore from '@/src/store/userStore/userStore'
import { LikedIcon, ClikedLikedIcon } from '@/resources/assets/SvgComponents'
import {
    getCommentLikedCount,
    toggleCommentLike,
} from '@/src/api/home/commentLikedApi'
interface Reply {
    replyId: number
    userId: string
    userProfileUrl: string
    content: string
    createdAt: Timestamp
    anonymous: boolean
    likes: number
}
interface CommentProps {
    comment: {
        commentId: number
        userId: string
        userProfileUrl: string
        content: string
        createdAt: string
        anonymous: boolean
        likes: number
        replies: Reply[]
    }
    onReply: (commentId: number) => void
}

const Comment: React.FC<CommentProps> = ({ comment, onReply }) => {
    const { t } = useTranslation('board')
    const [showAlert, setShowAlert] = useState(false)
    const [liked, setLiked] = useState(false)
    const [likedCount, setLikedCount] = useState(0)

    useEffect(() => {
        const fetchLikedCount = async () => {
            try {
                const count = await getCommentLikedCount(comment.commentId)
                setLikedCount(count)
            } catch (error) {
                console.error(error)
            }
        }

        fetchLikedCount()
    }, [comment.commentId])

    const handleLike = async () => {
        try {
            const newLikedCount = await toggleCommentLike(
                comment.commentId,
                liked,
            )
            setLikedCount(newLikedCount)
            setLiked(!liked)
        } catch (error) {
            console.error(error)
        }
    }

    const isLoggedInUser =
        userStore.isLoggedIn && userStore.userId === comment.userId

    const onDelete = () => {
        setShowAlert(true)
    }

    const handleDelete = async () => {
        try {
            await deleteCommentApi(comment.commentId)
        } catch (error) {
            console.error(error)
        }
    }
    const handleNothing = () => {
        setShowAlert(false)
    }

    return (
        <View style={styles.commentContainer}>
            <View style={styles.commentContent}>
                <View style={styles.commentHeader}>
                    <Image
                        source={require('@/resources/assets/defaultProfile.png')}
                        // source={{
                        //     uri: comment.anonymous
                        //         ? require('@/resources/assets/defaultProfile.png')
                        //         : comment.userProfileUrl ||
                        //           require('@/resources/assets/defaultProfile.png'),
                        // }}
                        style={styles.profileImage}
                    />
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
                                {comment.likes}
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
                        onPress={() => onReply(comment.commentId)}
                        style={styles.deleteButton}
                    >
                        <Text style={text.replyButtonText}>
                            {t('comment-reply')}
                        </Text>
                    </TouchableOpacity>
                    {isLoggedInUser && (
                        <TouchableOpacity
                            onPress={onDelete}
                            style={styles.deleteButton}
                        >
                            <Text style={text.deleteButtonText}>
                                {t('comment-delete')}
                            </Text>
                        </TouchableOpacity>
                    )}
                </View>
                {comment.replies.map((reply) => (
                    <View key={reply.replyId} style={styles.replyBox}>
                        <View style={styles.commentHeader}>
                            <Image
                                source={require('@/resources/assets/defaultProfile.png')}
                                // source={{
                                //     uri: reply.anonymous
                                //         ? require('@/resources/assets/defaultProfile.png')
                                //         : reply.userProfileUrl ||
                                //           require('@/resources/assets/defaultProfile.png'),
                                // }}
                                style={styles.profileImage}
                            />
                            <Text style={text.nicknameText}>
                                {reply.anonymous
                                    ? t('post-anonymous')
                                    : reply.userId}
                                {isLoggedInUser && '(나)'}
                            </Text>
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
                                        {reply.likes}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <Text style={text.commentText}>{reply.content}</Text>
                        <View style={styles.commentBottom}>
                            <Text style={text.timestampText}>
                                {formatDate(reply.createdAt)}
                            </Text>
                            <TouchableOpacity
                                onPress={() => onReply(comment.commentId)}
                                style={styles.deleteButton}
                            >
                                <Text style={text.replyButtonText}>
                                    {t('comment-reply')}
                                </Text>
                            </TouchableOpacity>
                            {isLoggedInUser && (
                                <TouchableOpacity
                                    onPress={onDelete}
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
    )
}

export default Comment
