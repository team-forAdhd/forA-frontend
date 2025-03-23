import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { styles, text } from './MedReviewStyle';
import { useTranslation } from 'react-i18next';
import { getMedReviewApi } from '@/api/medicine/medReviewApi';
import MedReviewListItem from './MedReviewList/MedReviewListItem'; // 약 리뷰 목록에서 개별 리뷰 아이템을 표시
import StarRating from './StarRating/StarRating'; // 별점 표시 컴포넌트
import BottomSheet from '../medBottomSheet/BottomSheet';
import { useRoute } from '@react-navigation/native';

interface MedReviewProps {
    medId: number;
}
const MedReview: React.FC<MedReviewProps> = ({ medId }) => {
    const route = useRoute();
    const { t } = useTranslation('medicine');
    const [reviews, setReviews] = useState<any[]>([]); // 리뷰 데이터 저장하는 상태
    const [averageRate, setAverateRate] = useState(0); // 전체 리뷰의 평균 평점을 저장
    const [ratingDistribution, setRatingDistribution] = useState([
        0, 0, 0, 0, 0,
    ]); // 별점 분포 초기화
    const [bottomSheetVisible, setBottomSheetVisible] = useState(false);

    //정렬 리스트
    const rangeList = [
        '최신순',
        '오래된 순',
        '추천 받은 순',
        '별점 높은 순',
        '별점 낮은 순',
    ];
    const [sortOption, setSortOption] = useState(rangeList[0]);
    const [sortedReviews, setSortedReviews] = useState<any[]>([]);

    // useEffect로 컴포넌트가 렌더링 될 때마다 특정 작업을 실행하도록 함.
    // medId가 변경될 때마다 리뷰를 다시 가져오는 역할을 함.
    useEffect(() => {
        const fetchReviews = async () => {
            //약물 리뷰 데이터를 API에서 가져오는 기능
            const response = await getMedReviewApi(medId);
            if (response && response.data) {
                setReviews(response.data);
                calcAverageRate(response.data);
                calcRateDistribution(response.data);
            }
        };

        fetchReviews();
    }, [medId]);

    // 리뷰 정렬 함수
    const sortReviews = (reviewsToSort: any[]) => {
        let sorted = [...reviewsToSort];
        switch (sortOption) {
            case '최신순': // createdAt 값을 기준으로 내림차순 정렬
                sorted.sort((a, b) => b.createdAt - a.createdAt);
                break;
            case '오래된 순': // 오름차순 정렬
                sorted.sort((a, b) => a.createdAt - b.createdAt);
                break;
            case '추천 받은 순':
                sorted.sort((a, b) => b.helpCount - a.helpCount);
                break;
            case '별점 높은 순':
                sorted.sort((a, b) => b.grade - a.grade);
                break;
            case '별점 낮은 순':
                sorted.sort((a, b) => a.grade - b.grade);
                break;
            default:
                break;
        }
        setSortedReviews(sorted); // 정렬된 리뷰 목록을 저장
    };

    useEffect(() => {
        console.log('reviews 업데이트:', reviews);
    }, [reviews]);

    useEffect(() => {
        console.log('sortedReviews 업데이트:', sortedReviews);
    }, [sortedReviews]);

    useEffect(() => {
        if (reviews.length > 0) {
            console.log('리뷰 데이터 있음. 정렬 실행');
            setTimeout(() => {
                sortReviews(reviews);
            }, 100);
        }
    }, [sortOption, reviews]);

    // 평균 점수 계산
    const calcAverageRate = (reviews: any[]) => {
        const totalRating = reviews.reduce(
            (sum, review) => sum + review.grade,
            0,
        );
        const average = totalRating / reviews.length;
        setAverateRate(average); // 계산된 평균 별점 저장
    };

    // 점수 분포 계산
    const calcRateDistribution = (reviews: any[]) => {
        const distribution = [0, 0, 0, 0, 0];
        reviews.forEach((review) => {
            const ratingIndex = Math.floor(review.grade) - 1;
            if (ratingIndex >= 0 && ratingIndex < 5) {
                distribution[ratingIndex]++;
            }
        });
        setRatingDistribution(distribution);
    };

    const handleDeleteReview = (deletedId: number) => {
        const updated = reviews.filter((r) => r.id !== deletedId);
        setReviews(updated);
        sortReviews(updated); // 정렬도 다시 적용
    };

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
        );
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
                {sortedReviews.map((review) => (
                    <MedReviewListItem
                        key={review.id}
                        review={review}
                        onDelete={handleDeleteReview}
                    />
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
    );
};

export default MedReview;
