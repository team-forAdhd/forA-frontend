// MedSelectModalStyle.ts
import { StyleProp, StyleSheet, TextStyle } from 'react-native'

export const styles = StyleSheet.create({
    container: {
        display: 'flex',
        width: 360,
        height: 580,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF',
        borderRadius: 12,
    },
    header: {
      marginTop: 30,
      flexDirection: 'row',
      alignItems: 'center',
      padding: 16,
    },
    close: {
      top: 18,
      left: 150,
    },
    search: {
      backgroundColor: 'white',
      width: '100%',
      height: 35,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      zIndex: 2,
      marginBottom: 12,
  },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: '#EEE',
    },
    cancelButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#EEE',
        padding: 12,
        borderRadius: 8,
        marginRight: 8,
        width: 113,
    },
    confirmButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#52A55D',
        padding: 12,
        borderRadius: 8,
        marginLeft: 8,
        width: 227,
    },
    confirmDisableButton: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#949494',
      padding: 12,
      borderRadius: 8,
      marginLeft: 8,
      width: 227,
  },
    searchBar: {
      backgroundColor: 'white',
      borderWidth: 1,
      borderColor: '#52A55D',
      borderRadius: 50,
      width: 336,
      height: 48,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 9,
      zIndex: 2,
  },
  InputStyles: {
      width: 250,
  },
  IconImage: {
    width: 28,
    height: 28,
    objectFit: 'contain',
},
})

export const text = {
    fontFamily: 'Pretendard',
    fontStyle: 'normal',
    closeButtonText: {
        color: '#555',
        fontSize: 24,
        fontWeight: '600',
    },
    cancelText: {
        color: '#555',
        fontSize: 18,
        fontWeight: '600',
        lineHeight: 24,
    },
    confirmText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
        lineHeight: 24,
    },
    searchInputPlaceholder: {
      color: '#949494',
      fontSize: 18,
      fontWeight: '400',
      lineHeight: 26,
      letterSpacing: -0.9,
      bottom: 3,
    },
    searchInput: {
      color: '#232323',
      fontSize: 18,
      fontWeight: '400',
      lineHeight: 26,
      letterSpacing: -0.9,
      bottom: 3,
    },
} as {
    [key: string]: StyleProp<TextStyle>
}