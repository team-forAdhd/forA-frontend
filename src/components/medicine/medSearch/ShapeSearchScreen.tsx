import React, { useState, useTransition } from 'react'
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { styles, text } from './ShapeSearchStyle'
import { useTranslation } from 'react-i18next'
import { getShapeColorSearchResult } from '@/api/medicine/medSearchApi'
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

    const handleSearch = async () => {
        try {
            // 선택된 값들을 배열로 모은 후 콤마로 구분하여 문자열로 변환
            const selectedValues = [
                selectedDosageForm,
                selectedShapeForm,
                selectedColor,
            ].filter(Boolean) // null이나 undefined 제거
            const resultString = selectedValues.join(', ')

            // 선택된 값만 '' 안에 담아서 API 호출
            const searchResult = await getShapeColorSearchResult(
                selectedShapeForm || '',
                dosageMap[selectedDosageForm || ''],
                selectedColor || '',
            )

            // 선택된 필터 값들도 resultList에 포함해서 MedSearchResult로 전달
            navigation.navigate('MedSearchResult', {
                resultList: searchResult,
                searchInputValue: resultString,
            })
        } catch (error) {
            console.error('Error while ShapleColorSearch:', error)
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.gobackIcon}
                    onPress={() => navigation.goBack()}
                    // onPress={{() => navigation.navigate('medSearch' as never)}}
                >
                    <Image
                        style={styles.gobackSize}
                        source={require('@/public/assets/goback.png')}
                    />
                </TouchableOpacity>
                <Text style={styles.title}>{t('search-by-shape')}</Text>
            </View>

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
