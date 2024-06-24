import { View, TouchableOpacity, Image, Text } from 'react-native'
import { styles, text } from './HospitalDetailStyle'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'

export default function HospitalDetail() {
    const ribbonCount = 1

    const navigation = useNavigation()
    // 병원정보와 리뷰 중 하나를 골라서 화면에 띄우기 위함
    const [button, setButton] = useState<boolean[]>([true, false])
    //전화번호와 위치 아이콘 이미지를 담은 배열
    const contactsAndLocations = [
        require('@/public/assets/phone.png'),
        require('@/public/assets/location.png'),
    ] //전화번호와 주
    const { t } = useTranslation('hospitalDetail')
    return (
        <View>
            {/*헤더 */}
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => {
                        navigation.goBack()
                    }}
                >
                    <Image
                        source={require('@/public/assets/back.png')}
                        style={styles.IconImage}
                    />
                </TouchableOpacity>
                <Text style={text.headerText}>병원이름</Text>
            </View>
            {/* 상단 버튼탭 */}
            <View style={styles.topButtonContainer}>
                <TouchableOpacity
                    onPress={() => {
                        setButton([true, false])
                    }}
                    style={
                        button[0]
                            ? styles.activeContainer
                            : styles.inactiveContainer
                    }
                >
                    <Text
                        style={button[0] ? text.activeText : text.inactiveText}
                    >
                        {t('hospital-info')}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        setButton([false, true])
                    }}
                    style={
                        button[1]
                            ? styles.activeContainer
                            : styles.inactiveContainer
                    }
                >
                    <Text
                        style={button[1] ? text.activeText : text.inactiveText}
                    >
                        {t('review')}
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={styles.columnContainer}>
                {ribbonCount > 0 && ( //포에이 리본 리뷰가 0이상인 경우 표시
                    // 포에이 리본인 경우에 표시되는 부분
                    <View style={styles.flex}>
                        <Image
                            source={require('@/public/assets/ribbon.png')}
                            style={styles.ribbonImage}
                        />
                        <Text style={text.ribbonText}>{t('forA-ribbon')}</Text>
                    </View>
                )}
                <View style={styles.flex}>
                    <Text style={text.hospitalText}>용산구정신병원</Text>
                    <View style={styles.distanceContainer}>
                        <Text style={text.smallBlackText}>620m</Text>
                    </View>
                </View>
            </View>
            <View>
                <Image />
                <Text>진료중</Text>
                <Text>9:00 - 18:00</Text>
            </View>
            <View>
                {/* 병원 전화번호와 주소 */}
                {contactsAndLocations.map((Image, index) => (
                    <View style={styles.columnContainer}>
                        <Image style={styles.smallImage} source={Image} />
                        <Text style={text.normalText}>
                            {index === 0 ? 'phone' : 'address'}
                        </Text>
                    </View>
                ))}
                {/*의사가 있으면 의사 선생님 목록이 뜨도록 */}
                {doctorList.length > 0 ? (
                    <View>
                        <Text>
                            <Text style={text.semiboldText}>
                                {t('doctor-count')}
                            </Text>
                            <Text style={text.primaryboldText}>
                                {doctorList.length}
                            </Text>
                        </Text>
                        {doctorList.map((data) => (
                            <View>
                                <Image
                                    source={
                                        data.image
                                            ? { uri: data.image }
                                            : require('@/public/assets/defaultDoctor.png')
                                    }
                                    style={styles.doctorImage}
                                />
                                <View>
                                    <Text>
                                        <Text style={text.doctorText}>
                                            {data.name}
                                        </Text>
                                        <Text style={text.titleText}>
                                            {t('title')}
                                        </Text>
                                    </Text>
                                    {data.profile && ( //약력이 있는 경우에만 뜨게끔
                                        <View style={styles.profileContainer}>
                                            <Text style={text.profiletitleText}>
                                                {t('profile')}
                                            </Text>
                                        </View>
                                    )}
                                </View>
                                {data.totalReviewCount && ( //리뷰가 있는 경우에만 뜨게끔
                                    <View>
                                        <TouchableOpacity>
                                            <Text>
                                                {t('show-review') +
                                                    '(' +
                                                    data.totalReviewCount +
                                                    ')'}
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                )}
                            </View>
                        ))}
                    </View>
                ) : (
                    <View>
                        <Image />
                        <Text>{t('not-ready')}</Text>
                    </View>
                )}
            </View>
        </View>
    )
}

//더미 데이터
const doctorList = [
    {
        doctorId: 'D12345',
        name: '김코코 선생님',
        image: 'https://example.com/images/doctor1.jpg',
        totalGrade: 4.5,
        totalReviewCount: 123,
        profile: 'Specialist in cardiology with over 20 years of experience.',
    },
    {
        doctorId: 'D67890',
        name: 'Dr. Jane Smith',
        image: 'https://example.com/images/doctor2.jpg',
        totalGrade: 4.8,
        totalReviewCount: 89,
        profile:
            'Renowned neurologist known for her research in neurodegenerative diseases.',
    },
    {
        doctorId: 'D54321',
        name: 'Dr. Emily White',
        image: 'https://example.com/images/doctor3.jpg',
        totalGrade: 4.2,
        totalReviewCount: 47,
        profile:
            'Expert in pediatric care with a focus on preventive medicine.',
    },
    {
        doctorId: 'D09876',
        name: 'Dr. Michael Brown',
        image: 'https://example.com/images/doctor4.jpg',
        totalGrade: 4.7,
        totalReviewCount: 150,
        profile: 'Orthopedic surgeon specializing in sports injuries.',
    },
    {
        doctorId: 'D11223',
        name: 'Dr. Sarah Lee',
        image: 'https://example.com/images/doctor5.jpg',
        totalGrade: 4.9,
        totalReviewCount: 203,
        profile:
            'Dermatologist with a passion for cosmetic dermatology and skin cancer prevention.',
    },
    {
        doctorId: 'D33445',
        name: 'Dr. Robert Wilson',
        image: 'https://example.com/images/doctor6.jpg',
        totalGrade: 3.9,
        totalReviewCount: 78,
        profile: null,
    },
]
