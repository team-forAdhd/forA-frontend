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
    overLay: {
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        width: 350,
        height: 'auto',
        borderRadius: 12,
        padding: 25,
        flex: 1,
    },
    flexContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 10,
    },
    contentContainer: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        width: '100%',
    },
    backIcon: {
        width: 28,
        height: 28,
        objectFit: 'contain',
    },
    accountContainer: {
        backgroundColor: 'rgba(82, 165, 93, 0.2)',
        borderColor: 'rgba(82, 165, 93, 0.5)',
        borderWidth: 1,
        borderRadius: 8,
        width: 326,
        height: 76,
        paddingHorizontal: 15,
        marginTop: 22,
    },
    accountFlex: {
        alignItems: 'flex-start',
        width: '100%',
        height: '100%',
    },
});

// 공통 스타일 정의
const baseText = {
    fontFamily: 'Pretendard',
    fontStyle: 'normal',
    fontWeight: '400',
};

// 공통 스타일을 확장하여 개별 스타일 정의
export const text = {
    titleText: {
        fontWeight: '800',
        color: color.primary,
        fontSize: 18,
        lineHeight: 22.4,
    },
    borderText: {
        fontWeight: 'bold',
        fontSize: 16,
        lineHeight: 19.6,
        letterSpacing: -0.5,
        color: color.normal,
        marginTop: 13,
        marginBottom: 7,
    },
    basicText: {
        ...baseText,
        fontSize: 16,
        lineHeight: 26,
        letterSpacing: -0.5,
        color: color.normal,
        marginBottom: 2,
    },
} as {
    [key: string]: StyleProp<TextStyle>;
};
