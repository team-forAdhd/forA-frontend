import { StyleProp, StyleSheet, TextStyle } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    bottomActivatedContainer: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        zIndex: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        opacity: 10,
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
        zIndex: 2,
    },
    topContainer: {
        position: 'absolute',
        top: 110,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    boardListContainer: {
        width: 304,
        flexDirection: 'row',
        paddingLeft: '3%',
        paddingRight: 14,
    },
    baseContainer: {
        width: 70,
        height: 33,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#EEEEEE',
        borderRadius: 500,
        marginLeft: 2,
        marginRight: 2,
    },
    clickContainer: {
        width: 70,
        height: 31,
        backgroundColor: '#52A55D',
        borderRadius: 500,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 2,
        marginRight: 2,
    },
    rangeContainer: {
        width: 85,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginRight: 10,
    },
    postsContainer: {
        position: 'absolute',
        top: 159,
        width: '100%',
        alignItems: 'center',
        height: 'auto',
        flexDirection: 'column',
        marginTop: 8,
    },
    postInnerContainer: {
        backgroundColor: 'white',
        width: '100%',
        height: 92,
        paddingHorizontal: '3.86%',
        borderBottomColor: '#EEEEEE',
        borderBottomWidth: 1,
    },
    IconImage: {
        width: 35,
        height: 35,
        objectFit: 'contain',
    },
    underIcon: {
        width: 28,
        height: 28,
    },
    emptyContainer: {
        position: 'absolute',
        top: 159,
        backgroundColor: '#EDEDEA',
        width: '100%',
        height: 800,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyIcon: {
        width: 37.09,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 18,
    },
});

const baseText = {
    fontFamily: 'Pretendard',
    fontStyle: 'normal',
    fontWeight: '400',
};

export const text = {
    headerText: {
        color: '#232323',
        fontSize: 18,
        fontWeight: 'bold',
        letterSpacing: -0.7,
        textAlign: 'center',
        alignItems: 'center',
        marginTop: 10,
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
        color: 'white',
    },
    rangeText: {
        ...baseText,
        fontSize: 16,
        letterSpacing: -0.5,
    },
    emptyText: {
        ...baseText,
        color: '#555555',
        fontSize: 18,
        textAlign: 'center',
    },
} as {
    [key: string]: StyleProp<TextStyle>;
};
