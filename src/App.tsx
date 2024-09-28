import 'intl-pluralrules'
import { useTranslation } from 'react-i18next'
import i18n from './public/locales/i18n'
import { useEffect, useState } from 'react'
import { useFonts } from 'expo-font'
import { createStackNavigator } from '@react-navigation/stack'
import AppNavigator from './components/navigation'
import { Provider } from 'mobx-react'
import profileStore from './state/signupState/profileStore'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Stack = createStackNavigator()

export default function App() {
    const [fontsLoaded] = useFonts({
        Pretendard: require('@/public/assets/font/PretendardVariable.ttf'),
        Chab: require('@/public/assets/font/chab.ttf'),
    })

    const [isFirstLaunch, setIsFirstLaunch] = useState<boolean | null>(null)

    useEffect(() => {
        i18n

        // 첫 진입인지 확인
        const checkFirstLaunch = async () => {
            try {
                const hasLaunched = await AsyncStorage.getItem('hasLaunched')
                if (hasLaunched === null) {
                    setIsFirstLaunch(true)
                    await AsyncStorage.setItem('hasLaunched', 'true')
                } else {
                    setIsFirstLaunch(false)
                }
            } catch (error) {
                console.error('Error checking first launch', error)
            }
        }
        checkFirstLaunch()
    }, [])

    return (
        <Provider profileStore={profileStore}>
            <AppNavigator
                // initialRoute="EditPost" // 테스트용
                initialRoute={isFirstLaunch ? 'Onboarding' : 'Home'}
            />
        </Provider>
    )
}
