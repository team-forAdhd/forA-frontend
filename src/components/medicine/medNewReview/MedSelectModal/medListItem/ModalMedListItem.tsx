import React, { useState } from 'react'
import { TouchableOpacity, View, Image, Text } from 'react-native'
import { MedicineItem } from '@/common/types'
import { styles, text } from './ModalMedListItemStyle'
interface MedicineListItemProps {
    item: MedicineItem
    onPress: () => void
    isSelected: boolean
}

const ModalMedListItem: React.FC<MedicineListItemProps> = ({
    item,
    onPress,
    isSelected,
}) => {
    const [isPressed, setIsPressed] = useState(false)

    const handlePress = () => {
        setIsPressed(!isPressed)
        onPress()
    }

    const truncateItemName = (name: string) => {
        // 괄호부터 사라지도록 이름 수정
        const bracketIndex = name.indexOf('(')
        return bracketIndex !== -1 ? name.substring(0, bracketIndex) : name
    }

    return (
        <TouchableOpacity
            style={[
                styles.itemContainer,
                isSelected && {
                    backgroundColor: '#F4F9D9',
                    borderColor: '#52A55D',
                },
            ]}
            onPress={handlePress}
        >
            <Image source={{ uri: item.itemImage }} style={styles.itemImage} />
            <View style={styles.itemTextContainer}>
                <Text style={text.nameText}>
                    {truncateItemName(item.itemName)}
                </Text>
                <Text style={text.enNameText}>{item.itemEngName}</Text>
                <Text style={text.companyText}>{item.entpName}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default ModalMedListItem
