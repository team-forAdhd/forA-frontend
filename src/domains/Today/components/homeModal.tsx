import { ScrollView } from 'react-native-gesture-handler';
import HomeAccount from './homeAccount';
import { styles, text } from './homeModalStyle';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Linking,
    Pressable,
    Modal,
} from 'react-native';

interface HomeModalProps {
    modalTitle: string;
    modalContents: ModalContent[];
    setModalTitle: React.Dispatch<React.SetStateAction<string>>;
}

interface ModalContent {
    title: string;
    content: string;
}

export default function HomeModal({
    modalTitle,
    modalContents,
    setModalTitle,
}: HomeModalProps) {
    return (
        <Modal visible={!!modalTitle} transparent>
            <View style={styles.overLay}>
                <View style={styles.container}>
                    <ScrollView
                        style={{ width: '100%', height: '100%' }}
                        contentContainerStyle={{ flexGrow: 1 }}
                        showsVerticalScrollIndicator={false}
                    >
                        <View style={styles.flexContainer}>
                            <Text style={text.titleText}>
                                {modalTitle === 'notification'
                                    ? '공지사항'
                                    : '후원 문의'}
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
                                <View
                                    key={index}
                                    style={styles.contentContainer}
                                >
                                    {object.title && (
                                        <Text style={text.borderText}>
                                            {object.title}
                                        </Text>
                                    )}
                                    {object.content &&
                                        (object.title == '문의사항' ? (
                                            <Pressable
                                                onPress={async () => {
                                                    const url =
                                                        object.content.split(
                                                            ': ',
                                                        )[1];

                                                    const supported =
                                                        await Linking.canOpenURL(
                                                            url,
                                                        );
                                                    if (supported) {
                                                        await Linking.openURL(
                                                            url,
                                                        );
                                                    } else {
                                                        console.log(
                                                            `Can't open URL: ${url}`,
                                                        );
                                                    }
                                                }}
                                            >
                                                <Text style={text.basicText}>
                                                    {object.content}
                                                </Text>
                                            </Pressable>
                                        ) : (
                                            <Text style={text.basicText}>
                                                {object.content}
                                            </Text>
                                        ))}
                                </View>
                            ))}
                        {modalTitle === 'support' && <HomeAccount />}
                    </ScrollView>
                </View>
            </View>
        </Modal>
    );
}
