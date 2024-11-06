import { StyleProp, StyleSheet, TextStyle } from 'react-native'

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EDEDEA',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    header: {
        position: 'absolute',
        top: 53,
        left: 19,
    },
    searchBarContainer: {
        marginTop: 14,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    searchBar: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#52A55D',
        borderRadius: 50,
        width: '86%',
        height: 48,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: 9,
        marginLeft: -12,
        marginRight: 12,
        zIndex: 2,
    },
    sortOption: {
        position: 'absolute',
        top: -265,
        right: 10,
        justifyContent: 'flex-end',
        flexDirection: 'row',
        alignItems: 'center',
    },
    underArrowImage: {
        width: 24,
        height: 24,
    },
    medList: {
        position: 'absolute',
        top: 200,
        width: '100%',
        height: '65%',
        alignContent: 'center',
    },
    IconImage: {
        width: 28,
        height: 28,
        objectFit: 'contain',
    },
    toggle: {
        alignItems: 'center',
        flexDirection: 'row',
        height: 73,
        paddingLeft: 18,
        borderBottomWidth: 1,
        borderColor: '#BDDDC1',
    },
    toggleInside: {
        borderBottomWidth: 30,
        borderTopWidth: 25,
        borderBottomColor: '#D6D6D3',
        borderTopColor: '#D6D6D3',
        backgroundColor: '#D6D6D3',
    },
    greenUnderIcon: {
        width: 40,
        height: 40,
        position: 'absolute',
        right: 5,
    },
})

export const text = {
    fontFamily: 'Pretendard',
    fontStyle: 'normal',
    titleText: {
        fontSize: 24,
        fontWeight: '700',
        lineHeight: 30.6,
        letterSpacing: -1.2,
        color: '#232323',
    },
    searchBarText: {
        fontSize: 18,
        fontWeight: '400',
        color: '#949494',
        lineHeight: 26,
        letterSpacing: -1.2,
    },
    searchBarResultText: {
        fontSize: 18,
        fontWeight: '400',
        color: '#232323',
        lineHeight: 26,
        letterSpacing: -0.9,
    },
    shapeSearchText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#52A55D',
        lineHeight: 24,
    },
    sortOptionText: {
        fontSize: 14,
        fontWeight: '500',
        lineHeight: 20.6,
    },
    ingredientText: {
        fontSize: 18,
        fontWeight: '700',
        color: '#52A55D',
        lineHeight: 24,
    },
} as {
    [key: string]: StyleProp<TextStyle>
}
