import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native'
import { styles, text } from './myPostStyle'
import { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import TabBar from '../common/tabBar/tabBar'
import PostItem from '../common/postItem/postItem'
import RangeBottomSheet from '../common/rangeBottomSheet/rangeBottomSheet'
import { RouteProp } from '@react-navigation/native'
import { RootStackParamList } from '../navigation'

interface PostProps {
    route:
        | RouteProp<RootStackParamList, 'MyPosts'>
        | RouteProp<RootStackParamList, 'MyComments'>
        | RouteProp<RootStackParamList, 'MyReviews'>
        | RouteProp<RootStackParamList, 'SavedPosts'>
}
export default function MyPost({ route }: PostProps) {
    //내가 쓴 글인지 저장한 글인지 댓글인지 등의 정보를 받아오기
    const { postType } = route.params
    //받아온 파라미터를 활용해 렌더링
    const postTypeList = [
        {
            postType: 'myPosts',
            title: '나의 글',
            content: '아직 작성한 글이 없어요!',
            icon: require('@/public/assets/myArticle.png'),
        },
        {
            postType: 'myComments',
            title: '나의 댓글',
            content: '아직 작성한 댓글이 없어요!',
            icon: require('@/public/assets/myComment.png'),
        },
        {
            postType: 'savedPosts',
            title: '내가 저장한 글 ',
            content: '아직 저장한 글이 없어요!',
            icon: require('@/public/assets/myArticle.png'),
        },
    ]

    const categories = dummy.map((post) => post.category) //데이터에서 카테고리만 따로 모은 배열
    const tabList: string[] = ['10대', '20대', '30대', '학부모'] //게시판 리스트 순서대로 표시하기 위해
    const categoryList: string[] = Array.from(new Set(categories)) //게시판 리스트랑 비교해서 화면에 표시하기 위한 배열
    //게시판 선택
    const [boardClick, setBoardClick] = useState<string>(categoryList[0])
    //정렬 선택 _ 기본 최신순
    const [range, setRange] = useState<string>('최신순')

    //정렬 클릭시 나올 바텀시트 상태
    const [rangeBottomSheet, setRangeBottomSheet] = useState<boolean>(false)

    const navigation = useNavigation()

    return (
        <View style={styles.container}>
            {rangeBottomSheet && (
                <View style={styles.bottomActivatedContainer}>
                    <TouchableOpacity
                        onPress={() => setRangeBottomSheet(false)}
                        style={{ flex: 1 }}
                    />
                </View>
            )}
            {/* 헤더 */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image
                        source={require('@/public/assets/back.png')}
                        style={styles.IconImage}
                    />
                </TouchableOpacity>
                <Text style={text.headerText}>
                    {
                        postTypeList.find((post) => post.postType === postType)
                            ?.title //게시판의 타입이 루트에서 받아온 이니셜 파라미터와 같은 경우 해당 객체의 타이틀을 띄우기
                    }
                </Text>
            </View>
            {dummy.length > 0 ? ( //게시물의 길이가 0 이상인 경우
                <>
                    {/* 게시판 리스트 */}
                    <View style={styles.topContainer}>
                        <View style={styles.boardListContainer}>
                            {tabList.map((board, index) => (
                                <View key={index}>
                                    {categoryList.includes(board) && (
                                        <TouchableOpacity
                                            style={
                                                boardClick === board
                                                    ? styles.clickContainer
                                                    : styles.baseContainer
                                            }
                                            onPress={() => {
                                                setBoardClick(board)
                                                console.log(board)
                                            }}
                                        >
                                            <Text
                                                style={
                                                    boardClick === board
                                                        ? text.clickText
                                                        : text.baseText
                                                }
                                            >
                                                {board}
                                            </Text>
                                        </TouchableOpacity>
                                    )}
                                </View>
                            ))}
                        </View>
                        {/* 정렬 */}
                        <TouchableOpacity
                            onPress={() => setRangeBottomSheet(true)}
                            style={styles.rangeContainer}
                        >
                            <Text style={text.rangeText}>{range}</Text>
                            <Image
                                source={require('@/public/assets/under.png')}
                                style={styles.underIcon}
                            />
                        </TouchableOpacity>
                    </View>
                    {/* 게시글 */}
                    <View style={styles.postsContainer}>
                        {dummy
                            .filter((data) => data.category === boardClick)
                            .map((post, index) => (
                                <View
                                    key={index}
                                    style={styles.postInnerContainer}
                                >
                                    <PostItem post={post} page={'myPage'} />
                                </View>
                            ))}
                    </View>
                    {rangeBottomSheet && (
                        <RangeBottomSheet
                            setBottomSheet={setRangeBottomSheet}
                            range={range}
                            setRange={setRange}
                        />
                    )}
                </>
            ) : (
                //아무것도 없는 경우에 띄울 화면
                <View style={styles.emptyContainer}>
                    <Image
                        style={styles.emptyIcon}
                        source={
                            postTypeList.find(
                                (post) => post.postType === postType,
                            )?.icon
                        }
                    />
                    <Text style={text.emptyText}>
                        {
                            postTypeList.find(
                                (post) => post.postType === postType,
                            )?.content
                        }
                    </Text>
                </View>
            )}
        </View>
    )
}

const dummy = [
    {
        postId: '1',
        title: '정신과 가는 길',
        views: 1127,
        category: '20대',
        recommend: 150,
        comments: 80,
        createdAt: '2023-06-07',
        images: [
            require('@/public/assets/defaultImage.png'),
            require('@/public/assets/defaultImage.png'),
            require('@/public/assets/defaultImage.png'),
        ],
    },
    {
        postId: '2',
        title: '아이 점검일이 다가오는데 어떻게 하면 좋을까요?',
        views: 1127,
        category: '20대',
        recommend: 150,
        comments: 80,
        createdAt: '2023-06-07',
        images: [require('@/public/assets/defaultImage.png')],
    },
    {
        postId: '3',
        title: '지난 부작용이 있나요?',
        views: 1127,
        category: '10대',
        recommend: 150,
        comments: 50,
        createdAt: '2023-06-07',
        images: [],
    },
    {
        postId: '4',
        title: '다른 정신과 얼마나 자주 가시나요? ',
        views: 1127,
        category: '10대',
        recommend: 150,
        comments: 80,
        createdAt: '2023-03-22',
        images: [require('@/public/assets/defaultImage.png')],
    },
    {
        postId: '5',
        title: '아이고',
        views: 1127,
        category: '20대',
        recommend: 80,
        comments: 80,
        createdAt: '2020-04-01',
        images: [],
    },
]
