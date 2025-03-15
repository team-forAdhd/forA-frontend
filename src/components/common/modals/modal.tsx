import {
    Modal,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';

type GeneralModalProps = {
    modalVisible: boolean;
    switchModal: () => void;
    informText: string;
    confirmButtonText?: string;
    onPressConfirm?: () => void;
};
export default function GeneralModal({
    modalVisible,
    switchModal,
    informText,
    confirmButtonText,
    onPressConfirm,
}: GeneralModalProps) {
    return (
        <Modal animationType="slide" transparent={true} visible={modalVisible}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <Text style={styles.modalText}>{informText}</Text>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => {
                                switchModal();
                                onPressConfirm?.();
                            }}
                        >
                            <Text style={styles.textStyle}>
                                {confirmButtonText ?? '확인'}
                            </Text>
                        </Pressable>
                    </ScrollView>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    centeredView: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        width: '80%',
        maxHeight: '80%',
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        width: '100%',
        backgroundColor: '#52A55D',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 17,
    },
    modalText: {
        marginBottom: 15,
        fontSize: 17,
        textAlign: 'center',
    },
});
