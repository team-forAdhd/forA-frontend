import { Modal, View, Text, TouchableOpacity } from 'react-native'
import { styles, text } from './choiceModalStyles'
import { logout } from '@/api/login/logout'
import { deleteUserAccount } from '@/api/user/deleteUserAccount'
import { useAuthStore } from '@/store/authStore'

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
    const logoutInLocal = useAuthStore((state) => state.logout)
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
                            <Text style={text.modalText}>{question}</Text>
                        </View>
                        <View style={styles.buttonGroup}>
                            <TouchableOpacity
                                style={styles.yesButton}
                                onPress={async () => {
                                    setModalVisible(!modalVisible)
                                    if (question.includes('로그아웃')) {
                                        await logout()
                                        logoutInLocal()
                                    } else if (question.includes('회원탈퇴')) {
                                        await deleteUserAccount()
                                        await logout()
                                    }
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
