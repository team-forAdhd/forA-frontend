import AuthCheck from '@/components/join/AuthCheck'
import EmailDuplicateCheck from '@/components/join/EmailDuplicateCheck'
import JoinDone from '@/components/join/JoinDone'
import JoinLast from '@/components/join/JoinLast'
import SetPassword from '@/components/join/SetPassword'
import SetProfile from '@/components/join/SetProfile'
import LoginScreen from '@/components/login/LoginScreen'
import {
    createStackNavigator,
    StackNavigationOptions,
} from '@react-navigation/stack'

const Stack = createStackNavigator()
export const LoginStack = () => {
    const screenOptions: StackNavigationOptions = {
        headerShown: false,
    }
    return (
        <Stack.Navigator screenOptions={screenOptions}>
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
    )
}
