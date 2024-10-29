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

const notification = [
    {
        title: '',
        content:
            '안녕하세요. ‘포에이’입니다. 포에이를 이용해 주셔서 감사합니다. ‘포에이’ 이용에 불편이 없기를 바라며, 몇 가지 공지사항을 알려드립니다!',
    },
    {
        title: '부적절한 리뷰나 콘텐츠를 신고해주세요!',
        content:
            '병원탭과 약탭, 오늘 탭을 이용하실 때 부적절한 리뷰나 콘텐츠를 발견하시면 내용을 캡처하여 ‘foradhd2024@gmail.com’으로 보내주세요. 아직 앱의 초기이기에 리뷰 모니터링을 하고 있으나, 저희가 발견 못 할 수 있습니다. 불편한 리뷰나 콘텐츠를 발견하시면, 바로 이메일로 신고 부탁드립니다. 저희가 확인 후 삭제 혹은 작성한 회원의 이용에 제재를 가하겠습니다!',
    },
    {
        title: '병원탭 이용 관련',
        content:
            '‘병원 칭찬하기와 포에이리본’ 등록은 ‘영수증 인증’을 기반으로 하고 있습니다. 또한, 리뷰에 대한 법적 책임은 사용자에게 있음을 알려드립니다. 따라서, 이 점 유의하시며 사용 부탁드립니다!',
    },
    {
        title: '약탭 이용 관련',
        content:
            '약탭의 정보는 ’개인의 경험에 기반하며, 의학적 조언을 대체하지 않습니다!’ 따라서, 이 점을 유의하시며 약 탭 이용 바랍니다!',
    },
]

const support = [
    {
        title: '',
        content:
            '‘포에이’는 ADHD를 겪는 대학생들이 모여 만든 앱으로, 아직 수익이 없는 상태입니다.',
    },
    {
        title: '후원금은 어디에 쓰이나요?',
        content:
            '서버 비용 및 포에이 앱 업데이트와 운영에만 사용됩니다. 서버 비용 및 사용 금액은 정기적으로 공개할 예정입니다. 작은 금액도 저희에게 큰 힘이 됩니다.',
    },
    {
        title: '문의사항',
        content: 'foradhd2024@gmail.com',
    },
]

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
