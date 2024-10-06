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

interface DescriptionProps {
    setDescription: React.Dispatch<React.SetStateAction<boolean>>
    setModal: React.Dispatch<React.SetStateAction<boolean>>
    hospitalList: Hospital[]
    setSort: React.Dispatch<React.SetStateAction<string>>
    setRerender: React.Dispatch<React.SetStateAction<boolean>>
    reRender: boolean
}

export default function HospitalBottomSheet({
    setDescription,
    setModal,
    hospitalList,
    setSort,
    reRender,
    setRerender,
}: DescriptionProps) {
    //정렬 순서 클릭 상태
    const [sortCLick, setSortCLick] = useState<string>('위치순')
    // 폰 스크린 높이
    const screenHeight = Dimensions.get('window').height
    //정렬순이 처음에는 보이면 안됨
    const [sortVisible, setSortVisible] = useState<boolean>(false)
    // 현재 해당 컴포넌트의 y축 위치
    const translateY = useRef(new Animated.Value(671)).current
    //스크롤해서 내려간 마지막 위치 기억
    const lastY = useRef<number>(0)
    //포에이 리본 병원 설명을 띄우기 위해 클릭 카운트를 확인하기 위한 store
    const store = useContext(foraRibbonStoreContext)

    // 팬 리스폰더 설정
    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true, //터치 시작시 응답할지 결정
            onPanResponderGrant: () => {
                translateY.setOffset(lastY.current) // 드래그 시작 시 현재 위치를 기준으로 설정
                translateY.setValue(0) // 현재 이동 값 초기화
            }, //사용자가 요소 드래그 시작할 때 설정
            onPanResponderMove: Animated.event([null, { dy: translateY }], {
                useNativeDriver: false,
            }), //드래그할 때마다
            onPanResponderRelease: (_, gestureState) => {
                const minDragVelocity = 0.5
                if (gestureState.dy < 0 || gestureState.dy > 0) {
                    //스크롤 하는 경우
                    translateY.flattenOffset() // offset과 현재 값을 합쳐서 새로운 절대 위치 설정
                    const listenerId = translateY.addListener(({ value }) => {
                        lastY.current = value // 현재 값을 lastY.current에 업데이트

                        if (value < 650) {
                            setSortVisible(true)
                        } else {
                            setSortVisible(false)
                        }
                    })

                    Animated.spring(translateY, {
                        toValue: lastY.current + gestureState.dy, //마지막 수지 위치에 드래그한 길이만큼 더해서 이동
                        friction: 3,
                        useNativeDriver: true,
                    }).start(() => {
                        translateY.removeListener(listenerId)
                    })
                } else {
                    // 바텀 시트 터치만 하는 경우 바로 위로 올라가게
                    Animated.spring(translateY, {
                        toValue: 500,
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
                {sortVisible && (
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
                                                    store.setCount(
                                                        store.count + 1,
                                                    )
                                                }
                                                setSortCLick(sortOrder)
                                                if (sortOrder == '위치순') {
                                                    setSort('distance,asc')
                                                } else if (
                                                    sortOrder ===
                                                    '포에이 리본 병원'
                                                ) {
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
                )}
                <View
                    style={{
                        height: '100%',
                        position: 'absolute',
                        top: sortVisible ? 90 : 10,
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
                            />
                        ))}
                </View>
            </View>
        </Animated.View>
    )
}
