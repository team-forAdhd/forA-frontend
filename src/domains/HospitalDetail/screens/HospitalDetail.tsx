import {
    View,
    TouchableOpacity,
    Image,
    Text,
    ScrollView,
    TextStyle,
    StyleProp,
    StyleSheet,
    SafeAreaView,
    ActivityIndicator,
} from 'react-native'
import { useTranslation } from 'react-i18next'
import React, { useState } from 'react'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import HospitalReviewList from '../../../components/hospital/HospitalReviewList'
import { useBookmarkMutation } from '@/domains/Hospital/api/postBookmark.api'
import { HospitalStackParams } from '@/navigation/stacks/hospitalStack'
import { StackScreenProps } from '@react-navigation/stack'
import { useHospitalDetail } from '@/domains/Hospital/api/getHospitalDetail.api'
import { Doctor } from '@/components/hospital/types'
import { useRegion } from '@/hooks/useLocation'
import ImageMarker from '@/domains/HospitalList/components/ImageMarker'

type HospitalDetailNavigationProp = StackScreenProps<
    HospitalStackParams,
    'HospitalDetail'
>

export default function HospitalDetail({
    navigation,
    route,
}: HospitalDetailNavigationProp) {
    const { hospitalId, latitude, longitude } = route.params
    const { isLoading, data: hospital } = useHospitalDetail({
        hospitalId,
        latitude,
        longitude,
    })
    const [button, setButton] = useState<boolean[]>([true, false])
    const [doctorProfile, setDoctorProfile] = useState<string>('')
    const { zoomLevel, handleRegionChange } = useRegion()
    const { mutate } = useBookmarkMutation()

    const contactsAndLocations = [
        require('@/public/assets/phone.png'),
        require('@/public/assets/location.png'),
    ]

    const { t } = useTranslation('hospitalDetail')

    if (isLoading) return <ActivityIndicator />
    return (
        <SafeAreaView style={styles.container}>
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
            <View style={{ flex: 1, width: '100%', marginBottom: 50 }}>
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
                <ScrollView>
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
                                    button[0]
                                        ? text.activeText
                                        : text.inactiveText
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
                                    button[1]
                                        ? text.activeText
                                        : text.inactiveText
                                }
                            >
                                {t('review')}
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {/* 지도 들어갈 부분 */}
                    {button[0] ? (
                        <React.Fragment>
                            <View
                                style={{
                                    zIndex: 100,
                                    width: '100%',
                                    height: 200,
                                }}
                            >
                                {hospital && (
                                    <MapView
                                        style={{ flex: 1 }}
                                        provider={PROVIDER_GOOGLE}
                                        initialRegion={{
                                            latitude: hospital.latitude,
                                            longitude: hospital.longitude,
                                            latitudeDelta: 0.01,
                                            longitudeDelta: 0.01,
                                        }}
                                        onRegionChange={handleRegionChange}
                                    >
                                        <ImageMarker
                                            coordinate={{
                                                latitude: hospital.latitude,
                                                longitude: hospital.longitude,
                                            }}
                                            image={require('@/public/assets/clickLocation.png')}
                                            zoomLevel={zoomLevel}
                                        />
                                    </MapView>
                                )}
                            </View>
                            <View
                                style={[
                                    styles.columnContainer,
                                    {
                                        paddingVertical: 20,
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
                                <View style={[styles.flex]}>
                                    <Text style={text.hospitalText}>
                                        {hospital && hospital.name}
                                    </Text>
                                    <View style={styles.distanceContainer}>
                                        <Text style={text.smallBlackText}>
                                            {hospital &&
                                                Math.round(hospital.distance) +
                                                    'm'}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                            <View style={[styles.topBorderContainer]}>
                                <View style={styles.activeCircle} />
                                <Text
                                    style={[
                                        text.doctorText,
                                        { marginRight: 6 },
                                    ]}
                                >
                                    {hospital &&
                                    hospital.operationStatus === 'OPEN'
                                        ? '진료중'
                                        : '진료종료'}
                                </Text>
                                <Text style={text.timeText}>
                                    {(hospital &&
                                        hospital.operationStartHour) ||
                                        0}
                                    :
                                    {(hospital && hospital.operationStartMin) ||
                                        0}{' '}
                                    -{' '}
                                    {(hospital && hospital.operationEndHour) ||
                                        0}
                                    :
                                    {(hospital && hospital.operationEndMin) ||
                                        0}
                                </Text>
                            </View>
                            <View
                                style={{
                                    width: '100%',
                                }}
                            >
                                <View style={{ paddingVertical: 10 }}>
                                    {/* 병원 전화번호와 주소 */}
                                    {contactsAndLocations.map(
                                        (image, index) => (
                                            <View style={styles.flex}>
                                                <Image
                                                    style={styles.smallImage}
                                                    source={image}
                                                />
                                                <View style={{ flex: 1 }}>
                                                    <Text
                                                        style={text.normalText}
                                                    >
                                                        {index === 0
                                                            ? hospital?.phone
                                                            : hospital?.address}
                                                    </Text>
                                                </View>
                                            </View>
                                        ),
                                    )}
                                </View>
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
                                                <Text
                                                    style={text.primaryboldText}
                                                >
                                                    {hospital?.doctorList &&
                                                        hospital.doctorList
                                                            .length}
                                                </Text>
                                            </Text>
                                        </View>
                                        {hospital?.doctorList &&
                                            hospital.doctorList.map(
                                                (data: Doctor) => (
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
                                                            style={
                                                                styles.doctorImage
                                                            }
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
                                                                        {t(
                                                                            'profile',
                                                                        )}
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
                                                                    {t(
                                                                        'show-review',
                                                                    ) +
                                                                        '(' +
                                                                        data.totalReviewCount +
                                                                        ')'}
                                                                </Text>
                                                            </TouchableOpacity>
                                                        )}
                                                    </View>
                                                ),
                                            )}

                                        {/*리뷰 쓰기 버튼 */}
                                        <TouchableOpacity
                                            onPress={() => {
                                                if (hospital) {
                                                    navigation.navigate(
                                                        'CameraScreen',
                                                        {
                                                            hospitalInfo:
                                                                hospital,
                                                            ribbonEvaluation:
                                                                true,
                                                        },
                                                    ) as never
                                                }
                                            }}
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
                                        {/*리뷰 쓰기 버튼 */}
                                        <TouchableOpacity
                                            style={styles.writeReviewContainer}
                                            onPress={() => {
                                                if (hospital) {
                                                    navigation.navigate(
                                                        'CameraScreen',
                                                        {
                                                            hospitalInfo:
                                                                hospital,
                                                            ribbonEvaluation:
                                                                false,
                                                        },
                                                    )
                                                }
                                            }}
                                        >
                                            <Text style={text.activeText}>
                                                {t('write-review')}
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                )}
                            </View>
                        </React.Fragment>
                    ) : (
                        <View
                            style={{
                                width: '100%',
                                zIndex: 100,
                            }}
                        >
                            <HospitalReviewList
                                hospitalId={
                                    hospitalId
                                } /*'064377163e0611ef87e706a9c1a84c57'*/
                            />
                        </View>
                    )}
                </ScrollView>
            </View>

            {/*병원 평가하고 스크랩할 수 있는 버튼 바 */}
            <View style={[styles.flex, styles.ButtonsContainer]}>
                <TouchableOpacity onPress={() => {}}>
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
                                if (hospital) {
                                    navigation.navigate('CameraScreen', {
                                        hospitalInfo: hospital,
                                        ribbonEvaluation: true,
                                    })
                                }
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
                                if (hospital) {
                                    navigation.push('CameraScreen', {
                                        hospitalInfo: hospital,
                                        ribbonEvaluation: true,
                                    })
                                }
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
        </SafeAreaView>
    )
}

