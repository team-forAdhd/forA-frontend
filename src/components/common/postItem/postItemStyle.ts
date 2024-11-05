import { StyleProp, StyleSheet, TextStyle } from 'react-native'

export const styles = StyleSheet.create({
    container: {
        width: '100%',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingTop: 11,
    },
    RightContainer: {
        justifyContent: 'flex-start',
        flexDirection: 'column',
    },
    iconImage: {
        width: 18,
        height: 16,
        objectFit: 'contain',
    },
    iconContainer: {
        flexDirection: 'row',
        marginTop: 8,
    },
    iconInnerContainer: {
        flexDirection: 'row',
        marginRight: 8,
        marginBottom: 3,
    },
    PictureContainer: {
        width: 70,
        height: 70,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    imagesLength: {
        zIndex: 3,
        position: 'absolute',
        right: 0,
        bottom: 0,
        backgroundColor: 'black',
        opacity: 0.8,
        color: 'white',
        width: 31,
        height: 20,
        borderBottomRightRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    picture: {
        width: '100%',
        height: '100%',
        borderRadius: 12,
    },
})

const baseText = {
    fontFamily: 'Pretendard',
    fontStyle: 'normal',
    fontWeight: '400',
}

export const text = {
    title: {
        color: '#232323',
        fontSize: 18,
        fontWeight: '500',
        letterSpacing: -0.5,
        alignItems: 'center',
    },
    blackSmallText: {
        ...baseText,
        color: '#232323',
        fontSize: 14,
        textAlign: 'center',
    },
    greenSmallText: {
        ...baseText,
        color: '#52A55D',
        fontSize: 14,
        textAlign: 'center',
    },
    time: {
        ...baseText,
        color: '#949494',
        fontSize: 12,
        letterSpacing: -0.5,
        alignItems: 'center',
    },
    iamgesLength: {
        ...baseText,
        color: 'white',
        fontSize: 14,
    },
} as {
    [key: string]: StyleProp<TextStyle>
}
