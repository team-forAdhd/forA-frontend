import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigation } from '@react-navigation/native'
import { View, Image, TouchableOpacity, Text, FlatList } from 'react-native'
import { styles, text } from './MedicineStyle'
import TabBar from '@/components/common/tabBar/tabBar'
import { MedicineItem } from '@/common/types'
import MedicineListItem from '../medListItem/MedicineListItem'
import {
    getMedListApi,
    getMedListByIngredientApi,
} from '@/api/medicine/medListApi'
import { ScrollView } from 'react-native-gesture-handler'
import BottomSheet from '../medBottomSheet/BottomSheet'

type Med = {
    id: number
    itemName: string
    itemEngName: string
    entpName: string
    itemImage: string
    className: string
    rating: number
    favorite: boolean
}

export default function MedScreen() {
    const { t } = useTranslation('medicine')
    const navigation = useNavigation()
    const [searchQuery, setSearchQuery] = useState('')
    const [bottomSheetVisible, setBottomSheetVisible] = useState(false)
    const [selectedIngredient, setSelectedIngredient] = useState<string | null>(
        null,
    )
    const [medList, setMedList] = useState<Med[]>([])
    const [ingredientList, setIngredientList] = useState<string[]>([
        '메틸페니데이트',
        '아토목세틴',
        '클로니딘',
    ])
    const ingredientMap: { [key: string]: string } = {
        메틸페니데이트: 'METHYLPHENIDATE',
        아토목세틴: 'ATOMOXETINE',
        클로니딘: 'CLONIDINE',
    }

    //정렬 리스트
    const rangeList = [
        '가나다 순',
        '성분 순',
        '별점 높은 순',
        '즐겨찾기',
    ]
    const [sortOption, setSortOption] = useState(rangeList[0])

    // 기본 약 리스트 호출
    useEffect(() => {
        if (sortOption === '성분 순') {
        } else {
            fetchMedList()
        }
    }, [sortOption])

    // 성분 선택 시 해당 성분의 약 리스트 API 호출
    const fetchMedListByIngredient = async (ingredient: string) => {
        const englishName = ingredientMap[ingredient] // 한글명을 영문명으로 변환
        const data = await getMedListByIngredientApi(englishName)
        const filteredData = data.map((med: Med) => ({
            id: med.id,
            itemName: med.itemName,
            entpName: med.entpName,
            itemEngName: med.itemEngName,
            itemImage: med.itemImage,
            className: med.className,
            rating: med.rating,
            favorite: med.favorite,
        }))
        setMedList(filteredData)
        setSelectedIngredient(ingredient) // 성분을 선택한 상태로 유지
    }

    const fetchMedList = async () => {
        const data = await getMedListApi()
        const filteredData = data.map((med: Med) => ({
            id: med.id,
            itemName: med.itemName,
            entpName: med.entpName,
            itemEngName: med.itemEngName,
            itemImage: med.itemImage,
            className: med.className,
            rating: med.rating,
            favorite: med.favorite,
        }))
        setMedList(filteredData)
    }

    const gotoMedSearch = () => {
        // 약 일반 검색창으로 이동
        navigation.navigate('MedSearch' as never)
    }
    const gotoMedShapeSearch = () => {
        // 약 모양 검색창으로 이동
        navigation.navigate('ShapeSearch' as never)
    }

    // 정렬 함수
    const sortMedList = () => {
        let sortedList = [...medList]

        switch (sortOption) {
            case '가나다 순':
                sortedList.sort((a, b) => a.itemName.localeCompare(b.itemName))
                break
            case '별점 높은 순':
                sortedList.sort((a, b) => b.rating - a.rating)
                break
            case '즐겨찾기':
                sortedList = sortedList.filter((med) => med.favorite)
                break
            default:
                break
        }

        return sortedList
    }

    return (
        <View style={styles.container}>
            {/*  헤더 부분 */}
            <View style={styles.header}>
                {/* 타이틀 텍스트 */}
                <View>
                    <Text style={text.titleText}>{t('medicine')}</Text>
                </View>
                {/* 검색 창 */}
                <View style={styles.searchBarContainer}>
                    <View style={styles.searchBar}>
                        <Image
                            style={styles.IconImage}
                            source={require('@/public/assets/greenSearch.png')}
                        />
                        <TouchableOpacity onPress={gotoMedSearch}>
                            <Text style={text.searchBarText}>
                                {t('search-placeholder')}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity onPress={gotoMedShapeSearch}>
                            <Text style={text.shapeSearchText}>
                                {t('search-shape')}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            {/* 정렬 옵션 부분 */}
            <TouchableOpacity onPress={() => setBottomSheetVisible(true)}>
                <View style={styles.sortOption}>
                    <Text style={text.sortOptionText}>{sortOption}</Text>
                    <Image
                        source={require('@/public/assets/med/underArrow.png')}
                        style={styles.underArrowImage}
                    />
                </View>
            </TouchableOpacity>
            {/* 바디 부분 */}
            {sortOption === '성분 순' ? (
                <ScrollView style={styles.medList}>
                    {ingredientList.map((ingredient) => (
                        <View key={ingredient}>
                            <TouchableOpacity
                                onPress={() =>
                                    fetchMedListByIngredient(ingredient)
                                }
                            >
                                <View style={styles.toggle}>
                                    <Text style={text.ingredientText}>
                                        {ingredient}
                                    </Text>
                                    <Image
                                        source={
                                            selectedIngredient === ingredient
                                                ? require('@/public/assets/med/up.png')
                                                : require('@/public/assets/med/green-under.png')
                                        }
                                        style={styles.greenUnderIcon}
                                    />
                                </View>
                            </TouchableOpacity>
                            {selectedIngredient === ingredient && (
                                <View style={styles.toggleInside}>
                                    {medList.map((item) => (
                                        <MedicineListItem
                                            key={item.id}
                                            item={item}
                                        />
                                    ))}
                                </View>
                            )}
                        </View>
                    ))}
                </ScrollView>
            ) : (
                <ScrollView style={styles.medList}>
                    {sortMedList().map((med) => (
                        <MedicineListItem key={med.id} item={med} />
                    ))}
                </ScrollView>
            )}

            {bottomSheetVisible && (
                <BottomSheet
                    visible={bottomSheetVisible}
                    onClose={() => setBottomSheetVisible(false)}
                    options={rangeList}
                    onSelect={setSortOption}
                    selectedOption={sortOption}
                />
            )}
            <TabBar />
        </View>
    )
}