const color = {
    primary: '#52A35D',
    inactive: '#949494',
    inactiveBottom: '#EFEFF0',
    ribbon: '#FF5D5D',
    normal: '#232323',
    faintBlack: '#555555',
    backgroundGray: '#EDEDEA',
    faintGray: '#EEEEEE',
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    header: {
        width: '100%',
        height: 36,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        zIndex: 2, //ZIndex를 조정해서 터치 이벤트 문제 해소 , 캐러셀 컴포넌트가 터치이벤트를 가로채서 헤더에 있는 아이콘의 터치가 안먹고 있었음
    },
    openProfileContainer: {
        width: '92.2%',
        height: '65.2%',
        borderRadius: 12,
        flexDirection: 'column',
        backgroundColor: 'white',
        zIndex: 8,
        paddingHorizontal: 16,
        paddingVertical: 21,
    },
    openInnerContainer: {
        width: '100%',
        height: 62,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    profileOpenContainer: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        zIndex: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        opacity: 10,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    },
    topButtonContainer: {
        flexDirection: 'row',
        width: '100%',
    },
    activeContainer: {
        flex: 1,
        width: '50%',
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        borderBottomColor: color.primary,
        borderBottomWidth: 4,
    },
    inactiveContainer: {
        flex: 1,
        width: '50%',
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        borderBottomColor: color.inactiveBottom,
        borderBottomWidth: 2,
    },
    flex: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 16,
    },
    topBorderContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 16,
        paddingVertical: 14,
        borderTopColor: color.faintGray,
        borderTopWidth: 1,
    },
    ribbonImage: {
        width: 14,
        height: 11,
        objectFit: 'contain',
        marginRight: 5,
    },
    columnContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    distanceContainer: {
        borderRadius: 500,
        borderWidth: 0.5,
        borderColor: color.normal,
        paddingHorizontal: 7,
        marginHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    smallImage: {
        width: 23,
        height: 23,
        objectFit: 'contain',
        marginRight: 4,
    },
    doctorProfileContainer: {
        flexDirection: 'row',
        borderRadius: 20,
        paddingHorizontal: 15,
        marginBottom: 8,
        width: '92.2%',
        height: 91,
        alignItems: 'center',
        shadowColor: color.inactive,
        shadowOffset: {
            // 그림자의 위치
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25, // 그림자의 투명도
        shadowRadius: 3.84, // 그림자의 반경
    },
    doctorImage: {
        width: 54,
        height: 54,
        objectFit: 'contain',
        borderRadius: 500,
    },
    IconImage: {
        width: 35,
        height: 35,
        objectFit: 'contain',
    },
    buttonRibbonImage: {
        width: 16.04,
        height: 12.6,
        objectFit: 'contain',
    },
    rankingListContainer: {
        width: '100%',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingLeft: 14,
        paddingRight: 14,
    },
    profileContainer: {
        width: 36,
        height: 24,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 7,
        borderColor: color.primary,
        borderWidth: 1,
    },
    forARibbonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '78.5%',
        height: 48,
        backgroundColor: color.primary,
        borderRadius: 8,
    },
    showReviewContainer: {
        bottom: 14,
        right: 15,
    },
    notReadyImage: {
        width: 72,
        height: 72,
        marginBottom: 20,
        marginTop: 52,
    },
    notReadyContainer: {
        backgroundColor: color.backgroundGray,
        width: '100%',
        height: 300,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    writeReviewContainer: {
        marginVertical: 20,
        borderColor: color.primary,
        borderRadius: 12,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '92.2%',
        height: 48,
    },
    activeCircle: {
        backgroundColor: color.primary,
        width: 7,
        height: 7,
        borderRadius: 10,
        marginRight: 8,
    },
    scrabIamge: {
        width: 48,
        height: 48,
        marginRight: 4,
    },
    ButtonsContainer: {
        backgroundColor: 'white',
        shadowColor: color.inactive,
        shadowOffset: {
            // 그림자의 위치
            width: 0,
            height: -2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        zIndex: 3,
        paddingTop: 18,
        paddingBottom: 34,
        position: 'absolute',
        bottom: 0,
        justifyContent: 'space-around',
        width: '100%',
        height: 100,
    },
})

const baseText = {
    fontFamily: 'Pretendard',
    fontStyle: 'normal',
    fontWeight: '400',
}

const text = {
    headerText: {
        color: color.normal,
        fontSize: 18,
        fontWeight: 'bold',
        letterSpacing: -0.7,
        lineHeight: 22.4,
        textAlign: 'center',
    },
    activeText: {
        fontWeight: '800',
        color: color.primary,
        fontSize: 18,
        lineHeight: 22.4,
    },
    inactiveText: {
        ...baseText,
        color: color.inactive,
        fontSize: 18,
        lineHeight: 22.4,
    },
    timeText: {
        fontWeight: '500',
        color: color.inactive,
        fontSize: 16,
        lineHeight: 22.4,
        letterSpacing: -0.5,
    },
    ribbonText: {
        ...baseText,
        color: color.ribbon,
        fontSize: 14,
        lineHeight: 19.6,
        letterSpacing: -0.5,
    },
    hospitalText: {
        fontWeight: '800',
        fontSize: 20,
        lineHeight: 28,
        color: color.normal,
    },
    smallBlackText: {
        ...baseText,
        fontSize: 14,
        lineHeight: 19.6,
        letterSpacing: -0.5,
        color: color.normal,
    },
    normalText: {
        ...baseText,
        fontSize: 16,
        lineHeight: 22.4,
        letterSpacing: -0.5,
        color: color.normal,
    },
    semiboldText: {
        fontWeight: '800',
        fontSize: 18,
        color: color.normal,
        lineHeight: 22.4,
    },
    doctorText: {
        fontWeight: '800',
        fontSize: 16,
        color: color.normal,
        lineHeight: 22.4,
    },
    titleText: {
        ...baseText,
        fontSize: 16,
        color: color.normal,
        lineHeight: 22.4,
        letterSpacing: -0.5,
        marginLeft: 4,
    },
    profiletitleText: {
        ...baseText,
        fontSize: 16,
        color: color.primary,
        lineHeight: 19.6,
        letterSpacing: -0.5,
    },
    primaryboldText: {
        fontWeight: '800',
        fontSize: 18,
        color: color.primary,
        lineHeight: 22.4,
    },
    faintText: {
        ...baseText,
        fontSize: 18,
        lineHeight: 22.4,
        letterSpacing: -0.5,
        color: color.faintBlack,
    },
    showReviewText: {
        ...baseText,
        fontSize: 16,
        lineHeight: 22.4,
        letterSpacing: -0.5,
        color: color.faintBlack,
        textDecorationColor: color.faintBlack,
        textDecorationStyle: 'solid',
        textDecorationLine: 'underline',
    },
    rankingText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    ribbonButtonText: {
        fontWeight: '600',
        fontSize: 18,
        lineHeight: 24,
        color: 'white',
    },
} as {
    [key: string]: StyleProp<TextStyle>
}
