import {
    Modal,
    View,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    StyleSheet,
    Alert,
} from 'react-native';
import { postHandleReport } from '@/api/myPage/getReport';

export default function AdminActionModal({
    modalVisible,
    switchModal,
    postId,
}: {
    modalVisible: boolean;
    switchModal: () => void;
    postId: number;
}) {
    const handleAction = async (
        type: '2일 정지' | '영구 정지' | '글만 삭제' | '신고 무효',
    ) => {
        let handleReportType:
            | 'DAY_2_PAUSE'
            | 'DAY_ALL_PAUSE'
            | 'POST_DELETE'
            | 'CLEAN';

        if (type === '2일 정지') handleReportType = 'DAY_2_PAUSE';
        else if (type === '영구 정지') handleReportType = 'DAY_ALL_PAUSE';
        else if (type === '글만 삭제') handleReportType = 'POST_DELETE';
        else if (type === '신고 무효') handleReportType = 'CLEAN';

        try {
            const result = await postHandleReport(postId, handleReportType);
            Alert.alert('성공', `${type} 처리가 완료되었습니다.`);
        } catch (error) {
            Alert.alert('오류', '신고 처리 중 문제가 발생했습니다.');
        } finally {
            switchModal();
        }
    };

    return (
        <Modal visible={modalVisible} transparent animationType="fade">
            <TouchableWithoutFeedback onPress={switchModal}>
                <View style={styles.overlay}>
                    <View style={styles.modal}>
                        <Text style={styles.title}>조치를 취하겠습니까?</Text>
                        <TouchableOpacity
                            onPress={() => handleAction('2일 정지')}
                            style={styles.optionButton}
                        >
                            <Text style={styles.option}>
                                2일 활동 정지와 글 삭제
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => handleAction('영구 정지')}
                            style={styles.optionButton}
                        >
                            <Text style={styles.option}>
                                영구 활동 정지와 글 삭제
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => handleAction('글만 삭제')}
                            style={styles.optionButton}
                        >
                            <Text style={styles.option}>글만 삭제 하기</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => handleAction('신고 무효')}
                            style={styles.optionButton}
                        >
                            <Text style={styles.option}>신고 무효 처리</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modal: {
        width: 300,
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 20,
        alignItems: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    optionButton: {
        alignSelf: 'stretch',
        paddingHorizontal: 16,
    },
    option: {
        fontSize: 16,
        paddingVertical: 12,
        textAlign: 'left',
    },
});
