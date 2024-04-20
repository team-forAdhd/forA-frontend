import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'

import Home from '../home/Home'
import LoginScreen from '../login/LoginScreen'
import EmailDuplicateCheck from '../join/EmailDuplicateCheck'
import AuthCheck from '../join/AuthCheck'
import SetPassword from '../join/SetPassword'
import SetProfile from '../join/SetProfile'
import JoinLast from '../join/JoinLast'
import JoinDone from '../join/JoinDone'

const Stack = createStackNavigator()

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                }}
                initialRouteName="Home"
            >
                {/* 구현한 화면 추가 */}
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen
                    name="EmailDuplicateCheck"
                    component={EmailDuplicateCheck}
                />
                <Stack.Screen name="AuthCheck" component={AuthCheck} />
                <Stack.Screen name="SetPassword" component={SetPassword} />
                <Stack.Screen name="SetProfile" component={SetProfile} />
                <Stack.Screen name="JoinLast" component={JoinLast} />
                <Stack.Screen name="JoinDone" component={JoinDone} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppNavigator
