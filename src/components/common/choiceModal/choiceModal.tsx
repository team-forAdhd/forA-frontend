import { useState } from 'react'
import { Modal, View, Text, TouchableOpacity } from 'react-native'
import { styles, text } from './choiceModalStyles'

interface ModalProps {
    modalVisible: boolean
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>
    question: string
}

export default function ChoiceModal({
    modalVisible,
    setModalVisible,
    question,
}: ModalProps) {
    return (
        <Modal
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(!modalVisible)
            }}
        >
            {' '}
            <View style={styles.modalOverlay}>
                <View style={styles.ModalContainer}>
                    <View style={styles.modalView}>
                        <View style={styles.questionContainer}>
                            <Text style={text.modalText}>{question}</Text>
                        </View>
                        <View style={styles.buttonGroup}>
                            <TouchableOpacity
                                style={styles.yesButton}
                                onPress={() => {
                                    setModalVisible(!modalVisible)
                                    // 로그아웃 로직 추가
                                }}
                            >
                                <Text style={text.yestextStyle}>예</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.noButton}
                                onPress={() => setModalVisible(!modalVisible)}
                            >
                                <Text style={text.notextStyle}>아니요</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    )
}
