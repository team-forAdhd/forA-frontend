import { TitleTextIcon } from '@/public/assets/SvgComponents'
import { StyleProp, StyleSheet, TextStyle } from 'react-native'

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        marginBottom: 100,
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
    ratingContainer: {
      height: 142,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
      borderBottomWidth: 12,
      borderBottomColor: '#EDEDEA'
    },
    starRow: {
      left: 20,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
    barIcon: {
      height: 109,
    },
    rateBarBox: {
      alignItems: 'center',
      right: 20,
    },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  ratingBarContainer: {
    flexDirection: 'row',
    width: 115,
    height: 10,
    borderRadius: 28,
    backgroundColor: '#EEEEEE',
    marginLeft: 5,
    marginVertical: 4,
  },
  ratingBarFilled: {
    borderRadius: 28,
    height: '100%',
    backgroundColor: '#52A55D',
  },
  ratingBarEmpty: {
    borderRadius: 28,
    height: '100%',
    backgroundColor: '#EEEEEE',
  },
  reviewTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE'
  },
  underArrowImage: {
    width: 24,
    height: 24,
},
reviewTitleBox: {
  left: 15,
},
sortOptionBox: {
  left: 250,
},
  sortOption: {
    flexDirection: 'row',
    alignItems: 'center',
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
    firstReviewText: {
      color: '#555',
      fontSize: 18,
      fontWeight: '600',
      lineHeight: 24,
   },
  rateText: {
    color: '#000',
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 28,
  },
  rateBarText: {
    color: '#000',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 16.8,
    letterSpacing: -0.8,
  },
  reviewTitleText: {
    color: '#232323',
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 22.4,
  },
  reviewCountText: {
    color: '#232323',
    fontSize: 18,
    fontWeight: '400',
    lineHeight: 22.4,
  },
  sortOptionText: {
    fontSize: 14,
    color: '#232323',
    fontWeight: '400',
    lineHeight: 19.6,
    letterSpacing: -0.7
},
} as {
    [key: string]: StyleProp<TextStyle>
}
