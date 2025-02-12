import TabBar from '@/components/common/tabBar/tabBar';
import HospitalStack from '@/navigation/stacks/hospitalStack';
import MedicineStack from '@/navigation/stacks/MedicineStack';
import MypageStack from '@/navigation/stacks/MypageStack';
import TodayStack from '@/navigation/stacks/TodayStack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigationState } from '@react-navigation/native';
import React from 'react';

const Tab = createBottomTabNavigator();
const tabBarVisibleScreens = [
    '병원',
    '오늘',
    '약',
    'MY',
    'MedicineMain',
    'MyPage',
    'HospitalMaps',
    'Home',
    'HomeTab',
];
export default function HomeTab() {
    const navigationState = useNavigationState((state) => state);
    const getNestedRouteName = (state: any): string | null => {
        if (!state) return null;
        const route = state.routes[state.index];
        if (route.state) {
            return getNestedRouteName(route.state);
        }
        return route.name;
    };
    const currentRouteName = getNestedRouteName(navigationState);
    return (
        <Tab.Navigator
            initialRouteName="오늘"
            tabBar={(props) => (
                <TabBar
                    {...props}
                    visible={tabBarVisibleScreens.includes(
                        currentRouteName as string,
                    )}
                />
            )}
            screenOptions={{
                headerShown: false,
            }}
        >
            <Tab.Screen name="병원" component={HospitalStack} />
            <Tab.Screen name="약" component={MedicineStack} />
            <Tab.Screen name="오늘" component={TodayStack} />
            <Tab.Screen name="MY" component={MypageStack} />
        </Tab.Navigator>
    );
}
