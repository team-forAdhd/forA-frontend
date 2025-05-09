import { useTranslation } from 'react-i18next';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { styles, text } from './tabBarStyle';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import type { ImageSourcePropType } from 'react-native';

// 개별 탭 아이템 타입 정의
type TabBarItem = {
    activeImage: ImageSourcePropType;
    defaultImage: ImageSourcePropType;
};

// 탭바 리스트 타입 정의
const tabBarList: Record<string, TabBarItem> = {
    병원: {
        activeImage: require('@/public/assets/clickHospital.png'),
        defaultImage: require('@/public/assets/hospital.png'),
    },
    약: {
        activeImage: require('@/public/assets/clickMeds.png'),
        defaultImage: require('@/public/assets/meds.png'),
    },
    오늘: {
        activeImage: require('@/public/assets/clickToday.png'),
        defaultImage: require('@/public/assets/Today.png'),
    },
    MY: {
        activeImage: require('@/public/assets/clickMY.png'),
        defaultImage: require('@/public/assets/MY.png'),
    },
};

export default function TabBar({
    state,
    navigation,
    visible,
}: BottomTabBarProps & { visible: boolean }) {
    if (!visible) return null;
    const { t } = useTranslation('home');

    return (
        <View style={styles.TabBar}>
            {state.routeNames.map((tab, index) => {
                const isFocused = state.index === index;
                const tabItem = tabBarList[tab];

                return (
                    <TouchableOpacity
                        style={styles.TabBarContainer}
                        onPress={() => {
                            if (tabItem) {
                                navigation.navigate(tab as never);
                            }
                        }}
                        key={index}
                    >
                        <Image
                            source={
                                isFocused
                                    ? tabItem?.activeImage
                                    : tabItem?.defaultImage
                            }
                            style={
                                tab === '오늘'
                                    ? styles.TodayTabImage
                                    : styles.TabBarImage
                            }
                        />
                        <Text
                            style={
                                isFocused
                                    ? text.clickTabBarText
                                    : text.tabBarText
                            }
                        >
                            {t(tab)}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}
