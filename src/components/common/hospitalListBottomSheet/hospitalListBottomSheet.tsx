import React, { useRef, useContext, useState } from 'react'
import {
    View,
    Animated,
    PanResponder,
    Text,
    Image,
    Dimensions,
    TouchableOpacity,
} from 'react-native'
import { styles, text } from './hospitalListBottomSheetStyle'
import HospitalListItem from '../hospitalListItem/hospitalListItem'
import { foraRibbonStoreContext } from '@/state/forAribbonClickState'
import { Observer } from 'mobx-react'
import { Hospital } from '@/components/hospital/HospitalMaps'
import { LocationCoords } from '@/components/hospital/HospitalMaps'

interface DescriptionProps {
    setDescription: React.Dispatch<React.SetStateAction<boolean>>
    setModal: React.Dispatch<React.SetStateAction<boolean>>
    hospitalList: Hospital[]
    setSort: React.Dispatch<React.SetStateAction<string>>
    setRerender: React.Dispatch<React.SetStateAction<boolean>>
    reRender: boolean
    location: LocationCoords | null
    setRadius: React.Dispatch<React.SetStateAction<number>>
    setFilter: React.Dispatch<React.SetStateAction<string>>
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
    const [sortCLick, setSortCLick] = useState<string>('위치순')
    // 폰 스크린 높이
    const screenHeight = Dimensions.get('window').height

    // 현재 해당 컴포넌트의 y축 위치
    const translateY = useRef(new Animated.Value(601)).current
    //스크롤해서 내려간 마지막 위치 기억
    const lastY = useRef<number>(0)
    //포에이 리본 병원 설명을 띄우기 위해 클릭 카운트를 확인하기 위한 store
    const store = useContext(foraRibbonStoreContext)

    const minTranslateY = 325 // 최상단 위치 제한
    const maxTranslateY = 601 // 최하단 위치 제한

    // 팬 리스폰더 설정
    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderGrant: () => {
                translateY.setOffset(lastY.current)
                translateY.setValue(0)
            },
            onPanResponderMove: Animated.event([null, { dy: translateY }], {
                useNativeDriver: false,
            }),
            onPanResponderRelease: (_, gestureState) => {
                const newTranslateY = lastY.current + gestureState.dy

                // 이동할 값을 minTranslateY와 maxTranslateY 사이로 제한
                const boundedTranslateY = Math.max(
                    minTranslateY,
                    Math.min(newTranslateY, maxTranslateY),
                )

                // 스크롤 드래그 동작
                if (gestureState.dy !== 0) {
                    translateY.flattenOffset()
                    const listenerId = translateY.addListener(({ value }) => {
                        lastY.current = value
                    })

                    Animated.spring(translateY, {
                        toValue: boundedTranslateY,
                        friction: 3,
                        useNativeDriver: true,
                    }).start(() => {
                        translateY.removeListener(listenerId)
                    })
                } else {
                    // 터치만 한 경우 특정 위치로 이동
                    Animated.spring(translateY, {
                        toValue: maxTranslateY, // maxTranslateY 범위로 이동
                        friction: 3,
                        useNativeDriver: true,
                    }).start()
                }
            },
        }),
    ).current

    const sortOrders = ['위치순', '포에이 리본 병원', '리뷰 많은 순']

    return (
        <Animated.View
            style={{
                height: screenHeight,
                width: '100%',
                transform: [{ translateY }],
                backgroundColor: 'white',
                zIndex: 10,
                borderRadius: 20,
                justifyContent: 'center',
            }}
            {...panResponder.panHandlers}
        >
            <Image
                style={styles.topLine}
                source={require('@/public/assets/bottomsheetTop.png')}
            />
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
                                                setDescription(true)
                                                store.setCount(store.count + 1)
                                            }
                                            setSortCLick(sortOrder)
                                            if (sortOrder == '위치순') {
                                                setSort('distance,asc')
                                            } else if (
                                                sortOrder === '포에이 리본 병원'
                                            ) {
                                                setFilter('')
                                                setRadius(5000)
                                            } else {
                                                setSort('reviewCount,desc')
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
                        )
                    })}
                </View>

                <View
                    style={{
                        height: '100%',
                        position: 'absolute',
                        top: 90,
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
                </View>
            </View>
        </Animated.View>
    )
}
