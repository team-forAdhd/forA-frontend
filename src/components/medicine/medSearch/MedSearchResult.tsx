import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { View, Image, TouchableOpacity, Text } from 'react-native';
import { styles, text } from './../medicineScreen/MedicineStyle';
import TabBar from '@/components/common/tabBar/tabBar';
import MedicineListItem from '../medListItem/MedicineListItem';
import {
    getMedListApi,
    getMedListByIngredientApi,
} from '@/api/medicine/medListApi';
import { ScrollView } from 'react-native-gesture-handler';
import BottomSheet from '../medBottomSheet/BottomSheet';
import { RootStackParamList } from '@/components/navigation';

type Med = {
    id: number;
    itemName: string;
    itemEngName: string;
    entpName: string;
    itemImage: string;
    className: string;
    rating: number;
    favorite: boolean;
};

interface MedSearchResultProps {
    resultList: Med[];
    searchInputValue: string;
}

type MedSearchResultRouteProp = RouteProp<
    RootStackParamList,
    'MedSearchResult'
>;

type MedSearchResultScreenProps = {
    route: MedSearchResultRouteProp;
};

export default function MedSearchResult({ route }: MedSearchResultScreenProps) {
    const { resultList, searchInputValue, selectedShapeForm, selectedColor } =
        route.params;
    const { t } = useTranslation('medicine');
    const navigation = useNavigation();
    const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
    const [selectedIngredient, setSelectedIngredient] = useState<string | null>(
        null,
    );
    const [medList, setMedList] = useState<Med[]>([]);
    const ingredientList = ['메틸페니데이트', '아토목세틴', '클로니딘'];
    const ingredientMap: { [key: string]: string } = {
        메틸페니데이트: 'METHYLPHENIDATE',
        아토목세틴: 'ATOMOXETINE',
        클로니딘: 'CLONIDINE',
    };

    //정렬 리스트
    const rangeList = ['가나다 순', '성분 순', '별점 높은 순', '즐겨찾기'];
    const [sortOption, setSortOption] = useState(rangeList[0]);

    // 성분 선택 시 해당 성분의 약 리스트 API 호출
    const fetchMedListByIngredient = async (ingredient: string) => {
        const englishName = ingredientMap[ingredient]; // 한글명을 영문명으로 변환
        const data = await getMedListByIngredientApi(englishName);
        const filteredData = data.map((med: any) => ({
            id: med.medicineId,
            itemName: med.itemName,
            entpName: med.entpName,
            itemEngName: med.itemEngName,
            itemImage: med.itemImage,
            className: med.className || '알 수 없음',
            rating: med.rating ?? 0,
            favorite: med.favorite ?? false,
        }));
        setMedList(filteredData);
        setSelectedIngredient(ingredient); // 성분을 선택한 상태로 유지
    };

    const gotoMedSearch = () => {
        // 약 일반 검색창으로 이동
        navigation.navigate('MedSearch' as never);
    };
    // const gotoMedShapeSearch = () => {
    //     // 약 모양 검색창으로 이동
    //     navigation.navigate('ShapeSearch' as never)
    // }

    const shapeMap: { [key: string]: string } = {
        원형: '원형',
        장방형: '장방형',
        타원형: '타원형',
    };

    const colorMap: { [key: string]: string } = {
        하양: '하양',
        노랑: '노랑',
        주황: '주황',
        분홍: '분홍',
        빨강: '빨강',
        갈색: '갈색',
        연두: '연두',
        초록: '초록',
        청록: '청록',
        파랑: '파랑',
        남색: '남색',
        자주: '자주',
        보라: '보라',
        회색: '회색',
        검정: '검정',
        투명: '투명',
    };

    const tabletTypeMap: { [key: string]: string } = {
        정제: 'TABLET',
        경질캡슐제: 'HARD_CAPSULE',
        연질캡슐제: 'SOFT_CAPSULE',
        서방정: 'EXTENDED_RELEASE_TABLET',
        서방성필름코팅정: 'EXTENDED_RELEASE_FILM_COATED_TABLET',
        '경질캡슐제, 산제': 'HARD_CAPSULE',
        '장용성캡슐제, 펠렛': 'ENTERIC_COATED_CAPSULE',
        나정: 'TABLET',
        필름코팅정: 'FILM_COATED_TABLET',
        '경질캡슐제, 산제, 펠렛': 'HARD_CAPSULE',
    };

    // 정렬 함수
    const sortMedList = () => {
        if (!resultList || resultList.length === 0) {
            console.log('검색 결과 없음', resultList);
            return [];
        }

        console.log('API 응답 데이터:', JSON.stringify(resultList, null, 2));

        // // 필수 속성이 있는지 확인
        // if (!resultList[0].drugShape || !resultList[0].colorClass1 || !resultList[0].formCodeName) {
        //     console.warn("응답 데이터에 필수 필터링 속성이 없음!");
        // }

        // console.log('검색 키워드:', searchInputValue);

        // // 검색어 분리
        // const searchKeywords = searchInputValue.split(', ').map((kw) => kw.trim())

        // // 검색 키워드 변환 (제형은 한글로 변환)
        // const convertedSearchKeywords = searchKeywords.map((kw) => tabletTypeMap[kw] ?? kw)

        // console.log("변환된 검색어:", convertedSearchKeywords)

        // // `resultList`가 올바르게 전달되었는지 확인
        // console.log('API 응답 데이터 구조:', resultList[0]);

        // console.log('검색 키워드:', searchInputValue);

        // // 검색어 기반 필터링
        // let filteredData = resultList.filter((med) => {
        //     console.log('현재 약 정보:', med);

        //     const medShape = med.drugShape ? med.drugShape.trim() : ''
        //     const medColor1 = med.colorClass1 ? med.colorClass1.trim() : ''
        //     const medColor2 = med.colorClass2 ? med.colorClass2.trim() : ''
        //     const medType = med.formCodeName ? (tabletTypeMap[med.formCodeName.trim()] ?? med.formCodeName.trim()).toLowerCase() : ''

        //     console.log('현재 약 정보:', med)
        //     console.log('매칭 데이터:', { medShape, medColor1, medColor2, medType });

        //     const searchKeywords = searchInputValue.split(', ').map((kw) => kw.trim())

        //     return (
        //         (!selectedShapeForm || med.drugShape === selectedShapeForm) &&
        //         (!selectedColor || med.colorClass1 === selectedColor || med.colorClass2 === selectedColor)
        //     )
        // });

        // console.log("필터링 후 남은 약 개수:", filteredData.length);

        // let sortedList = new Array()
        // const filteredData = resultList.map((med: any) => ({
        //let sortedList = filteredData.map((med: any) => ({
        let sortedList = resultList.map((med: any) => ({
            id: med.medicineId,
            itemName: med.itemName,
            entpName: med.entpName,
            itemEngName: med.itemEngName || '알 수 없음',
            itemImage: med.itemImage,
            className: med.className || '알 수 없음',
            rating: med.rating ?? 0,
            favorite: med.favorite ?? false,
        }));

        console.log('변환된 리스트:', sortedList);

        //sortedList = filteredData

        switch (sortOption) {
            case '가나다 순':
                sortedList.sort((a, b) => a.itemName.localeCompare(b.itemName));
                break;
            case '별점 높은 순':
                sortedList.sort((a, b) => b.rating - a.rating);
                break;
            case '즐겨찾기':
                sortedList = sortedList.filter((med) => med.favorite);
                break;
            default:
                break;
        }
        console.log('최종 정렬 리스트:', sortedList);
        return sortedList;
    };

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
                            <Text style={text.searchBarResultText}>
                                {searchInputValue}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    {/* <View>
                        <TouchableOpacity onPress={gotoMedShapeSearch}>
                            <Text style={text.shapeSearchText}>
                                {t('search-shape')}
                            </Text>
                        </TouchableOpacity>
                    </View> */}
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
                    {sortMedList().map((med) => {
                        return <MedicineListItem key={med.id} item={med} />;
                    })}
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
    );
}
