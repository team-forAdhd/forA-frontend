import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextStyle,
    StyleProp,
    StyleSheet,
    Modal,
} from 'react-native';

interface AlertModalProps {
    message: string;
    leftButtonText: string;
    rightButtonText: string;
    onLeftClicked: () => void; // '나가기' 버튼 클릭 시 동작
    onRightClicked: () => void; // '이어서 쓰기' 버튼 클릭 시 동작
}

const AlertModal: React.FC<AlertModalProps> = ({
    message,
    leftButtonText,
    rightButtonText,
    onLeftClicked,
    onRightClicked,
}) => {
    return (
        <Modal transparent={true} animationType="slide">
            <View
                style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'transparent',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <View style={styles.container}>
                    <View style={styles.messageContainer}>
                        <Text style={text.messageText}>{message}</Text>
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={styles.cancelButton}
                            onPress={onLeftClicked}
                        >
                            <Text style={text.cancelText}>
                                {leftButtonText}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.continueButton}
                            onPress={onRightClicked}
                        >
                            <Text style={text.continueText}>
                                {rightButtonText}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default AlertModal;

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        width: 364,
        height: 153,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: 'gray',
    },
    messageContainer: {
        width: 364,
        height: 97,
        padding: 16,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 364,
        height: 56,
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
        borderWidth: 1,
        borderTopWidth: 0,
        borderColor: 'gray',
    },
    cancelButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#EEE',
        borderBottomLeftRadius: 12,
    },
    continueButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#52A55D',
        borderBottomRightRadius: 12,
    },
});

const text = {
    fontFamily: 'Pretendard',
    fontStyle: 'normal',
    messageText: {
        color: '#232323',
        fontSize: 18,
        fontWeight: '600',
        lineHeight: 24,
    },
    cancelText: {
        color: '#555',
        fontSize: 18,
        fontWeight: '600',
        lineHeight: 24,
    },
    continueText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
        lineHeight: 24,
    },
} as {
    [key: string]: StyleProp<TextStyle>;
};
