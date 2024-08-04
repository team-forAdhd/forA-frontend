import React, { useState, useEffect } from 'react'
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native'
import { styles, text } from './MedReviewStyle'
import { useTranslation } from 'react-i18next'
import { getMedReviewApi } from '@/api/medicine/medReviewApi'
import MedReviewListItem from './MedReviewList/MedReviewListItem'
import StarRating from './StarRating/StarRating'
import BottomSheet from '../medBottomSheet/BottomSheet'
import { useRoute } from '@react-navigation/native'
const medId = 1
const mockData = {
    data: [
        {
            id: 4,
            medicineId: 1,
            content:
                '{"header":{"resultCode":"00","resultMsg":"NORMAL SERVICE."},"body":{"pageNo":1,"totalCount":0,"numOfRows":10}}',
            images: [
                'https://nedrug.mfds.go.kr/pbp/cmn/itemImageDownload/147426592401600111',
                'https://nedrug.mfds.go.kr/pbp/cmn/itemImageDownload/147426592401600111',
                'https://nedrug.mfds.go.kr/pbp/cmn/itemImageDownload/147426592401600111',
                'https://nedrug.mfds.go.kr/pbp/cmn/itemImageDownload/147426592401600111',
                'https://nedrug.mfds.go.kr/pbp/cmn/itemImageDownload/147426592401600111',
            ],
            grade: 2.5,
            helpCount: 0,
            coMedications: [2, 3],
            nickname: '이헨',
            profileImage: '',
            ageRange: '20대',
            gender: 'FEMALE',
            averageGrade: 4,
            createdAt: 1722060150,
            lastModifiedAt: 1722060150,
        },
        {
            id: 3,
            medicineId: 1,
            content:
                '{"header":{"resultCode":"00","resultMsg":"NORMAL SERVICE."},"body":{"pageNo":1,"totalCount":0,"numOfRows":10}}',
            images: [],
            grade: 4,
            helpCount: 0,
            coMedications: [2, 3],
            nickname: '이헨',
            profileImage: 'http://',
            ageRange: '20대',
            gender: 'FEMALE',
            averageGrade: 4,
            createdAt: 1722060143,
            lastModifiedAt: 1722060143,
        },
        {
            id: 2,
            medicineId: 1,
            content:
                '{"header":{"resultCode":"00","resultMsg":"NORMAL SERVICE."},"body":{"pageNo":1,"totalCount":0,"numOfRows":10}}',
            images: [
                'http://example.com/image1.jpg',
                'http://example.com/image2.jpg',
            ],
            grade: 4.5,
            helpCount: 0,
            coMedications: [2, 3],
            nickname: '이헨',
            profileImage: 'http://',
            ageRange: '20대',
            gender: 'FEMALE',
            averageGrade: 4,
            createdAt: 1722060133,
            lastModifiedAt: 1722060133,
        },
        {
            id: 1,
            medicineId: 1,
            content:
                '{"header":{"resultCode":"00","resultMsg":"NORMAL SERVICE."},"body":{"pageNo":1,"totalCount":0,"numOfRows":10}}',
            images: [
                'http://example.com/image1.jpg',
                'http://example.com/image2.jpg',
            ],
            grade: 5,
            helpCount: 0,
            coMedications: [2, 3],
            nickname: '이헨',
            profileImage: 'http://',
            ageRange: '20대',
            gender: 'FEMALE',
            averageGrade: 4,
            createdAt: 1722060126,
            lastModifiedAt: 1722060126,
        },
    ],
    paging: {
        page: 0,
        size: 10,
        totalPages: 1,
        numberOfElements: 4,
        totalElements: 4,
        isFirst: true,
        isLast: true,
        isEmpty: false,
    },
}
interface MedReviewProps {
    medId: number
}
const MedReview: React.FC<MedReviewProps> = ({ medId }) => {
    const route = useRoute()
    const { t } = useTranslation('medicine')
    const [reviews, setReviews] = useState<any[]>([])
    const [averageRate, setAverateRate] = useState(0)
    const [ratingDistribution, setRatingDistribution] = useState([
        0, 0, 0, 0, 0,
    ])
    const [bottomSheetVisible, setBottomSheetVisible] = useState(false)

    //정렬 리스트
    const rangeList = [
        '최신순',
        '오래된 순',
        '추천 받은 순',
        '별점 높은 순',
        '별점 낮은 순',
    ]
    const [sortOption, setSortOption] = useState(rangeList[0])

    useEffect(() => {
        const fetchReviews = async () => {
            // const response = mockData
            const response = await getMedReviewApi(medId)
            if (response && response.data) {
                setReviews(response.data)
                calcAverageRate(response.data)
                calcRateDistribution(response.data)
            }
        }

        fetchReviews()
    }, [medId])

    // 정렬 옵션에 따른 정렬 함수
    useEffect(() => {
        const sortReviews = () => {
            let sortedReviews = [...reviews]
            switch (sortOption) {
                case '최신순':
                case '추천 받은 순':
                    sortedReviews.sort((a, b) => b.heloCount - a.helpCount)
                    break
                case '오래된 순':
                    sortedReviews.sort((a, b) => a.createdAt - b.createdAt)
                    break
                case '별점 높은 순':
                    sortedReviews.sort((a, b) => b.grade - a.grade)
                    break
                case '별점 낮은 순':
                    sortedReviews.sort((a, b) => a.grade - b.grade)
                    break
                default:
                    break
            }
            setReviews(sortedReviews)
        }

        sortReviews()
    }, [sortOption, reviews])
    // 평균 점수 계산
    const calcAverageRate = (reviews: any[]) => {
        const totalRating = reviews.reduce(
            (sum, review) => sum + review.grade,
            0,
        )
        const average = totalRating / reviews.length
        setAverateRate(average)
    }

    // 점수 분포 계산
    const calcRateDistribution = (reviews: any[]) => {
        const distribution = [0, 0, 0, 0, 0]
        reviews.forEach((review) => {
            const ratingIndex = Math.floor(review.grade) - 1
            if (ratingIndex >= 0 && ratingIndex < 5) {
                distribution[ratingIndex]++
            }
        })
        setRatingDistribution(distribution)
    }

    if (reviews.length === 0) {
        return (
            <View style={styles.reviewEmpty}>
                <Image
                    source={require('@/public/assets/med/message-circle.png')}
                    style={styles.messageCircleIcon}
                />
                <Text style={text.firstReviewText}>{t('first-review')}</Text>
                <Image
                    source={require('@/public/assets/med/review-arrow.png')}
                    style={styles.arrowIcon}
                />
            </View>
        )
    }

    return (
        <View>
            <ScrollView style={styles.container}>
                {/* 평균 별점, 별점분포도 */}
                <View style={styles.ratingContainer}>
                    <View style={styles.starRow}>
                        <Text style={text.rateText}>
                            {averageRate.toFixed(1)} 점
                        </Text>
                        <StarRating rating={averageRate} />
                    </View>
                    <Image
                        source={require('@/public/assets/med/rateBar.png')}
                        style={styles.barIcon}
                    />
                    <View style={styles.rateBarBox}>
                        {ratingDistribution
                            .slice()
                            .reverse()
                            .map((count, index) => (
                                <View key={index} style={styles.ratingRow}>
                                    <Text style={text.rateBarText}>
                                        {5 - index}
                                    </Text>
                                    <View style={styles.ratingBarContainer}>
                                        <View
                                            style={[
                                                styles.ratingBarFilled,
                                                {
                                                    width: `${(count / reviews.length) * 100}%`,
                                                },
                                            ]}
                                        />
                                        <View
                                            style={[
                                                styles.ratingBarEmpty,
                                                {
                                                    width: `${((reviews.length - count) / reviews.length) * 100}%`,
                                                },
                                            ]}
                                        />
                                    </View>
                                </View>
                            ))}
                    </View>
                </View>
                {/* 리뷰(명수) 바텀시트 */}
                <View style={styles.reviewTitleContainer}>
                    <View style={styles.reviewTitleBox}>
                        <Text style={text.reviewTitleText}>
                            {t('review')}
                            <Text style={text.reviewCountText}>
                                ({reviews.length}명)
                            </Text>
                        </Text>
                    </View>
                    {/* 정렬옵션 */}
                    <TouchableOpacity
                        style={styles.sortOptionBox}
                        onPress={() => setBottomSheetVisible(true)}
                    >
                        <View style={styles.sortOption}>
                            <Text style={text.sortOptionText}>
                                {sortOption}
                            </Text>
                            <Image
                                source={require('@/public/assets/med/underArrow.png')}
                                style={styles.underArrowImage}
                            />
                        </View>
                    </TouchableOpacity>
                </View>
                {/* 리뷰목록 */}
                {reviews.map((review) => (
                    <MedReviewListItem key={review.id} review={review} />
                ))}
            </ScrollView>
            {bottomSheetVisible && (
                <BottomSheet
                    visible={bottomSheetVisible}
                    onClose={() => setBottomSheetVisible(false)}
                    options={rangeList}
                    onSelect={setSortOption}
                    selectedOption={sortOption}
                />
            )}
        </View>
    )
}

export default MedReview
