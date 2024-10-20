import React, { useState, useRef, useEffect } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    Image,
    LayoutChangeEvent,
} from 'react-native'
import { styles, text } from './MedDetailStyle'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import MedReview from './MedReview'
import { RootStackParamList } from '@/components/navigation'


const truncateItemName = (name: string) => {
    const bracketIndex = name.indexOf('(')
    return bracketIndex !== -1 ? name.substring(0, bracketIndex) : name
}

export default function MedDetail(med : any) {
    const data = med.route.params

    const navigation = useNavigation<NavigationProp<RootStackParamList>>()
    const { t: t } = useTranslation('medicine')
    const { t: dataT } = useTranslation('medDetail')
    const [activeTab, setActiveTab] = useState('정보')
    const [activeButton, setActiveButton] = useState('all')
    const scrollViewRef = useRef<ScrollView>(null)
    const sectionPositions = useRef<{ [key: string]: number }>({})

    const handleLeftArrowPress = () => {
        navigation.navigate('MedicineMain' as never)
    }

    // 항목별 이동을 위한 동적 로직
    const handleScrollToSection = (section: string) => {
        setActiveButton(section)
        const targetSection = section === 'all' ? 'effect' : section
        const position = sectionPositions.current[targetSection]
        if (position !== undefined) {
            scrollViewRef.current?.scrollTo({ y: position, animated: true })
        }
    }

    const handleLayout = (section: string) => (event: LayoutChangeEvent) => {
        const { y } = event.nativeEvent.layout
        sectionPositions.current[section] = y
    }

    // data.id에 따른 약 내용 설정
    const getTranslationKey = (id: number, type: string) => {
        if (type === 'usage') {
            if ([11, 12].includes(id)) return '도모.usage'
            if ([6, 13, 14, 15, 16, 17, 3, 5, 8, 9, 23, 24].includes(id))
                return '아토.usage'
            if ([18, 19, 29, 21, 7].includes(id)) return '아트.usage'
            if ([24, 25, 26, 1].includes(id)) return '메디.usage'
            if (id === 2) return '켑베.usage'
            if ([4, 29, 30].includes(id)) return '콘서.usage'
            if (id === 31) return '페니.usage'
            if ([32, 33].includes(id)) return '페로.usage'
        } else if (type === 'effect') {
            if ([11, 12].includes(id)) return '도모.effect'
            if ([6, 13, 14, 15, 16, 17, 3, 5, 8, 9, 23, 24].includes(id))
                return '아토.effect'
            if ([18, 19, 29, 21, 7].includes(id)) return '아트.effect'
            if ([1, 24, 25, 26].includes(id)) return '메디.effect'
            if (id === 2) return '켑베.effect'
            if ([4, 29, 30].includes(id)) return '콘서.effect'
            if (id === 31) return '페니.effect'
            if ([32, 33].includes(id)) return '페로.effect'
        } else if (type === 'precaution') {
            if ([11, 12].includes(id)) return '도모.precaution'
            if ([6, 13, 14, 15, 16, 17, 3, 5, 8, 9, 23, 24].includes(id))
                return '아토.precaution'
            if ([18, 19, 29, 21, 7].includes(id)) return '아트.precaution'
            if ([24, 25, 26, 1].includes(id)) return '메디.precaution'
            if (id === 2) return '켑베.precaution'
            if ([4, 29, 30].includes(id)) return '콘서.precaution'
            if (id === 31) return '페니.precaution'
            if ([32, 33].includes(id)) return '페로.precaution'
        } else if (type === 'med-info') {
            if ([11, 12].includes(id)) return '도모.med-info'
            if ([6, 13, 14, 15, 16, 17, 3, 5, 8, 9, 23, 24].includes(id))
                return '아토.med-info'
            if ([18, 19, 29, 21, 7].includes(id)) return '아트.med-info'
            if ([24, 25, 26, 1].includes(id)) return '메디.med-info'
            if (id === 2) return '켑베.med-info'
            if ([4, 29, 30].includes(id)) return '콘서.med-info'
            if (id === 31) return '페니.med-info'
            if ([32, 33].includes(id)) return '페로.med-info'
        } else if (type === 'company') {
            if ([11, 12].includes(id)) return '도모.company'
            if ([6, 13, 14, 15, 16, 17, 3, 5, 8, 9, 23, 24].includes(id))
                return '아토.company'
            if ([18, 19, 29, 21, 7].includes(id)) return '아트.company'
            if ([24, 25, 26, 1].includes(id)) return '메디.company'
            if (id === 2) return '켑베.company'
            if ([4, 29, 30].includes(id)) return '콘서.company'
            if (id === 31) return '페니.company'
            if ([32, 33].includes(id)) return '페로.company'
        }
        return '' // 기본값
    }

    return (
        <View style={styles.container}>
            {/* 헤더 */}
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.gobackIcon}
                    onPress={handleLeftArrowPress}
                >
                    <Image
                        style={styles.gobackSize}
                        source={require('@/public/assets/goback.png')}
                    />
                </TouchableOpacity>
                <View style={styles.titleStyle}>
                    <Text style={text.titleText}>
                        {data ? truncateItemName(data.itemName) : t('review')}
                    </Text>
                </View>
            </View>
            <View style={styles.tabContainer}>
                <TouchableOpacity
                    style={[
                        styles.tab,
                        activeTab === '정보' && styles.activeTab,
                    ]}
                    onPress={() => setActiveTab('정보')}
                >
                    <Text
                        style={
                            activeTab === '정보'
                                ? text.activeTabText
                                : text.inactiveTabText
                        }
                    >
                        {t('info')}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.tab,
                        activeTab === '리뷰' && styles.activeTab,
                    ]}
                    onPress={() => setActiveTab('리뷰')}
                >
                    <Text
                        style={
                            activeTab === '리뷰'
                                ? text.activeTabText
                                : text.inactiveTabText
                        }
                    >
                        {t('review')}
                    </Text>
                </TouchableOpacity>
            </View>
            <ScrollView ref={scrollViewRef}>
                {activeTab === '정보' ? (
                    <View style={styles.infoContainer}>
                        <View style={styles.imageContainer}>
                            <Image
                                source={{
                                    uri: 'https://nedrug.mfds.go.kr/pbp/cmn/itemImageDownload/147426592401600111',
                                }}
                                style={styles.pillImage}
                            />
                        </View>
                        <View style={styles.infoBox}>
                            <Text style={text.itemNameText}>
                                {truncateItemName(data.itemName)}
                            </Text>
                            <Text style={text.itemEngNameText}>
                                {data.itemEngName}
                            </Text>
                            <Text style={text.entpNameText}>
                                {data.entpName}
                            </Text>
                        </View>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity
                                style={
                                    activeButton === 'all'
                                        ? styles.clickedButton
                                        : styles.generalButton
                                }
                                onPress={() => handleScrollToSection('all')}
                            >
                                <Text
                                    style={
                                        activeButton === 'all'
                                            ? text.activeButtonText
                                            : text.inactiveButtonText
                                    }
                                >
                                    {t('all')}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={
                                    activeButton === 'effect'
                                        ? styles.clickedButton
                                        : styles.generalButton
                                }
                                onPress={() => handleScrollToSection('effect')}
                            >
                                <Text
                                    style={
                                        activeButton === 'effect'
                                            ? text.activeButtonText
                                            : text.inactiveButtonText
                                    }
                                >
                                    {t('effect')}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={
                                    activeButton === 'usage'
                                        ? styles.clickedButton
                                        : styles.generalButton
                                }
                                onPress={() => handleScrollToSection('usage')}
                            >
                                <Text
                                    style={
                                        activeButton === 'usage'
                                            ? text.activeButtonText
                                            : text.inactiveButtonText
                                    }
                                >
                                    {t('usage')}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={
                                    activeButton === 'precaution'
                                        ? styles.clickedButton
                                        : styles.generalButton
                                }
                                onPress={() =>
                                    handleScrollToSection('precaution')
                                }
                            >
                                <Text
                                    style={
                                        activeButton === 'precaution'
                                            ? text.activeButtonText
                                            : text.inactiveButtonText
                                    }
                                >
                                    {t('precaution')}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={
                                    activeButton === 'med-info'
                                        ? styles.clickedButton
                                        : styles.generalButton
                                }
                                onPress={() =>
                                    handleScrollToSection('med-info')
                                }
                            >
                                <Text
                                    style={
                                        activeButton === 'med-info'
                                            ? text.activeButtonText
                                            : text.inactiveButtonText
                                    }
                                >
                                    {t('med-info')}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={
                                    activeButton === 'company'
                                        ? styles.clickedButton
                                        : styles.generalButton
                                }
                                onPress={() => handleScrollToSection('company')}
                            >
                                <Text
                                    style={
                                        activeButton === 'company'
                                            ? text.activeButtonText
                                            : text.inactiveButtonText
                                    }
                                >
                                    {t('company')}
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View onLayout={handleLayout('effect')}>
                            <Text style={text.contentTitleText}>
                                {t('effect')}
                            </Text>
                            <Text style={text.contentText}>
                                {dataT(getTranslationKey(med.medId, 'effect'))}
                            </Text>
                        </View>
                        <View onLayout={handleLayout('usage')}>
                            <Text style={text.contentTitleText}>
                                {t('usage')}
                            </Text>
                            <Text style={text.contentText}>
                                {dataT(getTranslationKey(med.medId, 'usage'))}{' '}
                                {/* 번역 처리 */}
                            </Text>
                        </View>
                        <View onLayout={handleLayout('precaution')}>
                            <Text style={text.contentTitleText}>
                                {t('precaution')}
                            </Text>
                            <Text style={text.contentText}>
                                {dataT(getTranslationKey(med.medId, 'precaution'))}{' '}
                                {/* 번역 처리 */}
                            </Text>
                        </View>
                        <View onLayout={handleLayout('med-info')}>
                            <Text style={text.contentTitleText}>
                                {t('med-info')}
                            </Text>
                            <Text style={text.contentText}>
                                {dataT(getTranslationKey(med.medId, 'med-info'))}{' '}
                                {/* 번역 처리 */}
                            </Text>
                        </View>
                        <View onLayout={handleLayout('company')}>
                            <Text style={text.contentTitleText}>
                                {t('company')}
                            </Text>
                            <Text style={text.contentText}>
                                {dataT(getTranslationKey(med.medId, 'company'))}{' '}
                                {/* 번역 처리 */}
                            </Text>
                        </View>
                    </View>
                ) : (
                    <MedReview medId={med.medId} />
                )}
            </ScrollView>
            <View style={styles.revivewButtonContainer}>
                <View style={styles.bookmarkContainer}>
                    <TouchableOpacity>
                        <Image
                            source={
                                require('@/public/assets/scrabButton.png')
                                // .isBookmarked
                                //     ? require('@/public/assets/clickScrabButton.png')
                                //     : require('@/public/assets/scrabButton.png')
                            }
                            style={styles.scrapIamge}
                        />
                    </TouchableOpacity>
                </View>
                {/* 리뷰버튼탭 */}
                <View style={styles.reviewButton}>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('MedReview', {
                                medId: med.medId,
                            })
                        }}
                    >
                        <Text style={text.reviewButtonText}>
                            {t('review-write-1')}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}
