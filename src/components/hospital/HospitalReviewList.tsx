import { View, TouchableOpacity, Image, Text, ScrollView, Modal } from 'react-native'
import { useTranslation } from 'react-i18next'
import { useNavigation } from '@react-navigation/native'
import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import BottomSheet from '@gorhom/bottom-sheet';
import { styles, text } from './HospitalReviewListStyle'
import AlertModal from '../common/alertModal/AlertModal'
import { getReviewsApi } from '@/api/review/getReviewsApi'
import { deleteReviewApi } from '@/api/review/deleteReviewApi'


export default function HospitalReviewList() {

    const navigation = useNavigation()
    const { t: t } = useTranslation('hospitalReviewList')

    const [filter, setFilter] = useState<string>('all')

    const sortOptionList = ['lastest', 'oldest', 'mostliked']
    const [sortOption, setSortOption] = useState<string>(sortOptionList[0]);   // 정렬 옵션 - default; 추천순 (좋아요 순)
    const [showAlert, setShowAlert] = useState<boolean>(false)
    const [showBottomSheet, setShowBottomSheet] = useState<boolean>(false)

    console.log("리뷰 뽑아보자")
    /*
    let reviewList2 = async () => {
        let response = getReviewsApi('064377163e0611ef87e706a9c1a84c57', 0, 10, 'createdAt,desc')
        return response
    }
        */
    let reviewList2
    console.log(reviewList2)

    const getReviewList = async (doctorId: string, page: number, size: number, sort: string) => {
        try {
          const response = await getReviewsApi(doctorId, page, size, sort)
    
          if (response) {
            reviewList2 = response
            console.log(reviewList2)
          } else {
            console.log("응아니야")
          }
        } catch (error) {
          console.error('Fail to load review list: ', error)
        }
      }
    
    useEffect(() => {
        getReviewList('064377163e0611ef87e706a9c1a84c57', 0, 10, 'createdAt,desc')
    }, []);

    // ref
    const bottomSheetRef = useRef<BottomSheet>(null);
  
    // variables
    const snapPoints = useMemo(() => ['32%'], []);
    
    // callbacks
    const handleSheetChanges = useCallback((index: number) => {
      console.log('handleSheetChanges', index + 1);
    }, []);

    const selectSortOption = (option : string) => {
        setSortOption(option)
        setShowBottomSheet(false)
      }  

    const getFilteredSortedList = () => {
        /*
        try {
            const reviewList3 = await getReviewsApi('064377163e0611ef87e706a9c1a84c57', 0, 10, 'createdAt,desc')
            return reviewList3
        } catch (error) {
            console.log("Fail! babo")
        }
        */
        let filteredList = new Array()

        if (filter === 'all') {
            filteredList = reviewList
        } else {
            filteredList = reviewList.filter((review) => review.doctorName == filter)
        }

        let sortedList = filteredList

        switch (sortOption) {
            case 'lastest':
                sortedList = filteredList.sort((a, b) => b.date.localeCompare(a.date));
                break
            
            case 'oldest':
                sortedList = filteredList.sort((a, b) => a.date.localeCompare(b.date));
                break
            
            default:
                sortedList = filteredList.sort((a, b) => b.likeCount - a.likeCount);
        }

        return sortedList   // 정렬된 데이터 반환
    };

    useEffect(() => {
        setSortOption(sortOption)
    }, []);

    useEffect(() => {
        setFilter(filter)
    }, []);

    useEffect(() => {
        setShowAlert(showAlert)
    }, []);


    const editReview = () => {
        console.log("Edit Review")
    }
    const deleteReview = () => {
        setShowAlert(true)
    }

    const handleDelete = async (reviewId : string) => {
        setShowAlert(false)
        console.log("Delete Review")

        try {
            await deleteReviewApi(reviewId)
            console.log("Delete Success!")

        } catch (error) {
            console.error('Error while deleting: ', error)
        }
    }

    const handleContinue = () => {
        setShowAlert(false)
    }

    return (
        <View style={styles.container}>
    
            {/* 헤더 */}
            <View style={styles.header}>
            <TouchableOpacity activeOpacity={1} onPress={() => {navigation.goBack()}}>
                <Image
                source={require('@/public/assets/back.png')}
                style={styles.iconImage}
                />
            </TouchableOpacity>
            <Text style={text.headerText}>용산구정신의학과의원</Text>
            </View>


            {/* 스크롤 뷰 */}
            <View style={styles.scrollContainer}>
            <ScrollView style={{ flex: 1 }}>

                <View style={[styles.optionContainer, { justifyContent: 'space-between', height: 45 }]}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={[text.normalText, { fontWeight: '600' }]}>{t('review')}</Text>
                    <Text style={text.normalText}>{' (' + reviewList.length + '명' + ')'}</Text>
                    </View>
                    <View>
                        <TouchableOpacity activeOpacity={1}
                                            onPress={() => setShowBottomSheet(true)}
                                            style={{ marginRight: 10, flexDirection: 'row', alignItems: 'center' }}
                        >
                            <Text style={text.normalText}>{t('sort-option-' + sortOption)}</Text>
                            <Image
                                source={require('@/public/assets/under.png')}
                                style={{ width: 30, height: 30, objectFit: 'contain' }}
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={[styles.optionContainer, { height: 50 }]}>
                    <ScrollView style={{ flex: 1 }} horizontal={true}>
                    <TouchableOpacity activeOpacity={1} onPress={() => setFilter('all')}
                                        style={[styles.filterButton,
                                            filter === 'all'
                                            ? { backgroundColor: '#52A35D' }
                                            : { backgroundColor: '#EEEEEE' }
                                        ]}>
                        <Text style={[text.filterText, filter === 'all' ? { color: 'white' } : {}]}>{t('filter-total')}</Text>
                    </TouchableOpacity>
                    {doctorList.map((doctor) => (
                        <View key={doctor.doctorId}>
                            <TouchableOpacity activeOpacity={1} onPress={() => setFilter(doctor.name)}
                                                style={[styles.filterButton,
                                                    filter === doctor.name
                                                    ? { backgroundColor: '#52A35D' }
                                                    : { backgroundColor: '#EEEEEE' }
                                                ]}
                                                >
                                <Text style={[text.filterText, filter === doctor.name ? { color: 'white' } : {}]}>{doctor.name}</Text>
                                <Text style={[text.filterText, filter === doctor.name ? { color: 'white' } : {}]}> {t('doctor')}</Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                    </ScrollView>
                </View>
                <View style={{ width: '100%' }}>
                    {/*getFilteredSortedList()*/reviewList.map((review) => (
                        <View key={review.hospitalReceiptReviewId}>
                        <View style={styles.reviewContainer}>
                            <View style={styles.reviewLeft}>
                                <Image
                                    source={review.writerImage ? {uri:review.writerImage} : require('@/public/assets/defaultProfile.png')}
                                    style={styles.userProfileImage}
                                />
                            </View>
                            <View style={styles.reviewRight}>
                                <View style={styles.reviewRightTop}>
                                    <Text style={text.reviewNicknameText}>{review.writerName}</Text>
                                    <Text style={text.reviewDoctorNameText}>{review.doctorName + ' ' + t('doctor')}</Text>
                                    <Text style={text.reviewDateText}>{review.createdAt}</Text>
                                </View>
                                <View style={styles.reviewRightBottom}>
                                    <Text style={text.reviewContentText}>{review.content}</Text>
                                    <View style={{ alignItems: 'flex-start' }}>
                                        <TouchableOpacity style={[styles.reviewRadiusContainer,
                                                                    { borderWidth: 1,
                                                                        borderColor: review.isHelped ? '#52A35D' : '#949494',
                                                                        backgroundColor: review.isHelped ? '#F4F9D9' : 'white'
                                                                    }]}
                                        >
                                            <Image
                                                source={require('@/public/assets/none.png')}
                                                style={styles.reviewHelpButtonImage}
                                            />
                                            <Text style={[text.reviewRadiusContainerText,
                                                            { color: review.isHelped ? '#52A35D' : '#949494' }
                                                        ]}
                                            >
                                                {t('is-help')} {review.helpCount}
                                            </Text>
                                        </TouchableOpacity>
                                        {review.medicalExpense ?
                                        (<View style={[styles.reviewRadiusContainer, { borderWidth: 1, borderColor: '#52A35D'}]}>
                                            <Text style={text.reviewExpenseText}>{t('price')} </Text>
                                            <Text style={text.reviewExpenseText}>{review.medicalExpense}</Text>
                                            <Text style={text.reviewExpenseText}>{t('price-unit')}</Text>
                                        </View>) : (<></>)
                                        }
                                    </View>
                                </View>
                            </View>
                            {review.isMine ?
                            (<View style={styles.myReviewButton}>
                                <TouchableOpacity onPress={editReview}><Text>{t('review-edit')}</Text></TouchableOpacity>
                                <Text> | </Text>
                                <TouchableOpacity onPress={deleteReview}><Text>{t('review-delete')}</Text></TouchableOpacity>
                            </View>) : (<></>)
                            }
                        </View>
                        <View style={styles.horizontalLine} />


                        {/* 리뷰 삭제 알림창 모달 */}
                        <Modal visible={showAlert} transparent animationType="fade">
                           <View style={styles.overlay}>
                                <View style={styles.modalContainer}>
                                    <AlertModal
                                        message={t('delete-ask')}
                                        leftButtonText={t('delete-yes')}
                                        rightButtonText={t('delete-no')}
                                        onLeftClicked={() => handleDelete('e1069b81c59a421ca52fd1fb09e9e9bf')}
                                        onRightClicked={handleContinue}
                                    />
                                </View>
                            </View>
                        </Modal>


                        </View>
                    ))}
                </View>

            </ScrollView>
        </View>


            {/* 하단 버튼 컨테이너 */}
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={() => console.log("Pressed bookmark button!")}>
                    <Image
                        source={require('@/public/assets/scrabButton.png')}
                        style={styles.bookmarkImage}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => console.log("Go to post new review!")} style={styles.postButton}>
                    <Text style={text.postButtonText}>{t('post-button')}</Text>
                </TouchableOpacity>
            </View>


            {/* 리뷰 정렬을 위한 Bottom Sheet */}
            {showBottomSheet ?
            (<View style={styles.overlay}>
            <BottomSheet
                ref={bottomSheetRef}
                index={0}
                snapPoints={snapPoints}
                onChange={handleSheetChanges}
            >
                <View style={styles.sheetContainer}>
                    <View style={styles.sheetHeader}>
                        <Text style={text.sheetHeaderText}>{t('sort-option')}</Text>
                    </View>

                    <View style={styles.sheetContent}>
                    {sortOptionList.map((option) => (
                        <View key={option}>
                        <TouchableOpacity onPress={() => selectSortOption(option)} style={styles.sheetOptionContainer}>
                            <Text style={[text.sheetOptionText, sortOption === option ? { color: '#52A35D', fontWeight: '600' } : {}]}>
                                {t('sort-option-' + option)}
                            </Text>
                            {sortOption === option ?
                            (<Image
                                source={require('@/public/assets/check.png')}
                                style={styles.checkImage}
                            />) : (<></>)
                            }
                        </TouchableOpacity>
                        </View>
                    ))}
                    </View>
                </View>
            </BottomSheet>
            </View>) : (<></>)
            }
        
        </View>
    )
}


/* 더미 데이터 */

const reviewList = [
    {
      hospitalReceiptReviewId: '80ba817ac4404127813258073bb7cc12',
      writerId: 'fac2695a5ca044d1a052a2b20795e755',
      writerName: '김다',
      writerImage:'http://',
      doctorName: '김코코',
      createdAt: 1716306462,
      content: '리뷰내용리뷰내용리뷰내용리뷰내용리뷰내용리뷰내용리뷰내용리뷰내용리뷰내용리뷰내용리뷰내용리뷰내용',
      imageList: [
        "https://image.png",
        "https://image2.png",
        "https://image3.png"
      ],
      medicalExpense: 37500,
      helpCount: 0,
      isHelped: false,
      isMine: true
    },
    {
      hospitalReceiptReviewId: 'f6fe4aa5c6224065a417c4fbf05a49d0',
      writerId: 'fac2695a5ca044d1a052a2b20795e755',
      writerName: '김다',
      writerImage: 'http://',
      doctorName: null,
      createdAt: 1716306498,
      content: '리뷰내용리뷰내용리뷰내용리뷰내용리뷰내용리뷰내용리뷰내용리뷰내용리뷰내용리뷰내용리뷰내용리뷰내용',
      imageList: [
        "https://image.png",
        "https://image2.png",
        "https://image3.png"
      ],
      medicalExpense: 34000,
      helpCount: 0,
      isHelped: false,
      isMine: true
    },
    {
      hospitalReceiptReviewId: '8aec3170178911efb0630aa72ad9c348',
      writerId: 'fac2695a5ca044d1a052a2b20795e755',
      writerName: '김다',
      writerImage: 'http://',
      doctorName: '김베니',
      createdAt: 1719652337,
      content: '어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구',
      imageList: [
        "http://image.jpg",
        "http://image.png"
      ],
      medicalExpense: null,
      helpCount: 0,
      isHelped: false,
      isMine: true
    },
    {
      hospitalReceiptReviewId: '75bc40b0178911efb0630aa72ad9c348',
      writerId: 'fac2695a5ca044d1a052a2b20795e755',
      writerName: '김다',
      writerImage: null,
      doctorName: '김코코',
      createdAt: 1719652457,
      content: '어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구',
      imageList: [
        "http://image.jpg",
        "http://image.png"
      ],
      medicalExpense: null,
      helpCount: 1,
      isHelped: true,
      isMine: true
    }
]

/*
[
    {
        //reviewId: '1452be87a2194b3fbd4351f13e84cd29',
        reviewId: 'e1069b81c59a421ca52fd1fb09e9e9bf',
        userId: 'U12345',
        profileImage: '',
        nickname: '닉네임',
        doctorName: '김코코',
        date: '2024/03/25 10:00',
        content: '완전 친절하고 진료 잘 봐주세요',
        image: [],
        likeCount: 12,
        price: 34000,
    },
    {
        reviewId: 'asj9841nddjsng0fkjdsh20144fn1a3s',
        userId: 'U00000',
        profileImage: '',
        nickname: '닉네임',
        doctorName: '김베니',
        date: '2024/01/16 15:08',
        content: '내용입니다 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다',
        image: [],
        likeCount: 3,
        price: null,
    },
    {
        reviewId: '1452besdfd79csekjkcjm393251f4cd2',
        userId: 'U12345',
        profileImage: '',
        nickname: '닉네임',
        doctorName: '김코코',
        date: '2023/06/30 11:29',
        content: '내용입니다 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다',
        image: [],
        likeCount: 0,
        price: null,
    },
    {
        reviewId: 'lkds9csek1233kdjsdksfj43lksdf042',
        userId: 'U99880',
        profileImage: '',
        nickname: '닉네임',
        doctorName: '김코코',
        date: '2023/06/30 11:31',
        content: '과잉진료 없이 편하게 갔다 왔어요~ 김코코 선생님 추천합니다',
        image: [],
        likeCount: 8,
        price: 9700,
    },
]
    */

const doctorList = [
    {
        doctorId: 'D12345',
        name: '김코코',
        image: '',
          totalGrade: 4.5,
          totalReviewCount: 123,
          profile: 'Specialist in cardiology with over 20 years of experience.',
      },
      {
          doctorId: 'D67890',
          name: '김베니',
          image: '',
          totalGrade: 4.8,
          totalReviewCount: 89,
          profile:
              'Renowned neurologist known for her research in neurodegenerative diseases.',
      },
      {
          doctorId: 'D00000',
          name: '이동동',
          image: '',
          totalGrade: 3.9,
          totalReviewCount: 51,
          profile:
              '',
      },
  ]

  