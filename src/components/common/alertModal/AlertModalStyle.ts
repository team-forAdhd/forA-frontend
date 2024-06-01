import { StyleProp, StyleSheet, TextStyle } from 'react-native'
export const styles = StyleSheet.create({
    container: {
      display: 'flex',
      width: 364,
      height: 153,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#FFF',
      borderRadius: 12,
    },
    messageContainer: {
      width: 364,
      height: 97,
      padding: 16,
      borderTopLeftRadius: 12,
      borderTopRightRadius: 12,
      justifyContent: 'center',
      alignItems: 'center'
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: 364,
      height: 56,
      borderBottomLeftRadius: 12,
      borderBottomRightRadius: 12,
    },
    cancelButton: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#EEE',
      borderBottomLeftRadius: 12,
    },
    continueButton: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#52A55D',
      borderBottomRightRadius: 12,
    },
  })

  export const text = {
    fontFamily: 'Pretendard',
    fontStyle: 'normal',
    messageText: {
        color: '#232323',
        fontSize: 18,
        fontWeight: '600',
        lineHeight: 24,
    },
    cancelText: {
        color: '#555',   
        fontSize: 18,
        fontWeight: '600',
        lineHeight: 24,
    },
    continueText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
        lineHeight: 24,
    }
  } as {
    [key: string]: StyleProp<TextStyle>
};