import { useCommentMutation } from '@/domains/TodayPostDetail/api/postComment.api';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
    Image,
    KeyboardAvoidingView,
    StyleProp,
    StyleSheet,
    Text,
    TextInput,
    TextStyle,
    TouchableOpacity,
    View,
} from 'react-native';

export default function CommentInput({
    postId,
    replyCommentId,
}: {
    postId: number;
    replyCommentId?: number;
}) {
    const { t } = useTranslation('board');

    const [commentIsAnonymous, setCommentIsAnonymous] =
        useState<boolean>(false);
    const [commentContent, setCommentContent] = useState<string>('');

    const { mutate } = useCommentMutation(postId);

    function handlePostComment() {
        if (!commentContent) return;
        if (replyCommentId) {
            mutate({
                content: commentContent,
                anonymous: commentIsAnonymous,
                postId: postId,
                parentCommentId: replyCommentId,
            });
        } else {
            mutate({
                content: commentContent,
                anonymous: commentIsAnonymous,
                postId: postId,
            });
        }
        setCommentContent('');
    }

    return (
        <KeyboardAvoidingView behavior="padding">
            <View style={styles.addComment}>
                <TouchableOpacity
                    onPress={() => setCommentIsAnonymous((prev) => !prev)}
                >
                    <View style={styles.commentAnonymousContainer}>
                        <Image
                            source={
                                commentIsAnonymous
                                    ? require('@/public/assets/check-icon.png')
                                    : require('@/public/assets/checkbox-icon.png')
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
                    multiline
                    onChangeText={(text) => setCommentContent(text)}
                    placeholder={
                        replyCommentId
                            ? '답글을 남겨보세요'
                            : t('post-give-comment')
                    }
                    placeholderTextColor="#949494"
                    value={commentContent}
                />
                <TouchableOpacity
                    style={styles.commentButton}
                    onPress={handlePostComment}
                >
                    <Image
                        source={require('@/public/assets/comment.png')}
                        style={styles.sendIcon}
                    />
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    addComment: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 48,
        marginHorizontal: 16,
        marginVertical: 16,
        borderRadius: 500,
        borderColor: '#949494',
        borderWidth: 1,
        backgroundColor: '#FFF',
    },

    anonymousIcon: {
        width: 17,
        height: 17,
        justifyContent: 'center',
        alignItems: 'center',
    },
    commentBox: {
        justifyContent: 'flex-start',
        flex: 1,
        paddingRight: 20,
    },
    commentButton: {
        right: 7,
        width: 28,
        height: 28,
    },
    sendIcon: {
        width: 28,
        height: 28,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    endOfPostBox: {
        width: '100%',
        height: 40,
        backgroundColor: '#EEE',
    },
    commentAnonymousContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: 42,
        height: 17,
        marginRight: 10,
        marginLeft: 12,
    },
});

const text = {
    fontFamily: 'Pretendard',
    fontStyle: 'normal',
    commentBoxText: {
        color: '#232323',
        fontSize: 16,
        fontWeight: '400',
        lineHeight: 22.4,
        letterSpacing: -0.8,
    },
} as {
    [key: string]: StyleProp<TextStyle>;
};
