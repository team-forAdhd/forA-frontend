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
        top: 52,
        width: '100%',
        height: 36,
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingRight: 16,
        paddingLeft: 16,
        zIndex: 2, //ZIndex를 조정해서 터치 이벤트 문제 해소 , 캐러셀 컴포넌트가 터치이벤트를 가로채서 헤더에 있는 아이콘의 터치가 안먹고 있었음
    },
    Flex: {
        flex: 1,
        width: 'auto',
        height: 40,
        justifyContent: 'flex-end',
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 8,
    },
    ForAImage: {
        width: 87.4,
        height: 32,
        objectFit: 'contain',
        marginTop: 8,
    },
    IconImage: {
        width: 35,
        height: 35,
        objectFit: 'contain',
        marginLeft: 12,
    },
    RefreshImage: {
        width: 23,
        height: 23,
        objectFit: 'contain',
        marginLeft: 8,
    },
    rankingListContainer: {
        position: 'absolute',
        top: 400,
        width: '100%',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingLeft: 14,
        paddingRight: 14,
    },
    baseContainer: {
        flexGrow: 1,
        height: 31,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#EDEDEA',
        borderRadius: 12,
        marginLeft: 2,
        marginRight: 2,
    },
    clickContainer: {
        flexGrow: 1,
        height: 31,
        backgroundColor: 'white',
        borderColor: '#52A55D',
        borderRadius: 12,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 2,
        marginRight: 2,
    },
    ranking: {
        position: 'absolute',
        top: 447,
        marginLeft: 16,
        marginRight: 16,
        flexDirection: 'row',
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
    tabBarText: {
        ...baseText,
        color: '#232323',
        fontSize: 16,
        letterSpacing: -1,
        flexGrow: 1,
        marginBottom: 23,
    },
    baseText: {
        ...baseText,
        color: '#232323',
        fontSize: 18,
        letterSpacing: -0.7,
    },
    clickText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#52A55D',
    },
    rankingText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
} as {
    [key: string]: StyleProp<TextStyle>
}
