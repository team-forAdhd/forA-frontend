import React from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    Modal,
    Image,
    FlatList,
} from 'react-native'
import { styles, text } from './BottomSheetStyle'

interface BottomSheetProps {
    visible: boolean
    onClose: () => void
    options: string[]
    onSelect: (option: string) => void
    selectedOption: string
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
            <View style={styles.overlay}>
                <View style={styles.container}>
                    <View style={styles.titleContainer}>
                        <Image
                            style={styles.topLine}
                            source={require('@/public/assets/rangeTop.png')}
                        />
                        {selectedOption != '차단하기' && (
                            <Text style={text.titleText}>정렬 옵션</Text>
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
                                        onSelect(item)
                                        onClose() // 선택 후 바텀시트 닫기
                                    }}
                                >
                                    <Text
                                        style={
                                            item === selectedOption
                                                ? text.checkText
                                                : text.commonText
                                        }
                                    >
                                        {item}
                                    </Text>
                                    {item === selectedOption && (
                                        <Image
                                            source={require('@/public/assets/check.png')}
                                            style={styles.checkIcon}
                                        />
                                    )}
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                </View>
            </View>
        </Modal>
    )
}
