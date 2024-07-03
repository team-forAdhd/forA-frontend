import { StyleProp, StyleSheet, TextStyle } from 'react-native'

//자주 반복되는 색 객체로 빼서 사용
const color = {
    primary: '#52A35D',
    inactive: '#555555',
    ribbon: '#FF5D5D',
    normal: '#232323',
    active: '#FF5D5D',
    background: '#F4F9D9',
    cancel: '#EEEEEE',
    InactiveBackground: '#949494',
}

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    header: {
        position: 'absolute',
        top: 52,
        width: '100%',
        height: 36,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingBottom: 14,
        borderBottomColor: color.active,
        borderBottomWidth: 2,
    },
    titleContainer: {
        position: 'absolute',
        top: 136,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        width: '100%',
    },
    flex: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        marginHorizontal: 16,
        width: 382,
        height: 70,
        borderRadius: 8,
        borderWidth: 1,
        marginBottom: 8,
    },
    active: {
        borderColor: color.active,
        backgroundColor: color.background,
    },
    inactive: {
        borderColor: color.inactive,
    },
    checkImage: {
        width: 20,
        height: 20,
        objectFit: 'contain',
    },
    checkListContainer: {
        position: 'absolute',
        top: 246,
        width: '100%',
        alignItems: 'center',
    },
    IconImage: {
        width: 24,
        height: 24,
        objectFit: 'contain',
    },
    finishContainer: {
        width: 248,
        height: 60,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cancelContainer: {
        width: 123,
        height: 60,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: color.cancel,
    },
    activeBackground: {
        backgroundColor: color.active,
    },
    inactiveBackground: {
        backgroundColor: color.InactiveBackground,
    },
    ButtonsContainer: {
        backgroundColor: 'white',
        borderTopWidth: 9,
        borderTopColor: color.cancel,
        zIndex: 3,
        paddingHorizontal: 16,
        paddingTop: 20,
        paddingBottom: 34,
        position: 'absolute',
        bottom: 0,
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: '100%',
        height: 111,
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
        fontSize: 18,
        fontWeight: 'bold',
        letterSpacing: -0.7,
        lineHeight: 22.4,
        textAlign: 'center',
    },
    activeText: {
        ...baseText,
        color: color.active,
        fontSize: 18,
        lineHeight: 22.4,
        letterSpacing: -0.5,
        width: 310,
    },
    inactiveText: {
        ...baseText,
        color: color.inactive,
        fontSize: 18,
        lineHeight: 22.4,
        letterSpacing: -0.5,
        width: 310,
    },
    hospitalText: {
        fontWeight: '800',
        fontSize: 20,
        lineHeight: 28,
        color: color.active,
    },
    questionText: {
        fontWeight: '800',
        fontSize: 20,
        lineHeight: 28,
        color: 'black',
    },
    finishText: {
        fontWeight: '700',
        fontSize: 18,
        lineHeight: 24,
        color: 'white',
    },
    cancelText: {
        fontWeight: '700',
        fontSize: 18,
        lineHeight: 24,
        color: color.normal,
    },
} as {
    [key: string]: StyleProp<TextStyle>
}
