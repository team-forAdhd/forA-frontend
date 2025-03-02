import { ActivityIndicator, View } from 'react-native';

export function LoadingScreen() {
    return (
        <View
            style={{
                width: '100%',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <ActivityIndicator size={'large'} color={'green'} />
        </View>
    );
}
