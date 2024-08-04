import { TitleTextIcon } from '@/public/assets/SvgComponents'
import { StyleProp, StyleSheet, TextStyle } from 'react-native'

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
      },
    gobackIcon: {
        position: 'absolute',
    },
    gobackSize: {
        width: 36,
        height: 36,
    },
      header: {
        top: 50,
        marginBottom: 50,
        height: 36,
        width: '100%',
        flexDirection: 'row',
      },
      titleStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
      },
      tabContainer: {
        width: '95%',
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
       marginTop: 5,
       marginBottom: 20,
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
      revivewButtonContainer:{
        flexDirection: 'row',
        position: 'absolute',
        width: '100%',
        height: 100,
        bottom: 0,
        justifyContent: 'space-around',
        backgroundColor: 'white',
        shadowColor: 'f5f5f5', // 그림자 색상 설정
        shadowOffset: { width: 0, height: -2 }, // 그림자 위치를 위쪽으로 설정
        shadowOpacity: 0.1, // 그림자 투명도 설정
        shadowRadius: 3.84, // 그림자의 blur 반경 설정
        zIndex: 30,
      },
      reviewButton: {
        justifyContent: 'center',
        alignItems: 'center',
        top: 16,
        width: '80%',
        height: 48,
        borderRadius: 8,
        backgroundColor: '#52A55D',
    },
    bookmarkContainer: {
        top: 16,
        width: 48,
        height: 48,
        alignItems: 'center',
        marginRight: -15,
    },
    scrapIamge: {
        width: 48,
        height: 48,
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
        // marginBottom: -5,
    },
    activeTabText: {
        color: '#52A55D',
        fontSize: 18,
        fontWeight: '600',
        lineHeight: 22.4,
    },
    inactiveTabText: {
        color: '#949494',
        fontSize: 18,
        fontWeight: '500',
        lineHeight: 22.4,
    },
    itemNameText: {
        color: '#232323',
        fontSize: 20,
        fontWeight: '600',
        lineHeight: 28,
        marginBottom: -5,
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
        fontSize: 14,
        fontWeight: '500',
        lineHeight: 30.6,
        letterSpacing: -0.7
    },
    inactiveButtonText:{
        color: '#555',
        fontSize: 14,
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
