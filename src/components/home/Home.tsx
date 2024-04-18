import { useTranslation } from 'react-i18next'
import { View, Text, Image, TouchableOpacity, TextInput } from 'react-native'
import { styles, text } from './HomeStyle'
import { useState } from 'react'

import TabBar from '../common/tabBar/tabBar'
import CarouselComponent from '../common/carousel/carousel'

export default function Home() {
    //랭킹 클릭 상태
    const [rankingClick, setRankingClick] = useState<string>('realtime-tab')
    //새로고침 리랜더링
    const [reRender, setReRender] = useState(false)
    //랭킹 리스트 띄울 이름 키 값
    const rankingList = [
        'realtime-tab',
        '10s-tab',
        '20s-tab',
        '30s-tab',
        'parents-tab',
    ]

    const { t } = useTranslation('home')

    return (
        <View style={styles.container}>
            {/* 헤더 */}
            <View style={styles.header}>
                <Image
                    style={styles.ForAImage}
                    source={require('@/public/assets/forA.png')}
                />
                <View style={styles.Flex}>
                    <TouchableOpacity
                        onPress={() => {
                            console.log('검색창')
                        }}
                    >
                        <Image
                            style={styles.IconImage}
                            source={require('@/public/assets/search.png')}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            console.log('알림창 열기')
                        }}
                    >
                        <Image
                            style={styles.IconImage}
                            source={require('@/public/assets/bell.png')}
                        />
                    </TouchableOpacity>
                </View>
            </View>
            {/* 광고 */}
            <CarouselComponent />
            {/* 랭킹 리스트 */}
            <View style={styles.rankingListContainer}>
                {rankingList.map((rankingName, index) => {
                    return (
                        <TouchableOpacity
                            key={index}
                            style={
                                rankingClick === rankingName
                                    ? styles.clickContainer
                                    : styles.baseContainer
                            }
                            onPress={() => {
                                setRankingClick(rankingName)
                                console.log(rankingName)
                            }}
                        >
                            <Text
                                style={
                                    rankingClick === rankingName
                                        ? text.clickText
                                        : text.baseText
                                }
                            >
                                {t(rankingName)}
                            </Text>
                        </TouchableOpacity>
                    )
                })}
            </View>
            {/* 랭킹 */}
            <View style={styles.ranking}>
                <Text style={text.rankingText}>{t('ranking')}</Text>
                <TouchableOpacity
                    onPress={() => {
                        console.log('새로고침하기')
                        setReRender(!reRender)
                    }}
                >
                    <Image
                        style={styles.RefreshImage}
                        source={require('@/public/assets/refresh.png')}
                    />
                </TouchableOpacity>
            </View>

            {/* 탭바 */}
            <TabBar />
        </View>
    )
}
