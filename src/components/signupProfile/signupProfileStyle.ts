import { StyleProp, StyleSheet, TextStyle } from 'react-native'

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
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
    title: {
        position: 'absolute',
        width: '100%',
        height: 67,
        top: 127,
        justifyContent: 'center',
        flexDirection: 'column',
    },
    contents: {
        flex: 1,
        width: '92.27%',
        position: 'absolute',
        top: 315,
        left: 16,
        alignItems: 'center',
    },
    inputContainer: {
        width: '100%',
        height: 148,
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginBottom: 12,
    },
    inputBar: {
        width: '100%',
        height: 1,
        borderBottomWidth: 1,
        borderBottomColor: '#949494',
        flexShrink: 0,
        marginBottom: 12,
    },
    buttonContainer: {
        width: '100%',
        height: 99,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 15,
    },
    nextButton: {
        position: 'absolute',
        top: 300,
        width: '100%',
        height: 60,
        backgroundColor: '#EFEFF0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileImageContainer: {
        position: 'absolute',
        top: 215,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    ProfileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    cameraIcon: {
        position: 'absolute',
        top: 72,
        left: 72,
        width: 28,
        height: 28,
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
        fontSize: 18,
        lineHeight: 20.4,
        letterSpacing: -1,
        flexGrow: 1,
        marginBottom: 23,
        marginLeft: 16,
    },
    inputTitleText: {
        ...baseText,
        color: '#707070',
        fontSize: 14,
        lineHeight: 19.6,
        letterSpacing: -0.7,
    },
    inputText: {
        ...baseText,
        color: '#B1B1B1',
        fontSize: 16,
        lineHeight: 19.6,
        letterSpacing: -0.8,
        marginTop: 12,
        marginBottom: 12,
    },
    buttonText: {
        ...baseText,
        color: 'black',
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '600', //오버라이드
        lineHeight: 27.2,
    },
} as {
    [key: string]: StyleProp<TextStyle>
}
