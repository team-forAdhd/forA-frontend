import { useTranslation } from 'react-i18next'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { styles, text } from './tabBarStyle'
import { useState } from 'react'
export default function TabBar() {
    //t함수에 전달할 키 값과 아이콘 이미지 경로
    const tabBarList = {
        'home-tab': require('@/resources/assets/home.png'),
        'hospital-tab': require('@/resources/assets/hospital.png'),
        'meds-tab': require('@/resources/assets/meds.png'),
        'selfCheck-tab': require('@/resources/assets/self-check.png'),
        'MY-tab': require('@/resources/assets/MY.png'),
    }
    // 클릭 상태
    const [tabClick, setTabClick] = useState<string>('home-tab')

    const clickTabIcons = [
        require('@/resources/assets/clickHome.png'),
        require('@/resources/assets/clickHospital.png'),
        require('@/resources/assets/clickMeds.png'),
        require('@/resources/assets/clickSelf-check.png'),
        require('@/resources/assets/clickMY.png'),
    ]

    const { t } = useTranslation('home')

    return (
        <View style={styles.TabBar}>
            {Object.entries(tabBarList).map(([tab, tabImage], index) => {
                return (
                    <TouchableOpacity
                        style={styles.TabBarContainer}
                        onPress={() => {
                            setTabClick(tab)
                            console.log(tab)
                        }}
                        key={index}
                    >
                        <Image
                            source={
                                tabClick === tab
                                    ? clickTabIcons[index]
                                    : tabImage
                            }
                            style={styles.TabBarImage}
                        />
                        <Text
                            style={
                                tabClick === tab
                                    ? text.clickTabBarText
                                    : text.tabBarText
                            }
                        >
                            {t(tab)}
                        </Text>
                    </TouchableOpacity>
                )
            })}
        </View>
    )
}
