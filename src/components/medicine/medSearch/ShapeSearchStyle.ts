import { StyleProp, StyleSheet, TextStyle } from 'react-native'


export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        top: 52,
        // borderBottomWidth: 1,
        // borderBottomColor: '#ddd',
    },
    backButton: {
        fontSize: 24,
        color: '#000',
    },
    gobackIcon: {
        position: 'absolute',
        left: 10,
        top: 62,
    },
    gobackSize: {
        width: 36,
        height: 36,
    },
    title: {
        flex: 1,
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
    },
    content: {
        top: 60,
        left: 16,
        width: '93%',
    },
    setRow: {
        flexDirection: 'row',
    },
    // icon
    formula1: {
        alignItems: 'center',
        top: 2,
        width: 20,
        height: 21,
        marginRight: 10,
    },
    formula2: {
        alignItems: 'center',
        top: 4,
        width: 33,
        height: 17.5,
        marginRight: 10,
    },
    shape1: {
        alignItems: 'center',
        top: 2,
        width: 20,
        height: 20,
        marginRight: 10,
    },
    shape2: {
        alignItems: 'center',
        top: 2,
        width: 33,
        height: 20.5,
        marginRight: 10,
    },
    roundIcon: {
        width: 20,
        height: 20,
        flexShrink: 0,
        marginRight: 6,
        top: 2,
    },
    toggleContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 16,
    },
    optionGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
    },
    optionButton: {
        width: '33%',
        padding: 10,
        borderWidth: 1,
        borderColor: '#949494',
        alignItems: 'center',
        borderTopWidth: 0,
        borderLeftWidth: 0,
    },
    optionButtonFirstRow: {
        borderTopWidth: 1,
    },
    optionButtonFirstColumn: {
        borderLeftWidth: 1,
    },
    selectedButton: {
        backgroundColor: '#F4F9D9',
        borderColor: '#52A55D',
    },
    searchButton: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: 60,
        backgroundColor: '#52A55D',
        alignItems: 'center',
    },
    disabledSearchButton: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: 60,
        backgroundColor: '#EEEEEE',
        alignItems: 'center',
    },
    underBar: {
        width: '100%',
        height: 1,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        flexShrink: 0,
        marginTop: 12,
        marginBottom: 19,

    },
})

export const text = {
    fontFamily: 'Pretendard',
    fontStyle: 'normal',
    titleText: {
        color: '#000',
        fontSize: 18,
        fontWeight: '600',
        lineHeight: 22.4,
        textAlign: 'center',
        flex: 1,
    },
    sectionTitle: {
        color: '#232323',
        fontSize: 18,
        fontWeight: '600',
        lineHeight: 22.4,
        marginBottom: 22,
    },
    contentText: {
        color: '#555',
        fontSize: 18,
        fontWeight: '400',
        lineHeight: 24,
        letterSpacing: -0.9,
    },
    selectedButtonText: {
        color: '#52A55D',
        fontSize: 18,
        fontWeight: '500',
        lineHeight: 24,
        letterSpacing: -0.9,
        textAlign: 'center',
    },
    searchDisableText: {
        color: '#232323',
        fontSize: 18,
        fontWeight: '600',
        lineHeight: 24,
        textAlign: 'center',
        marginTop: 18,
    },
    searchEnableText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
        lineHeight: 24,
        textAlign: 'center',
        marginTop: 18,
    },
} as {
    [key: string]: StyleProp<TextStyle>
}
