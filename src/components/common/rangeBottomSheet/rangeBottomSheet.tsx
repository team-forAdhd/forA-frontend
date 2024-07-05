import React, { useRef, Dispatch, SetStateAction, useState } from 'react'
import {
    View,
    Animated,
    PanResponder,
    Text,
    Image,
    Dimensions,
} from 'react-native'
import { styles, text } from './rangeBottomSheetStyle'
import { TouchableOpacity } from 'react-native-gesture-handler'

interface BottomSheetProps {
    setBottomSheet: Dispatch<SetStateAction<boolean>>
    range: string
    setRange: Dispatch<SetStateAction<string>>
}

export default function RangeBottomSheet({
    setBottomSheet,
    range,
    setRange,
}: BottomSheetProps) {
    // 현재 해당 컴포넌트의 y축 위치
    const translateY = useRef(new Animated.Value(566)).current
    //스크롤해서 내려간 마지막 위치 기억
    const lastY = useRef<number>(0)

    //정렬 리스트
    const rangeList = ['최신순', '오래된 순', '조회수 순', '좋아요 순']

    // 팬 리스폰더 설정
    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true, //터치 시작시 응답할지 결정
            onPanResponderGrant: () => {
                translateY.setOffset(lastY.current) // 드래그 시작 시 현재 위치를 기준으로 설정
            },
            onPanResponderMove: Animated.event([null, { dy: translateY }], {
                useNativeDriver: false,
            }),
            onPanResponderRelease: (_, gestureState) => {
                const minDragVelocity = 0.5

                if (gestureState.vy > minDragVelocity) {
                    //빠르게 스와이프하는 경우
                    setBottomSheet(false) // 바텀 시트 상태 업데이트
                }
            },
        }),
    ).current

    return (
        <Animated.View
            style={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                height: 330,
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
                source={require('@/public/assets/rangeTop.png')}
            />
            <View style={styles.titleContainer}>
                <Text style={text.titleText}>정렬 옵션</Text>
            </View>
            <View>
                {rangeList.map((currentRange, key) => (
                    <TouchableOpacity
                        style={styles.rangeInnerContainer}
                        key={key}
                        onPress={() => {
                            setRange(currentRange) //정렬 기준 변경
                        }}
                    >
                        <Text
                            style={
                                range === currentRange
                                    ? text.checkText
                                    : text.commonText
                            }
                        >
                            {currentRange}
                        </Text>
                        {range === currentRange && ( //현재 정렬 기준이면 체크 아이콘 나타나게 하기
                            <Image
                                source={require('@/public/assets/check.png')}
                                style={styles.checkIcon}
                            />
                        )}
                    </TouchableOpacity>
                ))}
            </View>
        </Animated.View>
    )
}
