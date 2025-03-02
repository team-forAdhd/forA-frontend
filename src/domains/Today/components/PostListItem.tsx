import React from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    TextStyle,
    StyleProp,
    StyleSheet,
} from 'react-native';
import {
    CategoryIcon,
    ViewIcon,
    ThumbsUpIcon,
} from '@/public/assets/SvgComponents';
import { StackScreenProps } from '@react-navigation/stack';
import { TodayStackParams } from '@/navigation/stacks/TodayStack';

interface Props {
    post: {
        id: number;
        userId: string | null;
        title: string;
        category: string;
        viewCount: number;
        likeCount: number;
        formattedCreatedAt: string;
        images?: string[] | null;
    };
    index: number;
}

type PostDetailParams = {
    PostDetail: { postId: number }; //postId: number
};

const PostListItem = ({
    post,
    index,
    navigation,
}: Props & Pick<StackScreenProps<TodayStackParams, 'Home'>, 'navigation'>) => {
    const handlePostItemClick = () => {
        navigation.push('PostDetail', { postId: post.id });
    };
    const maxTitleLength = post.images ? 19 : 23;
    const displayedTitle =
        post.title.length > maxTitleLength
            ? `${post.title.slice(0, maxTitleLength)}...`
            : post.title;

    return (
        <TouchableOpacity
            onPress={handlePostItemClick}
            style={styles.postItemContainer}
        >
            <View style={styles.postNumberContainer}>
                <Text style={text.postListNumText}>
                    {index + 1 < 10 ? `${index + 1}` : index + 1}
                </Text>
            </View>
            <View style={styles.postContentContainer}>
                <Text style={text.postListTitleText}>{displayedTitle}</Text>
                <View style={styles.postInfo}>
                    <CategoryIcon />
                    <Text style={text.postListCategoryText}>
                        {post.category}
                    </Text>
                    <View style={{ width: 8 }} />
                    <ViewIcon />
                    <Text style={text.postListOthersText}>
                        {post.viewCount}
                    </Text>
                    <View style={{ width: 8 }} />
                    <ThumbsUpIcon />
                    <Text style={text.postListOthersText}>
                        {post.likeCount}
                    </Text>
                </View>
                <Text style={text.postListDateText}>
                    {post.formattedCreatedAt}
                </Text>
                {post.images && (
                    <Image
                        source={{ uri: post.images[0] }}
                        style={styles.thumbnailImage}
                    />
                )}
            </View>
        </TouchableOpacity>
    );
};

export default PostListItem;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    overlay: {
        backgroundColor: 'rgba(35, 35, 35, 0.3)',
        zIndex: 90,
        position: 'absolute',
        top: 0,
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 100,
    },
    header: {
        position: 'absolute',
        top: 52,
        width: '100%',
        height: 35,
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingRight: 16,
        paddingLeft: 16,
        zIndex: 2, //ZIndex를 조정해서 터치 이벤트 문제 해소 , 캐러셀 컴포넌트가 터치이벤트를 가로채서 헤더에 있는 아이콘의 터치가 안먹고 있었음
    },
    Flex: {
        flex: 1,
        width: 'auto',
        height: 40,
        justifyContent: 'flex-end',
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 8,
    },
    ForAImage: {
        width: 87.4,
        height: 32,
        objectFit: 'contain',
        marginTop: 8,
    },
    IconImage: {
        width: 35,
        height: 35,
        objectFit: 'contain',
        marginLeft: 12,
    },
    scrollViewContainer: {
        flexGrow: 1,
        paddingBottom: 100,
    },
    carouselContainer: {
        width: '100%',
        height: 380,
        marginBottom: 50,
    },
    RefreshImage: {
        width: 23,
        height: 23,
        objectFit: 'contain',
        marginLeft: 8,
    },
    rankingListContainer: {
        width: '100%',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingLeft: 14,
        paddingRight: 14,
        paddingBottom: 16,
    },
    baseContainer: {
        flexGrow: 1,
        height: 31,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#EDEDEA',
        borderRadius: 12,
        marginLeft: 2,
        marginRight: 2,
    },
    clickContainer: {
        flexGrow: 1,
        height: 31,
        backgroundColor: 'white',
        borderColor: '#52A55D',
        borderRadius: 12,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 2,
        marginRight: 2,
    },
    ranking: {
        marginLeft: 16,
        marginRight: 16,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    postListContainer: {
        paddingHorizontal: 16,
        width: '100%',
    },
    postItemContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-start',
        width: 360,
        height: 92,
        marginBottom: 10,
        borderRadius: 20,
        backgroundColor: '#FFF',
        shadowColor: '#000',
        shadowOpacity: 0.15,
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 3,
        elevation: 2,
    },
    postNumberContainer: {
        width: 30,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    postContentContainer: {
        flex: 1,
        width: 1,
        // width: 340,
        flexDirection: 'column',
        paddingHorizontal: 11,
    },
    postInfo: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 7,
        marginBottom: 3,
    },
    loadButtonConatiner: {
        width: '100%',
        height: 14,
        marginTop: 24,
    },
    loadMoreButton: {
        width: 64,
        height: 31,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
        backgroundColor: '#EEE',
        position: 'absolute',
        bottom: 9,
        alignSelf: 'center',
    },
    thumbnailImage: {
        width: 70,
        height: 70,
        borderRadius: 12,
        marginLeft: 'auto',
    },
    fabLayout: {
        position: 'absolute',
        top: 665,
        right: 10,
    },
    fabIcon: {
        width: 62,
        height: 62,
    },
});

const baseText = {
    fontFamily: 'Pretendard',
    fontStyle: 'normal',
    fontWeight: '400',
};

const text = {
    tabBarText: {
        ...baseText,
        color: '#232323',
        fontSize: 16,
        letterSpacing: -1,
        flexGrow: 1,
        marginBottom: 23,
    },
    baseText: {
        ...baseText,
        color: '#232323',
        fontSize: 16,
        lineHeight: 22.4,
    },
    clickText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#52A55D',
        lineHeight: 22.4,
    },
    rankingText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    postListNumText: {
        fontSize: 18,
        fontWeight: '500',
        color: '#232323',
        lineHeight: 25.2,
        letterSpacing: -0.9,
        marginTop: 10,
        marginLeft: 12,
    },
    postListTitleText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#232323',
        lineHeight: 22.4,
        marginTop: 11,
    },
    postListCategoryText: {
        fontSize: 14,
        fontWeight: '400',
        color: '#52A55D',
        lineHeight: 19.6,
        marginLeft: 2,
    },
    postListOthersText: {
        fontSize: 14,
        fontWeight: '400',
        color: '#555',
        lineHeight: 19.6,
        marginRight: 8,
        marginLeft: 3,
    },
    postListDateText: {
        fontSize: 12,
        fontWeight: '400',
        color: '#949494',
        lineHeight: 16.8,
        marginTop: 3,
        marginBottom: 11,
    },
    loadMoreText: {
        fontSize: 16,
        fontWeight: '400',
        color: '#232323',
        lineHeight: 22.4,
        letterSpacing: -0.8,
        textAlign: 'center',
    },
} as {
    [key: string]: StyleProp<TextStyle>;
};
