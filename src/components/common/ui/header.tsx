import Entypo from '@expo/vector-icons/Entypo';
import { ParamListBase } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import {
    StyleProp,
    StyleSheet,
    Text,
    TextStyle,
    TouchableOpacity,
    View,
} from 'react-native';

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
    cancelText: {
        fontSize: 18,
    },
} as {
    [key: string]: StyleProp<TextStyle>;
};

const leftIconsType = {
    chevron: <Entypo name="chevron-left" size={40} />,
    text: <Text style={text.cancelText}>취소</Text>,
    none: null,
} as const;

export default function Header<T extends ParamListBase = ParamListBase>({
    headerText,
    backIconType = 'chevron',
    children,
    navigation,
}: {
    backIconType: keyof typeof leftIconsType;
    headerText: string;
    children?: React.ReactNode;
    navigation: StackNavigationProp<T>;
}) {
    const handleBackButton = () => {
        navigation.pop();
    };
    return (
        <View style={styles.header}>
            <TouchableOpacity onPress={handleBackButton}>
                {leftIconsType[backIconType]}
            </TouchableOpacity>
            <Text style={[text.headerText]}>{headerText}</Text>
            <View style={styles.rightOptionsContainer}>{children}</View>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        position: 'absolute',
        top: 52,
        width: '100%',
        height: 50,
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
        width: 50,
        gap: 10,
    },
});
