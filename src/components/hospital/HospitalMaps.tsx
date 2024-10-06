import { useEffect, useState } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import TabBar from '../common/tabBar/tabBar'
import GoogleMap from './Maps'
import HospitalBottomSheet from '../common/hospitalListBottomSheet/hospitalListBottomSheet'
import { styles, text } from './HospitalMapsStyle'
import RibbonDescription from './ribbonDescription'
import { useTranslation } from 'react-i18next'
import * as Location from 'expo-location'
import { getNearHospitals } from '@/api/hospital/getNearHospitalListApi'
import { Login } from '@/api/login/loginApi'

export interface LocationCoords {
    latitude: number
    longitude: number
}

export type Hospital = {
    distance: number
    hospitalId: string
    isBookmarked: boolean
    latitude: number
    longitude: number
    name: string
    operationStatus: string
    totalEvaluationReviewCount: number
    totalReceiptReviewCount: number
}

export default function HospitalMaps() {
    //포에이 설명 팝업을 띄울지에 관한 상태
    const [description, setDescription] = useState<boolean>(false)
    //포에이 리본 모달
    const [modal, setModal] = useState<boolean>(false)

    const { t } = useTranslation('HospitalModal')
    //현재 위치 위도, 경도
    const [location, setLocation] = useState<LocationCoords | null>(null)
    //에러 메세지
    const [errorMsg, setErrorMsg] = useState<string>('')

    //위치 재검색
    const [reRender, setRerender] = useState<boolean>(false)

    const [dataList, setDataList] = useState<Hospital[]>([])

    const [radius, setRadius] = useState<number>(1000) // 기본값 설정 (예: 1000미터)
    const [page, setPage] = useState<number>(0) // 페이지 기본값 설정
    const [size, setSize] = useState<number>(10) // 한 번에 가져올 데이터의 개수
    const [sort, setSort] = useState<string>('reviewCount,desc') // 정렬 옵션
    const [filter, setFilter] = useState<string>('ALL') // 필터 옵션
    // 현재 위치를 가져오는 useEffect
    useEffect(() => {
        const fetchLocation = async () => {
            await Login()

            // 위치 권한 요청
            let { status } = await Location.requestForegroundPermissionsAsync()
            if (status !== 'granted') {
                setErrorMsg('위치 정보 허용이 거절당했습니다.')
                return
            }

            try {
                // 현재 사용자 위치 받아오기
                let currentLocation = await Location.getCurrentPositionAsync({})
                setLocation({
                    latitude: currentLocation.coords.latitude,
                    longitude: currentLocation.coords.longitude,
                })
            } catch (error) {
                console.error('Error fetching location:', error)
            }
        }

        fetchLocation()
    }, [])

    useEffect(() => {
        if (
            location &&
            radius &&
            page !== undefined &&
            size &&
            sort &&
            filter
        ) {
            const fetchHospitalData = async () => {
                try {
                    // 병원 데이터 가져오기
                    const hospitals = await getNearHospitals(
                        location.latitude,
                        location.longitude,
                        radius,
                        page,
                        size,
                        sort,
                        filter,
                    )
                    setDataList(hospitals)
                } catch (error) {
                    console.error('Error fetching hospital data:', error)
                }
            }

            fetchHospitalData()
        }
    }, [location, radius, page, size, sort, filter, reRender])

    let txt = 'Waiting..'
    if (errorMsg) {
        txt = errorMsg
    } else if (location) {
        txt = JSON.stringify(location)
    }

    return (
        <View style={{ flex: 1 }}>
            {/*포에이 리본을 클릭한 경우 리본 평가자 수를 알려주는 모달 */}
            {modal && (
                <View style={styles.position}>
                    <TouchableOpacity
                        onPress={() => {
                            setModal(false)
                        }}
                        style={styles.ModalContainer}
                    >
                        <Text>
                            <Text style={text.ribbonText}>{t('text1')} </Text>
                            <Text style={text.ribbonCountText}>
                                {dataList[0].totalEvaluationReviewCount}
                            </Text>
                            <Text style={text.ribbonText}>{t('text2')}</Text>
                        </Text>
                        <Text style={text.ribbonText}>{t('text3')}</Text>
                    </TouchableOpacity>
                </View>
            )}
            {/*포에이 리본을 클릭한 경우 리본 평가자 수를 알려주는 모달 */}
            {description && (
                <RibbonDescription setDescription={setDescription} />
            )}
            {/*본인 위치 상단 바 */}
            <View style={styles.topContainer}>
                <Text style={text.headerText}>병원</Text>
                <View style={styles.locationContainer}>
                    <Image
                        style={styles.locationIcon}
                        source={require('@/public/assets/compass.png')}
                    />
                    <Text style={text.locationText}>
                        서울특별시 용산구 청파로47길 100
                    </Text>
                </View>
            </View>
            {/*구글맵 */}
            <GoogleMap hospitalList={dataList} location={location} />
            {/*병원리스트 바텀 시트*/}
            <HospitalBottomSheet
                setDescription={setDescription}
                setModal={setModal}
                hospitalList={dataList}
                setSort={setSort}
                reRender={reRender}
                setRerender={setRerender}
            />
            <TabBar />
        </View>
    )
}
