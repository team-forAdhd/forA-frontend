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
        // left : 4,
    },
    title: {
        position: 'absolute',
        width: '100%',
        height: 67,
        top: 157,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    contents: {
        flex: 1,
        width: '92.27%',
        position: 'absolute',
        top: 279,
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
    loginButton: {
        top: 0,
        width: '100%',
        height: 60,
        borderRadius: 56,
        backgroundColor: '#52A55D',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonRow: {
        top: 11,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    joinButton: {
        marginRight: 10,
    },
    bar: {
        width: 1,
        height: 15,
        position: 'absolute',
        left: '27.6%',
        top: 6,
        backgroundColor: '#52A55D',
    },
    passwordButton: {
        marginLeft: 10,
    },
    social : {
        position: 'absolute',
        width: '100%',
        top: 600,
        alignItems: 'center',
        justifyContent: 'center',
    },
    socialRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    socialBar: {
        width: 113,
        height: 1,
        backgroundColor: '#B1B1B1',
        marginHorizontal: 9,
    },
    iconRow: {
        flexDirection: 'row',
        marginTop: 15,
    },
    icon: {
        marginHorizontal: 7,
        width: 40,
        height: 40,
        flexShrink: 0,
    },
})

export const text = {
    fontFamily: 'Pretendard',
    fontStyle: 'normal',
    titleText: {
        color: '#52A55D',
        fontFamily: 'Pretendard',
        fontSize: 18,
        fontStyle: 'normal',
        fontWeight: '400',
        lineHeight: 20.4,
        letterSpacing: -1,
        flexGrow: 1,
        textAlign: 'center',
        marginBottom: 23,
    },
    inputTitleText: {
        color: '#707070',
        fontFamily: 'Pretendard',
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: '400',
        lineHeight: 19.6,
        letterSpacing: -0.7,
    },
    inputText: {
        color: '#B1B1B1',
        fontFamily: 'Pretendard',
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: '400',
        lineHeight: 19.6,
        letterSpacing: -0.8,
        marginTop: 12,
        marginBottom: 12,
    },
    buttonText: {
        color: '#FFF',
        textAlign: 'center',
        fontFamily: 'Pretendard',
        fontSize: 18,
        fontStyle: 'normal',
        fontWeight: '600',
        lineHeight: 27.2,
    },
    bottomText: {
        color: '#52A55D',
        textAlign: 'center',
        fontFamily: 'Pretendard',
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: '400',
        lineHeight: 27.2,
    },
    socialText: {
        color: '#707070',
        textAlign: 'center',
        fontFamily: 'Pretendard',
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: '400',
        lineHeight: 20.4,
    },
} as {
    [key: string]: StyleProp<TextStyle>
};

