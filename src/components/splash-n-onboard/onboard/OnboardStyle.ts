import { StyleProp, StyleSheet, TextStyle } from 'react-native'

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    header: {
        position: 'absolute',
        width: '100%',
        height: 36,
        flexShrink: 0,
        top: 52,
        // left : 4,
    },
    title: {
        position: 'absolute',
        width: '100%',
        height: 67,
        top: 157,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    contents: {
        flex: 1,
        width: '92.27%',
        position: 'absolute',
        top: 279,
        left: 16,
        alignItems: 'center',
    },
    indicatorContainer: {

    },
    startButton: {
        top: 0,
        width: '100%',
        height: 60,
        borderRadius: 56,
        backgroundColor: '#52A55D',
        justifyContent: 'center',
        alignItems: 'center',
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
    buttonText: {
        color: '#FFF',
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '600',
        lineHeight: 24,
    },
} as {
    [key: string]: StyleProp<TextStyle>
};

