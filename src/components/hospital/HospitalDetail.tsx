import { View, TouchableOpacity, Image, Text, ScrollView } from 'react-native'
import { styles, text } from './HospitalDetailStyle'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import RibbonEvaluation from '../ribbonEvaluataion/ribbonEvaluation'
import GoogleMap from './Maps'

export default function HospitalDetail() {
    const ribbonCount = 1

    const navigation = useNavigation()

    // 병원정보와 리뷰 중 하나를 골라서 화면에 띄우기 위함
    const [button, setButton] = useState<boolean[]>([true, false])
    //포에이 리본 평가하기 창을 띄우기 위한 state
    const [ribbonOpen, setRibbonOpen] = useState<boolean>(false)

    //전화번호와 위치 아이콘 이미지를 담은 배열
    const contactsAndLocations = [
        require('@/public/assets/phone.png'),
        require('@/public/assets/location.png'),
    ]

    //약력 오픈 여부
    const [profileOpen, setProfileOpen] = useState<boolean>(false)

    const { t } = useTranslation('hospitalDetail')
    return !ribbonOpen ? ( //병원 이름을 내려줘야해서 네비게이션으로 이동 안하고 state변화를 통해 뜨게끔 함
        <View style={styles.container}>
            {profileOpen && ( // 제출 버튼을 누른 경우 배경 변화와 모달
                <View style={styles.profileOpenContainer}>
                    <View style={styles.openProfileContainer}>
                        <View style={styles.openInnerContainer}>
                            <Text style={text.primaryboldText}>
                                {t('doctor-profile')}
                            </Text>
                            <TouchableOpacity
                                onPress={() => {
                                    setProfileOpen(false)
                                }}
                            >
                                <Image
                                    source={require('@/public/assets/x.png')}
                                    style={styles.IconImage}
                                />
                            </TouchableOpacity>
                        </View>
                        <Text style={text.normalText}>의사 약력</Text>
                    </View>
                </View>
            )}
            <ScrollView style={{ flex: 1, width: '100%' }}>
                {/*헤더 */}
                <View style={styles.header}>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.goBack()
                        }}
                    >
                        <Image
                            source={require('@/public/assets/back.png')}
                            style={styles.IconImage}
                        />
                    </TouchableOpacity>
                    <Text style={text.headerText}>
                        용산구정신건강의학과의원
                    </Text>
                    <View style={styles.IconImage} />
                </View>
                {/* 상단 버튼탭 */}
                <View style={styles.topButtonContainer}>
                    <TouchableOpacity
                        onPress={() => {
                            setButton([true, false])
                        }}
                        style={
                            button[0]
                                ? styles.activeContainer
                                : styles.inactiveContainer
                        }
                    >
                        <Text
                            style={
                                button[0] ? text.activeText : text.inactiveText
                            }
                        >
                            {t('hospital-info')}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            setButton([false, true])
                        }}
                        style={
                            button[1]
                                ? styles.activeContainer
                                : styles.inactiveContainer
                        }
                    >
                        <Text
                            style={
                                button[1] ? text.activeText : text.inactiveText
                            }
                        >
                            {t('review')}
                        </Text>
                    </TouchableOpacity>
                </View>
                {/* 지도 들어갈 부분 */}
                <View
                    style={[
                        styles.columnContainer,
                        { position: 'absolute', top: 391, width: '100%' },
                    ]}
                >
                    {ribbonCount > 0 && ( //포에이 리본 리뷰가 0이상인 경우 표시
                        // 포에이 리본인 경우에 표시되는 부분
                        <View style={styles.flex}>
                            <Image
                                source={require('@/public/assets/ribbon.png')}
                                style={styles.ribbonImage}
                            />
                            <Text style={text.ribbonText}>
                                {t('forA-ribbon')}
                            </Text>
                        </View>
                    )}
                    <View style={[styles.flex, { marginBottom: 15 }]}>
                        <Text style={text.hospitalText}>
                            용산구정신건강의학과의원
                        </Text>
                        <View style={styles.distanceContainer}>
                            <Text style={text.smallBlackText}>620m</Text>
                        </View>
                    </View>
                </View>
                <View
                    style={[
                        styles.topBorderContainer,
                        { position: 'absolute', top: 454, width: '100%' },
                    ]}
                >
                    <View style={styles.activeCircle} />
                    <Text style={[text.doctorText, { marginRight: 6 }]}>
                        진료중
                    </Text>
                    <Text style={text.timeText}>9:00 - 18:00</Text>
                </View>
                <View style={{ position: 'absolute', top: 515, width: '100%' }}>
                    {/* 병원 전화번호와 주소 */}
                    {contactsAndLocations.map((image, index) => (
                        <View style={styles.flex}>
                            <Image style={styles.smallImage} source={image} />
                            <Text style={text.normalText}>
                                {index === 0 ? 'phone' : 'address'}
                            </Text>
                        </View>
                    ))}
                    {/*의사가 있으면 의사 선생님 목록이 뜨도록 */}
                    {doctorList.length > 0 ? (
                        <View
                            style={[
                                styles.columnContainer,
                                {
                                    borderTopWidth: 23,
                                    borderTopColor: '#EDEDEA',
                                    paddingTop: 18,
                                    marginTop: 24,
                                    paddingHorizontal: 16,
                                },
                            ]}
                        >
                            <View
                                style={{
                                    width: '100%',
                                    flexDirection: 'row',
                                    justifyContent: 'flex-start',
                                    marginBottom: 14,
                                }}
                            >
                                <Text>
                                    <Text style={text.semiboldText}>
                                        {t('doctor-count')}
                                    </Text>
                                    <Text style={text.primaryboldText}>
                                        {doctorList.length}
                                    </Text>
                                </Text>
                            </View>
                            {doctorList.map((data) => (
                                <View style={styles.doctorProfileContainer}>
                                    <Image
                                        source={
                                            data.image
                                                ? { uri: data.image }
                                                : require('@/public/assets/defaultDoctor.png')
                                        }
                                        style={styles.doctorImage}
                                    />
                                    <View>
                                        <Text>
                                            <Text style={text.doctorText}>
                                                {data.name}
                                            </Text>
                                            <Text style={text.titleText}>
                                                {t('title')}
                                            </Text>
                                        </Text>
                                        {data.profile && ( //약력이 있는 경우에만 뜨게끔
                                            <TouchableOpacity
                                                onPress={() => {
                                                    setProfileOpen(true)
                                                }}
                                                style={styles.profileContainer}
                                            >
                                                <Text
                                                    style={
                                                        text.profiletitleText
                                                    }
                                                >
                                                    {t('profile')}
                                                </Text>
                                            </TouchableOpacity>
                                        )}
                                    </View>
                                    {data.totalReviewCount && ( //리뷰가 있는 경우에만 뜨게끔
                                        <TouchableOpacity
                                            onPress={() => {
                                                console.log('리뷰 보여줘')
                                            }}
                                            style={styles.showReviewContainer}
                                        >
                                            <Text style={text.showReviewText}>
                                                {t('show-review') +
                                                    '(' +
                                                    data.totalReviewCount +
                                                    ')'}
                                            </Text>
                                        </TouchableOpacity>
                                    )}
                                </View>
                            ))}
                            {/*리뷰 쓰기 버튼 */}
                            <TouchableOpacity
                                style={styles.writeReviewContainer}
                            >
                                <Text style={text.activeText}>
                                    {t('write-review')}
                                </Text>
                            </TouchableOpacity>
                            <View style={{ height: 33 }} />
                        </View>
                    ) : (
                        //의사 선생님 정보가 준비되지 않은 경우
                        <View style={styles.notReadyContainer}>
                            <Image
                                source={require('@/public/assets/notReady.png')}
                                style={styles.notReadyImage}
                            />
                            <Text style={text.faintText}>{t('not-ready')}</Text>
                        </View>
                    )}
                </View>
            </ScrollView>
            {/*병원 평가하고 스크랩할 수 있는 버튼 바 */}
            <View style={[styles.flex, styles.ButtonsContainer]}>
                <TouchableOpacity>
                    <Image
                        source={
                            hospitalList[0].isBookmarked
                                ? require('@/public/assets/clickScrabButton.png')
                                : require('@/public/assets/scrabButton.png')
                        }
                        style={styles.scrabIamge}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        //navigation.navigate('CameraScreen' as never)
                    }}
                    style={styles.forARibbonContainer}
                >
                    <Image
                        source={require('@/public/assets/whiteRibbon.png')}
                        style={styles.buttonRibbonImage}
                    />
                    <Text style={text.ribbonButtonText}>
                        {t('ribbon-evaluation')}
                    </Text>
                    <Image
                        source={require('@/public/assets/whiteRibbon.png')}
                        style={styles.buttonRibbonImage}
                    />
                </TouchableOpacity>
            </View>
        </View>
    ) : (
        <RibbonEvaluation
            hospitalName="용산구정신건강의학과의원"
            setRibbonOpen={setRibbonOpen}
            ribbonCount={ribbonCount}
        />
    )
}

