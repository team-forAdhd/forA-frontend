import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import PagerView from 'react-native-pager-view'

const steps = [
    {
        text: `내가 ADHD일까, 오늘도 실수한 '나'\n다들 어떻게 지내?`,
        imageSrc: require('@/public/assets/splash/onboard-1-1.png'),
        indicatorSrc: require('@/public/assets/splash/onboard-1-indi.png'),
    },
    {
        text: `병원은 어디가 좋아\n'간단리뷰' & '영수증리뷰'`,
        imageSrc: require('@/public/assets/splash/onboard-2-1.png'),
        indicatorSrc: require('@/public/assets/splash/onboard-2-indi.png'),
    },
    {
        text: `자가진단으로 알아보는\n나의 ADHD`,
        imageSrc: require('@/public/assets/splash/onboard-3-1.png'),
        indicatorSrc: require('@/public/assets/splash/onboard-3-indi.png'),
    },
    {
        text: `약 부작용 어때?\n#용량 #나이 로 알아보자`,
        imageSrc: require('@/public/assets/splash/onboard-4.png'),
        indicatorSrc: null,
    },
]

const OnboardScreen = () => {
    const navigation = useNavigation()

    const handleNext = () => {
        navigation.navigate('Home' as never)
    }

    return (
        <PagerView initialPage={0} useNext={false}>
            {steps.map((step, index) => (
                <View key={index} style={{ flex: 1 }}>
                    <OnboardingStep
                        step={step}
                        isLast={index === steps.length - 1}
                        onNext={handleNext}
                    />
                </View>
            ))}
        </PagerView>
    )
}

const OnboardingStep = ({ step, isLast, onNext }) => {
    return (
        <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
            <Text>{step.text}</Text>
            <Image source={step.imageSrc} />
            {step.indicatorSrc && <Image source={step.indicatorSrc} />}
            {isLast && (
                <TouchableOpacity onPress={onNext}>
                    <Text>메인 홈으로 접속</Text>
                </TouchableOpacity>
            )}
        </View>
    )
}

export default OnboardScreen
