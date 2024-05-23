import { StyleProp, StyleSheet, TextStyle } from 'react-native'

export const styles = StyleSheet.create({
    chapterContainer: {
        marginTop: 20,
    },
    articleTitleContainer: {
        marginTop: 40,
    },
    articleContentContainer: {
        marginTop: 30,
    },
})

const baseText = {
    fontFamily: 'Pretendard',
    fontStyle: 'normal',
    fontWeight: '400',
}

export const text = {
    chapterText: {
        fontWeight: 'bold',
        color: '#232323',
        fontSize: 20,
    },
    articleTitleText: {
        fontWeight: '500',
        color: '#232323',
        fontSize: 18,
        lineHeight: 28,
        letterSpacing: -1,
    },
    articleContentText: {
        ...baseText,
        color: '#555555',
        fontSize: 14,
        lineHeight: 24,
        letterSpacing: -0.85,
    },
    articleSubTitleText: {
        fontWeight: '500',
        color: '#232323',
        fontSize: 16,
        lineHeight: 24,
        letterSpacing: -0.85,
    },
} as {
    [key: string]: StyleProp<TextStyle>
}
