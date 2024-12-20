import { StyleProp, StyleSheet, TextStyle } from 'react-native'

export const styles = StyleSheet.create({
    centeredView: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
        width: '100%',
        height: '100%',
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    ModalContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
        width: 364,
        height: 229,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 12,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        flexDirection: 'column',
        flex: 1,
    },
    buttonGroup: {
        flexDirection: 'row',
        height: 56,
        flex: 1,
    },
    yesButton: {
        backgroundColor: '#EEEEEE',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomLeftRadius: 12,
    },
    noButton: {
        backgroundColor: '#52A55D',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomRightRadius: 12,
    },
    questionContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: 143,
        paddingVertical: 20,
    },
})

const baseText = {
    fontFamily: 'Pretendard',
    fontStyle: 'normal',
    fontWeight: '400',
}

export const text = {
    yestextStyle: {
        color: '#232323',
        fontWeight: '700',
        textAlign: 'center',
    },
    notextStyle: {
        color: 'white',
        fontWeight: '700',
        textAlign: 'center',
    },
    modalText: {
        color: '#232323',
        fontSize: 18,
        fontWeight: '700',
        letterSpacing: -0.5,
        alignItems: 'center',
        textAlign: 'center',
        marginHorizontal: 20,
    },
    questionText: {
        color: '#232323',
        fontSize: 14,
        letterSpacing: -0.5,
        alignItems: 'center',
        textAlign: 'center',
        marginHorizontal: 20,
        marginTop: 13,
    },
} as {
    [key: string]: StyleProp<TextStyle>
}
