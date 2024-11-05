import { View, TouchableOpacity, Image, Text, ScrollView } from 'react-native'
import { styles, text } from './HospitalDetailStyle'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import { useState, useEffect } from 'react'
import RibbonEvaluation from '../ribbonEvaluataion/ribbonEvaluation'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import { RootStackParamList } from '../navigation'
import { StackNavigationProp } from '@react-navigation/stack'
import { getHospitalDetails } from '@/api/hospital/getHospitalDetailApi'
import HospitalReviewList from './HospitalReviewList'

interface HospitalProps {
    hospitalId: string
    latitude: number
    longitude: number
}

type HospitalDetailNavigationProp = StackNavigationProp<
    RootStackParamList,
    'HospitalDetail'
>
interface HospitalInfo {
    address: string
    distance: number
    doctorList: Array<Doctor> // Doctor 타입을 따로 정의해야 합니다.
    hospitalId: string
    isBookmarked: boolean
    isEvaluationReviewed: boolean
    latitude: number
    longitude: number
    name: string
    operationEndHour: number
    operationEndMin: number
    operationStartHour: number
    operationStartMin: number
    operationStatus: 'UNKNOWN' | 'OPEN' | 'CLOSED' // 가능한 값이 더 있다면 추가하세요.
    phone: string
    totalEvaluationReviewCount: number
    totalReceiptReviewCount: number
}

type Doctor = {
    name: string // 의사 이름
    image?: string // 의사 프로필 사진 URL (선택적)
    profile?: string // 의사의 약력 (선택적)
    totalReviewCount?: number // 의사에 대한 총 리뷰 수 (선택적)
}

export default function HospitalDetail({
    hospitalId,
    latitude,
    longitude,
}: HospitalProps) {
    const ribbonCount = 1

    const navigation = useNavigation<HospitalDetailNavigationProp>()

    // 병원정보와 리뷰 중 하나를 골라서 화면에 띄우기 위함
    const [button, setButton] = useState<boolean[]>([true, false])
    //포에이 리본 평가하기 창을 띄우기 위한 state
    const [ribbonOpen, setRibbonOpen] = useState<boolean>(false)

    const [isLoading, setIsLoading] = useState(false)

    //전화번호와 위치 아이콘 이미지를 담은 배열
    const contactsAndLocations = [
        require('@/public/assets/phone.png'),
        require('@/public/assets/location.png'),
    ]

    const { t } = useTranslation('hospitalDetail')

    const [hospital, setHospital] = useState<HospitalInfo>()

    const [hospitalIdState, setHospitalIdState] = useState<string>(hospitalId)
    //
    const [latitudeState, setLatitude] = useState<number>(latitude)
    const [longtitudeState, setLongtitude] = useState<number>(longitude)
    const [doctorProfile, setDoctorProfile] = useState<string>('')
    useEffect(() => {
        const fetchHospitalData = async () => {
            setIsLoading(true)
            try {
                // 병원 데이터 가져오기
                const hospitals = await getHospitalDetails(
                    hospitalId,
                    latitude,
                    longitude,
                )
                setHospital(hospitals)
                console.log(hospitals, '병원 상세')
            } catch (error) {
                console.error('Error fetching hospital data:', error)
            } finally {
                setIsLoading(false) // 데이터 가져오기가 완료되면 로딩 상태를 false로 설정합니다.
            }
        }
        fetchHospitalData()
    }, [hospitalIdState, latitudeState, longtitudeState])

    return !ribbonOpen ? ( //병원 이름을 내려줘야해서 네비게이션으로 이동 안하고 state변화를 통해 뜨게끔 함
        <View style={styles.container}>
            {doctorProfile && ( // 제출 버튼을 누른 경우 배경 변화와 모달
                <View style={styles.profileOpenContainer}>
                    <View style={styles.openProfileContainer}>
                        <View style={styles.openInnerContainer}>
                            <Text style={text.primaryboldText}>
                                {t('doctor-profile')}
                            </Text>
                            <TouchableOpacity
                                onPress={() => {
                                    setDoctorProfile('')
                                }}
                            >
                                <Image
                                    source={require('@/public/assets/x.png')}
                                    style={styles.IconImage}
                                />
                            </TouchableOpacity>
                        </View>
                        <Text style={text.normalText}>{doctorProfile}</Text>
                    </View>
                </View>
            )}
            <View style={{ flex: 1, width: '100%' }}>
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
                        {hospital && hospital.name}
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
                {button[0] ? (
                    <>
                        <View
                            style={{
                                position: 'absolute',
                                top: 143,
                                zIndex: 100,
                                width: '100%',
                                height: 200,
                            }}
                        >
                            {hospital && (
                                <MapView
                                    style={{ flex: 1 }}
                                    initialRegion={{
                                        latitude: hospital.latitude,
                                        longitude: hospital.longitude,
                                        latitudeDelta: 0.01,
                                        longitudeDelta: 0.01,
                                    }}
                                >
                                    <Marker
                                        coordinate={{
                                            latitude: hospital.latitude,
                                            longitude: hospital.longitude,
                                        }}
                                        image={require('@/public/assets/clickLocation.png')}
                                    />
                                </MapView>
                            )}
                        </View>
                        <View
                            style={[
                                styles.columnContainer,
                                {
                                    position: 'absolute',
                                    top: 391,
                                    width: '100%',
                                },
                            ]}
                        >
                            {hospital &&
                                hospital.totalEvaluationReviewCount > 0 && ( //포에이 리본 리뷰가 0이상인 경우 표시
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
                                    {hospital && hospital.name}
                                </Text>
                                <View style={styles.distanceContainer}>
                                    <Text style={text.smallBlackText}>
                                        {hospital &&
                                            Math.round(hospital.distance) + 'm'}
                                    </Text>
                                </View>
                            </View>
                        </View>
                        <View
                            style={[
                                styles.topBorderContainer,
                                {
                                    position: 'absolute',
                                    top: 454,
                                    width: '100%',
                                },
                            ]}
                        >
                            <View style={styles.activeCircle} />
                            <Text style={[text.doctorText, { marginRight: 6 }]}>
                                {hospital && hospital.operationStatus === 'OPEN'
                                    ? '진료중'
                                    : '쉬는중'}
                            </Text>
                            <Text style={text.timeText}>
                                {(hospital && hospital.operationStartHour) || 0}
                                :{(hospital && hospital.operationStartMin) || 0}{' '}
                                - {(hospital && hospital.operationEndHour) || 0}
                                :{(hospital && hospital.operationEndMin) || 0}
                            </Text>
                        </View>
                        <View
                            style={{
                                position: 'absolute',
                                top: 515,
                                width: '100%',
                            }}
                        >
                            {/* 병원 전화번호와 주소 */}
                            {contactsAndLocations.map((image, index) => (
                                <View style={styles.flex}>
                                    <Image
                                        style={styles.smallImage}
                                        source={image}
                                    />
                                    <Text style={text.normalText}>
                                        {index === 0
                                            ? hospital?.phone
                                            : hospital?.address}
                                    </Text>
                                </View>
                            ))}
                            {/*의사가 있으면 의사 선생님 목록이 뜨도록 */}
                            {hospital?.doctorList &&
                            hospital.doctorList.length > 0 ? (
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
                                                {hospital?.doctorList &&
                                                    hospital.doctorList.length}
                                            </Text>
                                        </Text>
                                    </View>
                                    {hospital?.doctorList &&
                                        hospital.doctorList.map((data) => (
                                            <View
                                                style={
                                                    styles.doctorProfileContainer
                                                }
                                            >
                                                <Image
                                                    source={
                                                        data.image
                                                            ? {
                                                                  uri: data.image,
                                                              }
                                                            : require('@/public/assets/defaultDoctor.png')
                                                    }
                                                    style={styles.doctorImage}
                                                />
                                                <View>
                                                    <Text>
                                                        <Text
                                                            style={
                                                                text.doctorText
                                                            }
                                                        >
                                                            {data.name}
                                                        </Text>
                                                        <Text
                                                            style={
                                                                text.titleText
                                                            }
                                                        >
                                                            {t('title')}
                                                        </Text>
                                                    </Text>
                                                    {data.profile && ( //약력이 있는 경우에만 뜨게끔
                                                        <TouchableOpacity
                                                            onPress={() => {
                                                                data.profile &&
                                                                    setDoctorProfile(
                                                                        data.profile,
                                                                    )
                                                            }}
                                                            style={
                                                                styles.profileContainer
                                                            }
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
                                                            console.log(
                                                                '리뷰 보여줘',
                                                            )
                                                        }}
                                                        style={
                                                            styles.showReviewContainer
                                                        }
                                                    >
                                                        <Text
                                                            style={
                                                                text.showReviewText
                                                            }
                                                        >
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
                                        onPress={() => {navigation.navigate('CameraScreen') as never}}
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
                                    <Text style={text.faintText}>
                                        {t('not-ready')}
                                    </Text>
                                </View>
                            )}
                        </View>
                    </>
                ) : (
                    <View
                        style={{
                            position: 'absolute',
                            width: '100%',
                            top: 143,
                            bottom: 100,
                            zIndex: 100,
                        }}
                    >
                        <HospitalReviewList
                            hospitalId={
                                hospitalId /*'064377163e0611ef87e706a9c1a84c57'*/
                            }
                        />
                    </View>
                )}
            </View>

            {/*병원 평가하고 스크랩할 수 있는 버튼 바 */}
            <View style={[styles.flex, styles.ButtonsContainer]}>
                <TouchableOpacity>
                    <Image
                        source={
                            hospital && hospital.isBookmarked
                                ? require('@/public/assets/clickScrabButton.png')
                                : require('@/public/assets/scrabButton.png')
                        }
                        style={styles.scrabIamge}
                    />
                </TouchableOpacity>
                {button[0] ? (
                    <>
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate('HospitalReview' as never)
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
                    </>
                ) : (
                    <>
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate('HospitalReview')
                            }}
                            style={styles.forARibbonContainer}
                        >
                            <Text style={text.ribbonButtonText}>
                                {t('write-review')}
                            </Text>
                        </TouchableOpacity>
                    </>
                )}
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
