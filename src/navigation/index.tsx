import useLaunch from '@/hooks/useLaunch';
import { LoginStack } from '@/navigation/stacks/LoginStack';
import HomeTab from '@/navigation/tabs/HomeTab';
import { useAuthStore } from '@/store/authStore';
import { NavigationContainer } from '@react-navigation/native';
import {
    createStackNavigator,
    StackNavigationOptions,
} from '@react-navigation/stack';

const MainNavigation = () => {
    const Stack = createStackNavigator();
    const isLoggedIn = useAuthStore((state) => state.accessToken);
    const firstLaunch = useLaunch();
    const screenOptions: StackNavigationOptions = {
        headerShown: false,
    };

    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="launch"
                screenOptions={screenOptions}
            >
                {isLoggedIn ? (
                    <Stack.Screen name="HomeTab" component={HomeTab} />
                ) : (
                    <Stack.Screen name="LoginStack" component={LoginStack} />
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
};
export default MainNavigation;
