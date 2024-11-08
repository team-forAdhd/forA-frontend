import React from 'react'
import { TouchableOpacity, View, Image, Text } from 'react-native'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { MedicineItem } from '@/common/types'
import { styles, text } from './MedicineListStyle'
import { RootStackParamList } from '@/components/navigation'
import { getSingleMedInfoApi } from '@/api/medicine/medListApi'

interface MedicineListItemProps {
    item: MedicineItem
}

const MedicineListItem: React.FC<MedicineListItemProps> = ({ item }) => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>()
    
    const handlePress = async (medId : number) => {
        try {
            const medicine = await getSingleMedInfoApi(medId)
            console.log(medicine)
            navigation.navigate('MedDetail', medicine)
        } catch (error) {
            console.error('Error fetching medication data:', error)
        }
    }

    const truncateItemName = (name: string) => {
        // 괄호부터 사라지도록 이름 수정
        const bracketIndex = name.indexOf('(')
        return bracketIndex !== -1 ? name.substring(0, bracketIndex) : name
    }

    const splitItemName = (name: string) => {
        // 괄호부터 사라지도록 이름 수정
        let array = new Array()
        const index = name.split(/[0-9]/)[0].length

        array.push(name.substring(0, index))
        array.push(name.substring(index, name.length))

        return array
    }

    return (
        <TouchableOpacity style={styles.itemContainer} onPress={() => handlePress(item.id)}>
            <Image source={{ uri: item.itemImage }} style={styles.itemImage} />
            <View style={styles.itemTextContainer}>
                {truncateItemName(item.itemName).length < 12
                ? (
                    <Text style={text.nameText}>
                        {truncateItemName(item.itemName)}
                    </Text>
                )
                : (
                    <View>
                    <Text style={text.nameText}>
                        {splitItemName(truncateItemName(item.itemName))[0]}
                    </Text>
                    <Text style={text.nameText}>
                        {splitItemName(truncateItemName(item.itemName))[1]}
                    </Text>
                    </View>
                )}
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
