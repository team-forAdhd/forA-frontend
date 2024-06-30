import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import { useTranslation } from 'react-i18next'
import i18n from '@/resources/locales/i18n'
import { useEffect } from 'react'
import { useFonts } from 'expo-font'
import { createStackNavigator } from '@react-navigation/stack'
import AppNavigator from '@/src/component/navigation'
import { Provider } from 'mobx-react'
import profileStore from '@/src/state/signupState/profileStore'
import 'intl-pluralrules'

const Stack = createStackNavigator()

export default function App() {
    useEffect(() => {
        i18n
    }, [])
    const [fontsLoaded] = useFonts({
        Pretendard: require('@/resources/assets/font/PretendardVariable.ttf'),
        Chab: require('@/resources/assets/font/chab.ttf'),
    })
    return (
        <Provider profileStore={profileStore}>
            <AppNavigator />
        </Provider>
        // <View style={styles.container}>
        //   <Text>Open up App.tsx to start working on your app!</Text>
        //   <StatusBar style="auto" />
        // </View>
    )
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
