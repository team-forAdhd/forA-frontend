import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'

import Home from '../home/Home'
import LoginScreen from '../login/LoginScreen'
import SignupProfileScreen from '../signupProfile/signupProfileScreen'

const Stack = createStackNavigator()

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                }}
                initialRouteName="Profile"
            >
                {/* 구현한 화면 추가 */}
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Profile" component={SignupProfileScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppNavigator
