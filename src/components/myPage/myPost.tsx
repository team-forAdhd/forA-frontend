import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { styles, text } from './myPostStyle';
import { useEffect, useState, Fragment } from 'react';
import { useNavigation } from '@react-navigation/native';
import TabBar from '../common/tabBar/tabBar';
import PostItem from '../common/postItem/postItem';
import PharmacyItem from '../common/pharmacyItem/pharmacyItem';
import BottomSheet from '../medicine/medBottomSheet/BottomSheet';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation';
import { getMyComment } from '@/api/myPage/mycommentApi';
import { getSavedPosts } from '@/api/myPage/mySavedPostApi';
import { getMyPosts } from '@/api/myPage/myPostApi';
import { getSavedHospitals } from '@/api/myPage/mySavedHospitalsApi';
import { getSavedPharmacies } from '@/api/myPage/mySavedPharmacieApi';

interface PostProps {
    route:
        | RouteProp<RootStackParamList, 'MyPosts'>
        | RouteProp<RootStackParamList, 'MyComments'>
        | RouteProp<RootStackParamList, 'MyReviews'>
        | RouteProp<RootStackParamList, 'SavedPosts'>
        | RouteProp<RootStackParamList, 'SavedHospitals'>
        | RouteProp<RootStackParamList, 'SavedPharmacies'>;
}

interface Post {
    anonymous: boolean;
    category: string | null;
    commentCount: number;
    comments: string[] | null;
    content: string;
    createdAt: number;
    id: number;
    images: string[] | null;
    lastModifiedAt: number | null;
    likeCount: number;
    nickname: string | null;
    profileImage: string | null;
    scrapCount: number;
    title: string;
    userId: number | null;
    viewCount: number;
}

