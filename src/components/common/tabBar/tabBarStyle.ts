import { StyleProp, StyleSheet, TextStyle } from 'react-native';

export const styles = StyleSheet.create({
    TabBar: {
        width: '100%',
        height: 100,
        bottom: 0,
        justifyContent: 'space-around',
        flexDirection: 'row',
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        shadowColor: 'f5f5f5', // 그림자 색상 설정
        shadowOffset: { width: 0, height: -2 }, // 그림자 위치를 위쪽으로 설정
        shadowOpacity: 0.45, // 그림자 투명도 설정
        shadowRadius: 3.84, // 그림자의 blur 반경 설정
        zIndex: 30,
    },
    TabBarContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    TabBarImage: {
        position: 'absolute',
        width: 32,
        height: 32,
        objectFit: 'contain',
        top: 12,
        bottom: 5,
    },
    TodayTabImage: {
        position: 'absolute',
        width: 22,
        height: 22,
        objectFit: 'contain',
        top: 16,
        bottom: 5,
    },
});

const baseText = {
    fontFamily: 'Pretendard',
    fontStyle: 'normal',
    fontWeight: '400',
};

export const text = {
    tabBarText: {
        ...baseText,
        position: 'absolute',
        color: '#949494',
        fontSize: 16,
        letterSpacing: -1,
        flexGrow: 1,
        bottom: 35,
    },
    clickTabBarText: {
        position: 'absolute',
        color: '#52A55D',
        fontSize: 16,
        letterSpacing: -1,
        flexGrow: 1,
        bottom: 35,
        fontWeight: '600',
    },
} as {
    [key: string]: StyleProp<TextStyle>;
};
