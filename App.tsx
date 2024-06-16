import 'intl-pluralrules'
import { useTranslation } from 'react-i18next'
import i18n from './src/public/locales/i18n'
import { useEffect } from 'react'
import { useFonts } from 'expo-font'
import { createStackNavigator } from '@react-navigation/stack'
import AppNavigator from './src/components/navigation'
import { Provider } from 'mobx-react'
import profileStore from './src/state/signupState/profileStore'
import React from 'react'

const Stack = createStackNavigator()

export default function App() {
    useEffect(() => {
        i18n
    }, [])
    const [fontsLoaded] = useFonts({
        Pretendard: require('@/public/assets/font/PretendardVariable.ttf'),
        Chab: require('@/public/assets/font/chab.ttf'),
    })

    return (
        <Provider profileStore={profileStore}>
            <AppNavigator />
        </Provider>
    )
}
