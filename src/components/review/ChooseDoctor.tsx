import { View, TouchableOpacity, Image, Text, ScrollView } from 'react-native';
import { useState, useEffect } from 'react';
import { styles, text } from './ChooseDoctorStyle';
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
