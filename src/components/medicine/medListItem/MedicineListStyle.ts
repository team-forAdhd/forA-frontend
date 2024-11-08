import { StyleProp, StyleSheet, TextStyle } from 'react-native'

export const styles = StyleSheet.create({
    itemContainer: {
        backgroundColor: 'white',
        borderWidth: 20,
        borderColor: 'white',
        borderRadius: 20,
        width: '92%',
        height: 100,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignSelf: 'center',
        alignItems: 'center',
        paddingHorizontal: 9,
        paddingVertical: 10,
        paddingLeft: 12,
        paddingRight: 16.091,
        gap: 10,
        zIndex: 1,
        marginBottom: 10,
    },
    itemTextContainer: {
        height: '80%',
        justifyContent: 'space-between',
        top: -24,
        left: -15,
    },
    itemImage: {
        width: 126,
        height: 70,
        borderRadius: 12,
        left: -20,
    },
    bookmark: {
        width:  30,
        height: 35.97,
    }
})

export const text = {
    fontFamily: 'Pretendard',
    fontStyle: 'normal',
    nameText: {
        color: '#232323',
        fontSize: 18,
        fontWeight: '600',
        lineHeight: 22.4,
        marginBottom: -5,
    },
    enNameText: {
        color: '#52A55D',
        fontSize: 12,
        fontWeight: '700',
        lineHeight: 30.6,
        marginBottom: 2,
    },
    companyText: {
        color: '#949494',
        fontSize: 12,
        fontWeight: '500',
        lineHeight: 30.6,
        letterSpacing: -0.6,
        top: -10,
    },
} as {
    [key: string]: StyleProp<TextStyle>
}
