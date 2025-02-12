import { StyleProp, StyleSheet, TextStyle } from 'react-native'

export const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingHorizontal: 16,
        height: 25,
        marginTop: 20,
    },
    topLine: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: 30,
        borderRadius: 500,
        zIndex: 11,
    },
    listContainer: {
        justifyContent: 'center',
        flexDirection: 'column',
        width: '100%',
        height: '80%',
    },
    contentContainer: {
        position: 'absolute',
        top: 80,
        backgroundColor: 'white',
        justifyContent: 'center',
        paddingHorizontal: 32,
        marginHorizontal: 8,
        width: 398,
    },
    businessInfoContainer: {
        position: 'absolute',
        bottom: 50,
        left: 38,
    },
    rankingListContainer: {
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        paddingVertical: 16,
        paddingLeft: 12,
    },
    baseContainer: {
        height: 33,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#EDEDEA',
        borderRadius: 500,
        marginHorizontal: 4,
        paddingHorizontal: 5,
    },
    clickContainer: {
        height: 33,
        backgroundColor: '#52A55D',
        borderRadius: 500,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 4,
        paddingHorizontal: 5,
    },
    forAClickContainer: {
        height: 33,
        backgroundColor: '#FF5D5D',
        borderRadius: 500,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 4,
        paddingHorizontal: 5,
    },
    ranking: {
        marginLeft: 16,
        marginRight: 16,
        marginBottom: 8,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    postListContainer: {
        paddingHorizontal: 16,
    },
})

// 공통 스타일 정의
const baseText = {
    fontFamily: 'Pretendard',
    fontStyle: 'normal',
    fontWeight: '400',
}

// 공통 스타일을 확장하여 개별 스타일 정의
export const text = {
    titleText: {
        fontWeight: 'bold',
        color: '#52A55D',
        fontSize: 18,
        lineHeight: 28,
        letterSpacing: -1,
    },
    clickText: {
        ...baseText,
        fontSize: 16,
        lineHeight: 19.6,
        letterSpacing: -0.7,
        margin: 5,
        color: 'white',
    },
    basicText: {
        ...baseText,
        fontSize: 16,
        lineHeight: 19.6,
        letterSpacing: -0.7,
        margin: 5,
        color: '#555555',
    },
    viewContentText: {
        ...baseText,
        color: '#52A55D',
        fontSize: 14,
        lineHeight: 19.6,
        letterSpacing: -0.7,
        textDecorationLine: 'underline',
    },
    businessInfoText: {
        ...baseText,
        color: '#949494',
        textAlign: 'center',
    },
} as {
    [key: string]: StyleProp<TextStyle>
}
