import { StyleProp, StyleSheet, TextStyle } from 'react-native'

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
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
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingTop: 9,
        zIndex: 2,
    },
    searchBar: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#52A55D',
        borderRadius: 50,
        width: 336,
        height: 48,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 9,
        zIndex: 2,
    },
    InputStyles: {
        width: 250,
    },
    searchBeforeContainer: {
        position: 'absolute',
        top: 133,
    },
    searchContainer: {
        position: 'absolute',
        top: 133,
        backgroundColor: '#EDEDEA',
        flex: 1,
        width: '100%',
        height: '100%',
        marginTop: 110,
        paddingTop: 16,
    },
    noneSearchContainer: {
        position: 'absolute',
        top: 133,
        backgroundColor: '#EDEDEA',
        width: '100%',
        height: 763,
        paddingTop: 180,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    searchHistory: {
        flexDirection: 'row',
        paddingHorizontal: 16,
        marginTop: 24,
    },
    recentSearchTermContainer: {
        width: '100%',
        height: 42,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
    },
    searchHistiryCancel: {
        width: 26,
        height: 26,
    },
    recentSearchContainer: {
        //최근 검색어와 모두 지우기를 담고 있는 컨테이너
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        width: '100%', //너비 지정을 안해주면 space-between이 안먹었음
    },
    deleteAllContainer: {
        borderBottomColor: '#949494',
        borderBottomWidth: 0.8,
    },
    bigImage: {
        width: 114,
        height: 114,
        objectFit: 'contain',
        marginBottom: 20,
    },
    IconImage: {
        width: 28,
        height: 28,
        objectFit: 'contain',
    },
})

const baseText = {
    fontFamily: 'Pretendard',
    fontStyle: 'normal',
    fontWeight: '400',
}

export const text = {
    recentSearchText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#232323',
    },
    recentSearchValue: {
        ...baseText,
        fontSize: 16,
    },
    deleteText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#52A55D',
        letterSpacing: -1,
    },
    baseText: {
        color: '#232323',
        fontSize: 18,
        fontWeight: '600',
        letterSpacing: -0.7,
        textAlign: 'center',
    },
    deleteAllText: {
        ...baseText,
        color: '#949494',
        fontSize: 16,
        letterSpacing: -1,
    },
} as {
    [key: string]: StyleProp<TextStyle>
}
