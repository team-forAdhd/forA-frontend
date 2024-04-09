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
    },
    title: {
        position: 'absolute',
        width: '100%',
        top: 127,
        left: 16,
        flexDirection: 'column',
    },
    contents: {
        flex: 1,
        position: 'absolute',
        top: 242,
        left: 16,
        right: 16,
        alignItems: 'center',
        // backgroundColor: 'red',
    },
    inputContainer: {
        width: '100%',
        height: 85,
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginBottom: -11,
    },
    inputDescriptionContainer: {
        width: '100%',
        height: 85,
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginBottom: 12,
    },
    inputRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    inputWrapper: {
        flex: 1,
        marginHorizontal: 5,
    },
    icon: {
        position: 'absolute',
        width: 20,
        height: 20,
        top: 29,
        right:8,
    },
    inputBar: {
        width: '100%',
        height: 1,
        borderBottomWidth: 1,
        borderBottomColor: '#949494',
        flexShrink: 0,
        marginBottom: 12,
    },
    inputUserBar: {
        width: '100%',
        height: 1,
        borderBottomWidth: 1,
        borderBottomColor: '#52A55D',
        flexShrink: 0,
        marginBottom: 12,
    },
    emailInputBar: {
        width: '70%',
        height: 1,
        borderBottomWidth: 1,
        borderBottomColor: '#949494',
        flexShrink: 0,
        marginBottom: 12,
    },
    emailInputValidBar: {
        width: '70%',
        height: 1,
        borderBottomWidth: 1,
        borderBottomColor: '#52A55D',
        flexShrink: 0,
        marginBottom: 12,
    },
    emailInputInvalidBar: {
        width: '70%',
        height: 1,
        borderBottomWidth: 1,
        borderBottomColor: '#FE4E4E',
        flexShrink: 0,
        marginBottom: 12,
    },
    roundButtonDisabled: {
        position: 'absolute',
        left: 270,
        width: 88,
        height: 40,
        backgroundColor: '#EEE',
        borderRadius: 500,
        alignItems: 'center',
        justifyContent: 'center',
    },
    roundButtonAbled: {
        position: 'absolute',
        right: 1,
        width: 88,
        height: 40,
        backgroundColor: '#52A55D',
        borderRadius: 500,
        alignItems: 'center',
        justifyContent: 'center',
    },
    authUnderDescription: {
        flexDirection: 'row',
        marginTop: 27,
    },
    timer: {
        position: 'absolute',
        left: 320
    },
    authFailed: {
        position: 'absolute',
        top: 75
    },
    photoContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 15,
    },
    photoPlaceholder: {
        width: 145,
        height: 145,
        bottom: 13,
    },
    photoUploadButton: {
        display: 'flex',
        width: 100,
        height: 27,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 1,
        flexShrink: 0,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#52A55D',
        backgroundColor: 'var(--Background, #FFF)',
    },
    photoButtonContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },    
    buttonContainer: {
        position: 'absolute',
        width: '100%',
        height: 60,
        bottom: 34,
    },
    nextButton: {
        position: 'absolute',
        width: '100%',
        height: 60,
        backgroundColor: '#EEE',
        alignItems: 'center',
        justifyContent: 'center',
    },
    surveyContents: {
        position: 'absolute',
        top: 180,
        alignItems: 'center',
        justifyContent: 'center',
    },
    surveyContainer: {
        width: 382,
        height: 155,
        marginBottom: 25,
    },
    surveyButton: {
        width: 382,
        height: 130,
        flexShrink: 0,
    },
    JoinDone: {
        flex: 1,
        backgroundColor: '#F4F9D9',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    JoinDoneContents: {
        position: 'absolute',
        top: 267,
        left: 100,
        alignItems: 'center',
    }
})

export const text = {
    fontFamily: 'Pretendard',
    fontStyle: 'normal',
    titleText: {
        color: '#000',
        fontSize: 24,
        fontWeight: '600',
        flexGrow: 1,
        marginBottom: 20,
    },
    descriptionText: {
        color: '#000',
        fontSize: 20,
        fontWeight: '400',
        lineHeight: 20.4,
        letterSpacing: -1,
    },
    inputTitleText: {
        color: '#949494',
        fontSize: 12,
        fontWeight: '400',
        lineHeight: 16.8,
        letterSpacing: -0.6,
    },
    inputText: {
        color: '#949494',
        fontSize: 16,
        fontWeight: '400',
        lineHeight: 19.6,
        letterSpacing: -0.8,
        marginTop: 12,
        marginBottom: 12,
    },
    inputUserText: {
        color: '#000',
        fontSize: 16,
        fontWeight: '400',
        lineHeight: 19.6,
        letterSpacing: -0.8,
        marginTop: 12,
        marginBottom: 12,
    },
    failedText: {
        color: '#FE4E4E',
        fontSize: 12,
        fontWeight: '400',
        lineHeight: 16.8,
        letterSpacing: -0.6,
        marginTop: -5,
    },
    succeedText: {
        color: '#52A55D',
        fontSize:12,
        fontWeight: '400',
        lineHeight: 16.8,
        letterSpacing: -0.6,
        marginTop: -5,
    },
    underBarText : {
        color: '#232323',
        fontSize:12,
        fontWeight: '400',
        lineHeight: 16.8,
        letterSpacing: -0.6,
    },
    roundButtonDisabledText: {
        color: '#232323',
        textAlign: 'center',
        fontSize: 14,
        fontWeight: '400',
        lineHeight: 19.6,
        letterSpacing: -0.7,
    },
    roundButtonAbledText: {
        color: '#FFF',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '600',
        lineHeight: 22.4,
        letterSpacing: -0.8,
    },
    buttonText: {
        color: '#232323',
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '600',
        lineHeight: 22.4,
    },
    authrDescriptionText: {
        color: '#232323',
        fontSize: 12,
        fontWeight: '400',
        lineHeight: 16.8,
        letterSpacing: -0.6,
    },
    timerText: {
        color: '#52A55D',
        fontSize: 16,
        fontWeight: '400',
        lineHeight: 19.6,
        letterSpacing: -0.8,
        marginTop: 12,
    },
    authAgainText: {
        color: '#52A55D',
        fontSize: 12,
        fontWeight: '400',
        lineHeight: 16.8,
        textDecorationLine: 'underline',
        marginLeft: 12,
    },
    photoButtonText: {
        color: '#52A55D',
        fontSize: 12,
        fontWeight: '500',
        lineHeight: 16.8,
        letterSpacing: -0.8,
        left: 1,
    },
    lastText: {
        color: '#555',
        fontSize: 14,
        fontWeight: '400',
        lineHeight: 20.4,
        letterSpacing: -0.7,
    },
    joinDoneText: {
        color: '#000',
        fontSize: 24,
        fontWeight: '600',
        flexGrow: 1,
        marginBottom: 40,
    },
    enjoyText: {
        color: '#555',
        fontSize: 16,
        fontWeight: '400',
        lineHeight: 19.6,
        letterSpacing: -0.8,
        textAlign: 'center'

    },
} as {
    [key: string]: StyleProp<TextStyle>
};

