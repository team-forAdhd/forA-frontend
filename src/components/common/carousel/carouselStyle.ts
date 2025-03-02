import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    slide: {
        height: 260,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
    },
    carouselImage: {
        width: 382,
        height: 260,
        objectFit: 'contain',
    },
});
