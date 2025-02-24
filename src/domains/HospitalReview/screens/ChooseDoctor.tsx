import {
    View,
    TouchableOpacity,
    Image,
    Text,
    ScrollView,
    TextStyle,
    StyleProp,
    StyleSheet,
} from 'react-native';
import { useState, useEffect } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { HospitalStackParams } from '@/navigation/stacks/hospitalStack';
import { Doctor } from '@/components/hospital/types';

export default function ChooseDoctor({
    navigation,
    route,
}: StackScreenProps<HospitalStackParams, 'ChooseDoctor'>) {
    const { hospitalInfo, price } = route.params;

    const [choosedDoctor, setChoosedDoctor] = useState<Doctor>();

    const selectChoice = (doctor?: Doctor) => {
        setChoosedDoctor(doctor);
    };

    useEffect(() => {
        setChoosedDoctor(choosedDoctor);
    }, []);

    return (
        <View style={styles.container}>
            {/* 헤더 */}
            <View style={styles.header}>
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => {
                        navigation.goBack();
                    }}
                >
                    <Image
                        source={require('@/public/assets/back.png')}
                        style={styles.iconImage}
                    />
                </TouchableOpacity>
            </View>

            {/* 메시지 박스 */}
            <View style={styles.messageContainer}>
                <Text style={text.headerText}>
                    칭찬을 남길 의사선생님을 선택해주세요
                </Text>
            </View>
            <View style={styles.infoContainer}>
                <Text style={text.normalText}>의사</Text>
                <Text
                    style={[
                        text.normalText,
                        { color: '#52A35D', marginLeft: 5 },
                    ]}
                >
                    {hospitalInfo.doctorList.length}
                </Text>
            </View>

            {/* 스크롤 뷰 */}
            <View style={styles.scrollContainer}>
                <ScrollView
                    style={{ flex: 1, width: '100%', backgroundColor: '#fff' }}
                >
                    <View>
                        {hospitalInfo.doctorList.map((doctor) => (
                            // `Warning: Each child in a list should have a unique "key" prop.` 해결 위해 고유 key 부여
                            <View style={{ flex: 1 }} key={doctor.doctorId}>
                                <TouchableOpacity
                                    activeOpacity={1}
                                    onPress={() => selectChoice(doctor)}
                                    style={[
                                        styles.boxContainer,
                                        choosedDoctor?.doctorId ===
                                        doctor.doctorId
                                            ? {
                                                  backgroundColor: '#F4F9D9',
                                                  borderColor: '#52A35D',
                                              }
                                            : { borderColor: '#EBEBEB' },
                                    ]}
                                >
                                    <Image
                                        source={
                                            doctor.image
                                                ? { uri: doctor.image }
                                                : require('@/public/assets/defaultDoctor.png')
                                        }
                                        style={styles.doctorImage}
                                    />

                                    <View
                                        style={{
                                            left: 10,
                                            flexDirection: 'row',
                                        }}
                                    >
                                        <Text
                                            style={{
                                                color:
                                                    choosedDoctor?.doctorId ===
                                                    doctor.doctorId
                                                        ? '#52A35D'
                                                        : '#232323',
                                            }}
                                        >
                                            <Text
                                                style={[
                                                    text.boxText,
                                                    { fontWeight: 'bold' },
                                                ]}
                                            >
                                                {doctor.name}
                                            </Text>
                                            <Text style={text.boxText}>
                                                {' '}
                                                선생님
                                            </Text>
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        ))}
                        {
                            <TouchableOpacity
                                activeOpacity={1}
                                onPress={() => selectChoice()}
                                style={[
                                    styles.boxContainer,
                                    !choosedDoctor
                                        ? {
                                              backgroundColor: '#E4EAC9',
                                              borderColor: '#52A35D',
                                          }
                                        : { borderColor: '#EBEBEB' },
                                ]}
                            >
                                <Image
                                    source={require('@/public/assets/defaultProfile.png')}
                                    style={styles.doctorImage}
                                />

                                <View style={{ left: 10 }}>
                                    <Text
                                        style={[
                                            text.boxText,
                                            {
                                                color: !choosedDoctor
                                                    ? '#52A35D'
                                                    : '#232323',
                                            },
                                        ]}
                                    >
                                        선택 안 함
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        }
                    </View>
                </ScrollView>
            </View>

            {/* 하단 버튼 */}
            <TouchableOpacity
                activeOpacity={1}
                onPress={() =>
                    navigation.navigate('HospitalReview', {
                        hospitalInfo,
                        price,
                        choosedDoctor,
                    })
                }
                style={[styles.buttonContainer, { backgroundColor: '#52A35D' }]}
            >
                <Text style={[text.buttonText, { color: 'white' }]}>다음</Text>
            </TouchableOpacity>
        </View>
    );
}

const color = {
    primary: '#52A35D',
    inactive: '#949494',
    inactiveBottom: '#EFEFF0',
    ribbon: '#FF5D5D',
    normal: '#232323',
    faintBlack: '#555555',
    backgroundGray: '#EDEDEA',
    faintGray: '#EEEEEE',
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        flexDirection: 'column',
        zIndex: 0,
    },
    header: {
        position: 'absolute',
        top: 52,
        width: '100%',
        height: 36,
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
    },
    messageContainer: {
        position: 'absolute',
        top: 120,
        backgroundColor: '#fff',
        width: '100%',
        height: 40,
        marginLeft: 20,
    },
    infoContainer: {
        position: 'absolute',
        top: 160,
        backgroundColor: '#fff',
        width: '100%',
        height: 40,
        flexDirection: 'row',
        marginLeft: 20,
    },
    scrollContainer: {
        position: 'absolute',
        top: 220,
        height: 500,
        backgroundColor: 'yellow',
        width: '100%',
        marginHorizontal: 20,
    },
    boxContainer: {
        flexDirection: 'row',
        paddingHorizontal: 15,
        marginBottom: 8,
        width: '88%',
        height: 90,
        alignItems: 'center',
        borderStyle: 'solid',
        borderWidth: 1,
        borderRadius: 20,
        shadowColor: color.inactive,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    iconImage: {
        width: 35,
        height: 35,
        objectFit: 'contain',
    },
    doctorImage: {
        width: 54,
        height: 54,
        objectFit: 'contain',
        borderRadius: 500,
    },
    buttonContainer: {
        position: 'absolute',
        width: '100%',
        height: 60,
        bottom: 34,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

const baseText = {
    fontFamily: 'Pretendard',
    fontStyle: 'normal',
    fontWeight: '400',
};

const text = {
    headerText: {
        color: color.normal,
        fontSize: 22,
        fontWeight: '600',
        letterSpacing: -0.7,
        lineHeight: 22.4,
    },
    normalText: {
        fontSize: 18,
        fontWeight: '500',
        lineHeight: 22.4,
        letterSpacing: -0.5,
        color: color.normal,
    },
    boxText: {
        ...baseText,
        fontSize: 18,
        lineHeight: 22.4,
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '600',
        lineHeight: 22.4,
    },
} as {
    [key: string]: StyleProp<TextStyle>;
};
