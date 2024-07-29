import { TouchableOpacity, View, Image, Text } from 'react-native'
import { useState, useEffect, useRef } from 'react'
import { PROVIDER_GOOGLE } from 'react-native-maps'
import MapView, { Marker, Region } from 'react-native-maps'
import * as Location from 'expo-location'
import { styles, text } from './MapsStyle'

interface LocationCoords {
    latitude: number
    longitude: number
}
const hospitalList = [
    {
        latitude: 36.889,
        longitude: 138.9,
        forA: true,
    },
]

export default function GoogleMap() {
    //현재 위치 위도, 경도
    const [location, setLocation] = useState<LocationCoords | null>(null)
    //에러 메세지
    const [errorMsg, setErrorMsg] = useState<string>('')

    //병원 리스트의 개별 요소 클릭 여부
    const [hospitalclick, setHospitalClick] = useState<boolean[]>(
        Array(hospitalList.length).fill(false),
    )
    //위치 재검색
    const [retry, setRetry] = useState<boolean>(false)

    useEffect(() => {
        ;(async () => {
            let { status } = await Location.requestForegroundPermissionsAsync()
            if (status !== 'granted') {
                setErrorMsg('위치 정보 허용이 거절당했습니다.')
                return
            }

            let currentLocation = await Location.getCurrentPositionAsync({}) //혀내 사용자 위치 받아오기
            setLocation({
                latitude: currentLocation.coords.latitude,
                longitude: currentLocation.coords.longitude,
            })
        })()
    }, [])

    let txt = 'Waiting..'
    if (errorMsg) {
        txt = errorMsg
    } else if (location) {
        txt = JSON.stringify(location)
    }

    return (
        <View style={styles.screen}>
            <View style={styles.flex}>
                <TouchableOpacity
                    onPress={() => {
                        setRetry(!retry)
                    }}
                    style={styles.retryContainer}
                >
                    <Image
                        source={require('@/public/assets/refreshIcon.png')}
                        style={styles.IconImage}
                    />
                    <Text style={text.retryText}>현 위치 재검색</Text>
                </TouchableOpacity>
            </View>

            {location && (
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: location.latitude,
                        longitude: location.longitude,
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.01,
                    }}
                    provider={PROVIDER_GOOGLE}
                >
                    <Marker
                        coordinate={{
                            latitude: location.latitude,
                            longitude: location.longitude,
                        }}
                        image={require('@/public/assets/currentLocation.png')}
                    />
                    {hospitalList &&
                        hospitalList.map((hospital, index) => (
                            <TouchableOpacity
                                key={index}
                                onPress={() => {
                                    const temp = Array(
                                        hospitalList.length,
                                    ).fill(false)
                                    temp[index] = true
                                    setHospitalClick(temp)
                                }}
                            >
                                <Marker
                                    coordinate={{
                                        latitude: hospital.latitude,
                                        longitude: hospital.longitude,
                                    }}
                                    image={
                                        hospitalclick[index]
                                            ? require('@/public/assets/clickLocation.png')
                                            : require('@/public/assets/unclickLocation.png')
                                    }
                                />
                            </TouchableOpacity>
                        ))}
                </MapView>
            )}
        </View>
    )
}
