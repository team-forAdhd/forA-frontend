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
        width: '100%',
    },
    reviewEmpty: {
      flex: 1,
      backgroundColor: '#EDEDEA',
      height: 700,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    },
    messageCircleIcon: {
      width: 40,
      height: 40,
      marginTop: 90,
      marginBottom: 20
    },
    arrowIcon: {
      width: 10,
      height: 247,
      marginTop: 30,
    },
    shadowBox: {
        shadowOffset: {
            width: 0,
            height: -5,
        },
        shadowOpacity: 1,
        shadowRadius: 3.84,
    },
    optionContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 10,
        borderBottomWidth: 0.8,
        borderColor: color.faintGray,
    },
    filterButton: {
        paddingHorizontal: 13,
        paddingVertical: 5,
        marginRight: 7,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 40,
    },
    horizontalLine: {
        alignSelf: 'center',
        height: 0.5,
        width: '85%',
        backgroundColor: color.faintGray,
    },
    reviewContainer: {
        flexDirection: 'row',
        width: '100%',
        padding: 15,
        marginVertical: 5,
    },
    reviewLeft: {
        width: '10%',
        height: '100%',
    },
    reviewRight: {
        marginLeft: 5,
        width: '88%',
        height: '100%',
    },
    reviewRightTop: {
        width: '100%',
    },
    reviewRightBottom: {
        marginTop: 10,
        width: '100%',
    },
    myReviewButton: {
        position: 'absolute',
        top: 20,
        right: 22,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    reviewRadiusContainer: {
        paddingHorizontal: 12,
        height: 36,
        flexDirection: 'row',
        marginTop: 8,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
    },
    reviewHelpButtonImage: {
        marginLeft: -3,
        marginRight: 5,
        width: 25,
        height: 25,
        objectFit: 'contain',
    },
    userProfileImage: {
        width: 35,
        height: 35,
        objectFit: 'contain',
        borderRadius: 500,
    },
    iconImage: {  
        width: 35,
        height: 35,
        objectFit: 'contain',
    },
    modalContainer: {
        position: 'absolute',
        top: 360,
        left: 13,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 0,
    },
    overlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // 흐림 효과를 위한 반투명 배경
    },
    sheetContainer: {
      flex: 1,
      alignItems: 'center',
      paddingHorizontal: 10,
    },
    sheetHeader: {
        justifyContent: 'center',
        alignContent: 'center',
        height: 50,
    },
    sheetContent: {
        justifyContent: 'center',
        alignContent: 'center',
    },
    sheetOptionContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      height: 50,
      paddingHorizontal: 20,
    },
    checkImage: {
        width: 25,
        height: 25,
        objectFit: 'contain',
    },
})

const baseText = {
    fontFamily: 'Pretendard',
    fontStyle: 'normal',
    fontWeight: '400',
}

export const text = {
    normalText: { 
        ...baseText,
        fontSize: 18,
        lineHeight: 22.4,
        letterSpacing: -0.5,
        color: color.normal,
    },
    firstReviewText: {
        color: '#555',
        fontSize: 18,
        fontWeight: '600',
        lineHeight: 24,
    },
    filterText: { 
        ...baseText,
        fontSize: 16,
        lineHeight: 22.4,
        letterSpacing: -0.5,
        color: color.normal,
    },
    reviewNicknameText: { 
        ...baseText,
        fontSize: 20,
        fontWeight: '700',
        lineHeight: 22.4,
        letterSpacing: -0.5,
        color: color.normal,
    },
    reviewDoctorNameText: { 
        ...baseText,
        fontSize: 14,
        lineHeight: 22.4,
        letterSpacing: -0.5,
        color: color.inactive,
    },
    reviewDateText: { 
        ...baseText,
        fontSize: 12,
        lineHeight: 22.4,
        letterSpacing: -0.5,
        color: color.normal,
    },
    reviewContentText: { 
        ...baseText,
        fontSize: 16,
        lineHeight: 22.4,
        letterSpacing: -0.5,
        color: color.normal,
    },
    reviewExpenseText: {
        ...baseText,
        color: color.primary
    },
    sheetHeaderText: {
        ...baseText,
        fontSize: 19,
        fontWeight: '600',
        lineHeight: 22.4,
        letterSpacing: -0.5,
    },
    sheetOptionText: {
        ...baseText,
        fontSize: 18,
        lineHeight: 22.4,
        letterSpacing: -0.5,
    }
} as {
    [key: string]: StyleProp<TextStyle>
}
