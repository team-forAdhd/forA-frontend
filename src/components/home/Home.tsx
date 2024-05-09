import { useTranslation } from 'react-i18next'
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native'
import { styles, text } from './HomeStyle'
import { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { DummyPost, generateDummyPosts } from './dummydata'
import { getPostsApi } from '@/api/home/getPostsApi'

import TabBar from '../common/tabBar/tabBar'
import CarouselComponent from '../common/carousel/carousel'
import PostListItem from './postListItem/PostListItem'
import FloatingButton from './FloatingButton'

export default function Home() {
    //랭킹 클릭 상태
    const [rankingClick, setRankingClick] = useState<string>('realtime-tab')
    //새로고침 리랜더링
    const [reRender, setReRender] = useState(false)
    //랭킹 리스트 띄울 이름 키 값
    const rankingList = [
        'realtime-tab',
        '10s-tab',
        '20s-tab',
        '30s-tab',
        'parents-tab',
    ]

    const { t } = useTranslation('home')

    const navigation = useNavigation()

    const [posts, setPosts] = useState<DummyPost[]>([])
    const [visiblePostsCount, setVisiblePostsCount] = useState<number>(5)

    useEffect(() => {
        const dummyPosts = generateDummyPosts()
        setPosts(dummyPosts)
    }, [])
    const handleLoadMore = () => {
        setVisiblePostsCount((prevCount) => prevCount + 5)
    }

    return (
        <View style={styles.container}>
            {/* 헤더 */}
            <View style={styles.header}>
                <Image
                    style={styles.ForAImage}
                    source={require('@/public/assets/forA.png')}
                />
                <View style={styles.Flex}>
                    <TouchableOpacity
                        onPress={() => {
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
                {/* 광고 */}
                <View style={styles.carouselContainer}>
                    <CarouselComponent />
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
                                    {t(rankingName)}
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
                <View style={styles.postListContainer}>
                    {posts.slice(0, visiblePostsCount).map((post, index) => (
                        <PostListItem
                            key={post.postId}
                            post={post}
                            index={index}
                        />
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
                </View>
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
