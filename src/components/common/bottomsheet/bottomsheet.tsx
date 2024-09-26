import React, { useRef, Dispatch, SetStateAction, useState } from 'react'
import {
    View,
    Animated,
    PanResponder,
    Text,
    Image,
    Dimensions,
} from 'react-native'
import { styles, text } from './bottomSheetStyle'
import TermsComponent from '../Terms/terms'
import Terms from '@/public/termsObject/termsObject'

interface BottomSheetProps {
    index: number
    setBottomSheet: Dispatch<SetStateAction<boolean[]>>
}

function BottomSheet({ index, setBottomSheet }: BottomSheetProps) {
    //높이를 auto로 설정해도 높이가 동적으로 바뀌지 않아서 자식 컴포넌트에 props로 내려서 해당 자식 컴포넌트 길이 가져오게
    const [termsHeight, setTermsHeight] = useState<number>(500)
    // 폰 스크린 높이
    const screenHeight = Dimensions.get('window').height

    // 현재 해당 컴포넌트의 y축 위치
    const translateY = useRef(new Animated.Value(508)).current
    //스크롤해서 내려간 마지막 위치 기억
    const lastY = useRef<number>(0)

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

                if (gestureState.vy > minDragVelocity) {
                    //빠르게 스와이프하는 경우
                    setBottomSheet([false, false]) // 바텀 시트 상태 업데이트
                    // 바텀 시트를 드래그해서 닫을 때 부모 컴포넌트에서 뒷배경 어둡게 해놓은 것도 변화가 가도록
                    Animated.spring(translateY, {
                        toValue: screenHeight,
                        useNativeDriver: true,
                    }).start()
                } else if (gestureState.dy < 0 || gestureState.dy > 0) {
                    //스크롤 하는 경우
                    translateY.flattenOffset() // offset과 현재 값을 합쳐서 새로운 절대 위치 설정
                    const listenerId = translateY.addListener(({ value }) => {
                        lastY.current = value // 현재 값을 lastY.current에 업데이트
                    })

                    Animated.spring(translateY, {
                        toValue: lastY.current + gestureState.dy, //마지막 수지 위치에 드래그한 길이만큼 더해서 이동
                        friction: 7,
                        useNativeDriver: true,
                    }).start(() => {
                        translateY.removeListener(listenerId)
                    })
                } else {
                    // 바텀 시트 터치만 하는 경우 바로 위로 올라가게
                    Animated.spring(translateY, {
                        toValue: 0,
                        friction: 7,
                        useNativeDriver: true,
                    }).start()
                }
            },
        }),
    ).current

    //바텀 시트 컴포넌트에 props로 넘길 제목 속성 키 배열
    const bottomSheetTitles: ('termsOfService' | 'individualInfo')[] = [
        'termsOfService',
        'individualInfo',
    ]

    return (
        <Animated.View
            style={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                height: termsHeight,
                width: '100%',
                transform: [{ translateY }],
                backgroundColor: '#F4F9D9',
                zIndex: 10,
                borderRadius: 20,
                justifyContent: 'center',
            }}
            {...panResponder.panHandlers}
        >
            <Image
                style={styles.topLine}
                source={require('@/public/assets/agreeTop.png')}
            />
            <View style={styles.titleContainer}>
                <Text style={text.titleText}>
                    {Terms[bottomSheetTitles[index]].title}
                </Text>
            </View>
            <View style={styles.contentContainer}>
                <TermsComponent
                    termsType={bottomSheetTitles[index]}
                    setTermsHeight={setTermsHeight}
                />
            </View>
            <View style={styles.businessInfoContainer}>
                <Text style={text.businessInfoText}>
                    {Terms.businessInformation}
                </Text>
            </View>
            {/* 여기에 바텀 시트 내부 컴포넌트를 배치합니다. */}
        </Animated.View>
    )
}

export default BottomSheet
