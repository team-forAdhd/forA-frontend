// MedSelectModalStyle.ts
import { StyleProp, StyleSheet, TextStyle } from 'react-native'

export const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // 반투명 배경
    },
    container: {
        backgroundColor: 'white',
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    optionContainer: {
        left: 8,
        paddingVertical: 15,
        flexDirection: 'row',
        // borderBottomWidth: 1,
        // borderBottomColor: '#eee',
    },
    titleContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        paddingHorizontal: 16,
        width: '100%',
        height: 25,
    },
    topLine: {
        marginTop: 12,
        width: 80,
        height: 4,
        borderRadius: 500,
        left: 10,
        marginBottom: 12,
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
        left: 250,
    },
    flatList: {
        marginTop: 10,
    }
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
        fontWeight: '600',
        color: '#232323',
        fontSize: 18,
        lineHeight: 22.4,
        right: -8,
    },
    commonText: {
        ...baseText,
        fontSize: 18,
        lineHeight: 22.4,
        letterSpacing: -0.9,
        color: '#232323',
    },
    checkText: {
        fontWeight: '600',
        color: '#52A55D',
        fontSize: 18,
        lineHeight: 24,
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