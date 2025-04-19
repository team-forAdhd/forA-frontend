import {
    ActivityIndicator,
    Modal,
    SafeAreaView,
    StyleSheet,
} from 'react-native';

export default function LoadingModal({ visible }: { visible: boolean }) {
    return (
        <Modal transparent={true} style={styles.container} visible={visible}>
            <SafeAreaView style={[styles.container, styles.container]}>
                <ActivityIndicator color={'#52A55D'} size={'large'} />
            </SafeAreaView>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 50,
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
    },
});
