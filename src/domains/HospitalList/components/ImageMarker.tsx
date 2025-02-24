import { Image, ImageSourcePropType, View } from 'react-native';
import { MapMarkerProps, Marker } from 'react-native-maps';
type ImageMarkerProps = {
    zoomLevel: number;
    image: ImageSourcePropType;
};

export default function ImageMarker({
    image,
    zoomLevel,
    ...props
}: ImageMarkerProps & MapMarkerProps) {
    const getMarkerSize = (zoom: number) => {
        if (zoom > 15) return 50;
        return 30;
    };

    return (
        <Marker {...props}>
            <View
                style={{
                    width: getMarkerSize(zoomLevel),
                    height: getMarkerSize(zoomLevel),
                }}
            >
                <Image
                    source={image}
                    style={{
                        width: '100%',
                        height: '100%',
                        resizeMode: 'contain',
                    }}
                />
            </View>
        </Marker>
    );
}
