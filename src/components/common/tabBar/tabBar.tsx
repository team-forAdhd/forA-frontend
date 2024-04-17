import { useTranslation } from 'react-i18next'
import { View, Text, Image, TouchableOpacity, TextInput } from 'react-native'
import { styles, text } from './tabBarStyle'

export default function TabBar() {
    //t함수에 전달할 키 값과 아이콘 이미지 경로
    const tabBarList = {
        'home-tab': require('@/public/assets/home.png'),
        'hospital-tab': require('@/public/assets/hospital.png'),
        'meds-tab': require('@/public/assets/meds.png'),
        'selfCheck-tab': require('@/public/assets/self-check.png'),
        'MY-tab': require('@/public/assets/MY.png'),
    }

    const { t } = useTranslation('home')

    return (
        <View style={styles.TabBar}>
            {Object.entries(tabBarList).map(([tab, tabImage]) => {
                return (
                    <TouchableOpacity
                        style={styles.TabBarContainer}
                        onPress={() => {
                            console.log(tab)
                        }}
                    >
                        <Image source={tabImage} style={styles.TabBarImage} />
                        <Text style={text.tabBarText}>{t(tab)}</Text>
                    </TouchableOpacity>
                )
            })}
        </View>
    )
}
