import { View, Text, Image, TouchableOpacity } from 'react-native'
import { styles, text } from './hospitalListItmeStyle'
import { set } from 'date-fns'
import { useNavigation } from '@react-navigation/native'

interface Hospital {
    hospitalName: string
    distance: string
    open: string
    forA: boolean
    reviewCount: number
    bookmark: boolean
}

interface HospitalProps {
    hospital: Hospital
    setModal: React.Dispatch<React.SetStateAction<boolean>>
}

export default function HospitalListItem({
    hospital,
    setModal,
}: HospitalProps) {
    const { hospitalName, distance, open, forA, reviewCount, bookmark } =
        hospital
    const navigation = useNavigation()
    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() => {
                navigation.navigate('CameraScreen' as never)
            }}
        >
            <View style={styles.columnContainer}>
                <View style={styles.flexContainer}>
                    <Text style={text.titleText}>{hospitalName}</Text>
                    {forA && (
                        <TouchableOpacity
                            onPress={() => {
                                setModal(true)
                            }}
                        >
                            <Image
                                source={require('@/public/assets/forAHospital.png')}
                                style={styles.forARibbon}
                            />
                        </TouchableOpacity>
                    )}
                </View>
                <View style={styles.flexContainer}>
                    <View style={styles.distanceContainer}>
                        <Text style={text.distanceText}>{distance}</Text>
                    </View>
                    <Text style={text.openText}>
                        {open === 'open' ? '진료중' : '휴식중'}
                    </Text>
                    <Text style={text.reviewText}>
                        {'영수증 리뷰(' + reviewCount + ')'}
                    </Text>
                </View>
            </View>
            <TouchableOpacity style={{ justifyContent: 'center' }}>
                <Image
                    source={
                        bookmark
                            ? require('@/public/assets/bookmark.png')
                            : require('@/public/assets/unbookmark.png')
                    }
                    style={styles.bookmark}
                />
            </TouchableOpacity>
        </TouchableOpacity>
    )
}
