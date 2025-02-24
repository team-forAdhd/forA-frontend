import React, {
    useState,
    useEffect,
    useRef,
    useCallback,
    useMemo,
} from 'react';
import {
    View,
    TouchableOpacity,
    Image,
    Text,
    ScrollView,
    Modal,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import BottomSheet from '@gorhom/bottom-sheet';
import { styles, text } from './HospitalReviewListStyle';
import AlertModal from '../common/modals/AlertModal';
import {
    getDoctorsApi,
    getReviewsApi,
    deleteReviewApi,
    reviewHelpedApi,
} from '@/api/review/reviewsApi';
import { formatDate } from 'date-fns';

interface HospitalReviewListProps {
    hospitalId: string;
    /*
    receiptReview: {
        writerId: number
        writerName: string
        writerImage: string
        doctorName: string
        createdAt: number
        content: string
        imageList: string[]
        medicalExpense: number
        helpCount: number
        isHelped: boolean
        isMine: boolean
    */
}

export default function HospitalReviewList(hospitalId: any) {
    const navigation = useNavigation();
    const { t: t } = useTranslation('hospitalReviewList');

    const [filter, setFilter] = useState<string>('all');

    const sortOptionList = [
        'createdAt,desc',
        'createdAt,asc',
        'helpCount,desc',
    ]; // 최신순, 오래된 순, 추천순
    const [sortOption, setSortOption] = useState<string>(sortOptionList[0]); // 정렬 옵션 - default; 최신순
    const [reviewList, setReviewList] = useState<any>([]);
    const [doctorList, setDoctorList] = useState<any>([]);
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [showBottomSheet, setShowBottomSheet] = useState<boolean>(false);

    const getReviewList = async (
        hospitalId: string,
        page: number,
        size: number,
        sort: string,
    ) => {
        try {
            const res = await getReviewsApi(hospitalId, page, size, sort);

            if (res) {
                setReviewList(res);
            } else {
                console.log('Unknown response');
            }
        } catch (error) {
            console.error('Fail to load review list: ', error);
        }
    };

    const getDoctorList = async () => {
        try {
            const res = await getDoctorsApi(hospitalId);

            if (res) {
                setDoctorList(res);
            } else {
                console.log('Unknown response');
            }
        } catch (error) {
            console.error('Fail to load doctor list: ', error);
        }
    };

    // ref
    const bottomSheetRef = useRef<BottomSheet>(null);

    // variables
    const snapPoints = useMemo(() => ['32%'], []);

    // callbacks
    const handleSheetChanges = useCallback((index: number) => {
        console.log('handleSheetChanges', index + 1);
    }, []);

    const selectSortOption = (option: string) => {
        setSortOption(option);
        setShowBottomSheet(false);
        getReviewList(hospitalId, 0, 10, sortOption);
    };

    const getFilteredSortedList = () => {
        let filteredList = new Array();

        if (filter === 'all') {
            filteredList = reviewList;
        } else {
            filteredList = reviewList.filter(
                (review: any) => review.doctorName === filter,
            );
        }

        let sortedList = filteredList;

        switch (sortOption) {
            case 'createdAt,desc':
                sortedList = filteredList.sort(
                    (a, b) => b.createdAt - a.createdAt,
                );
                break;

            case 'createdAt,asc':
                sortedList = filteredList.sort(
                    (a, b) => a.createdAt - b.createdAt,
                );
                break;

            default:
                sortedList = filteredList.sort(
                    (a, b) => b.helpCount - a.helpCount,
                );
        }

        return sortedList; // 정렬된 데이터 반환
    };

    const editReview = () => {
        console.log('Edit Review');
    };
    const deleteReview = () => {
        setShowAlert(true);
    };

    const handleDelete = async (reviewId: string) => {
        setShowAlert(false);

        try {
            await deleteReviewApi(reviewId);
            console.log('Deleted review');
        } catch (error) {
            console.error('Error while deleting: ', error);
        }
    };

    const handleContinue = () => {
        setShowAlert(false);
    };

    const postReviewHelp = async (reviewId: string) => {
        try {
            await reviewHelpedApi(reviewId);
            console.log('Helped Success!');
        } catch (error) {
            console.error('Error while liking: ', error);
        }
    };

    useEffect(() => {
        getReviewList(hospitalId, 0, 10, sortOption);
        console.log(reviewList);
        getDoctorList();
        setSortOption(sortOption);
        setShowAlert(showAlert);
    }, []);

    if (reviewList.length === 0) {
        return (
            <View style={styles.reviewEmpty}>
                <Image
                    source={require('@/public/assets/message-circle.png')}
                    style={styles.messageCircleIcon}
                />
                <Text style={text.firstReviewText}>{t('first-review')}</Text>
                <Image
                    source={require('@/public/assets/review-arrow.png')}
                    style={styles.arrowIcon}
                />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {/* 스크롤 뷰 */}
            <View style={styles.container}>
                <ScrollView>
                    <View
                        style={[
                            styles.optionContainer,
                            { justifyContent: 'space-between', height: 45 },
                        ]}
                    >
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}
                        >
                            <Text
                                style={[text.normalText, { fontWeight: '600' }]}
                            >
                                {t('review')}
                            </Text>
                            <Text style={text.normalText}>
                                {' (' + reviewList.length + '명' + ')'}
                            </Text>
                        </View>
                        <View>
                            <TouchableOpacity
                                activeOpacity={1}
                                onPress={() => setShowBottomSheet(true)}
                                style={{
                                    marginRight: 10,
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                }}
                            >
                                <Text style={text.normalText}>
                                    {t('sort-option-' + sortOption)}
                                </Text>
                                <Image
                                    source={require('@/public/assets/under.png')}
                                    style={{
                                        width: 30,
                                        height: 30,
                                        objectFit: 'contain',
                                    }}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={[styles.optionContainer, { height: 50 }]}>
                        <ScrollView style={{ flex: 1 }} horizontal={true}>
                            <TouchableOpacity
                                activeOpacity={1}
                                onPress={() => setFilter('all')}
                                style={[
                                    styles.filterButton,
                                    filter === 'all'
                                        ? { backgroundColor: '#52A35D' }
                                        : { backgroundColor: '#EEEEEE' },
                                ]}
                            >
                                <Text
                                    style={[
                                        text.filterText,
                                        filter === 'all'
                                            ? { color: 'white' }
                                            : {},
                                    ]}
                                >
                                    {t('filter-total')}
                                </Text>
                            </TouchableOpacity>
                            {doctorList.map((doctor: any) => (
                                <View key={doctor.doctorId}>
                                    <TouchableOpacity
                                        activeOpacity={1}
                                        onPress={() => setFilter(doctor.name)}
                                        style={[
                                            styles.filterButton,
                                            filter === doctor.name
                                                ? { backgroundColor: '#52A35D' }
                                                : {
                                                      backgroundColor:
                                                          '#EEEEEE',
                                                  },
                                        ]}
                                    >
                                        <Text
                                            style={[
                                                text.filterText,
                                                filter === doctor.name
                                                    ? { color: 'white' }
                                                    : {},
                                            ]}
                                        >
                                            {doctor.name}
                                        </Text>
                                        <Text
                                            style={[
                                                text.filterText,
                                                filter === doctor.name
                                                    ? { color: 'white' }
                                                    : {},
                                            ]}
                                        >
                                            {' '}
                                            {t('doctor')}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            ))}
                        </ScrollView>
                    </View>

                    <View style={{ width: '100%' }}>
                        {getFilteredSortedList() /*reviewList*/
                            .map((review: any) => (
                                <View key={review.hospitalReceiptReviewId}>
                                    <View style={styles.reviewContainer}>
                                        <View style={styles.reviewLeft}>
                                            <Image
                                                source={
                                                    review.writerImage
                                                        ? {
                                                              uri: review.writerImage,
                                                          }
                                                        : require('@/public/assets/defaultProfile.png')
                                                }
                                                style={styles.userProfileImage}
                                            />
                                        </View>
                                        <View style={styles.reviewRight}>
                                            <View style={styles.reviewRightTop}>
                                                <Text
                                                    style={
                                                        text.reviewNicknameText
                                                    }
                                                >
                                                    {review.writerName}
                                                </Text>
                                                {review.doctorName ? (
                                                    <Text
                                                        style={
                                                            text.reviewDoctorNameText
                                                        }
                                                    >
                                                        {review.doctorName +
                                                            ' ' +
                                                            t('doctor')}
                                                    </Text>
                                                ) : (
                                                    <></>
                                                )}
                                                <Text
                                                    style={text.reviewDateText}
                                                >
                                                    {formatDate(
                                                        review.createdAt,
                                                        'yyyy.MM.dd  hh:mm',
                                                    ).toString()}
                                                </Text>
                                            </View>
                                            <View
                                                style={styles.reviewRightBottom}
                                            >
                                                <Text
                                                    style={
                                                        text.reviewContentText
                                                    }
                                                >
                                                    {review.content}
                                                </Text>
                                                <View
                                                    style={{
                                                        alignItems:
                                                            'flex-start',
                                                    }}
                                                >
                                                    <TouchableOpacity
                                                        onPress={
                                                            review.isHelped
                                                                ? () => {}
                                                                : () =>
                                                                      postReviewHelp(
                                                                          review.hospitalReceiptReviewId,
                                                                      )
                                                        }
                                                        activeOpacity={1}
                                                        style={[
                                                            styles.reviewRadiusContainer,
                                                            {
                                                                borderWidth: 1,
                                                                borderColor:
                                                                    review.isHelped
                                                                        ? '#52A35D'
                                                                        : '#949494',
                                                                backgroundColor:
                                                                    review.isHelped
                                                                        ? '#F4F9D9'
                                                                        : 'white',
                                                            },
                                                        ]}
                                                    >
                                                        <Image
                                                            source={require('@/public/assets/none.png')}
                                                            style={
                                                                styles.reviewHelpButtonImage
                                                            }
                                                        />
                                                        <Text
                                                            style={[
                                                                text.reviewRadiusContainerText,
                                                                {
                                                                    color: review.isHelped
                                                                        ? '#52A35D'
                                                                        : '#949494',
                                                                },
                                                            ]}
                                                        >
                                                            {t('is-help')}{' '}
                                                            {review.helpCount}
                                                        </Text>
                                                    </TouchableOpacity>
                                                    {review.medicalExpense ? (
                                                        <View
                                                            style={[
                                                                styles.reviewRadiusContainer,
                                                                {
                                                                    borderWidth: 1,
                                                                    borderColor:
                                                                        '#52A35D',
                                                                },
                                                            ]}
                                                        >
                                                            <Text
                                                                style={
                                                                    text.reviewExpenseText
                                                                }
                                                            >
                                                                {t('price')}{' '}
                                                            </Text>
                                                            <Text
                                                                style={
                                                                    text.reviewExpenseText
                                                                }
                                                            >
                                                                {
                                                                    review.medicalExpense
                                                                }
                                                            </Text>
                                                            <Text
                                                                style={
                                                                    text.reviewExpenseText
                                                                }
                                                            >
                                                                {t(
                                                                    'price-unit',
                                                                )}
                                                            </Text>
                                                        </View>
                                                    ) : (
                                                        <></>
                                                    )}
                                                </View>
                                            </View>
                                        </View>
                                        {review.isMine ? (
                                            <View style={styles.myReviewButton}>
                                                <TouchableOpacity
                                                    onPress={editReview}
                                                >
                                                    <Text>
                                                        {t('review-edit')}
                                                    </Text>
                                                </TouchableOpacity>
                                                <Text> | </Text>
                                                <TouchableOpacity
                                                    onPress={deleteReview}
                                                >
                                                    <Text>
                                                        {t('review-delete')}
                                                    </Text>
                                                </TouchableOpacity>
                                            </View>
                                        ) : (
                                            <></>
                                        )}
                                    </View>
                                    <View style={styles.horizontalLine} />

                                    {/* 리뷰 삭제 알림창 모달 */}
                                    <Modal
                                        visible={showAlert}
                                        transparent
                                        animationType="fade"
                                    >
                                        <View style={styles.overlay}>
                                            <View style={styles.modalContainer}>
                                                <AlertModal
                                                    message={t('delete-ask')}
                                                    leftButtonText={t(
                                                        'delete-yes',
                                                    )}
                                                    rightButtonText={t(
                                                        'delete-no',
                                                    )}
                                                    onLeftClicked={() =>
                                                        handleDelete(
                                                            review.hospitalReceiptReviewId,
                                                        )
                                                    }
                                                    onRightClicked={
                                                        handleContinue
                                                    }
                                                />
                                            </View>
                                        </View>
                                    </Modal>
                                </View>
                            ))}
                    </View>
                </ScrollView>
            </View>

            {/* 리뷰 정렬을 위한 Bottom Sheet */}
            {showBottomSheet ? (
                <View style={styles.overlay}>
                    <BottomSheet
                        ref={bottomSheetRef}
                        index={0}
                        snapPoints={snapPoints}
                        onChange={handleSheetChanges}
                    >
                        <View style={styles.sheetContainer}>
                            <View style={styles.sheetHeader}>
                                <Text style={text.sheetHeaderText}>
                                    {t('sort-option')}
                                </Text>
                            </View>

                            <View style={styles.sheetContent}>
                                {sortOptionList.map((option) => (
                                    <View key={option}>
                                        <TouchableOpacity
                                            onPress={() =>
                                                selectSortOption(option)
                                            }
                                            style={styles.sheetOptionContainer}
                                        >
                                            <Text
                                                style={[
                                                    text.sheetOptionText,
                                                    sortOption === option
                                                        ? {
                                                              color: '#52A35D',
                                                              fontWeight: '600',
                                                          }
                                                        : {},
                                                ]}
                                            >
                                                {t('sort-option-' + option)}
                                            </Text>
                                            {sortOption === option ? (
                                                <Image
                                                    source={require('@/public/assets/check.png')}
                                                    style={styles.checkImage}
                                                />
                                            ) : (
                                                <></>
                                            )}
                                        </TouchableOpacity>
                                    </View>
                                ))}
                            </View>
                        </View>
                    </BottomSheet>
                </View>
            ) : (
                <></>
            )}
        </View>
    );
}
