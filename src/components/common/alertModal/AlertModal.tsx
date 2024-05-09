import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { styles, text } from './AlertModalStyle'

interface AlertModalProps {
    message: string
    leftButtonText: string
    rightButtonText: string
    onLeftClicked: () => void // '나가기' 버튼 클릭 시 동작
    onRightClicked: () => void // '이어서 쓰기' 버튼 클릭 시 동작
}

const AlertModal: React.FC<AlertModalProps> = ({
    message,
    leftButtonText,
    rightButtonText,
    onLeftClicked,
    onRightClicked,
}) => {
    return (
        <View style={styles.container}>
            <View style={styles.messageContainer}>
                <Text style={text.messageText}>{message}</Text>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={onLeftClicked}
                >
                    <Text style={text.cancelText}>{leftButtonText}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.continueButton}
                    onPress={onRightClicked}
                >
                    <Text style={text.continueText}>{rightButtonText}</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default AlertModal
