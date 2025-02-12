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
} from 'react-native';
import { styles, text } from './hospitalListBottomSheetStyle';
import HospitalListItem from '../hospitalListItem/hospitalListItem';
import { foraRibbonStoreContext } from '@/state/forAribbonClickState';
import { Observer } from 'mobx-react';
import { Hospital } from '@/components/hospital/HospitalMaps';
import { LocationCoords } from '@/components/hospital/HospitalMaps';

interface DescriptionProps {
    setDescription: React.Dispatch<React.SetStateAction<boolean>>;
    setModal: React.Dispatch<React.SetStateAction<boolean>>;
    hospitalList: Hospital[];
    setSort: React.Dispatch<React.SetStateAction<string>>;
    setRerender: React.Dispatch<React.SetStateAction<boolean>>;
    reRender: boolean;
    location: LocationCoords | null;
    setRadius: React.Dispatch<React.SetStateAction<number>>;
    setFilter: React.Dispatch<React.SetStateAction<string>>;
}

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
                            <Observer>
                                {() => (
                                    <TouchableOpacity
                                        key={index}
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
                                                setSort('distance,asc');
                                            } else if (
                                                sortOrder === '포에이 리본 병원'
                                            ) {
                                                setFilter('');
                                                setRadius(5000);
                                            } else {
                                                setSort('reviewCount,desc');
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

                <ScrollView
                    onTouchStart={() => setScrollable(false)}
                    onTouchEnd={() => setScrollable(true)}
                    style={{
                        zIndex: 20,
                        height: '100%',
                    }}
                >
                    {hospitalList &&
                        hospitalList.map((hospital, index) => (
                            <HospitalListItem
                                hospital={hospital}
                                key={index}
                                setModal={setModal}
                                setRerender={setRerender}
                                reRender={reRender}
                                location={location}
                            />
                        ))}
                </ScrollView>
            </View>
        </Animated.View>
    );
}