export default function MyPost({ route }: PostProps) {
    // 내가 쓴 글인지 저장한 글인지 댓글인지 등의 정보를 받아오기
    const { postType } = route.params;

    // 받아온 파라미터를 활용해 렌더링
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
            title: '내가 저장한 글',
            content: '아직 저장한 글이 없어요!',
            icon: require('@/public/assets/myArticle.png'),
        },
        {
            postType: 'savedHospitals',
            title: '내가 저장한 병원',
            content: '아직 저장한 병원이 없어요!',
            icon: require('@/public/assets/myArticle.png'),
        },
        {
            postType: 'savedPharmacies',
            title: '내가 저장한 약',
            content: '아직 저장한 약이 없어요!',
            icon: require('@/public/assets/myArticle.png'),
        },
    ];

    const categories = dummy.map((post) => post.category); // 데이터에서 카테고리만 따로 모은 배열
    const tabList: string[] = ['10대', '20대', '30대↑', '학부모'];
    const categoryList: string[] = Array.from(new Set(categories)); // 게시판 리스트랑 비교해서 화면에 표시하기 위한 배열

    // 게시판 선택
    const [boardClick, setBoardClick] = useState<string>('10대');

    // 정렬 기준 리스트
    const rangeList =
        postType === 'savedPharmacies' || postType === 'myComments'
            ? ['최신순', '오래된 순']
            : ['최신순', '오래된 순', '조회수 순', '좋아요 순'];

    // 정렬 선택 _ 기본 최신순
    const [range, setRange] = useState<string>(rangeList[0]);

    // 정렬 클릭시 나올 바텀시트 상태
    const [rangeBottomSheet, setRangeBottomSheet] = useState<boolean>(false);

    const [sortOption, setsortOption] = useState<
        'NEWEST_FIRST' | 'OLDEST_FIRST' | 'MOST_VIEWED' | 'MOST_LIKED'
    >('NEWEST_FIRST');

    const [token, setToken] = useState<string>('');
    //받아온 데이터
    const [dataList, setDataList] = useState<Post[]>();

    //게시글 카테코리 선택
    const [category, setCategory] = useState('TEENS');

    const [rerender, setRerender] = useState(false);
    //병원, 약 정렬
    const [sort, setSort] = useState<'createdAt' | 'desc'>('createdAt');

    const categoryMap: Record<string, string> = {
        '10대': 'TEENS',
        '20대': 'TWENTIES',
        '30대↑': 'THIRTIES_AND_ABOVE',
        학부모: 'PARENTS',
    };

    const fetchData = async (
        selectedSortOption = sortOption,
        selectedCategory = category,
    ) => {
        try {
            let fetchedData;
            switch (postType) {
                case 'myPosts':
                    const res = await getMyPosts(
                        selectedCategory,
                        selectedSortOption,
                    );
                    fetchedData = res;
                    if (res?.postList) {
                        let sortedData = [...res.postList];

                        switch (selectedSortOption) {
                            case 'NEWEST_FIRST':
                                sortedData.sort(
                                    (a, b) => b.createdAt - a.createdAt,
                                );
                                break;
                            case 'OLDEST_FIRST':
                                sortedData.sort(
                                    (a, b) => a.createdAt - b.createdAt,
                                );
                                break;
                            case 'MOST_VIEWED':
                                sortedData.sort(
                                    (a, b) => b.viewCount - a.viewCount,
                                );
                                break;
                            case 'MOST_LIKED':
                                sortedData.sort(
                                    (a, b) => b.likeCount - a.likeCount,
                                );
                                break;
                        }

                        setDataList(sortedData);
                    }
                    break;

                case 'myComments':
                    fetchedData = await getMyComment(sortOption);
                    if (fetchedData?.postList) {
                        const sortedData = [...fetchedData.postList].sort(
                            (a, b) => {
                                return selectedSortOption === 'NEWEST_FIRST'
                                    ? b.createdAt - a.createdAt
                                    : a.createdAt - b.createdAt;
                            },
                        );
                        setDataList(sortedData);
                    }
                    break;
                case 'savedPosts':
                    fetchedData = await getSavedPosts(category, sortOption);
                    break;

                case 'savedHospitals':
                    fetchedData = await getSavedHospitals(sort);
                    break;

                case 'savedPharmacies':
                    fetchedData = await getSavedPharmacies();
                    break;

                default:
                    return;
            }

            if (fetchedData?.data) {
                const sortedData = [...fetchedData.data].sort((a, b) => {
                    if (!a.bookmarkedAt || !b.bookmarkedAt) return 0; // null 값 방지
                    return selectedSortOption === 'NEWEST_FIRST'
                        ? b.bookmarkedAt - a.bookmarkedAt // 최신순 정렬
                        : a.bookmarkedAt - b.bookmarkedAt; // 오래된순 정렬
                });

                setDataList([...sortedData]); // React 상태 변경 감지를 위해 새로운 배열 할당
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData(sortOption);
    }, [route, sortOption, category, postType]);

    const navigation = useNavigation();

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
                            ?.title // 게시판의 타입이 루트에서 받아온 이니셜 파라미터와 같은 경우 해당 객체의 타이틀을 띄우기
                    }
                </Text>
                <View style={styles.IconImage} />
            </View>
            <Fragment>
                {/* 게시판 리스트 */}
                <View style={styles.topContainer}>
                    {postType === 'myPosts' && (
                        <View style={styles.boardListContainer}>
                            {tabList.map((board, index) => (
                                <View key={index}>
                                    <TouchableOpacity
                                        style={
                                            boardClick === board
                                                ? styles.clickContainer
                                                : styles.baseContainer
                                        }
                                        onPress={() => {
                                            const newCategory =
                                                categoryMap[board] || 'TEENS';
                                            setBoardClick(board);
                                            setCategory(newCategory);
                                            fetchData(sortOption, newCategory);
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
                                </View>
                            ))}
                        </View>
                    )}
                    {/* 정렬 */}
                    <View style={{ flex: 1, alignItems: 'flex-end' }}></View>
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
                {/* 정렬 옵션 바텀시트 */}
                {rangeBottomSheet && (
                    <BottomSheet
                        visible={rangeBottomSheet}
                        onClose={() => setRangeBottomSheet(false)}
                        options={rangeList} // 변경된 정렬 리스트 적용
                        onSelect={(selectedRange) => {
                            setRange(selectedRange);

                            const sortOptionMap: Record<string, any> = {
                                최신순: 'NEWEST_FIRST',
                                '오래된 순': 'OLDEST_FIRST',
                                '조회수 순': 'MOST_VIEWED',
                                '좋아요 순': 'MOST_LIKED',
                            };

                            const newSortOption =
                                sortOptionMap[selectedRange] || 'NEWEST_FIRST';

                            setsortOption(newSortOption);
                            fetchData(newSortOption, category);
                        }}
                        selectedOption={range}
                    />
                )}
                {dataList && dataList.length > 0 ? ( // 게시물의 길이가 0 이상인 경우
                    <View style={styles.postsContainer}>
                        {postType === 'savedPharmacies' ? (
                            <PharmacyItem pharmacies={dataList || []} />
                        ) : (
                            dataList?.map((item, index) => (
                                <PostItem
                                    key={index}
                                    post={item}
                                    page={'myPage'}
                                />
                            ))
                        )}
                    </View>
                ) : (
                    // 아무것도 없는 경우에 띄울 화면
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
                {rangeBottomSheet && (
                    <BottomSheet
                        visible={rangeBottomSheet}
                        onClose={() => setRangeBottomSheet(false)}
                        options={rangeList}
                        onSelect={(selectedRange) => {
                            setRange(selectedRange);
                            const newSortOption =
                                selectedRange === '최신순'
                                    ? 'NEWEST_FIRST'
                                    : 'OLDEST_FIRST';

                            setsortOption(newSortOption);
                            //상태 업데이트 후 fetchData 실행
                            setTimeout(() => {
                                fetchData(newSortOption, category);
                            }, 0);
                        }}
                        selectedOption={range}
                    />
                )}
            </Fragment>
        </View>
    );
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
];
