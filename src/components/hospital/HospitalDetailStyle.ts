import { StyleProp, StyleSheet, TextStyle } from 'react-native'

//자주 반복되는 색 객체로 빼서 사용
const color = {
    primary: '#52A35D',
    inactive: '#949494',
    inactiveBottom: '#EFEFF0',
    ribbon: '#FF5D5D',
    normal: '#232323',
    faintBlack: '#555555',
    backgroundGray: '#EDEDEA',
    faintGray: '#EEEEEE',
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
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        zIndex: 2, //ZIndex를 조정해서 터치 이벤트 문제 해소 , 캐러셀 컴포넌트가 터치이벤트를 가로채서 헤더에 있는 아이콘의 터치가 안먹고 있었음
    },
    openProfileContainer: {
        width: '92.2%',
        height: '65.2%',
        borderRadius: 12,
        flexDirection: 'column',
        backgroundColor: 'white',
        zIndex: 8,
        paddingHorizontal: 16,
        paddingVertical: 21,
    },
    openInnerContainer: {
        width: '100%',
        height: 62,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    profileOpenContainer: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        zIndex: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        opacity: 10,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    },
    topButtonContainer: {
        position: 'absolute',
        top: 106,
        flexDirection: 'row',
        width: '100%',
    },
    activeContainer: {
        flex: 1,
        width: '50%',
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        borderBottomColor: color.primary,
        borderBottomWidth: 4,
    },
    inactiveContainer: {
        flex: 1,
        width: '50%',
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        borderBottomColor: color.inactiveBottom,
        borderBottomWidth: 2,
    },
    flex: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 16,
    },
    topBorderContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 16,
        paddingVertical: 14,
        borderTopColor: color.faintGray,
        borderTopWidth: 1,
    },
    ribbonImage: {
        width: 14,
        height: 11,
        objectFit: 'contain',
        marginRight: 5,
    },
    columnContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    distanceContainer: {
        borderRadius: 500,
        borderWidth: 0.5,
        borderColor: color.normal,
        paddingHorizontal: 7,
        marginHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    smallImage: {
        width: 23,
        height: 23,
        objectFit: 'contain',
        marginRight: 4,
    },
    doctorProfileContainer: {
        flexDirection: 'row',
        borderRadius: 20,
        paddingHorizontal: 15,
        marginBottom: 8,
        width: '92.2%',
        height: 91,
        alignItems: 'center',
        shadowColor: color.inactive,
        shadowOffset: {
            // 그림자의 위치
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25, // 그림자의 투명도
        shadowRadius: 3.84, // 그림자의 반경
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
    },
    buttonRibbonImage: {
        width: 16.04,
        height: 12.6,
        objectFit: 'contain',
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
        borderRadius: 7,
        borderColor: color.primary,
        borderWidth: 1,
    },
    forARibbonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '78.5%',
        height: 48,
        backgroundColor: color.primary,
        borderRadius: 8,
    },
    showReviewContainer: {
        position: 'absolute',
        bottom: 14,
        right: 15,
    },
    notReadyImage: {
        width: 72,
        height: 72,
        marginBottom: 20,
        marginTop: 52,
    },
    notReadyContainer: {
        backgroundColor: color.backgroundGray,
        position: 'absolute',
        top: 80,
        width: '100%',
        height: 300,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    writeReviewContainer: {
        borderColor: color.primary,
        borderRadius: 12,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '92.2%',
        height: 48,
        marginBottom: 85,
    },
    activeCircle: {
        backgroundColor: color.primary,
        width: 7,
        height: 7,
        borderRadius: 10,
        marginRight: 8,
    },
    scrabIamge: {
        width: 48,
        height: 48,
        marginRight: 4,
    },
    ButtonsContainer: {
        backgroundColor: 'white',
        shadowColor: color.inactive,
        shadowOffset: {
            // 그림자의 위치
            width: 0,
            height: -2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        zIndex: 3,
        paddingTop: 18,
        paddingBottom: 34,
        position: 'absolute',
        bottom: 0,
        justifyContent: 'space-around',
        width: '100%',
        height: 100,
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
        lineHeight: 22.4,
        textAlign: 'center',
    },
    activeText: {
        fontWeight: '800',
        color: color.primary,
        fontSize: 18,
        lineHeight: 22.4,
    },
    inactiveText: {
        ...baseText,
        color: color.inactive,
        fontSize: 18,
        lineHeight: 22.4,
    },
    timeText: {
        fontWeight: '500',
        color: color.inactive,
        fontSize: 16,
        lineHeight: 22.4,
        letterSpacing: -0.5,
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
        letterSpacing: -0.5,
        marginLeft: 4,
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
    faintText: {
        ...baseText,
        fontSize: 18,
        lineHeight: 22.4,
        letterSpacing: -0.5,
        color: color.faintBlack,
    },
    showReviewText: {
        ...baseText,
        fontSize: 16,
        lineHeight: 22.4,
        letterSpacing: -0.5,
        color: color.faintBlack,
        textDecorationColor: color.faintBlack,
        textDecorationStyle: 'solid',
        textDecorationLine: 'underline',
    },
    rankingText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    ribbonButtonText: {
        fontWeight: '600',
        fontSize: 18,
        lineHeight: 24,
        color: 'white',
    },
} as {
    [key: string]: StyleProp<TextStyle>
}
