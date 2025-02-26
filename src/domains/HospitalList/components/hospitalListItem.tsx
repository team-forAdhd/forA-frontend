import {
    View,
    Text,
    Image,
    TouchableOpacity,
    TextStyle,
    StyleProp,
    StyleSheet,
} from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { Hospital } from '@/domains/HospitalList/screens/HospitalMaps';
import { postBookmark } from '@/domains/Hospital/api/postBookmark.api';
import { Location } from '@/hooks/useLocation';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export interface HospitalItemProps {
    hospital: Hospital;
    setModal?: React.Dispatch<React.SetStateAction<boolean>>;
    setFocusedHospital?: React.Dispatch<React.SetStateAction<Hospital | null>>;
    reRender?: boolean;
    location?: Location;
}

type HospitalDetailParams = {
    HospitalDetail: { hospitalId: string; latitude: number; longitude: number };
};

export default function HospitalListItem({
    hospital,
    setModal,
    location,
    setFocusedHospital,
}: HospitalItemProps) {
    const navigation = useNavigation<NavigationProp<HospitalDetailParams>>();
    const queryClient = useQueryClient();
    const { mutate } = useMutation({
        mutationFn: () =>
            postBookmark({
                hospitalId: hospital.hospitalId,
                bookmark: !hospital.isBookmarked,
            }),
        onMutate: async () => {
            await queryClient.cancelQueries({
                queryKey: [
                    'hospitalList',
                    location?.latitude,
                    location?.longitude,
                ],
            });
            if (setFocusedHospital)
                setFocusedHospital({
                    ...hospital,
                    isBookmarked: !hospital.isBookmarked,
                });
            const previousHospitalList = queryClient.getQueryData<{
                pageParams: number[];
                pages: { hospitalList: Hospital[]; paging: any }[];
            }>(['hospitalList', location?.latitude, location?.longitude]);

            if (previousHospitalList) {
                queryClient.setQueryData(
                    ['hospitalList', location?.latitude, location?.longitude],
                    {
                        ...previousHospitalList,
                        pages: previousHospitalList.pages.map((page) => ({
                            ...page,
                            hospitalList: page.hospitalList.map((h) =>
                                h.hospitalId === hospital.hospitalId
                                    ? { ...h, isBookmarked: !h.isBookmarked }
                                    : h,
                            ),
                        })),
                    },
                );
            }

            return { previousHospitalList };
        },
        onError: (err, variables, context) => {
            if (context?.previousHospitalList) {
                queryClient.setQueryData(
                    ['hospitalList', location?.latitude, location?.longitude],
                    context.previousHospitalList,
                );
            }
            if (setFocusedHospital)
                setFocusedHospital({
                    ...hospital,
                    isBookmarked: !hospital.isBookmarked,
                });
        },
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: [
                    'hospitalList',
                    location?.latitude,
                    location?.longitude,
                ],
            });
        },
    });

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() => {
                if (location) {
                    navigation.navigate('HospitalDetail', {
                        hospitalId: hospital.hospitalId,
                        latitude: location.latitude,
                        longitude: location.longitude,
                    });
                } else {
                    console.log('병원 데이터 로드 안됨');
                }
            }}
        >
            <View style={styles.columnContainer}>
                <View style={styles.flexContainer}>
                    <Text style={text.titleText}>{hospital.name}</Text>
                    {hospital && hospital.totalEvaluationReviewCount > 0 && (
                        <TouchableOpacity
                            onPress={() => {
                                setModal?.(true);
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
                        <Text style={text.distanceText}>
                            {Number(hospital.distance).toFixed(0) + 'm'}
                        </Text>
                    </View>
                    <Text style={text.openText}>
                        {hospital.operationStatus === 'OPEN'
                            ? '진료중'
                            : '휴식중'}
                    </Text>
                    <Text style={text.reviewText}>
                        {'영수증 리뷰(' +
                            hospital.totalReceiptReviewCount +
                            ')'}
                    </Text>
                </View>
            </View>
            <TouchableOpacity
                style={{ justifyContent: 'center' }}
                onPress={() => mutate()}
            >
                <Image
                    source={
                        hospital.isBookmarked
                            ? require('@/public/assets/bookmark.png')
                            : require('@/public/assets/unbookmark.png')
                    }
                    style={styles.bookmark}
                />
            </TouchableOpacity>
        </TouchableOpacity>
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
        backgroundColor: '#fff',
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: '92.3%',
        borderBottomColor: color.faintGray,
        borderBottomWidth: 1,
        paddingBottom: '2.9%',
        marginHorizontal: '3.86%',
        marginTop: 19,
    },
    flexContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 7,
    },
    columnContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
    },
    forARibbon: {
        width: 20,
        height: 20,
        marginLeft: 4,
    },
    distanceContainer: {
        width: 60,
        height: 24,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: color.normal,
        borderRadius: 500,
        borderWidth: 1,
        marginRight: 7,
    },
    bookmark: {
        width: 20.49,
        height: 24.57,
    },
    titleContainer: {
        position: 'absolute',
        top: 20,
        justifyContent: 'center',
        flexDirection: 'row',
        paddingHorizontal: 16,
        width: '100%',
        height: 25,
        marginTop: 20,
    },
    rankingListContainer: {
        width: '100%',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingLeft: 14,
        paddingRight: 14,
        paddingBottom: 16,
    },
    baseContainer: {
        flexGrow: 1,
        height: 31,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#EDEDEA',
        borderRadius: 12,
        marginLeft: 2,
        marginRight: 2,
    },
    clickContainer: {
        flexGrow: 1,
        height: 31,
        backgroundColor: 'white',
        borderColor: '#52A55D',
        borderRadius: 12,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 2,
        marginRight: 2,
    },
    ranking: {
        marginLeft: 16,
        marginRight: 16,
        marginBottom: 8,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    postListContainer: {
        paddingHorizontal: 16,
    },
});

// 공통 스타일 정의
const baseText = {
    fontFamily: 'Pretendard',
    fontStyle: 'normal',
    fontWeight: '400',
};

// 공통 스타일을 확장하여 개별 스타일 정의
const text = {
    titleText: {
        fontWeight: '800',
        color: color.normal,
        fontSize: 18,
        lineHeight: 22.4,
    },
    distanceText: {
        ...baseText,
        fontSize: 16,
        lineHeight: 19.6,
        letterSpacing: -0.5,
        color: color.normal,
    },
    openText: {
        ...baseText,
        fontSize: 18,
        lineHeight: 26,
        letterSpacing: -0.5,
        color: color.normal,
        marginRight: 7,
    },
    reviewText: {
        ...baseText,
        fontWeight: '500',
        fontSize: 18,
        lineHeight: 26,
        letterSpacing: -0.5,
        color: color.faintBlack,
    },
    essentialText: {
        ...baseText,
        fontSize: 18,

        letterSpacing: -0.5,
    },
    viewContentText: {
        ...baseText,
        color: '#52A55D',
        fontSize: 14,
        lineHeight: 19.6,
        letterSpacing: -0.7,
        textDecorationLine: 'underline',
    },
    businessInfoText: {
        ...baseText,
        color: '#949494',
        textAlign: 'center',
    },
} as {
    [key: string]: StyleProp<TextStyle>;
};
