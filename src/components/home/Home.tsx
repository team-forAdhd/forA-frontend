import { useTranslation } from 'react-i18next'
import { View, Text, Image, TouchableOpacity, TextInput } from 'react-native'
import { styles, text } from './HomeStyle'
import { useState } from 'react'

import TabBar from '../common/tabBar/tabBar'

export default function Home() {
    //검색어
    const [searchInput, setSearchInput] = useState<string>('')

    //랭킹 클릭 상태
    const [rankingClick, setRankingClick] = useState<boolean[]>([
        false,
        false,
        false,
        false,
        false,
    ])
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
                <View style={styles.baseContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder=""
                        value={searchInput}
                        onChangeText={(input) => {
                            setSearchInput(input)
                        }}
                    />
                    <TouchableOpacity
                        onPress={() => {
                            console.log('검색어: ', searchInput)
                        }}
                    >
                        <Image
                            style={styles.IconImage}
                            source={require('@/public/assets/search.png')}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.baseContainer}
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
            {/* 랭킹 */}
            <View style={styles.ranking}>
                <Text style={text.clickText}>{t('ranking')}</Text>
            </View>
            {/* 랭킹 리스트 */}
            <View style={styles.rankingListContainer}>
                {rankingList.map((rankingName, index) => {
                    return (
                        <TouchableOpacity
                            style={
                                rankingClick[index]
                                    ? styles.clickContainer
                                    : styles.baseContainer
                            }
                            onPress={() => {
                                const newArray = new Array(5).fill(false)
                                newArray[index] = true
                                setRankingClick(newArray)
                                console.log(rankingName)
                            }}
                        >
                            <Text
                                style={
                                    rankingClick[index]
                                        ? text.clickText
                                        : text.rankingText
                                }
                            >
                                {t(rankingName)}
                            </Text>
                        </TouchableOpacity>
                    )
                })}
            </View>
            {/* 탭바 */}
            <TabBar />
        </View>
    )
}
