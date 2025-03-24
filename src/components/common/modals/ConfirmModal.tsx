import React from 'react';
import {
    Modal,
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ModalProps,
} from 'react-native';

interface ConfirmModalProps {
    visible: boolean;
    title: string;
    message?: string;
    confirmText?: string;
    cancelText?: string;
    onConfirm: () => void;
    onCancel: () => void;
    modalOption?: ModalProps;
}

export default function ConfirmModal({
    visible,
    title,
    message,
    onConfirm,
    onCancel,
    confirmText = '확인',
    cancelText = '취소',
    modalOption,
}: ConfirmModalProps) {
    return (
        <Modal
            transparent
            visible={visible}
            onRequestClose={onCancel}
            {...modalOption}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalView}>
                        <View style={styles.questionContainer}>
                            <Text style={styles.modalText}> {title} </Text>
                            <Text style={styles.questionText}>{message}</Text>
                        </View>
                        <View style={styles.buttonGroup}>
                            <TouchableOpacity
                                style={styles.cancelButton}
                                onPress={onCancel}
                            >
                                <Text style={styles.cancelText}>
                                    {cancelText}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.confirmButton}
                                onPress={onConfirm}
                            >
                                <Text style={styles.confirmText}>
                                    {confirmText}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        width: 360,
        backgroundColor: 'white',
        borderRadius: 12,
        overflow: 'hidden',
    },
    modalView: {
        alignItems: 'center',
    },
    modalText: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    buttonGroup: {
        flexDirection: 'row',
    },
    cancelButton: {
        flex: 1,
        padding: 15,
        backgroundColor: '#EEEEEE',
        alignItems: 'center',
    },
    confirmButton: {
        flex: 1,
        padding: 15,
        backgroundColor: '#52A55D',
        alignItems: 'center',
    },
    cancelText: {
        color: '#232323',
        fontWeight: '700',
    },
    confirmText: {
        color: 'white',
        fontWeight: '700',
    },
    questionContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: 143,
        padding: 20,
    },
    questionText: {
        color: '#232323',
        fontSize: 14,
        letterSpacing: -0.5,
        alignItems: 'center',
        textAlign: 'center',
        marginHorizontal: 20,
        marginTop: 13,
    },
});
