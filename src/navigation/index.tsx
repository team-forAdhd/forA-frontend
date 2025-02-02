import useLaunch from '@/hooks/useLaunch'
import HomeStack from '@/navigation/HomeStack'
import { LoginStack } from '@/navigation/LoginStack'
import { useAuthStore } from '@/store/authStore'
import { NavigationContainer } from '@react-navigation/native'
import {
    createStackNavigator,
    StackNavigationOptions,
} from '@react-navigation/stack'

const MainNavigation = () => {
    const Stack = createStackNavigator()
    const isLoggedIn = useAuthStore((state) => state.accessToken)
    const firstLaunch = useLaunch()
    const initialHomeScreen = firstLaunch ? 'OnBoard' : 'Home'
    const screenOptions: StackNavigationOptions = {
        headerShown: false,
    }

    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="launch"
                screenOptions={screenOptions}
            >
                {isLoggedIn ? (
                    <Stack.Screen
                        name="HomeStack"
                        component={() => (
                            <HomeStack initialRoute={initialHomeScreen} />
                        )}
                    />
                ) : (
                    <Stack.Screen name="LoginStack" component={LoginStack} />
                )}
            </Stack.Navigator>
        </NavigationContainer>
    )
}
export default MainNavigation
