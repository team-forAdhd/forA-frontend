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
    justifyContent: 'center',
  },
  headerTextContainer: {
    position: 'absolute',
    top: 52,
    height: 36,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
  },
  headerButtonContainer: {
    position: 'absolute',
    top: 52,
    height: 36,
    paddingRight: 20,
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
  },
  camera: {
    flex: 1,
  },
  messageBox: {
    position: 'absolute',
    top: 180,
    width: '80%',
    height: 80,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 85,
    opacity: 0.8,
  },
  buttonContainer: {
    alignSelf: 'center',
    position: 'absolute',
    bottom: 85,
    width: '95%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
    },
  iconHeaderImage: {
    width: 42,
    height: 42,
    objectFit: 'contain',
  },
  iconImage: {
    width: 45,
    height: 45,
    objectFit: 'contain',
  },
  iconShootImage: {
    width: 80,
    height: 80,
    objectFit: 'contain',
  },
  modalBackGround: {
    flex: 1,
    backgroundColor: 'black',
    opacity: 0.85
  },
  modalView: {
    marginTop: 340,
    margin: 30,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 28,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
})

const baseText = {
    fontFamily: 'Pretendard',
    fontStyle: 'normal',
    fontWeight: '400',
}

export const text = {
  headerText: {
    color: 'white',
    fontSize: 19,
    fontWeight: 'bold',
    letterSpacing: -0.7,
    lineHeight: 22.4,
    textAlign: 'center',
  },
  messageText: {
    ...baseText,
    color: color.normal,
    fontSize: 19,
    letterSpacing: -0.7,
    lineHeight: 22.4,
    textAlign: 'center',
  },
  modalText: {
    fontSize: 19,
    fontWeight: '600',
    lineHeight: 22.4,
    letterSpacing: -0.7,
  },
  boxText: {
    ...baseText,
    fontSize: 18,
    lineHeight: 22.4,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 22.4,
  },
} as {
    [key: string]: StyleProp<TextStyle>
}
