import React, { useState } from 'react'
import { View, Image, Dimensions } from 'react-native'
import Carousel from 'react-native-snap-carousel'
import { styles } from './carouselStyle'
import { TouchableOpacity } from 'react-native-gesture-handler'

interface CarouselItem {
    source: { uri: string }
    name: string
}

// 함수형 컴포넌트와 props 타입 지정
export default function CarouselComponent() {
    const entries: CarouselItem[] = [
        { source: require('@/public/assets/carousel1.png'), name: '인스타' },
        { source: require('@/public/assets/carousel2.png'), name: 'for A' },
        { source: require('@/public/assets/carousel3.png'), name: '약탭' },
    ]

    const renderItem = ({ item }: { item: CarouselItem }) => {
        return (
            <View style={styles.slide}>
                <TouchableOpacity
                    onPress={() => {
                        console.log(item.name)
                    }}
                >
                    <Image source={item.source} style={styles.carouselImage} />
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <Carousel
            loop={true}
            data={entries}
            renderItem={renderItem}
            sliderWidth={Dimensions.get('window').width}
            itemWidth={382}
        />
    )
}
