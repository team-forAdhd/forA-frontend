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
})

const baseText = {
    fontFamily: 'Pretendard',
    fontStyle: 'normal',
    fontWeight: '400',
}

export const text = {
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
    [key: string]: StyleProp<TextStyle>
}
