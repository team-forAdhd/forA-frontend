import { StyleProp, StyleSheet, TextStyle } from 'react-native'

export const styles = StyleSheet.create({
    modalContainer: {
        width: 364,
        height: 57,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF',
        borderRadius: 12,
      },
})


export const text = {
    fontFamily: 'Pretendard',
    fontStyle: 'normal',
    fontWeight: '600',
    generalText: {
        fontSize: 18,
        lineHeight: 24,
        color: '#232323',
    },
    highlightText: {
        fontSize: 18,
        lineHeight: 24,
        color: '#52A55D',
    },
} as {
    [key: string]: StyleProp<TextStyle>
}