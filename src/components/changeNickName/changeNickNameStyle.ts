import { StyleProp, StyleSheet, TextStyle } from 'react-native'

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    grayContainer: {
        position: 'absolute',
        top: 52,
        backgroundColor: '#EDEDEA',
        width: '100%',
        height: '100%',
        zIndex: 1,
    },
    nickNameContainer: {
        width: '100%',
        height: 85,
        borderBottomColor: '#52A55D',
        borderBottomWidth: 1,
        flexDirection: 'column',
        zIndex: 2,
    },
    header: {
        position: 'absolute',
        backgroundColor: 'white',
        top: 52,
        width: '100%',
        height: 35,
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: 16,
        paddingLeft: 16,
        zIndex: 3,
    },
    mainContainer: {
        width: '100%',
        height: 182,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        zIndex: 3,
    },
    whiteContainer: {
        position: 'absolute',
        top: 87,
        width: '100%',
        height: 198,
        backgroundColor: 'white',
        alignItems: 'flex-start',
        paddingHorizontal: 32,
        zIndex: 2,
    },
    IconImage: {
        width: 35,
        height: 35,
        objectFit: 'contain',
        marginLeft: 12,
    },
    inputContainer: {
        fontFamily: 'Pretendard',
        fontStyle: 'normal',
        color: '#232323',
        fontSize: 16,
        letterSpacing: -0.5,
        borderWidth: 0,
        padding: 10,
        zIndex: 2,
        flex: 1,
    },
    nextButton: {
        position: 'absolute',
        bottom: 34,
        width: '100%',
        height: 60,
        backgroundColor: '#52A55D',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 3,
    },
})

const baseText = {
    fontFamily: 'Pretendard',
    fontStyle: 'normal',
    fontWeight: '400',
}

export const text = {
    nicknameTitleText: {
        color: '#232323',
        fontSize: 18,
        fontWeight: '800',
        lineHeight: 22.4,
        marginBottom: 20,
        margintop: 23,
        width: '100%', //부모 컨테이너에 패딩을 줬는데도 정렬이 안되서
    },
    nicknameText: {
        ...baseText,
        color: '#555555',
        fontSize: 12,
        letterSpacing: -0.5,
        alignItems: 'center',
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
