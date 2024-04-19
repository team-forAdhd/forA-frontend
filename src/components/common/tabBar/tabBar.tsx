import { useTranslation } from 'react-i18next'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { styles, text } from './tabBarStyle'
import { useState } from 'react'
export default function TabBar() {
    //t함수에 전달할 키 값과 아이콘 이미지 경로
    const tabBarList = {
        'home-tab': require('@/public/assets/home.png'),
        'hospital-tab': require('@/public/assets/hospital.png'),
        'meds-tab': require('@/public/assets/meds.png'),
        'selfCheck-tab': require('@/public/assets/self-check.png'),
        'MY-tab': require('@/public/assets/MY.png'),
    }
    // 클릭 상태
    const [tabClick, setTabClick] = useState<string>('home-tab')

    const clickTabIcons = [
        require('@/public/assets/clickHome.png'),
        require('@/public/assets/clickHospital.png'),
        require('@/public/assets/clickMeds.png'),
        require('@/public/assets/clickSelf-check.png'),
        require('@/public/assets/clickMY.png'),
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
