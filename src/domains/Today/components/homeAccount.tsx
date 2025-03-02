import { styles, text } from './homeModalStyle'
import { View, Text } from 'react-native'

export default function HomeAccount() {
    return (
        <View style={styles.accountContainer}>
            <View style={styles.accountFlex}>
                <Text style={text.borderText}>후원 계좌</Text>
                <Text style={text.basicText}>
                    신한은행 110-506-126081 (예금주 : 박*진)
                </Text>
            </View>
        </View>
    )
}
