import React, { useRef, useContext, useState } from 'react';
import {
    View,
    Animated,
    PanResponder,
    Text,
    Image,
    Dimensions,
    TouchableOpacity,
    ScrollView,
    TextStyle,
    StyleProp,
    StyleSheet,
    FlatList,
} from 'react-native';
import HospitalListItem from '../../../components/common/hospitalListItem/hospitalListItem';
import { foraRibbonStoreContext } from '@/state/forAribbonClickState';
import { Observer } from 'mobx-react';
import {
    Hospital,
    SortOptions,
} from '@/domains/HospitalList/screens/HospitalMaps';
import { Location } from '@/hooks/useLocation';

interface DescriptionProps {
    setDescription: React.Dispatch<React.SetStateAction<boolean>>;
    setModal: React.Dispatch<React.SetStateAction<boolean>>;
    hospitalList: Hospital[];
    setSort: React.Dispatch<React.SetStateAction<SortOptions>>;
    setRerender: React.Dispatch<React.SetStateAction<boolean>>;
    reRender: boolean;
    location: Location;
    setRadius: React.Dispatch<React.SetStateAction<number>>;
    setFilter: React.Dispatch<React.SetStateAction<string>>;
    loadMore: () => void;
}
const SORT_OPTIONS_DESCRIPTION = {
    REVIEW_DESC: '위치순',
    RIBBON: '포에이 리본 병원',
    DIST_ASC: '리뷰 많은 순',
};
export default function HospitalBottomSheet({
    setDescription,
    setModal,
    hospitalList,
    setSort,
    reRender,
    setRerender,
    location,
    setRadius,
    setFilter,
    loadMore,
}: DescriptionProps) {
    //정렬 순서 클릭 상태
    const [sortCLick, setSortCLick] = useState<string>('위치순');
    const [scrollable, setScrollable] = useState(true);
    const store = useContext(foraRibbonStoreContext);
    const screenHeight = Dimensions.get('window').height;
    const translateY = useRef(new Animated.Value(screenHeight * 0.7)).current;
    const lastGestureY = useRef(screenHeight * 0.7);

    // Define snap points
    const SNAP_POINTS = {
        TOP: screenHeight * 0.2,
        MIDDLE: screenHeight * 0.5,
        BOTTOM: screenHeight * 0.7,
    };

    const snapToPoint = (point: number) => {
        lastGestureY.current = point;
        Animated.spring(translateY, {
            toValue: point,
            friction: 8,
            tension: 40,
            useNativeDriver: true,
        }).start();
    };

    const getClosestSnapPoint = (y: number) => {
        const points = [
            SNAP_POINTS.TOP,
            SNAP_POINTS.MIDDLE,
            SNAP_POINTS.BOTTOM,
        ];
        return points.reduce((prev, curr) =>
            Math.abs(curr - y) < Math.abs(prev - y) ? curr : prev,
        );
    };

    const panResponder = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: (_, gestureState) => {
                // Only respond to vertical gestures
                return Math.abs(gestureState.dy) > Math.abs(gestureState.dx);
            },
            onPanResponderGrant: () => {
                translateY.setValue(lastGestureY.current);
            },
            onPanResponderMove: (_, gestureState) => {
                if (scrollable) {
                    const newY = lastGestureY.current + gestureState.dy;
                    // Limit the movement between top and bottom positions
                    if (newY >= SNAP_POINTS.TOP && newY <= SNAP_POINTS.BOTTOM) {
                        translateY.setValue(newY);
                    }
                }
            },
            onPanResponderRelease: (_, gestureState) => {
                const currentY = lastGestureY.current + gestureState.dy;
                const snapPoint = getClosestSnapPoint(currentY);
                snapToPoint(snapPoint);
            },
        }),
    ).current;

    const sortOrders = ['위치순', '포에이 리본 병원', '리뷰 많은 순'];

    return (
        <Animated.View
            style={{
                height: screenHeight - 200,
                width: '100%',
                transform: [{ translateY }],
                backgroundColor: 'white',
                zIndex: 10,
                borderRadius: 20,
                flexDirection: 'column',
            }}
            {...(scrollable ? panResponder.panHandlers : {})}
        >
            <TouchableOpacity activeOpacity={1} style={styles.topLine}>
                <Image
                    source={require('@/public/assets/bottomsheetTop.png')}
                    style={{ width: 80, height: 5 }}
                />
            </TouchableOpacity>
            <View style={styles.listContainer}>
                <View style={styles.rankingListContainer}>
                    {sortOrders.map((sortOrder, index) => {
                        return (
                            <Observer key={index}>
                                {() => (
                                    <TouchableOpacity
                                        style={
                                            sortCLick === sortOrder
                                                ? sortCLick ===
                                                  '포에이 리본 병원'
                                                    ? styles.forAClickContainer
                                                    : styles.clickContainer
                                                : styles.baseContainer
                                        }
                                        onPress={() => {
                                            if (
                                                sortOrder ===
                                                    '포에이 리본 병원' &&
                                                store.count === 0 //정렬에서 포에이 리본 병원을 처음 누른 경우
                                            ) {
                                                setDescription(true);
                                                store.setCount(store.count + 1);
                                            }
                                            setSortCLick(sortOrder);
                                            if (sortOrder == '위치순') {
                                                setSort('DIST_ASC');
                                            } else if (
                                                sortOrder === '포에이 리본 병원'
                                            ) {
                                                setFilter('');
                                                setRadius(5000);
                                                setSort('RIBBON');
                                            } else {
                                                setSort('REVIEW_DESC');
                                            }
                                        }}
                                    >
                                        <Text
                                            style={
                                                sortCLick === sortOrder
                                                    ? text.clickText
                                                    : text.basicText
                                            }
                                        >
                                            {sortOrder}
                                        </Text>
                                    </TouchableOpacity>
                                )}
                            </Observer>
                        );
                    })}
                </View>
                <View
                    style={{ zIndex: 20, flex: 1, paddingBottom: 40 }}
                    onTouchStart={() => setScrollable(false)}
                    onTouchEnd={() => setScrollable(true)}
                >
                    <FlatList
                        data={hospitalList}
                        scrollEnabled={true}
                        renderItem={({ item }) => (
                            <HospitalListItem
                                hospital={item}
                                setModal={setModal}
                                setRerender={setRerender}
                                reRender={reRender}
                                location={location}
                            />
                        )}
                        onEndReached={loadMore}
                    />
                </View>
            </View>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingHorizontal: 16,
        height: 25,
        marginTop: 20,
    },
    topLine: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: 30,
        borderRadius: 500,
        zIndex: 11,
    },
    listContainer: {
        justifyContent: 'center',
        flexDirection: 'column',
        width: '100%',
        height: '80%',
    },
    contentContainer: {
        position: 'absolute',
        top: 80,
        backgroundColor: 'white',
        justifyContent: 'center',
        paddingHorizontal: 32,
        marginHorizontal: 8,
        width: 398,
    },
    businessInfoContainer: {
        position: 'absolute',
        bottom: 50,
        left: 38,
    },
    rankingListContainer: {
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        paddingVertical: 16,
        paddingLeft: 12,
    },
    baseContainer: {
        height: 33,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#EDEDEA',
        borderRadius: 500,
        marginHorizontal: 4,
        paddingHorizontal: 5,
    },
    clickContainer: {
        height: 33,
        backgroundColor: '#52A55D',
        borderRadius: 500,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 4,
        paddingHorizontal: 5,
    },
    forAClickContainer: {
        height: 33,
        backgroundColor: '#FF5D5D',
        borderRadius: 500,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 4,
        paddingHorizontal: 5,
    },
    ranking: {
        marginLeft: 16,
        marginRight: 16,
        marginBottom: 8,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    postListContainer: {
        paddingHorizontal: 16,
    },
});

// 공통 스타일 정의
const baseText = {
    fontFamily: 'Pretendard',
    fontStyle: 'normal',
    fontWeight: '400',
};

const text = {
    titleText: {
        fontWeight: 'bold',
        color: '#52A55D',
        fontSize: 18,
        lineHeight: 28,
        letterSpacing: -1,
    },
    clickText: {
        ...baseText,
        fontSize: 16,
        lineHeight: 19.6,
        letterSpacing: -0.7,
        margin: 5,
        color: 'white',
    },
    basicText: {
        ...baseText,
        fontSize: 16,
        lineHeight: 19.6,
        letterSpacing: -0.7,
        margin: 5,
        color: '#555555',
    },
    viewContentText: {
        ...baseText,
        color: '#52A55D',
        fontSize: 14,
        lineHeight: 19.6,
        letterSpacing: -0.7,
        textDecorationLine: 'underline',
    },
    businessInfoText: {
        ...baseText,
        color: '#949494',
        textAlign: 'center',
    },
} as {
    [key: string]: StyleProp<TextStyle>;
};
