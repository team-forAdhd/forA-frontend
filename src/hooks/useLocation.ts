import getCurrentAddress from '@/api/hospital/getCurrentAddressApi';
import { GOOGLE_GEOCODING_API_KEY } from '@env';
import { useCallback, useEffect, useState } from 'react';
import { Platform } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { Region } from 'react-native-maps';

export type Location = {
    latitude: number;
    longitude: number;
};
export type LocationHook = {
    myLocation: Location;
    refresh: () => void;
    address: string;
    zoomLevel: number;
    handleRegionChange: (region: Region) => void;
};

const LOCATION_MAX_AGE = 1000000;
const LOCATION_TIMEOUT = 10000;
const MARKER_DEFAULT_SIZE = 20;
const INITIAL_ZOOM_LEVEL = 25;
export function useLocation(pushError?: (err: string) => void): LocationHook {
    const [myLocation, _setMyLocation] = useState<Location>({
        latitude: 0,
        longitude: 0,
    });

    const [address, _setAddress] = useState('');
    const { handleRegionChange, zoomLevel } = useRegion();

    function changeFocusLocation(location: Location) {
        _setMyLocation(location);
    }

    async function getAddress() {
        if (!myLocation.longitude && !myLocation.latitude) return;
        const koreanAddress = await getCurrentAddress(
            myLocation.latitude,
            myLocation.longitude,
            GOOGLE_GEOCODING_API_KEY,
        );
        _setAddress(koreanAddress.split(' ').slice(2).join(' '));
    }

    useEffect(() => {
        getAddress();
    }, [myLocation]);

    const getCurrentLocation = useCallback(() => {
        Geolocation.getCurrentPosition(
            async ({ coords }) =>
                _setMyLocation({
                    latitude: coords.latitude,
                    longitude: coords.longitude,
                }),
            () => {
                throw new Error('GEOLOCATION ERROR');
            },
            {
                enableHighAccuracy: true,
                maximumAge: LOCATION_MAX_AGE,
                timeout: LOCATION_TIMEOUT,
            },
        );
    }, []);

    const getLocation = useCallback(async () => {
        try {
            if (Platform.OS === 'ios') {
                const status =
                    await Geolocation.requestAuthorization('whenInUse');
                if (status === 'granted') {
                    getCurrentLocation();
                } else {
                    pushError?.(
                        '위치 정보를 허용해야만 서비스 이용이 가능합니다',
                    );
                }
            }
        } catch (error) {
            pushError?.('위치 정보를 가져오던 중 오류가 발생했습니다.');
        }
    }, [getCurrentLocation]);

    const refresh = useCallback(() => {
        getCurrentLocation();
    }, [getLocation]);

    useEffect(() => {
        getLocation();
    }, [getLocation]);
    return {
        myLocation,
        refresh,
        address,
        zoomLevel,
        handleRegionChange,
    };
}

export function useRegion() {
    const [zoomLevel, _setZoomLevel] = useState(INITIAL_ZOOM_LEVEL);

    const handleRegionChange = (region: Region) => {
        const zoom = Math.round(
            MARKER_DEFAULT_SIZE - Math.log2(region.latitudeDelta),
        );
        _setZoomLevel(zoom);
    };
    return { zoomLevel, handleRegionChange };
}
