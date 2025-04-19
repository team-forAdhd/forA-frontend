import {
    Post,
    PostCategory,
} from '@/domains/TodayPostDetail/types/today.types';
import { TodayStackParams } from '@/navigation/stacks/TodayStack';
import {
    CategoryIcon,
    ThumbsUpIcon,
    ViewIcon,
} from '@/public/assets/SvgComponents';
import { imagePathMerge } from '@/utils/imagePathMerge';
import { useNavigation } from '@react-navigation/native';
import {
    Image,
    StyleProp,
    StyleSheet,
    Text,
    TextStyle,
    TouchableOpacity,
    View,
} from 'react-native';

const categoryMap: Record<PostCategory, string> = {
    TEENS: '10대',
    TWENTIES: '20대',
    PARENTS: '학부모',
    THIRTIES_AND_ABOVE: '30대↑',
    NOTICE: '공지',
} as const;
const MAX_TITLE_LENGTH = 15;
export default function MyPostItem({ post }: { post: Post }) {
    const navigation = useNavigation<TodayStackParams>();
    function handlePostItemClick() {
        navigation.navigate('PostDetail', { postId: post.id });
    }
    const displayedTitle =
        post.title.length > MAX_TITLE_LENGTH
            ? `${post.title.slice(0, MAX_TITLE_LENGTH)}...`
            : post.title;

    return (
        <TouchableOpacity
            onPress={handlePostItemClick}
            style={styles.postItemContainer}
        >
            <View style={styles.postContentContainer}>
                <Text style={text.postListTitleText}>{displayedTitle}</Text>
                <View style={styles.postInfo}>
                    <View style={styles.iconContainer}>
                        <CategoryIcon />
                        <Text style={text.postListCategoryText}>
                            {categoryMap[post.category]}
                        </Text>
                    </View>
                    <View style={{ width: 8 }} />
                    <View style={styles.iconContainer}>
                        <ViewIcon />
                        <Text style={text.postListOthersText}>
                            {post.viewCount}
                        </Text>
                    </View>
                    <View style={styles.iconContainer}>
                        <ThumbsUpIcon />
                        <Text style={text.postListOthersText}>
                            {post.likeCount}
                        </Text>
                    </View>
                </View>
                <Text style={text.postListDateText}>{post.createdAt}</Text>
            </View>
            {post.images && (
                <Image
                    source={{ uri: imagePathMerge(post.images[0]) }}
                    style={styles.thumbnailImage}
                />
            )}
        </TouchableOpacity>
    );
}

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
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,
        backgroundColor: '#FFF',
        shadowColor: '#000',
        shadowOpacity: 0.15,
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 3,
        elevation: 2,
    },
    iconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    postNumberContainer: {
        width: 50,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    postContentContainer: {
        flex: 1,
        flexDirection: 'column',
        gap: 3,
        paddingHorizontal: 11,
    },
    postInfo: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
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
    },
    postListTitleText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#232323',
        lineHeight: 22.4,
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
