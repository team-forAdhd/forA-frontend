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
        justifyContent: 'space-between',
        flexDirection: 'row',
        top: 52,
        paddingRight: 16,
        paddingLeft: 16,
    },
    ForAImage: {
        width: 87.4,
        height: 32,
        objectFit: 'contain',
        marginTop: 8,
    },
    input: {
        width: 200,
        height: 40,
        borderColor: 'transparent',
        borderWidth: 0,
        paddingLeft: 10,
        backgroundColor: 'transparent',
    },
    IconImage: {
        width: 24,
        height: 24,
        objectFit: 'contain',
        marginLeft: 17,
    },
    TabBar: {
        position: 'absolute',
        width: '100%',
        height: 100,
        bottom: 0,
        justifyContent: 'space-around',
        flexDirection: 'row',
        backgroundColor: 'white',
        borderTopLeftRadius: 20, // 왼쪽 위 모서리에만 border-radius 적용
        borderTopRightRadius: 20, // 오른쪽 위 모서리에만 border-radius 적용
        shadowColor: 'f5f5f5', // 그림자 색상 설정
        shadowOffset: { width: 0, height: -2 }, // 그림자 위치를 위쪽으로 설정
        shadowOpacity: 0.25, // 그림자 투명도 설정
        shadowRadius: 3.84, // 그림자의 blur 반경 설정
    },
    TabBarContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    TabBarImage: {
        width: 32,
        height: 32,
        objectFit: 'contain',
        marginTop: 12,
        marginBottom: 5,
    },
    rankingListContainer: {
        position: 'absolute',
        top: 100,
        width: '100%',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingLeft: 16,
        paddingRight: 16,
        marginTop: 16,
        marginBottom: 16,
    },
    baseContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    clickContainer: {
        borderBottomColor: 'black',
        borderBottomWidth: 4,
    },
    ranking: {
        position: 'absolute',
        top: 156,
        paddingLeft: 16,
        paddingRight: 16,
    },
})

const baseText = {
    fontFamily: 'Pretendard',
    fontStyle: 'normal',
    fontWeight: '400',
}

export const text = {
    tabBarText: {
        ...baseText,
        color: 'black',
        fontSize: 16,
        letterSpacing: -1,
        flexGrow: 1,
        marginBottom: 23,
    },
    rankingText: {
        ...baseText,
        color: 'black',
        fontSize: 16,
        letterSpacing: -0.7,
    },
    clickText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    inputText: {
        ...baseText,
        color: '#B1B1B1',
        fontSize: 16,
        lineHeight: 19.6,
        letterSpacing: -0.8,
        marginTop: 12,
        marginBottom: 12,
    },
} as {
    [key: string]: StyleProp<TextStyle>
}
