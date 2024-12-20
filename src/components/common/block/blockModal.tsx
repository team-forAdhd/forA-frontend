import { useState } from 'react'
import { Modal, View, Text, TouchableOpacity } from 'react-native'
import { styles, text } from './blockModalStyles'
import { postBlockUser } from '@/api/home/postBlockApi'

interface ModalProps {
    modalVisible: boolean
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>
    question: string
    userId: string
}

export default function BlockModal({
    modalVisible,
    setModalVisible,
    question,
    userId,
}: ModalProps) {
    return (
        <Modal
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(!modalVisible)
            }}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.ModalContainer}>
                    <View style={styles.modalView}>
                        <View style={styles.questionContainer}>
                            <Text style={text.modalText}>
                                멤버를 차단하시겠습니까?
                            </Text>
                            <Text style={text.questionText}>{question}</Text>
                        </View>
                        <View style={styles.buttonGroup}>
                            <TouchableOpacity
                                style={styles.yesButton}
                                onPress={async () => {
                                    setModalVisible(!modalVisible)
                                }}
                            >
                                <Text style={text.yestextStyle}>취소</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.noButton}
                                onPress={async () => {
                                    await postBlockUser('', true)
                                    setModalVisible(!modalVisible)
                                }}
                            >
                                <Text style={text.notextStyle}>차단하기</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    )
}
