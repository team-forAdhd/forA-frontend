import Reac from 'react'
import { TouchableOpacity, View, Image, Text } from 'react-native'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { MedicineItem } from '@/common/types'
import { styles, text } from './MedicineListStyle'
import { RootStackParamList } from '@/components/navigation'
interface MedicineListItemProps {
    item: MedicineItem
}

const MedicineListItem: React.FC<MedicineListItemProps> = ({ item }) => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>()

    const handlePress = () => {
        navigation.navigate('MedDetail', { medId: item.id })
    }

    const truncateItemName = (name: string) => {
        // 괄호부터 사라지도록 이름 수정
        const bracketIndex = name.indexOf('(')
        return bracketIndex !== -1 ? name.substring(0, bracketIndex) : name
    }

    return (
        <TouchableOpacity style={styles.itemContainer} onPress={handlePress}>
            <Image source={{ uri: item.itemImage }} style={styles.itemImage} />
            <View style={styles.itemTextContainer}>
                <Text style={text.nameText}>
                    {truncateItemName(item.itemName)}
                </Text>
                <Text style={text.enNameText}>{item.itemEngName}</Text>
                <Text style={text.companyText}>{item.entpName}</Text>
            </View>
            {item.favorite && (
                <Image
                    source={require('@/public/assets/bookmark.png')}
                    style={styles.bookmark}
                />
            )}
        </TouchableOpacity>
    )
}

export default MedicineListItem
