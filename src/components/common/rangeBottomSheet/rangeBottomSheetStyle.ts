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
    topLine: {
        position: 'absolute',
        top: 16,
        left: 167,
        justifyContent: 'center',
        width: 80,
        height: 4,
        borderRadius: 500,
    },
    titleContainer: {
        position: 'absolute',
        top: 20,
        justifyContent: 'center',
        flexDirection: 'row',
        paddingHorizontal: 16,
        width: '100%',
        height: 25,
        marginTop: 20,
    },
    rangeInnerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 32,
        paddingVertical: 22,
    },
    checkIcon: {
        width: 24,
        height: 24,
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
        fontWeight: 'bold',
        color: '#232323',
        fontSize: 18,
        lineHeight: 28,
        letterSpacing: -1,
    },
    commonText: {
        ...baseText,
        fontSize: 18,
        lineHeight: 22.4,
        letterSpacing: -0.7,
    },
    checkText: {
        fontWeight: '700',
        color: '#52A55D',
        fontSize: 18,
        lineHeight: 22.4,
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
    businessInfoText: {
        ...baseText,
        color: '#949494',
        textAlign: 'center',
    },
} as {
    [key: string]: StyleProp<TextStyle>
}
