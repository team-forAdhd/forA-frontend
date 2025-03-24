import { useTranslation } from 'react-i18next';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    TextStyle,
    StyleProp,
    StyleSheet,
    SafeAreaView,
    Modal,
} from 'react-native';
import { useState, useEffect } from 'react';
import CarouselComponent from '../../components/common/carousel/carousel';
import FloatingButton from '../../components/home/FloatingButton';
import HomeModal from './components/homeModal';
import { notification, support } from '../../components/home/homeModalData';
import { useAuthStore } from '@/store/authStore';
import AuthWrapper from '@/components/common/wrapper/authWrapper';
import { StackScreenProps } from '@react-navigation/stack';
import { TodayStackParams } from '@/navigation/stacks/TodayStack';
import { TodayPostList } from '@/domains/Today/components/PostListItem';
import { PostCategory } from '@/domains/TodayPostDetail/types/today.types';

const rankMap: Record<string, PostCategory | 'RANKING'> = {
    실시간: 'RANKING',
    '10대': 'TEENS',
    '20대': 'TWENTIES',
    '30대↑': 'THIRTIES_AND_ABOVE',
    학부모: 'PARENTS',
} as const;

const rankingList = ['실시간', '10대', '20대', '30대↑', '학부모'];

function Home({ navigation }: StackScreenProps<TodayStackParams, 'Home'>) {
    const a = useAuthStore();
    //랭킹 클릭 상태
    const [category, setCategory] = useState<PostCategory | 'RANKING'>(
        'RANKING',
    );

    //랭킹 리스트 띄울 이름 키 값
    //공지사항이나 후원 모달을 띄울 state
    const [modalTitle, setModalTitle] = useState<string>('');
    const { t } = useTranslation('home');

    return (
        <SafeAreaView style={styles.container}>
            <HomeModal
                setModalTitle={setModalTitle}
                modalTitle={modalTitle}
                modalContents={
                    modalTitle === 'notification' ? notification : support
                }
            />
            {/* 헤더 */}
            <View style={styles.header}>
                <Image
                    style={styles.ForAImage}
                    source={require('@/public/assets/forA.png')}
                />
                <View style={styles.Flex}>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('Search' as never);
                            console.log('검색창');
                        }}
                    >
                        <Image
                            style={styles.IconImage}
                            source={require('@/public/assets/search.png')}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('Notifications' as never);
                            console.log('알림창 열기');
                        }}
                    >
                        <Image
                            style={styles.IconImage}
                            source={require('@/public/assets/bell.png')}
                        />
                    </TouchableOpacity>
                </View>
            </View>
            {/* <ScrollView contentContainerStyle={styles.scrollViewContainer}> */}
            {/* 캐러셀 */}
            <View style={styles.carouselContainer}>
                <CarouselComponent setModalTitle={setModalTitle} />
            </View>
            {/* 랭킹 리스트 */}
            <View style={styles.rankingListContainer}>
                {rankingList.map((rankingName, index) => {
                    return (
                        <TouchableOpacity
                            key={index}
                            style={
                                category === rankMap[rankingName]
                                    ? styles.clickContainer
                                    : styles.baseContainer
                            }
                            onPress={() => {
                                setCategory(rankMap[rankingName]);
                                console.log(rankingName);
                            }}
                        >
                            <Text
                                style={
                                    category === rankMap[rankingName]
                                        ? text.clickText
                                        : text.baseText
                                }
                            >
                                {rankingName}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
            {/* 랭킹
                <View style={styles.ranking}>
                    <Text style={text.rankingText}>{t('ranking')}</Text>
                    <TouchableOpacity
                        onPress={() => {
                            setReRender(!reRender);
                        }}
                    >
                        <Image
                            style={styles.RefreshImage}
                            source={require('@/public/assets/refresh.png')}
                        />
                    </TouchableOpacity>
                </View> */}
            {/* 게시글 목록 */}
            <TodayPostList category={category} navigation={navigation} />
            {/* </ScrollView> */}

            {/* FAB */}
            <FloatingButton
                onPress={() => navigation.navigate('NewPost' as never)}
                source={require('@/public/assets/fab.png')}
                style={styles.fabLayout}
                iconStyle={styles.fabIcon}
            ></FloatingButton>
        </SafeAreaView>
    );
}
export default AuthWrapper(Home);

const writeNotification = {
    id: -1,
    userId: 'admin',
    title: '오늘탭 작성가이드 (필독!)',
    category: '공지',
    viewCount: 0,
    likeCount: 0,
    formattedCreatedAt: '',
    images: [],
};

const styles = StyleSheet.create({
    container: {
        paddingTop: 100,
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    overlay: {
        backgroundColor: 'rgba(35, 35, 35, 0.3)',
        zIndex: 90,
        position: 'absolute',
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
        height: 36,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        paddingRight: 16,
        paddingLeft: 16,
        backgroundColor: 'white',
        zIndex: 2,
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
        paddingBottom: 50,
    },
    carouselContainer: {
        marginVertical: 10,
        width: '100%',
        height: 300,
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
        bottom: 10,
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
