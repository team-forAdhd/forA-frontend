import { StyleProp, StyleSheet, TextStyle } from 'react-native'

export const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingHorizontal: 16,
        height: 25,
        marginTop: 20,
    },
    agreeContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    agreeImage: {
        width: 25,
        height: 25,
        marginRight: 14,
    },
})

// 공통 스타일 정의
const baseText = {
    fontFamily: 'Pretendard',
    fontStyle: 'normal',
    fontWeight: '400',
}

// 공통 스타일을 확장하여 개별 스타일 정의
export const text = {
    titleText: {
        ...baseText,
        color: 'black',
        fontSize: 20,
        lineHeight: 28,
        letterSpacing: -1,
    },
    agreeText: {
        ...baseText,
        fontSize: 16,
        lineHeight: 19.6,
        letterSpacing: -0.7,
    },
    essentialText: {
        ...baseText,

        fontSize: 16,
        lineHeight: 19.6,
        letterSpacing: -0.7,
    },
    viewContentText: {
        ...baseText,
        color: '#52A55D',
        fontSize: 14,
        lineHeight: 19.6,
        letterSpacing: -0.7,
        textDecorationLine: 'underline',
    },
} as {
    [key: string]: StyleProp<TextStyle>
}
