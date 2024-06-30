import { StyleProp, StyleSheet, TextStyle } from 'react-native'

export const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFA85',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        borderRadius: 20,
        height: 83,
        marginVertical: 4,
        marginHorizontal: 16,
    },
    clickContainer: {
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        height: 83,
        borderRadius: 20,
        marginVertical: 4,
        marginHorizontal: 16,
    },
    contentContainer: {
        flex: 1,
        width: 'auto',
        height: 40,
        justifyContent: 'center',
        alignItems: 'flex-start',
        flexDirection: 'column',
        marginTop: 8,
    },
    IconImage: {
        width: 43,
        height: 43,
        objectFit: 'contain',
        marginRight: 12,
        marginLeft: 16,
    },
})

const baseText = {
    fontFamily: 'Pretendard',
    fontStyle: 'normal',
    fontWeight: '400',
}

export const text = {
    titleText: {
        color: '#232323',
        fontWeight: 'bold',
        fontSize: 16,
        letterSpacing: -1,
        flexGrow: 1,
        marginTop: 20,
    },
    dateText: {
        ...baseText,
        color: '#949494',
        fontSize: 16,
        letterSpacing: -1,
        flexGrow: 1,
        marginBottom: 20,
    },
} as {
    [key: string]: StyleProp<TextStyle>
}
