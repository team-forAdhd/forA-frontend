import 'intl-pluralrules';
import MainNavigation from './src/navigation';
import { useFonts } from 'expo-font';
import { Provider } from 'mobx-react';
import profileStore from './src/state/signupState/profileStore';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

const queryClient = new QueryClient();
export default function App() {
    const [fontsLoaded] = useFonts({
        Pretendard: require('@/public/assets/font/PretendardVariable.ttf'),
        Chab: require('@/public/assets/font/chab.ttf'),
    });

    return (
        <QueryClientProvider client={queryClient}>
            <Provider profileStore={profileStore}>
                <MainNavigation />
            </Provider>
        </QueryClientProvider>
    );
}
