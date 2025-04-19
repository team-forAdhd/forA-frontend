import { formatDate } from '@/common/formatDate';
import TodayPostComment from '@/domains/TodayPostDetail/components/TodayPostComment';
import { PostDetail } from '@/domains/TodayPostDetail/types/today.types';
import {
    ClikedLikedIcon,
    LikedIcon,
    ScrapIcon,
} from '@/public/assets/SvgComponents';
import { imagePathMerge } from '@/utils/imagePathMerge';

import React from 'react';
import { useTranslation } from 'react-i18next';
import {
    Image,
    StyleProp,
    StyleSheet,
    Text,
    TextStyle,
    TouchableOpacity,
    View,
} from 'react-native';

export default function TodayPostBody({
    post,
    postLike,
    postScrap,
    onReply,
}: {
    post: PostDetail;
    postLike: () => void;
    postScrap: () => void;
    onReply: (commentId: number) => void;
}) {
    const { t } = useTranslation('board');
    const commentLength = post?.comments
        ? post?.comments.reduce((acc: number, cur: any) => {
              if (cur.children.length) {
                  return acc + cur.children.length + 1;
              }
              return acc + 1;
          }, 0)
        : 0;
    if (!post) return null;
    return (
        <React.Fragment>
            <View style={styles.bodyConatiner}>
                {/* 작성자 정보 */}
                <View style={styles.userInfoContainer}>
                    {post.profileImage ? (
                        <Image
                            source={{
                                uri: imagePathMerge(post.profileImage),
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
                            {post.anonymous ? '익명' : post.nickname}
                        </Text>
                        {/* 작성 날짜 및 시간 */}
                        <Text style={text.createdAt}>
                            {formatDate(post.createdAt)}
                        </Text>
                    </View>
                    {post.id !== -1 && (
                        <View style={styles.actionButtonContainer}>
                            {/* 좋아요 버튼 */}
                            <TouchableOpacity
                                style={styles.actionButton}
                                onPress={() => postLike()}
                            >
                                <View style={styles.marginBox}>
                                    {post.isLiked ? (
                                        <ClikedLikedIcon />
                                    ) : (
                                        <LikedIcon />
                                    )}
                                    <Text
                                        style={[
                                            text.countText,
                                            post.isLiked && {
                                                color: '#52A55D',
                                            },
                                        ]}
                                    >
                                        {post.likeCount}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                            {/* 스크랩 버튼 */}
                            <TouchableOpacity
                                style={styles.actionButton}
                                onPress={() => postScrap()}
                            >
                                <View style={styles.marginBox}>
                                    <ScrapIcon fill={post.isScrapped} />
                                    <Text
                                        style={[
                                            text.countText,
                                            post.isScrapped && {
                                                color: '#52A55D',
                                            },
                                        ]}
                                    >
                                        {post.scrapCount}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>

                {/* 본문 */}
                <View style={styles.titleContainer}>
                    <Text style={text.titleText}>{post.title}</Text>
                    <View style={styles.titleUnderBar} />
                </View>
                <View style={styles.contentContainer}>
                    {/* 첨부 사진이 있는 경우 나타나는 첨부사진 view */}
                    {post.images && post.images.length > 0 && (
                        <View style={styles.imageContainer}>
                            {post.images.map((img, index) => (
                                <Image
                                    key={index}
                                    source={{
                                        uri: imagePathMerge(img),
                                    }}
                                    style={styles.imageBox}
                                />
                            ))}
                        </View>
                    )}
                    <Text style={text.contentText}>{post.content}</Text>
                </View>
            </View>

            {/* 댓글 */}
            <TodayPostComment postId={post.id} onReply={onReply} />
        </React.Fragment>
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
        borderBottomWidth: 1,
        borderBottomColor: '#EDEDEA',
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
