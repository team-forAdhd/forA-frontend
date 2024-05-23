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
    contentContainer: {
        position: 'absolute',
        top: 80,
        backgroundColor: 'white',
        justifyContent: 'center',
        paddingHorizontal: 32,
        marginHorizontal: 8,
        width: 398,
    },
    businessInfoContainer: {
        position: 'absolute',
        bottom: 50,
        left: 38,
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
        color: '#52A55D',
        fontSize: 18,
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
    businessInfoText: {
        ...baseText,
        color: '#949494',
        textAlign: 'center',
    },
} as {
    [key: string]: StyleProp<TextStyle>
}
