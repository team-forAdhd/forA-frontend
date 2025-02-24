import { StyleProp, StyleSheet, TextStyle } from 'react-native';

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
};

export const styles = StyleSheet.create({
    background: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(108, 108, 108, 0.9)',
    },
    flex: {
        width: '100%',
        justifyContent: 'center',
    },
    container: {
        width: 382,
        height: 586,
        borderRadius: 12,
        backgroundColor: 'white',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 33,
        paddingHorizontal: 20,
    },
    IconImage: {
        width: 45,
        height: 35,
    },
    buttonContainer: {
        backgroundColor: color.ribbon,
        justifyContent: 'center',
        alignItems: 'center',
        width: 382,
        borderBottomRightRadius: 12,
        borderBottomLeftRadius: 12,
        height: 56,
    },
    map: {
        flex: 1,
    },
});

const baseText = {
    fontFamily: 'Pretendard',
    fontStyle: 'normal',
    fontWeight: '400',
};

export const text = {
    headerText: {
        color: color.ribbon,
        fontSize: 18,
        fontWeight: 'bold',
        lineHeight: 22.4,
        textAlign: 'center',
    },
    boldText: {
        fontWeight: '700',
        color: color.normal,
        fontSize: 16,
        lineHeight: 22.4,
        letterSpacing: -0.5,
    },
    normalText: {
        ...baseText,
        color: color.normal,
        fontSize: 16,
        lineHeight: 22.4,
        letterSpacing: -0.5,
    },
    buttondText: {
        fontWeight: '700',
        color: 'white',
        fontSize: 18,
        lineHeight: 24,
    },
} as {
    [key: string]: StyleProp<TextStyle>;
};
