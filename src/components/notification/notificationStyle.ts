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
        paddingRight: 16,
        paddingLeft: 16,
        zIndex: 2,
    },
    notificationContainer: {
        backgroundColor: '#EDEDEA',
        flex: 1,
        width: '100%',
        height: '100%',
        marginTop: 110,
        paddingTop: 16,
    },
    noneNotificationContainer: {
        position: 'absolute',
        top: 268,
        left: 115,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bigImage: {
        width: 114,
        height: 114,
        objectFit: 'contain',
        marginBottom: 20,
    },
    IconImage: {
        width: 35,
        height: 35,
        objectFit: 'contain',
        marginLeft: 12,
    },
})

export const text = {
    notificationText: {
        color: '#232323',
        fontSize: 18,
        fontWeight: 'bold',
        letterSpacing: -0.7,
        textAlign: 'center',
        alignItems: 'center',
        marginLeft: 130,
        marginTop: 10,
    },
    baseText: {
        color: '#232323',
        fontSize: 18,
        fontWeight: 'bold',
        letterSpacing: -0.7,
        textAlign: 'center',
    },
} as {
    [key: string]: StyleProp<TextStyle>
}
