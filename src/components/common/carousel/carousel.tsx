import React, { useState } from 'react';
import { View, Image, Dimensions } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { styles } from './carouselStyle';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { Linking } from 'react-native';

interface CarouselItem {
    source: { uri: string };
    name: string;
}

interface CarouselProps {
    setModalTitle: React.Dispatch<React.SetStateAction<string>>;
}
// 함수형 컴포넌트와 props 타입 지정
export default function CarouselComponent({ setModalTitle }: CarouselProps) {
    const navigation = useNavigation();
    const entries: CarouselItem[] = [
        { source: require('@/public/assets/carousel1.png'), name: '인스타' },
        { source: require('@/public/assets/carousel2.png'), name: '약탭' },
        { source: require('@/public/assets/carousel3.png'), name: '공지사항' },
        // { source: require('@/public/assets/carousel4.png'), name: '후원' },
        { source: require('@/public/assets/carousel5.png'), name: '이벤트' },
    ];

    const renderItem = ({ item }: { item: CarouselItem }) => {
        return (
            <View style={styles.slide}>
                <TouchableOpacity
                    onPress={() => {
                        if (item.name === '약탭') {
                            navigation.navigate('약' as never);
                        } else if (item.name === '공지사항') {
                            setModalTitle('notification');
                            // } else if (item.name === '후원') {
                            //     //setModalTitle('support')
                            // }
                        } else if (item.name === '인스타') {
                            Linking.openURL(
                                'https://www.instagram.com/for_adhd?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==',
                            );
                        } else if (item.name === '이벤트') {
                            Linking.openURL(
                                'https://www.instagram.com/p/DJbPaGxSw11/?igsh=MWg0ejZ0ODNwMmhveA==',
                            );
                        }
                    }}
                    style={{ aspectRatio: 16 / 9, width: '100%' }}
                >
                    <Image
                        source={item.source}
                        style={styles.carouselImage}
                        resizeMode="contain"
                    />
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <Carousel
            loop={true}
            data={entries}
            renderItem={renderItem}
            sliderWidth={Dimensions.get('window').width}
            itemWidth={382}
            autoplay={true}
            autoplayInterval={4500}
            enableMomentum={false}
        />
    );
}
