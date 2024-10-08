import { TouchableOpacity, View, Image, Text } from 'react-native'
import { useState, useEffect, useRef } from 'react'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import { styles, text } from './MapsStyle'
import { LocationCoords, Hospital } from './HospitalMaps'

interface MapProps {
    hospitalList: Hospital[]
    location?: LocationCoords | null
}

export default function GoogleMap({ hospitalList, location }: MapProps) {
    //에러 메세지
    const [errorMsg, setErrorMsg] = useState<string>('')

    //병원 리스트의 개별 요소 클릭 여부
    const [hospitalclick, setHospitalClick] = useState<boolean[]>(
        Array(hospitalList.length).fill(false),
    )
    //위치 재검색
    const [retry, setRetry] = useState<boolean>(false)

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
                            <Marker
                                key={index}
                                coordinate={{
                                    latitude: hospital.latitude,
                                    longitude: hospital.longitude,
                                }}
                                image={
                                    hospitalclick[index]
                                        ? require('@/public/assets/clickLocation.png')
                                        : require('@/public/assets/unclickLocation.png')
                                }
                                onPress={() => {
                                    const temp = Array(
                                        hospitalList.length,
                                    ).fill(false)
                                    temp[index] = true
                                    setHospitalClick(temp)
                                    console.log('터치')
                                }}
                            />
                        ))}
                </MapView>
            )}
        </View>
    )
}
