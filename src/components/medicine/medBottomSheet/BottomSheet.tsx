import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Modal,
    FlatList,
    Pressable,
    StyleSheet,
    TextStyle,
    StyleProp,
} from 'react-native';

interface BottomSheetProps {
    visible: boolean;
    onClose: () => void;
    options: string[];
    onSelect: (option: string) => void;
    selectedOption: string;
}

export default function BottomSheet({
    visible,
    onClose,
    options,
    onSelect,
    selectedOption,
}: BottomSheetProps) {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <Pressable style={styles.overlay} onPress={onClose}>
                <View style={styles.container}>
                    <View style={styles.titleContainer}>
                        {selectedOption != '차단하기' && (
                            <Text style={text.titleText}>게시글 관리</Text>
                        )}
                    </View>
                    <View style={styles.flatList}>
                        <FlatList
                            data={options}
                            keyExtractor={(item) => item}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={styles.optionContainer}
                                    onPress={() => {
                                        onSelect(item);
                                        onClose(); // 선택 후 바텀시트 닫기
                                    }}
                                >
                                    <Text style={text.commonText}>{item}</Text>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                </View>
            </Pressable>
        </Modal>
    );
}

// MedSelectModalStyle.ts

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    container: {
        backgroundColor: 'white',
        padding: 20,
        borderWidth: 1,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    optionContainer: {
        left: 8,
        paddingVertical: 15,
        flexDirection: 'row',
        // borderBottomWidth: 1,
        // borderBottomColor: '#eee',
    },
    titleContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        paddingHorizontal: 16,
        width: '100%',
        height: 25,
    },
    topLine: {
        marginTop: 12,
        width: 80,
        height: 4,
        borderRadius: 500,
        left: 10,
        marginBottom: 12,
    },
    rangeInnerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 32,
        paddingVertical: 22,
    },
    checkIcon: {
        width: 24,
        height: 24,
        left: 250,
    },
    flatList: {
        marginTop: 10,
    },
});

const baseText = {
    fontFamily: 'Pretendard',
    fontStyle: 'normal',
    fontWeight: '400',
};

const text = {
    titleText: {
        fontWeight: '600',
        color: '#232323',
        fontSize: 18,
        lineHeight: 22.4,
        right: -8,
    },
    commonText: {
        ...baseText,
        fontSize: 18,
        lineHeight: 22.4,
        letterSpacing: -0.9,
        color: '#232323',
    },
    checkText: {
        fontWeight: '600',
        color: '#52A55D',
        fontSize: 18,
        lineHeight: 24,
    },
    viewContentText: {
        ...baseText,
        color: '#52A55D',
        fontSize: 14,
        lineHeight: 19.6,
        letterSpacing: -0.7,
        textDecorationLine: 'underline',
    },
    businessInfoText: {
        ...baseText,
        color: '#949494',
        textAlign: 'center',
    },
} as {
    [key: string]: StyleProp<TextStyle>;
};
