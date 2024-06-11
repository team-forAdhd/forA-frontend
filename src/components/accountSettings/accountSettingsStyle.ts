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
        top: 57,
        backgroundColor: '#EDEDEA',
        width: '100%',
        height: '100%',
        zIndex: 1,
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
    profileContainer: {
        position: 'absolute',
        backgroundColor: 'white',
        top: 87,
        width: '100%',
        height: 182,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.14,
        shadowRadius: 6.27,
        zIndex: 3,
    },
    clickContainer: {
        width: 70,
        height: 31,
        backgroundColor: '#52A55D',
        borderRadius: 500,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 2,
        marginRight: 2,
    },
    profileItemContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        marginVertical: 6,
    },
    postsContainer: {
        position: 'absolute',
        top: 159,
        width: 'auto',
        height: 'auto',
        flexDirection: 'column',
        marginTop: 8,
    },
    postInnerContainer: {
        backgroundColor: 'white',
        width: 382,
        height: 92,
        marginRight: 16,
        marginLeft: 16,
        borderBottomColor: '#EEEEEE',
        borderBottomWidth: 1,
    },
    IconImage: {
        width: 35,
        height: 35,
        objectFit: 'contain',
    },
    ProfileImageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 80,
        height: 80,
        borderRadius: 500,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.14,
        shadowRadius: 6.27,
    },
    ProfileImage: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
    },
    cameraIcon: {
        width: 26.67,
        height: 26.67,
        zIndex: 3,
    },
    blackZone: {
        position: 'absolute',
        bottom: 0,
        width: 80,
        height: 26,
        borderBottomLeftRadius: 900,
        borderBottomRightRadius: 900,
        backgroundColor: '#232323',
        opacity: 0.7,
        zIndex: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    pencilIcon: {
        width: 20,
        height: 20,
    },
    passwordChangeContainer: {
        position: 'absolute',
        top: 292,
        width: '100%',
        height: 442,
        justifyContent: 'flex-start',
        flexDirection: 'column',
        backgroundColor: 'white',
        zIndex: 3,
        paddingHorizontal: 16,
        borderRadius: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.14,
        shadowRadius: 6.27,
        flex: 1,
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
        height: 44,
    },
    passwordContainer: {
        width: '100%',
        height: 61,
        borderBottomColor: '#555555',
        borderBottomWidth: 1,
        flexDirection: 'column',
        zIndex: 2,
    },
    correctPasswordContainer: {
        width: '100%',
        height: 61,
        borderBottomColor: '#52A55D',
        borderBottomWidth: 1,
        flexDirection: 'column',
        zIndex: 2,
    },
    wrongPasswordContainer: {
        width: '100%',
        height: 61,
        borderBottomColor: '#FE4E4E',
        borderBottomWidth: 1,
        flexDirection: 'column',
        zIndex: 2,
    },
    checkIcon: {
        width: 20,
        height: 20,
        position: 'absolute',
        top: 6,
        right: 0,
    },
    editButton: {
        position: 'absolute',
        bottom: 34,
        width: 382,
        height: 60,
        backgroundColor: '#EEEEEE',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        zIndex: 5,
    },
    activateEditButton: {
        position: 'absolute',
        bottom: 34,
        width: 382,
        height: 60,
        backgroundColor: '#52A55D',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        zIndex: 5,
    },
    bottomContainer: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 50,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        zIndex: 3,
    },
    logOutContainer: {
        borderRightWidth: 1,
        borderRightColor: '#949494',
        height: 23,
    },
})

const baseText = {
    fontFamily: 'Pretendard',
    fontStyle: 'normal',
    fontWeight: '400',
}

export const text = {
    headerText: {
        color: '#232323',
        fontSize: 18,
        fontWeight: 'bold',
        letterSpacing: -0.7,
        textAlign: 'center',
        alignItems: 'center',
        marginLeft: 120,
        marginTop: 10,
    },
    profileTitleText: {
        color: '#232323',
        fontSize: 18,
        fontWeight: '700',
        alignItems: 'center',
        marginBottom: 12,
    },
    profileLabelText: {
        ...baseText,
        color: '#555555',
        fontSize: 16,
        letterSpacing: -0.5,
        alignItems: 'center',
    },
    passwordTitleText: {
        color: '#232323',
        fontSize: 18,
        fontWeight: '800',
        lineHeight: 22.4,
        alignItems: 'center',
        marginBottom: 21,
        marginTop: 27,
    },
    profileNickNameText: {
        ...baseText,
        color: '#232323',
        fontSize: 16,
        letterSpacing: -0.5,
        alignItems: 'center',
        marginHorizontal: 32,
    },
    profileValueText: {
        ...baseText,
        color: '#949494',
        fontSize: 16,
        letterSpacing: -0.5,
        alignItems: 'center',
        marginHorizontal: 16,
    },
    baseText: {
        ...baseText,
        color: '#232323',
        fontSize: 18,
        letterSpacing: -0.7,
    },
    passwordText: {
        ...baseText,
        color: '#555555',
        fontSize: 12,
        letterSpacing: -0.5,
        alignItems: 'center',
        marginTop: 12,
    },
    cautionText: {
        ...baseText,
        color: '#FE4E4E',
        fontSize: 12,
        letterSpacing: -0.5,
        alignItems: 'center',
        lineHeight: 16.8,
    },
    buttonText: {
        color: '#555555',
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '600', //오버라이드
        lineHeight: 27.2,
    },
    activateButtonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '600', //오버라이드
        lineHeight: 27.2,
    },
    logOutText: {
        color: '#FE4E4E',
        fontSize: 16,
        fontWeight: '800',
        letterSpacing: -0.5,
        alignItems: 'center',
        lineHeight: 22.4,
        textDecoration: 'underline',
        paddingRight: 10,
    },
    deleteAccount: {
        ...baseText,
        color: '#949494',
        fontSize: 16,
        letterSpacing: -0.5,
        alignItems: 'center',
        lineHeight: 22.4,
        paddingLeft: 10,
    },
} as {
    [key: string]: StyleProp<TextStyle>
}
