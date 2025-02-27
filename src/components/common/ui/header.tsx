import Entypo from '@expo/vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
    StyleProp,
    StyleSheet,
    Text,
    TextStyle,
    TouchableOpacity,
    View,
} from 'react-native';

const leftIconsType = {
    chevron: <Entypo name="chevron-left" size={40} />,
    text: <Text>취소</Text>,
    none: null,
} as const;

export default function Header({
    headerText,
    backIconType = 'chevron',
    children,
}: {
    backIconType: keyof typeof leftIconsType;
    headerText: string;
    children: React.ReactNode;
}) {
    const navigation = useNavigation();
    const handleBackButton = () => {
        navigation.goBack();
    };
    return (
        <View style={styles.header}>
            <TouchableOpacity onPress={handleBackButton}>
                {leftIconsType[backIconType]}
            </TouchableOpacity>
            <Text style={[text.headerText, { left: '50%' }]}>{headerText}</Text>
            <View style={styles.rightOptionsContainer}>{children}</View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    bottomActivatedContainer: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        zIndex: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        opacity: 10,
        justifyContent: 'center',
        flexDirection: 'column',
    },
    header: {
        position: 'absolute',
        top: 52,
        width: '100%',
        height: 36,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        paddingRight: 16,
        paddingLeft: 16,
        backgroundColor: 'white',
        zIndex: 20,
    },
    rightOptionsContainer: {
        flexDirection: 'row',
        gap: 10,
    },
});

const text = {
    fontFamily: 'Pretendard',
    fontStyle: 'normal',
    headerText: {
        color: '#000',
        fontSize: 18,
        fontWeight: '600',
        lineHeight: 22.4,
        textAlign: 'center',
    },
} as {
    [key: string]: StyleProp<TextStyle>;
};
