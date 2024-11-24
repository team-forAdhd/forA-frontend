import { useTranslation } from 'react-i18next'
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native'
import { styles, text } from './HomeStyle'
import { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Login } from '@/api/login/loginApi'
import TabBar from '../common/tabBar/tabBar'
import CarouselComponent from '../common/carousel/carousel'
import PostListItem from './postListItem/PostListItem'
import FloatingButton from './FloatingButton'
import {
    getMainCategoryApi,
    getMainRealtimeApi,
    Post,
} from '@/api/home/getPostsApi'
import HomeModal from '../common/homemodal/homeModal'
import { notification, support } from './homeModalData'

export default function Home() {
    //랭킹 클릭 상태
    const [rankingClick, setRankingClick] = useState<string>('실시간')
    //새로고침 리랜더링
    const [reRender, setReRender] = useState(false)
    //랭킹 리스트 띄울 이름 키 값
    const rankingList = ['실시간', '10대', '20대', '30대↑', '학부모']
    //공지사항이나 후원 모달을 띄울 state
    const [modal, setModal] = useState<boolean>(false)
    const [modalTitle, setModalTitle] = useState<string>('')
    const { t } = useTranslation('home')

    const navigation = useNavigation()

    const [posts, setPosts] = useState<Post[]>([])
    const [visiblePostsCount, setVisiblePostsCount] = useState<number>(5)

    useEffect(() => {
        const fetchPosts = async () => {
            let fetchedPosts: Post[] = []
            try {
                if (rankingClick === '실시간') {
                    fetchedPosts = await getMainRealtimeApi()
                } else {
                    const category =
                        rankingClick === '10대'
                            ? 'TEENS'
                            : rankingClick === '20대'
                              ? 'TWENTIES'
                              : rankingClick === '30대↑'
                                ? 'THIRTIES_AND_ABOVE'
                                : rankingClick === '학부모'
                                  ? 'PARENTS'
                                  : ''
                    fetchedPosts = await getMainCategoryApi(category)
                }
                setPosts(fetchedPosts)
            } catch (error) {
                console.error('Error fetching posts:', error)
                setPosts([]) // 에러 발생 시 빈 배열로 설정
            }
        }
        fetchPosts()
    }, [rankingClick, reRender])

    const handleLoadMore = () => {
        setVisiblePostsCount((prevCount) => prevCount + 5)
    }

    useEffect(() => {
        const login = async () => {
            try {
                const fetchedToken = await Login()
            } catch (error) {
                console.error(error)
            }
        }

        login()
    }, [])

    return (
        <View style={styles.container}>
            {modalTitle && (
                <View style={styles.overlay}>
                    <HomeModal
                        setModalTitle={setModalTitle}
                        modalTitle={modalTitle}
                        modalContents={
                            modalTitle === 'notification'
                                ? notification
                                : support
                        }
                    />
                </View>
            )}
            {/* 헤더 */}
            <View style={styles.header}>
                <Image
                    style={styles.ForAImage}
                    source={require('@/public/assets/forA.png')}
                />
                <View style={styles.Flex}>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('Search' as never)
                            console.log('검색창')
                        }}
                    >
                        <Image
                            style={styles.IconImage}
                            source={require('@/public/assets/search.png')}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('Notifications' as never)
                            console.log('알림창 열기')
                        }}
                    >
                        <Image
                            style={styles.IconImage}
                            source={require('@/public/assets/bell.png')}
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView contentContainerStyle={styles.scrollViewContainer}>
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
                                    rankingClick === rankingName
                                        ? styles.clickContainer
                                        : styles.baseContainer
                                }
                                onPress={() => {
                                    setRankingClick(rankingName)
                                    console.log(rankingName)
                                }}
                            >
                                <Text
                                    style={
                                        rankingClick === rankingName
                                            ? text.clickText
                                            : text.baseText
                                    }
                                >
                                    {rankingName}
                                </Text>
                            </TouchableOpacity>
                        )
                    })}
                </View>
                {/* 랭킹 */}
                <View style={styles.ranking}>
                    <Text style={text.rankingText}>{t('ranking')}</Text>
                    <TouchableOpacity
                        onPress={() => {
                            console.log('새로고침하기')
                            setReRender(!reRender)
                        }}
                    >
                        <Image
                            style={styles.RefreshImage}
                            source={require('@/public/assets/refresh.png')}
                        />
                    </TouchableOpacity>
                </View>

                {/* 게시글 목록 */}
                <ScrollView style={styles.postListContainer}>
                    {rankingClick === '실시간' && (
                        <PostListItem
                            key={-1}
                            post={writeNotification}
                            index={-1}
                        />
                    )}
                    {posts.slice(0, visiblePostsCount).map((post, index) => (
                        <PostListItem key={post.id} post={post} index={index} />
                    ))}
                    {/* 더보기 버튼 */}
                    <View style={styles.loadButtonConatiner}>
                        {visiblePostsCount < posts.length && (
                            <TouchableOpacity
                                style={styles.loadMoreButton}
                                onPress={handleLoadMore}
                            >
                                <Text style={text.loadMoreButton}>
                                    {t('more-button')}
                                </Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </ScrollView>
            </ScrollView>

            {/* FAB */}
            <FloatingButton
                onPress={() => navigation.navigate('NewPost' as never)}
                source={require('@/public/assets/fab.png')}
                style={styles.fabLayout}
                iconStyle={styles.fabIcon}
            ></FloatingButton>

            {/* 탭바 */}
            <TabBar />
        </View>
    )
}

const writeNotification = {
    id: -1,
    userId: 'admin',
    title: '오늘탭 작성가이드 (필독!)',
    category: '공지',
    viewCount: 0,
    likeCount: 0,
    formattedCreatedAt: '',
    images: [],
}
