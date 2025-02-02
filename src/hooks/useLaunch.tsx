import AsyncStorage from '@react-native-async-storage/async-storage'
import i18n from '@/public/locales/i18n'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect, useState } from 'react'

export default function useLaunch() {
    const [isFirstLaunch, setIsFirstLaunch] = useState<boolean | null>(null)
    async function hideScreenMove() {
        await SplashScreen.hideAsync()
    }

    useEffect(() => {
        SplashScreen.preventAutoHideAsync()

        i18n
        // 첫 진입인지 확인
        const checkFirstLaunch = async () => {
            try {
                const hasLaunched = await AsyncStorage.getItem('hasLaunched')
                if (!hasLaunched) {
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
        setTimeout(hideScreenMove, 2000)
    }, [])

    return !!isFirstLaunch
}
