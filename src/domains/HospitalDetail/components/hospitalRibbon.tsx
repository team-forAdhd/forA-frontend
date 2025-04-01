import { Image, StyleSheet, View } from 'react-native';

const HOSPITAL_RIBBON_LIMIT = 3;

export function HospitalRibbon({ count }: { count: number }) {
    const disabledCount = HOSPITAL_RIBBON_LIMIT - count > 0;
    const activeCount = Math.min(count, HOSPITAL_RIBBON_LIMIT);
    return (
        <View style={styles.container}>
            {/* 활성화 */}
            {Array(activeCount)
                .fill(null)
                .map((_, index) => (
                    <Image
                        key={`active-${index}`}
                        source={require('@/public/assets/hospitalRibbon_active.png')}
                        style={styles.ribbonImage}
                    />
                ))}
            {/* 비활성화 */}
            {disabledCount &&
                Array(HOSPITAL_RIBBON_LIMIT - count)
                    .fill(null)
                    .map((_, index) => (
                        <Image
                            key={`disabled-${index}`}
                            source={require('@/public/assets/hospitalRibbon_disabled.png')}
                            style={styles.ribbonImage}
                        />
                    ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingLeft: 15,
        flexDirection: 'row',
        gap: 5,
        paddingVertical: 5,
    },
    ribbonImage: {
        width: 20,
        height: 20,
    },
});
