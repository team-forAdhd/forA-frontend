import { useNavigation } from '@react-navigation/native';
import { Modal, Text, View } from 'react-native';
import { Button } from 'react-native-elements';

export function NotFound({ informText }: { informText: string }) {
    const navigation = useNavigation();
    return (
        <View
            style={{
                width: '100%',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 20,
            }}
        >
            <Text style={{ fontSize: 20 }}>
                {informText ?? '해당 항목을 찾을 수 없습니다.'}
            </Text>
            <Button
                buttonStyle={{
                    width: '100%',
                    backgroundColor: 'green',
                    borderRadius: 20,
                }}
                onPress={() => navigation.goBack()}
                title={'뒤로 가기'}
            />
        </View>
    );
}
