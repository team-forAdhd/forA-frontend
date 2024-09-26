import { StyleProp, StyleSheet, TextStyle } from 'react-native'

//자주 반복되는 색 객체로 빼서 사용
const color = {
    primary: '#52A35D',
    inactive: '#949494',
    inactiveBottom: '#EFEFF0',
    ribbon: '#FF5D5D',
    normal: '#232323',
    faintBlack: '#555555',
    backgroundGray: '#EDEDEA',
    faintGray: '#EEEEEE',
}

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        flexDirection: 'column',
        zIndex: 0,
    },
    header: {
        position: 'absolute',
        top: 52,
        width: '100%',
        height: 36,
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
    },
    messageContainer: {
        position: 'absolute',
        top: 120,
        backgroundColor: '#fff',
        width: '100%',
        height: 40,
        marginLeft: 20,
    },
    infoContainer: {
        position: 'absolute',
        top: 160,
        backgroundColor: '#fff',
        width: '100%',
        height: 40,
        flexDirection: 'row',
        marginLeft: 20,
    },
    scrollContainer: {
        position: 'absolute',
        top: 220,
        height: 500,
        backgroundColor: 'yellow',
        width: '100%',
        marginHorizontal: 20,
    },
    boxContainer: {
        flexDirection: 'row',
        paddingHorizontal: 15,
        marginBottom: 8,
        width: '88%',
        height: 90,
        alignItems: 'center',
        borderStyle: 'solid',
        borderWidth: 1,
        borderRadius: 20,
        shadowColor: color.inactive,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    iconImage: {
        width: 35,
        height: 35,
        objectFit: 'contain',
    },
    doctorImage: {
        width: 54,
        height: 54,
        objectFit: 'contain',
        borderRadius: 500,
    },
    buttonContainer: {
        position: 'absolute',
        width: '100%',
        height: 60,
        bottom: 34,
        justifyContent: 'center',
        alignItems: 'center',
    },
})

const baseText = {
    fontFamily: 'Pretendard',
    fontStyle: 'normal',
    fontWeight: '400',
}

export const text = {
    headerText: {
        color: color.normal,
        fontSize: 22,
        fontWeight: '600',
        letterSpacing: -0.7,
        lineHeight: 22.4,
    },
    normalText: {
        fontSize: 18,
        fontWeight: '500',
        lineHeight: 22.4,
        letterSpacing: -0.5,
        color: color.normal
    },
    boxText: {
        ...baseText,
        fontSize: 18,
        lineHeight: 22.4,
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '600',
        lineHeight: 22.4,
    },
} as {
    [key: string]: StyleProp<TextStyle>
}
