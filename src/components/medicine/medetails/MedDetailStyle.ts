import { TitleTextIcon } from '@/public/assets/SvgComponents'
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
      titleStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
      },
      tabContainer: {
        width: '100%',
        left: 11,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
      },
      tab: {
        padding: 16,
      },
      activeTab: {
        borderBottomWidth: 2,
        borderBottomColor: '#52A35D',
      },
      topButtonContainer: {
          position: 'absolute',
          top: 106,
          flexDirection: 'row',
          alignSelf: 'center',
          width: '92%',
      },
      activeContainer: {
          flex: 1,
          width: '50%',
          height: 40,
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
          borderBottomColor: color.primary,
          borderBottomWidth: 4,
      },
      inactiveContainer: {
          flex: 1,
          width: '50%',
          height: 40,
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
          borderBottomColor: color.inactiveBottom,
          borderBottomWidth: 2,
      },
      scrollContainer: {
        position: 'absolute',
        top: 146,
        width: '100%',
        height: 590,
        paddingTop: 10,
      },
      infoContainer: {
        padding: 16,
        marginBottom: 100,
      },
      infoBox: {
        flexDirection: 'column',
      },
      imageContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 16,
      },
      pillImage: {
        width: '100%',
        height: 200,
      },
      buttonContainer: {
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginTop: 15,
        marginBottom: 40,
      },
      clickedButton: {
        borderColor: '#52A35D',
        backgroundColor: '#F4F9D9',
        borderWidth: 1,
        width: '33%',
        alignItems: 'center',
      },
      generalButton: {
        borderColor: '#949494',
        borderWidth: 1,
        width: '33%',
        alignItems: 'center',
      },
      contentTitle: {
        width: '100%',
        height: 55,
      },
      revivewButtonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 16,
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
        height: 100,
      },
      reviewButton: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '78.5%',
        height: 48,
        backgroundColor: color.primary,
        borderRadius: 8,
    },
    bookmarkContainer: {
        top: 16,
        width: 48,
        height: 48,
        alignItems: 'center',
        marginRight: -15,
    },
    IconImage: {
        width: 35,
        height: 35,
        objectFit: 'contain',
    },
    scrapIamge: {
        width: 48,
        height: 48,
    },
})

const baseText = {
  fontFamily: 'Pretendard',
  fontStyle: 'normal',
  fontWeight: '400',
}

export const text = {
    fontFamily: 'Pretendard',
    fontStyle: 'normal',
    headerText: {
        color: color.normal,
        fontSize: 18,
        fontWeight: 'bold',
        letterSpacing: -0.7,
        lineHeight: 22.4,
        textAlign: 'center',
    },
    activeTabText: {
      fontWeight: '800',
      color: color.primary,
      fontSize: 18,
      lineHeight: 22.4,
    },
    inactiveTabText: {
      ...baseText,
      color: color.inactive,
      fontSize: 18,
      lineHeight: 22.4,
    },
    itemNameText: {
        color: '#232323',
        fontSize: 20,
        fontWeight: '600',
        lineHeight: 28,
        marginBottom: -10,
    },
    itemEngNameText: {
        color: '#232323',
        fontSize: 12,
        fontWeight: '700',
        lineHeight: 30.6,
        marginBottom: -10,
    },
    entpNameText: {
        color: '#949494',
        fontSize: 12,
        fontWeight: '500',
        lineHeight: 30.6,
        letterSpacing: -0.6,
    },
    activeButtonText:{
        color: '#52A55D',
        fontSize: 13,
        fontWeight: '500',
        lineHeight: 30.6,
        letterSpacing: -0.7
    },
    inactiveButtonText:{
        color: '#555',
        fontSize: 13,
        fontWeight: '500',
        lineHeight: 30.6,
        letterSpacing: -0.7
    },
    contentTitleText:{
        color: '#232323',
        fontSize: 18,
        fontWeight: '600',
        lineHeight: 22.4,
    },
    contentText:{
        color: '#555',
        fontSize: 18,
        fontWeight: '400',
        lineHeight: 28,
        letterSpacing: -0.9,
        marginBottom: 20,
    },
    reviewButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
        lineHeight: 24,
    }
} as {
    [key: string]: StyleProp<TextStyle>
}
