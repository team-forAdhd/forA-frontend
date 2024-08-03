import { StyleProp, StyleSheet, TextStyle } from 'react-native'

export const styles = StyleSheet.create({
    wrapper: {},
    slide: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff',
    },
    dot: {
        backgroundColor: 'transparent',
        borderColor:'#52A55D',
        borderWidth: 1,
        width: 9,
        height: 9,
        borderRadius: 5,
    },
    activeDot: {
        backgroundColor: '#52A55D',
        width: 9,
        height: 9,
        borderRadius: 5,
    },
    textBox: {
        position: 'absolute',
        textAlign: 'left',
        top: 99,
        left: 31,
    },
    image: {
        position: 'absolute',
        top: 150,
        width: '100%',
        height: '80%',
    },
    button: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        bottom: -395,
        left: -170,
        width: '88%',
        height: 48,
        borderRadius: 56,
        backgroundColor: '#52A55D',
    },
})

export const text = {
    fontFamily: 'Pretendard',
    fontStyle: 'normal',
    titleText: {
        color: '#000',
        fontSize: 24,
        fontWeight: '700',
        lineHeight: 34,
        letterSpacing: -1.2,
    },
    highlightText: {
        color: '#52A55D',
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '600',
        lineHeight: 24,
    },
} as {
    [key: string]: StyleProp<TextStyle>
};