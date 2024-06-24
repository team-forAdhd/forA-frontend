import { StyleProp, StyleSheet, TextStyle } from 'react-native'

const color = {
    primary: '#52A35D',
    inactive: '##949494',
    ribbon: '#FF5D5D',
    normal: '#232323',
}
export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    header: {
        position: 'absolute',
        top: 52,
        width: '100%',
        height: 36,
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingRight: 16,
        paddingLeft: 16,
        zIndex: 2, //ZIndex를 조정해서 터치 이벤트 문제 해소 , 캐러셀 컴포넌트가 터치이벤트를 가로채서 헤더에 있는 아이콘의 터치가 안먹고 있었음
    },
    topButtonContainer: {
        position: 'absolute',
        top: 106,
        marginHorizontal: 16,
    },
    activeContainer: {
        flex: 1,
        width: 139,
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        borderBottomColor: color.primary,
    },
    inactiveContainer: {
        flex: 1,
        width: 139,
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        borderBottomColor: color.inactive,
    },
    flex: {
        flexDirection: 'row',
        flex: 1,
    },
    ribbonImage: {
        width: 14,
        height: 11,
        objectFit: 'contain',
    },
    columnContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    distanceContainer: {
        borderRadius: 500,
        borderWidth: 0.5,
        borderColor: color.normal,
        paddingHorizontal: 7,
        marginHorizontal: 10,
    },
    smallImage: {
        width: 23,
        height: 23,
        objectFit: 'contain',
    },
    doctorImage: {
        width: 54,
        height: 54,
        objectFit: 'contain',
        borderRadius: 500,
    },
    IconImage: {
        width: 35,
        height: 35,
        objectFit: 'contain',
        marginLeft: 12,
    },
    RefreshImage: {
        width: 23,
        height: 23,
        objectFit: 'contain',
        marginLeft: 8,
    },
    rankingListContainer: {
        position: 'absolute',
        top: 400,
        width: '100%',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingLeft: 14,
        paddingRight: 14,
    },
    profileContainer: {
        width: 36,
        height: 24,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
        borderColor: color.primary,
        borderWidth: 1,
    },
    clickContainer: {
        flexGrow: 1,
        height: 31,
        backgroundColor: 'white',
        borderColor: '#52A55D',
        borderRadius: 12,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 2,
        marginRight: 2,
    },
    ranking: {
        position: 'absolute',
        top: 447,
        marginLeft: 16,
        marginRight: 16,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
})

const baseText = {
    fontFamily: 'Pretendard',
    fontStyle: 'normal',
    fontWeight: '400',
}

export const text = {
    headerText: {
        color: color.normal,
        fontSize: 18,
        fontWeight: 'bold',
        letterSpacing: -0.7,
        textAlign: 'center',
        alignItems: 'center',
        marginLeft: 130,
        marginTop: 10,
    },
    activeText: {
        fontWeight: '800',
        color: color.inactive,
        fontSize: 18,
        lineHeight: 22.4,
    },
    inactiveText: {
        ...baseText,
        color: color.primary,
        fontSize: 18,
        lineHeight: 22.4,
    },
    ribbonText: {
        ...baseText,
        color: color.ribbon,
        fontSize: 14,
        lineHeight: 19.6,
        letterSpacing: -0.5,
    },
    hospitalText: {
        fontWeight: '800',
        fontSize: 20,
        lineHeight: 28,
        color: color.normal,
    },
    smallBlackText: {
        ...baseText,
        fontSize: 14,
        lineHeight: 19.6,
        letterSpacing: -0.5,
        color: color.normal,
    },
    normalText: {
        ...baseText,
        fontSize: 16,
        lineHeight: 22.4,
        letterSpacing: -0.5,
        color: color.normal,
    },
    semiboldText: {
        fontWeight: '800',
        fontSize: 18,
        color: color.normal,
        lineHeight: 22.4,
    },
    doctorText: {
        fontWeight: '800',
        fontSize: 16,
        color: color.normal,
        lineHeight: 22.4,
    },
    titleText: {
        ...baseText,
        fontSize: 16,
        color: color.normal,
        lineHeight: 22.4,
    },
    profiletitleText: {
        ...baseText,
        fontSize: 16,
        color: color.primary,
        lineHeight: 19.6,
        letterSpacing: -0.5,
    },
    primaryboldText: {
        fontWeight: '800',
        fontSize: 18,
        color: color.primary,
        lineHeight: 22.4,
    },
    clickText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#52A55D',
    },
    rankingText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
} as {
    [key: string]: StyleProp<TextStyle>
}
