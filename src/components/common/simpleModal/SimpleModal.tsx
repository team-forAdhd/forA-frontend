import { Text, View } from 'react-native'
import { styles, text } from './SimpleModalStyle'

interface Props {
    visible: boolean
    baseText: string
    highlightText: string
}

const SimpleModal: React.FC<Props> = ({ visible, baseText, highlightText }) => {
    if (!highlightText || !baseText.includes(highlightText)) {
        return (
            <View style={styles.modalContainer}>
                <Text style={text.generalText}>{baseText}</Text>
            </View>
        )
    }

    const parts = baseText.split(highlightText)
    return (
        <View style={styles.modalContainer}>
            <Text style={text.generalText}>
                {parts.map((part, index) => (
                    <Text key={index}>
                        {index > 0 && (
                            <Text style={text.highlightText}>
                                {highlightText}
                            </Text>
                        )}
                        {part}
                    </Text>
                ))}
            </Text>
        </View>
    )
}
export default SimpleModal
