import { StyleProp, StyleSheet, TextStyle } from 'react-native'

//자주 반복되는 색 객체로 빼서 사용
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

export const styles = StyleSheet.create({
    topContainer: {
        position: 'absolute',
        top: 0,
        width: '100%',
        height: 151,
        zIndex: 10,
        paddingVertical: 5,
        paddingHorizontal: 16,
        backgroundColor: 'white',
        paddingTop: 42,
        flexGrow: 1,
    },
    locationContainer: {
        width: '100%',
        height: 43,
        marginTop: 23,
        flexDirection: 'row',
        alignItems: 'center',
    },
    locationIcon: {
        width: 27,
        height: 27,
        marginRight: 5,
    },
    ModalContainer: {
        backgroundColor: color.normal,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 30,
        borderRadius: 12,
        width: 349,
        height: 74,
    },
    position: {
        position: 'absolute',
        top: 0,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        zIndex: 30,
    },
    map: {
        flex: 1,
    },
})

const baseText = {
    fontFamily: 'Pretendard',
    fontStyle: 'normal',
    fontWeight: '400',
}

export const text = {
    headerText: {
        color: color.normal,
        fontSize: 24,
        fontWeight: 'bold',
        letterSpacing: -0.5,
        lineHeight: 30.6,
    },
    locationText: {
        fontWeight: '600',
        color: color.normal,
        fontSize: 18,
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
        fontSize: 18,
        lineHeight: 24,
        color: 'white',
    },
    ribbonCountText: {
        ...baseText,
        fontSize: 18,
        lineHeight: 24,
        color: color.ribbon,
    },
} as {
    [key: string]: StyleProp<TextStyle>
}
