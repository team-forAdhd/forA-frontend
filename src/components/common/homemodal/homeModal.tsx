import HomeAccount from './homeAccount'
import { styles, text } from './homeModalStyle'
import { View, Text, Image, TouchableOpacity } from 'react-native'

interface HomeModalProps {
    modalTitle: string
    modalContents: ModalContent[]
    setModalTitle: React.Dispatch<React.SetStateAction<string>>
}

interface ModalContent {
    title: string
    content: string
}

export default function HomeModal({
    modalTitle,
    modalContents,
    setModalTitle,
}: HomeModalProps) {
    return (
        <View style={styles.container}>
            <View style={styles.flexContainer}>
                <Text style={text.titleText}>
                    {modalTitle === 'notification' ? '공지사항' : '후원 문의'}
                </Text>
                <TouchableOpacity onPress={() => setModalTitle('')}>
                    <Image
                        source={require('@/public/assets/x.png')}
                        style={styles.backIcon}
                    />
                </TouchableOpacity>
            </View>
            {modalContents &&
                modalContents.map((object, index) => (
                    <View key={index} style={styles.contentContainer}>
                        {object.title && (
                            <Text style={text.borderText}>{object.title}</Text>
                        )}
                        {object.content && (
                            <Text style={text.basicText}>{object.content}</Text>
                        )}
                    </View>
                ))}
            {modalTitle === 'support' && <HomeAccount />}
        </View>
    )
}
