import { StyleProp, StyleSheet, TextStyle } from 'react-native';

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
        top: 65,
        width: '100%',
        height: 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        zIndex: 2,
    },
    IconImage: {
        width: 35,
        height: 35,
        objectFit: 'contain',
    },
    postContainer: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    postInfo: {
        flex: 1,
        marginBottom: 60,
    },
    postTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 5,
    },
    metaContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    category: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#4CAF50',
        marginRight: 10,
    },
    metaText: {
        fontSize: 14,
        color: '#777',
        marginRight: 10,
    },
    timeText: {
        fontSize: 12,
        color: '#999',
    },
    postImage: {
        width: 60,
        height: 60,
        borderRadius: 5,
        marginLeft: 10,
    },
    emailContainer: {
        marginBottom: -40,
    },
    emailText: {
        fontSize: 14,
        color: '#777',
        marginTop: -50,
    },
    modalContainer: {
        alignItems: 'center',
        marginTop: 300,
        backgroundColor: 'white',
        padding: 30,
        width: 250,
        left: 70,
    },
    modalContent: {
        padding: 5,
    },
    modalTitle: {
        marginBottom: 30,
    },
    modalOption: {
        marginBottom: 20,
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
        fontSize: 20,
        letterSpacing: -1,
    },
    noDataText: {
        top: 400,
        textAlign: 'center',
    },
} as {
    [key: string]: StyleProp<TextStyle>;
};
