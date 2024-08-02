import { useTranslation } from 'react-i18next'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { styles, text } from './tabBarStyle'
import { useContext } from 'react'
import { useNavigation } from '@react-navigation/native'
import { TabBarStoreContext } from '@/state/tabBarState'
import { Observer } from 'mobx-react'
interface NavigationList {
    [key: string]: string
    'home-tab': string
    'hospital-tab': string
    'meds-tab': string
    'selfCheck-tab': string
    'MY-tab': string
}
export default function TabBar() {
    // 클릭 상태 전역으로 관리 - 이전에는 state로 해서 리랜더링시 현재 클릭 상태 반영 X
    const store = useContext(TabBarStoreContext)

    //t함수에 전달할 키 값과 아이콘 이미지 경로
    const tabBarList = {
        'home-tab': require('@/public/assets/home.png'),
        'hospital-tab': require('@/public/assets/hospital.png'),
        'meds-tab': require('@/public/assets/meds.png'),
        'selfCheck-tab': require('@/public/assets/self-check.png'),
        'MY-tab': require('@/public/assets/MY.png'),
    }

    const navigationList: NavigationList = {
        'home-tab': 'Home',
        'hospital-tab': 'HospitalMaps',
        'meds-tab': 'Home',
        'selfCheck-tab': 'Home',
        'MY-tab': 'Home',
    }

    const clickTabIcons = [
        require('@/public/assets/clickHome.png'),
        require('@/public/assets/clickHospital.png'),
        require('@/public/assets/clickMeds.png'),
        require('@/public/assets/clickSelf-check.png'),
        require('@/public/assets/clickMY.png'),
    ]

    const { t } = useTranslation('home')

    const navigation = useNavigation()
    return (
        <View style={styles.TabBar}>
            {Object.entries(tabBarList).map(([tab, tabImage], index) => {
                return (
                    <Observer>
                        {() => (
                            <TouchableOpacity
                                style={styles.TabBarContainer}
                                onPress={() => {
                                    store.setClickTab(tab)
                                    navigation.navigate(
                                        navigationList[tab] as never,
                                    ) //모바일에서 확인
                                }}
                                key={index}
                            >
                                <Image
                                    source={
                                        store.clickTab === tab
                                            ? clickTabIcons[index]
                                            : tabImage
                                    }
                                    style={styles.TabBarImage}
                                />
                                <Text
                                    style={
                                        store.clickTab === tab
                                            ? text.clickTabBarText
                                            : text.tabBarText
                                    }
                                >
                                    {t(tab)}
                                </Text>
                            </TouchableOpacity>
                        )}
                    </Observer>
                )
            })}
        </View>
    )
}
