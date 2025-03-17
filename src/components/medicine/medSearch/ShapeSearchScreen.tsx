import React, { useState, useEffect, useTransition } from 'react'
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { styles, text } from './ShapeSearchStyle'
import { useTranslation } from 'react-i18next'
import { getShapeColorSearchResult } from '@/api/medicine/medSearchApi'
import { getMedSortedListApi } from '@/api/medicine/medSearchApi'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '@/components/navigation'

type ShapeSearchScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    'MedSearchResult'
>

const ShapeSearchScreen = () => {
    const navigation = useNavigation<ShapeSearchScreenNavigationProp>()
    const { t } = useTranslation('medicine')

    const [selectedDosageForm, setSelectedDosageForm] = useState<string | null>(
        null,
    )
    const [selectedShapeForm, setSelectedShapeForm] = useState<string | null>(
        null,
    )
    const [selectedColor, setSelectedColor] = useState<string | null>(null)

    const dosageForms = [
        {
            label: '정제',
            image: require('@/public/assets/med/shapeSearch/formula-1.png'),
            style: styles.formula1,
        },
        {
            label: '경질캡슐',
            image: require('@/public/assets/med/shapeSearch/formula-2.png'),
            style: styles.formula2,
        },
        {
            label: '연질캡슐',
            image: require('@/public/assets/med/shapeSearch/formula-3.png'),
            style: styles.formula2,
        },
    ]
    const dosageMap: { [key: string]: string } = {
        정제: 'TABLET',
        경질캡슐: 'HARD_CAPSULE',
        연질캡슐: 'SOFT_CAPSULE',
    }
    const shapeForms = [
        {
            label: '원형',
            image: require('@/public/assets/med/shapeSearch/shape-1.png'),
            style: styles.shape1,
        },
        {
            label: '장방형',
            image: require('@/public/assets/med/shapeSearch/shape-2.png'),
            style: styles.shape2,
        },
        {
            label: '타원형',
            image: require('@/public/assets/med/shapeSearch/shape-3.png'),
            style: styles.shape2,
        },
    ]
    const colors = [
        {
            label: '하양',
            image: require('@/public/assets/med/shapeSearch/shape-1.png'),
        },
        {
            label: '노랑',
            image: require('@/public/assets/med/shapeSearch/yellow.png'),
        },
        {
            label: '주황',
            image: require('@/public/assets/med/shapeSearch/orange.png'),
        },
        {
            label: '분홍',
            image: require('@/public/assets/med/shapeSearch/pink.png'),
        },
        {
            label: '빨강',
            image: require('@/public/assets/med/shapeSearch/red.png'),
        },
        {
            label: '갈색',
            image: require('@/public/assets/med/shapeSearch/brown.png'),
        },
        {
            label: '연두',
            image: require('@/public/assets/med/shapeSearch/l-green.png'),
        },
        {
            label: '초록',
            image: require('@/public/assets/med/shapeSearch/green.png'),
        },
        {
            label: '청록',
            image: require('@/public/assets/med/shapeSearch/cyon.png'),
        },
        {
            label: '파랑',
            image: require('@/public/assets/med/shapeSearch/blue.png'),
        },
        {
            label: '남색',
            image: require('@/public/assets/med/shapeSearch/navy.png'),
        },
        {
            label: '자주',
            image: require('@/public/assets/med/shapeSearch/purple.png'),
        },
        {
            label: '보라',
            image: require('@/public/assets/med/shapeSearch/violet.png'),
        },
        {
            label: '회색',
            image: require('@/public/assets/med/shapeSearch/gray.png'),
        },
        {
            label: '검정',
            image: require('@/public/assets/med/shapeSearch/black.png'),
        },
        {
            label: '투명',
            image: require('@/public/assets/med/shapeSearch/shape-1.png'),
        },
    ]

    const isSearchButtonEnabled =
        selectedDosageForm || selectedShapeForm || selectedColor
        
    // const handleSearch = async () => {
    //     try {
    //         // 선택된 값들을 배열로 모은 후 콤마로 구분하여 문자열로 변환
    //         const selectedValues = [
    //             selectedDosageForm,
    //             selectedShapeForm,
    //             selectedColor,
    //         ].filter(Boolean) // null이나 undefined 제거
    //         const resultString = selectedValues.join(', ')

    //         console.log('검색 조건:', {
    //             shape: selectedShapeForm,
    //             tabletType: dosageMap[selectedDosageForm || ''],
    //             color: selectedColor,
    //         })

    //         //선택된 값만 '' 안에 담아서 API 호출
    //         const searchResult = await getShapeColorSearchResult(
    //             selectedShapeForm || '',
    //             dosageMap[selectedDosageForm || ''],
    //             selectedColor || '',
    //         )

    //         console.log('API 응답 데이터:', searchResult)

    //         if (!searchResult || !searchResult.data) {
    //             console.error('API 응답 데이터가 없습니다.')
    //             return
    //         }
    
    //         // API에서 가져온 약 목록을 `medList`로 설정
    //         const medList = searchResult.data
    
    //         console.log('API에서 가져온 전체 약 목록:', medList)

    //         // 모양 필터 적용
    //         let filteredData = medList.filter((med) => {
    //             return !selectedShapeForm || med.drugShape === selectedShapeForm;
    //         });

    //         // 색상 필터 적용 (colorClass1 또는 colorClass2와 일치하는 경우)
    //         filteredData = filteredData.filter((med) => {
    //             return !selectedColor || med.colorClass1 === selectedColor || med.colorClass2 === selectedColor;
    //         });

    //     console.log('필터링된 데이터:', filteredData);

    //         console.log('필터링된 데이터:', filteredData);

    //         // 올바르게 쿼리 파라미터 생성
    //         const queryParams: string[] = []
    //         if (selectedDosageForm) {
    //             queryParams.push(`tabletType=${encodeURIComponent(dosageMap[selectedDosageForm])}`)
    //         }
    //         if (selectedShapeForm) {
    //             queryParams.push(`shape=${encodeURIComponent(selectedShapeForm)}`)
    //         }
    //         if (selectedColor) {
    //             queryParams.push(`color1=${encodeURIComponent(selectedColor)}`)
    //         }

    //         // 최종 API URL
    //         const queryString = queryParams.length > 0 ? `?${queryParams.join('&')}` : ''
    //         console.log('API 요청 URL:', `/medicines/search${queryString}`)
            
    //         // 디버깅: API 응답 확인
    //         console.log('API 응답 데이터:', searchResult)

    //         // 선택된 필터 값들도 resultList에 포함해서 MedSearchResult로 전달
    //         navigation.navigate('MedSearchResult', {
    //             resultList: searchResult.data,
    //             searchInputValue: resultString,
    //         })
    //     } catch (error) {
    //         console.error('Error while ShapleColorSearch:', error)
    //     }
    // }

    const shapeMap: { [key: string]: string } = {
        원형: '원형',
        장방형: '장방형',
        타원형: '타원형',
    }
    
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
    }

    const handleSearch = async () => {
        try {
            const selectedTabletTypes = selectedDosageForm ? dosageMap[selectedDosageForm] : undefined;
            const selectedShape = selectedShapeForm ? shapeMap[selectedShapeForm] : undefined;
            const selectedColorValue = selectedColor ? colorMap[selectedColor] : undefined;

            console.log('검색 조건:', {
                // shape: selectedShapeForm,
                // tabletType: selectedTabletTypes,
                // color: selectedColor,
                shape: selectedShape,
                tabletType: selectedTabletTypes,
                color: selectedColorValue,
            })

            // 한글 값을 URL에 맞게 인코딩
            const encodedShape = selectedShape ? encodeURIComponent(selectedShape) : undefined;
            const encodedColor = selectedColorValue ? encodeURIComponent(selectedColorValue) : undefined;
            const encodedTabletType = selectedTabletTypes ? encodeURIComponent(selectedTabletTypes) : undefined;
    
            console.log('검색 조건:', {
                shape: encodedShape,
                tabletType: encodedTabletType,
                color: encodedColor,
            });

            // API 호출
            const searchResult = await getMedSortedListApi(
                undefined, // itemName 생략
                // selectedShapeForm || undefined,
                // selectedColor || undefined,
                // selectedTabletTypes ? [selectedTabletTypes] : undefined
                encodedShape,
                encodedColor,
                encodedTabletType ? [encodedTabletType] : undefined
            )
    
            console.log('API 응답 데이터:', searchResult)
    
            if (!searchResult || !searchResult.data) {
                console.error('API 응답 데이터가 없습니다.')
                return
            }
    
            // 검색된 약 목록을 MedSearchResult로 전달
            navigation.navigate('MedSearchResult', {
                resultList: searchResult.data, // 필터링된 결과 전달
                searchInputValue: `${selectedDosageForm || ''} ${selectedShapeForm || ''} ${selectedColor || ''}`.trim(),
            })
        } catch (error) {
            console.error('Error while searching:', error)
        }
    }    
    

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>{t('search-by-shape')}</Text>
            </View>
            <TouchableOpacity
                    style={[styles.gobackIcon, {zIndex: 1}]}
                    onPress={() => {
                        console.log('뒤로 가기 버튼 눌림')
                        navigation.navigate('MedicineMain')}
                    }
                    >
                    <Image
                        style={styles.gobackSize}
                        source={require('@/public/assets/goback.png')}
                    />
                </TouchableOpacity>
        
            <ScrollView contentContainerStyle={{paddingBottom: 180}}>
                <View style={styles.content}>
                    <Text style={text.sectionTitle}>{t('formula')}</Text>
                    <View style={styles.toggleContainer}>
                        {dosageForms.map((form, index) => (
                            <TouchableOpacity
                                key={index}
                                style={[
                                    styles.optionButton,
                                    selectedDosageForm === form.label &&
                                        styles.selectedButton,
                                    index < 3 && styles.optionButtonFirstRow, // 첫 번째 행에만 상단 border 추가
                                    index % 3 === 0 &&
                                        styles.optionButtonFirstColumn, // 첫 번째 열에만 좌측 border 추가
                                ]}
                                onPress={() => setSelectedDosageForm(form.label)}
                            >
                                <View style={styles.setRow}>
                                    <Image source={form.image} style={form.style} />
                                    <Text
                                        style={[
                                            text.contentText,
                                            selectedDosageForm === form.label &&
                                                text.selectedButtonText,
                                        ]}
                                    >
                                        {form.label}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>
                    <View style={styles.underBar} />

                    <Text style={text.sectionTitle}>{t('shape')}</Text>
                    <View style={styles.toggleContainer}>
                        {shapeForms.map((form, index) => (
                            <TouchableOpacity
                                key={index}
                                style={[
                                    styles.optionButton,
                                    selectedShapeForm === form.label &&
                                        styles.selectedButton,
                                    index < 3 && styles.optionButtonFirstRow,
                                    index % 3 === 0 &&
                                        styles.optionButtonFirstColumn,
                                ]}
                                onPress={() => setSelectedShapeForm(form.label)}
                            >
                                <View style={styles.setRow}>
                                    <Image source={form.image} style={form.style} />
                                    <Text
                                        style={[
                                            text.contentText,
                                            selectedShapeForm === form.label &&
                                                text.selectedButtonText,
                                        ]}
                                    >
                                        {form.label}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>
                    <View style={styles.underBar} />

                    <Text style={text.sectionTitle}>{t('color')}</Text>
                    <View style={styles.optionGrid}>
                        {colors.map((color, index) => (
                            <TouchableOpacity
                                key={index}
                                style={[
                                    styles.optionButton,
                                    selectedColor === color.label &&
                                        styles.selectedButton,
                                    index < 3 && styles.optionButtonFirstRow,
                                    index % 3 === 0 &&
                                        styles.optionButtonFirstColumn,
                                ]}
                                onPress={() => setSelectedColor(color.label)}
                            >
                                <View style={styles.setRow}>
                                    <Image
                                        source={color.image}
                                        style={styles.roundIcon}
                                    />
                                    <Text
                                        style={[
                                            text.contentText,
                                            selectedColor === color.label &&
                                                text.selectedButtonText,
                                        ]}
                                    >
                                        {color.label}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            </ScrollView>
            <TouchableOpacity
                style={
                    isSearchButtonEnabled
                        ? styles.searchButton
                        : styles.disabledSearchButton
                }
                onPress={handleSearch}
                disabled={!isSearchButtonEnabled}
            >
                <Text
                    style={
                        isSearchButtonEnabled
                            ? text.searchEnableText
                            : text.searchDisableText
                    }
                >
                    {t('search')}
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default ShapeSearchScreen
