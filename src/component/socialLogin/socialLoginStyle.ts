import { StyleProp, StyleSheet, TextStyle } from 'react-native'

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    bottomActivatedContainer: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        zIndex: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        opacity: 10,
        justifyContent: 'center',
        flexDirection: 'column',
    },
    header: {
        position: 'absolute',
        width: '100%',
        height: 36,
        flexShrink: 0,
        top: 52,
        left: 4,
    },
    socialLoginTitle: {
        position: 'absolute',
        top: 121,
        width: 170,
        height: 63.84,
        objectFit: 'contain',
    },
    titleContainer: {
        position: 'absolute',
        top: 208,
        left: 16,
    },
    agreeAllContainer: {
        width: '100%',
        height: 47,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 16,
        paddingBottom: 27,
        borderBottomColor: '#BDDDC1',
        borderBottomWidth: 0.5,
    },
    agreeEachContainer: {
        width: 52,
        height: 20,
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 16,
        marginBottom: 12,
    },
    nextButton: {
        position: 'absolute',
        bottom: 34,
        width: '100%',
        height: 60,
        backgroundColor: '#52A55D',
        justifyContent: 'center',
        alignItems: 'center',
    },
    disabledNextButton: {
        position: 'absolute',
        bottom: 34,
        width: '100%',
        height: 60,
        backgroundColor: '#EFEFF0',
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
    buttonText: {
        ...baseText,
        color: 'white',
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '600', //오버라이드
        lineHeight: 27.2,
    },
} as {
    [key: string]: StyleProp<TextStyle>
}
