import GeneralModal from '@/components/common/modals/modal';
import useModal from '@/hooks/useModal';
import React from 'react';
import { useTranslation } from 'react-i18next';
import {
    Image,
    StyleProp,
    StyleSheet,
    Text,
    TextStyle,
    TouchableOpacity,
    View,
} from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { imagePathMerge } from '@/utils/imagePathMerge';
import { StackScreenProps } from '@react-navigation/stack';
import { HospitalStackParams } from '@/navigation/stacks/hospitalStack';
import { HospitalInfo } from '@/components/hospital/types';

export function DoctorList({
    hospital,
    navigation,
}: {
    hospital: HospitalInfo;
    navigation: StackScreenProps<
        HospitalStackParams,
        'HospitalDetail'
    >['navigation'];
}) {

    // const { doctorList } = hospital;
    const doctorList = hospital?.doctorList ?? [];

    const { t } = useTranslation('hospitalDetail');
    const { displayModal, informText, modalVisible, switchModal } = useModal();

    return (
        <View style={styles.columnContainer}>
            {/* 의사 텍스트 부분 */}
            <View
                style={{
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    marginBottom: 14,
                }}
            >
                <View style={styles.doctorCountWrapper}>
                    <Text style={text.semiboldText}>{t('doctor-count')}</Text>
                    <Text style={text.primaryboldText}>
                        {doctorList.length}
                    </Text>
                </View>
            </View>
            {/* 의사 리스트 */}
            {doctorList.map((doctor) => (
                <View
                    key={doctor.doctorId}
                    style={styles.doctorProfileContainer}
                >
                    <Image
                        source={
                            doctor.image
                                ? { uri: imagePathMerge(doctor.image) }
                                : require('@/public/assets/defaultDoctor.png')
                        }
                        style={styles.doctorImage}
                    />
                    <View style={{ flexDirection: 'column', gap: 5 }}>
                        <Text>
                            <Text style={text.doctorText}>{doctor.name}</Text>
                            <Text style={text.titleText}>{t('title')}</Text>
                        </Text>
                        <View style={{ flexDirection: 'row', gap: 10 }}>
                            <TouchableOpacity
                                onPress={() => {}}
                                style={styles.showReviewContainer}
                            >
                                <AntDesign name="star" color={'green'} />
                                <Text style={text.showReviewText}>
                                    {'(' + doctor.totalReceiptReviewCount + ')'}
                                </Text>
                            </TouchableOpacity>
                            {doctor.profile && (
                                <TouchableOpacity
                                    onPress={() => {
                                        displayModal(doctor.profile ?? '');
                                    }}
                                    style={styles.profileContainer}
                                >
                                    <Text style={text.profiletitleText}>
                                        {t('profile')}
                                    </Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    </View>
                </View>
            ))}
            <TouchableOpacity
                onPress={() => {
                    navigation.push('CameraScreen', {
                        hospitalInfo: hospital,
                        ribbonEvaluation: false,
                    });
                }}
                style={styles.writeReviewContainer}
            >
                <Text style={text.activeText}>{t('write-review')}</Text>
            </TouchableOpacity>
            <View style={{ height: 33 }} />
            <GeneralModal
                modalVisible={modalVisible}
                switchModal={switchModal}
                informText={informText}
            />
        </View>
    );
}

export function NoDoctorContent({
    hospital,
    navigation,
}: {
    hospital: HospitalInfo;
    navigation: StackScreenProps<
        HospitalStackParams,
        'HospitalDetail'
    >['navigation'];
}) {
    const { t } = useTranslation('hospitalDetail');
    return (
        <View style={styles.notReadyContainer}>
            <Image
                source={require('@/public/assets/notReady.png')}
                style={styles.notReadyImage}
            />
            <Text style={text.faintText}>{t('not-ready')}</Text>
            <TouchableOpacity
                style={styles.writeReviewContainer}
                onPress={() =>
                    navigation.push('CameraScreen', {
                        hospitalInfo: hospital,
                        ribbonEvaluation: false,
                    })
                }
            >
                <Text style={text.activeText}>{t('write-review')}</Text>
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
    columnContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        borderTopWidth: 23,
        borderTopColor: '#EDEDEA',
        paddingTop: 18,
        marginTop: 24,
        paddingHorizontal: 16,
    },
    doctorCountWrapper: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
    },
    doctorProfileContainer: {
        flexDirection: 'row',
        borderRadius: 20,
        paddingHorizontal: 15,
        marginBottom: 8,
        width: '100%',
        borderColor: 'lightgray',
        height: 91,
        alignItems: 'center',
        shadowColor: color.inactive,
        gap: 10,
        borderWidth: 1,
    },
    doctorImage: {
        width: 54,
        height: 54,
        objectFit: 'cover',
        borderRadius: 999,
    },
    IconImage: {
        width: 35,
        height: 35,
        objectFit: 'contain',
    },
    buttonRibbonImage: {
        width: 16.04,
        height: 12.6,
        objectFit: 'contain',
    },
    rankingListContainer: {
        width: '100%',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingLeft: 14,
        paddingRight: 14,
    },
    profileContainer: {
        width: 36,
        height: 24,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 7,
        borderColor: color.primary,
        borderWidth: 1,
    },
    forARibbonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '78.5%',
        height: 48,
        backgroundColor: color.primary,
        borderRadius: 8,
    },
    showReviewContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },
    notReadyImage: {
        width: 72,
        height: 72,
        marginBottom: 20,
        marginTop: 52,
    },
    notReadyContainer: {
        backgroundColor: color.backgroundGray,
        width: '100%',
        height: 300,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    writeReviewContainer: {
        marginVertical: 20,
        borderColor: color.primary,
        borderRadius: 12,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '92.2%',
        height: 48,
    },
});

const baseText = {
    fontFamily: 'Pretendard',
    fontStyle: 'normal',
    fontWeight: '400',
};

const text = {
    semiboldText: {
        fontWeight: '800',
        fontSize: 18,
        color: color.normal,
        lineHeight: 22.4,
    },
    doctorText: {
        fontWeight: '800',
        fontSize: 16,
        color: color.normal,
        lineHeight: 22.4,
    },
    titleText: {
        ...baseText,
        fontSize: 16,
        color: color.normal,
        lineHeight: 22.4,
        letterSpacing: -0.5,
        marginLeft: 4,
    },
    profiletitleText: {
        ...baseText,
        fontSize: 16,
        color: color.primary,
        lineHeight: 19.6,
        letterSpacing: -0.5,
    },
    primaryboldText: {
        fontWeight: '800',
        fontSize: 18,
        color: color.primary,
        lineHeight: 22.4,
    },
    faintText: {
        ...baseText,
        fontSize: 18,
        lineHeight: 22.4,
        letterSpacing: -0.5,
        color: color.faintBlack,
    },
    activeText: {
        fontWeight: '800',
        color: color.primary,
        fontSize: 18,
        lineHeight: 22.4,
    },
} as {
    [key: string]: StyleProp<TextStyle>;
};