//더미 데이터

const hospitalList = [
    {
        hospitalId: '1452be87a2194b3fbd4351f13e84cd29',
        name: '용산구정신건강의학과의원',
        totalReceiptReviewCount: 5,
        totalEvaluationReviewCount: 0,
        distance: 620,
        operationStatus: 'OPEN',
        isBookmarked: true,
    },
    {
        hospitalId: '48b6507eb6974cf3b6277928f6b5da6b',
        name: '산신령정신건강의학과의원',
        totalReceiptReviewCount: 100,
        totalEvaluationReviewCount: 2,
        distance: 620,
        operationStatus: 'BREAKTIME',
        isBookmarked: true,
    },
    {
        hospitalId: 'f54db390d369x4fa7a1b07ea8d1ee235b',
        name: '런닝맨정신건강의학과의원',
        totalReceiptReviewCount: 111,
        totalEvaluationReviewCount: 5,
        distance: 620,
        operationStatus: 'CLOSED',
        isBookmarked: true,
    },
]
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
        name: '김코코',
        image: '',
        totalGrade: 4.8,
        totalReviewCount: 89,
        profile:
            'Renowned neurologist known for her research in neurodegenerative diseases.',
    },
    {
        doctorId: 'D12345',
        name: '김코코',
        image: '',
        totalGrade: 4.5,
        totalReviewCount: 123,
        profile: 'Specialist in cardiology with over 20 years of experience.',
    },
]
