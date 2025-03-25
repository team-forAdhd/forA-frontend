import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    Image,
    LayoutChangeEvent,
} from 'react-native';
import { styles, text } from './MedDetailStyle';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import MedReview from './MedReview'; // 리뷰 목록 페이지
import { RootStackParamList } from '@/components/navigation'; // 파라미터 안전하게 전달
import { medBookmarkApi } from '@/api/medicine/medBookmarkApi';

const truncateItemName = (name: string) => {
    const bracketIndex = name.indexOf('('); // 괄호가 없다면 indexOf는 -1 반환
    return bracketIndex !== -1 ? name.substring(0, bracketIndex) : name;
};

export default function MedDetail(med: any) {
    const data = med.route.params;
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const { t: t } = useTranslation('medicine');
    const { t: dataT } = useTranslation('medDetail');
    const [activeTab, setActiveTab] = useState('정보');
    const [activeButton, setActiveButton] = useState('all');
    const [isBookmarked, setIsBookmarked] = useState<boolean>(data.favorite);
    const scrollViewRef = useRef<ScrollView>(null);
    const sectionPositions = useRef<{ [key: string]: number }>({});

    const medInfoList = [
        'effect',
        'usage',
        'precaution',
        'med-info',
        'company',
    ];

    const postBookmark = async (medId: number) => {
        try {
            const response = await medBookmarkApi(medId);
            setIsBookmarked((prev) => !prev);
        } catch (error) {
            console.error('북마크 변경 실패:', error);
        }
    };

    useEffect(() => {
        setIsBookmarked(data.favorite);
    }, [data.favorite]);

    const handleLeftArrowPress = () => {
        //navigation.navigate('MedicineMain' as never)
        navigation.goBack();
    };

    // 항목별 이동을 위한 동적 로직
    const handleScrollToSection = (section: string) => {
        setActiveButton(section);
        const targetSection = section === 'all' ? 'effect' : section;
        const position = sectionPositions.current[targetSection];
        if (position !== undefined) {
            scrollViewRef.current?.scrollTo({ y: position, animated: true });
        }
    };
    // 각 섹션의 위치(y 좌표) 저장 – 이후 특정 섹션으로 스크롤을 이동할 때 사용됨
    const handleLayout = (section: string) => (event: LayoutChangeEvent) => {
        const { y } = event.nativeEvent.layout;
        sectionPositions.current[section] = y;
    };

    // data.id에 따른 약 내용 설정
    const getTranslationKey = (id: number, type: string) => {
        if (type === 'usage') {
            if ([11, 12].includes(id)) return '도모.usage';
            if ([6, 13, 14, 15, 16, 17, 3, 5, 8, 9, 23, 24].includes(id))
                return '아토.usage';
            if ([18, 19, 29, 21, 7].includes(id)) return '아트.usage';
            if ([24, 25, 26, 1].includes(id)) return '메디.usage';
            if (id === 2) return '켑베.usage';
            if ([4, 29, 30].includes(id)) return '콘서.usage';
            if (id === 31) return '페니.usage';
            if ([32, 33].includes(id)) return '페로.usage';
        } else if (type === 'effect') {
            if ([11, 12].includes(id)) return '도모.effect';
            if ([6, 13, 14, 15, 16, 17, 3, 5, 8, 9, 23, 24].includes(id))
                return '아토.effect';
            if ([18, 19, 29, 21, 7].includes(id)) return '아트.effect';
            if ([1, 24, 25, 26].includes(id)) return '메디.effect';
            if (id === 2) return '켑베.effect';
            if ([4, 29, 30].includes(id)) return '콘서.effect';
            if (id === 31) return '페니.effect';
            if ([32, 33].includes(id)) return '페로.effect';
        } else if (type === 'precaution') {
            if ([11, 12].includes(id)) return '도모.precaution';
            if ([6, 13, 14, 15, 16, 17, 3, 5, 8, 9, 23, 24].includes(id))
                return '아토.precaution';
            if ([18, 19, 29, 21, 7].includes(id)) return '아트.precaution';
            if ([24, 25, 26, 1].includes(id)) return '메디.precaution';
            if (id === 2) return '켑베.precaution';
            if ([4, 29, 30].includes(id)) return '콘서.precaution';
            if (id === 31) return '페니.precaution';
            if ([32, 33].includes(id)) return '페로.precaution';
        } else if (type === 'med-info') {
            if ([11, 12].includes(id)) return '도모.med-info';
            if ([6, 13, 14, 15, 16, 17, 3, 5, 8, 9, 23, 24].includes(id))
                return '아토.med-info';
            if ([18, 19, 29, 21, 7].includes(id)) return '아트.med-info';
            if ([24, 25, 26, 1].includes(id)) return '메디.med-info';
            if (id === 2) return '켑베.med-info';
            if ([4, 29, 30].includes(id)) return '콘서.med-info';
            if (id === 31) return '페니.med-info';
            if ([32, 33].includes(id)) return '페로.med-info';
        } else if (type === 'company') {
            if ([11, 12].includes(id)) return '도모.company';
            if ([6, 13, 14, 15, 16, 17, 3, 5, 8, 9, 23, 24].includes(id))
                return '아토.company';
            if ([18, 19, 29, 21, 7].includes(id)) return '아트.company';
            if ([24, 25, 26, 1].includes(id)) return '메디.company';
            if (id === 2) return '켑베.company';
            if ([4, 29, 30].includes(id)) return '콘서.company';
            if (id === 31) return '페니.company';
            if ([32, 33].includes(id)) return '페로.company';
        }
        return ''; // 기본값
    };

    return (
        <View style={styles.container}>
            {/* 헤더 */}
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => {
                        navigation.goBack();
                    }}
                >
                    <Image
                        source={require('@/public/assets/goback.png')}
                        style={styles.IconImage}
                    />
                </TouchableOpacity>
                <Text style={text.headerText}>
                    {/* data가 존재하면 data.itemName(약 이름)을 가져와 truncateItemName 함수를 통해 가공된 이름을 표시 */}
                    {data ? truncateItemName(data.itemName) : t('review')}
                </Text>
                <View style={styles.IconImage} />
            </View>

            {/* 상단 버튼탭 */}
            <View style={styles.topButtonContainer}>
                {['정보', '리뷰'].map((tab) => (
                    <TouchableOpacity
                        // setActiveTab(tab)이 실행되어 현재 선택된 탭이 변경됨
                        onPress={() => setActiveTab(tab)}
                        style={[
                            activeTab === tab
                                ? // tab 선택 시
                                  styles.activeContainer
                                : // 선택되지 않았을 시
                                  styles.inactiveContainer,
                        ]}
                    >
                        {/* 탭 버튼 안의 글자(정보 또는 리뷰)를 표시함 */}
                        <Text
                            style={
                                activeTab === tab
                                    ? text.activeTabText
                                    : text.inactiveTabText
                            }
                        >
                            {tab}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* 바디 */}
            <ScrollView ref={scrollViewRef} style={styles.scrollContainer}>
                {activeTab === '정보' ? (
                    <View style={styles.infoContainer}>
                        <View style={styles.imageContainer}>
                            <Image
                                source={{
                                    uri: data.itemImage,
                                }}
                                style={styles.pillImage}
                            />
                        </View>
                        <View style={styles.infoBox}>
                            <Text style={text.itemNameText}>
                                {/* 약 이름에서 괄호 이후 부분을 제거하고 표시 */}
                                {truncateItemName(data.itemName)}
                            </Text>
                            {/* 영어 이름 표시 */}
                            <Text style={text.itemEngNameText}>
                                {data.itemEngName}
                            </Text>
                            {/* 제약회사 이름 표시 */}
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

                            {medInfoList.map((info) => (
                                <TouchableOpacity
                                    style={
                                        activeButton === info
                                            ? styles.clickedButton
                                            : styles.generalButton
                                    }
                                    onPress={() => handleScrollToSection(info)}
                                >
                                    <Text
                                        style={
                                            activeButton === info
                                                ? text.activeButtonText
                                                : text.inactiveButtonText
                                        }
                                    >
                                        {t(info)}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                        {medInfoList.map((info) => (
                            <View onLayout={handleLayout(info)}>
                                <View style={styles.contentTitle}>
                                    <Text style={text.contentTitleText}>
                                        {t(info)}
                                    </Text>
                                </View>
                                <Text style={text.contentText}>
                                    {/* 해당 정보(효능, 부작용 등)에 대한 번역된 텍스트를 가져와서 표시 */}
                                    {dataT(getTranslationKey(med.medId, info))}
                                </Text>
                            </View>
                        ))}
                    </View>
                ) : (
                    // 리뷰 화면을 보여주는 MedReview 컴포넌트 렌더링. medId를 MedReview 컴포넌트에 전달
                    <MedReview medId={data.medicineId} />
                )}
            </ScrollView>

            {/* 하단 버튼탭 */}
            <View style={styles.revivewButtonContainer}>
                {/* data.favorite 서버에서 가져온 북마크 여부, isBookmarked 클라이언트에서 확인된 북마크 상태 */}

                <TouchableOpacity onPress={() => postBookmark(data.medicineId)}>
                    <Image
                        // 북마크된 상태면 이미지 표시
                        source={
                            isBookmarked
                                ? require('@/public/assets/clickScrabButton.png')
                                : require('@/public/assets/scrabButton.png')
                        }
                        style={styles.scrapIamge}
                    />
                </TouchableOpacity>

                <TouchableOpacity
                    // 리뷰 작성화면(MedNewReview)으로 이동하면서 data 전달
                    onPress={() => {
                        navigation.navigate('MedNewReview', data);
                    }}
                    style={styles.reviewButton}
                >
                    <Text style={text.reviewButtonText}>
                        {t('review-write-1')}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
