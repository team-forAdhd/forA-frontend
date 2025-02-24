import {
    TouchableOpacity,
    View,
    Image,
    Text,
    TextStyle,
    StyleProp,
    StyleSheet,
} from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { Hospital } from '../screens/HospitalMaps';
import { Location, LocationHook } from '@/hooks/useLocation';
import ImageMarker from '@/domains/HospitalList/components/ImageMarker';
import React from 'react';

type MapProps = {
    hospitalList: Hospital[];
    setFocusedHospital: React.Dispatch<React.SetStateAction<Hospital | null>>;
} & LocationHook;

export default function GoogleMap({
    hospitalList,
    myLocation,
    refresh,
    zoomLevel,
    handleRegionChange,
    setFocusedHospital,
}: Omit<MapProps, 'address'>) {
    const mapRef = React.createRef<MapView>();

    function changeFocus({
        location,
        hospital,
    }: {
        location: Location;
        hospital?: Hospital;
    }) {
        if (hospital) setFocusedHospital(hospital);
        mapRef.current?.animateToRegion({
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
        });
    }

    return (
        <View style={styles.screen}>
            <View style={styles.flex}>
                <TouchableOpacity
                    onPress={() => {
                        refresh();
                        changeFocus({ location: myLocation });
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
            {myLocation && (
                <MapView
                    onPress={() => {
                        setFocusedHospital(null);
                    }}
                    ref={mapRef}
                    showsUserLocation={true}
                    provider={PROVIDER_GOOGLE}
                    style={styles.map}
                    initialRegion={{
                        latitude: myLocation.latitude,
                        longitude: myLocation.longitude,
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.01,
                    }}
                    region={{
                        latitude: myLocation.latitude,
                        longitude: myLocation.longitude,
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.01,
                    }}
                    onRegionChange={handleRegionChange}
                >
                    {hospitalList &&
                        hospitalList.map((hospital, index) => (
                            <ImageMarker
                                zoomLevel={zoomLevel}
                                coordinate={{
                                    latitude: hospital.latitude,
                                    longitude: hospital.longitude,
                                }}
                                image={require('@/public/assets/unclickLocation.png')}
                                key={`hospital-${index}`}
                                onPress={(e) => {
                                    e.stopPropagation();
                                    changeFocus({
                                        location: {
                                            latitude: hospital.latitude,
                                            longitude: hospital.longitude,
                                        },
                                        hospital: hospital,
                                    });
                                }}
                            />
                        ))}
                </MapView>
            )}
        </View>
    );
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
};

const styles = StyleSheet.create({
    screen: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    flex: {
        position: 'absolute',
        top: 167,
        zIndex: 10,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    retryContainer: {
        width: 128,
        height: 33,
        borderRadius: 29,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 2 },
        shadowOpacity: 0.45,
        shadowRadius: 3.84,
    },
    IconImage: {
        width: 20,
        height: 20,
    },
    map: {
        flex: 1,
    },
});

const baseText = {
    fontFamily: 'Pretendard',
    fontStyle: 'normal',
    fontWeight: '400',
};

const text = {
    headerText: {
        color: color.normal,
        fontSize: 18,
        fontWeight: 'bold',
        letterSpacing: -0.7,
        lineHeight: 22.4,
        textAlign: 'center',
    },
    retryText: {
        ...baseText,
        color: color.primary,
        fontSize: 16,
        lineHeight: 22.4,
        letterSpacing: -0.5,
    },
} as {
    [key: string]: StyleProp<TextStyle>;
};
