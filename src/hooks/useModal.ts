import { useState } from 'react';

export default function useModal() {
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [informText, setInformText] = useState<string>('');
    function displayModal(informText: string) {
        setInformText(informText);
        setModalVisible(true);
    }
    function switchModal() {
        setModalVisible((prev) => !prev);
        setInformText('');
    }
    return {
        modalVisible,
        displayModal,
        switchModal,
        informText,
    };
}
