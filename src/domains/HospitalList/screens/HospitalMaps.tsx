import { useMemo, useState } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    TextStyle,
    StyleProp,
    StyleSheet,
    SafeAreaView,
    ActivityIndicator,
} from 'react-native';
import GoogleMap from '../components/Maps';
import HospitalBottomSheet from '../components/hospitalListBottomSheet';
import RibbonDescription from '../../../components/hospital/ribbonDescription';
import { useTranslation } from 'react-i18next';
import { useLocation } from '@/hooks/useLocation';
import useModal from '@/hooks/useModal';
import GeneralModal from '@/components/common/modals/modal';
import { useHospitalList } from '@/domains/HospitalList/api/getHospitalList.api';
import HospitalDescriptor from '@/domains/HospitalList/components/hospitalDescriptor';
export interface LocationCoords {
    latitude: number;
    longitude: number;
}

export type Hospital = {
    distance: number;
    hospitalId: string;
    isBookmarked: boolean;
    latitude: number;
    longitude: number;
    name: string;
    operationStatus: string;
    totalEvaluationReviewCount: number;
    totalReceiptReviewCount: number;
};
export type SortOptions = 'REVIEW_DESC' | 'RIBBON' | 'DIST_ASC';

export default function HospitalMaps() {
    //포에이 설명 팝업을 띄울지에 관한 상태
    const [description, setDescription] = useState<boolean>(false);
    //포에이 리본 모달
    const [modal, setModal] = useState<boolean>(false);
    const {
        displayModal: pushError,
        informText: err,
        modalVisible: errModalVisible,
        switchModal,
    } = useModal();

    const { t } = useTranslation('HospitalModal');
    //현재 위치 위도, 경도
    const { myLocation, refresh, address, handleRegionChange, zoomLevel } =
        useLocation(pushError);

    const [radius, setRadius] = useState<number>(2000); // 기본값 설정 (예: 1000미터)
    const [size, setSize] = useState<number>(4); // 한 번에 가져올 데이터의 개수
    const [sort, setSort] = useState<SortOptions>('DIST_ASC'); // 정렬 옵션
    const [filter, setFilter] = useState<string>('ALL'); // 필터 옵션
    const [focusedHospital, setFocusedHospital] = useState<Hospital | null>(
        null,
    );
    const { data, isPending, fetchNextPage, hasNextPage, isError } =
        useHospitalList({
            filter,
            latitude: myLocation.latitude,
            longitude: myLocation.longitude,
            radius,
            size,
            sort,
        });
    function loadMore() {
        if (!hasNextPage) return;
        fetchNextPage();
    }
    console.log(data?.pages.flatMap((p) => p.hospitalList));
    const hospitals = useMemo(
        () => data?.pages.flatMap((page) => page.hospitalList) ?? [],
        [data?.pages],
    );

    const hospitalList = (() => {
        if (!hospitals) return [];

        switch (sort) {
            case 'DIST_ASC':
                return [...hospitals].sort((a, b) => a.distance - b.distance);
            case 'REVIEW_DESC':
                return [...hospitals].sort(
                    (a, b) =>
                        b.totalReceiptReviewCount - a.totalReceiptReviewCount,
                );
            case 'RIBBON':
                return hospitals.filter(
                    (hos) => hos.totalEvaluationReviewCount > 0,
                );
            default:
                return hospitals;
        }
    })();

    if (isPending) return <ActivityIndicator />;

    return (
        <SafeAreaView style={{ flex: 1 }}>
            {/*포에이 리본을 클릭한 경우 리본 평가자 수를 알려주는 모달 */}
            {modal && (
                <View style={styles.position}>
                    <TouchableOpacity
                        onPress={() => {
                            setModal(false);
                        }}
                        style={styles.ModalContainer}
                    >
                        <Text>
                            <Text style={text.ribbonText}>{t('text1')} </Text>
                            <Text style={text.ribbonCountText}>
                                {hospitalList[0].totalEvaluationReviewCount}
                            </Text>
                            <Text style={text.ribbonText}>{t('text2')}</Text>
                        </Text>
                        <Text style={text.ribbonText}>{t('text3')}</Text>
                    </TouchableOpacity>
                </View>
            )}
            {/*포에이 리본을 클릭한 경우 리본 평가자 수를 알려주는 모달 */}
            {description && (
                <RibbonDescription setDescription={setDescription} />
            )}
            {/*본인 위치 상단 바 */}
            <View style={styles.topContainer}>
                <Text style={text.headerText}>병원</Text>
                <View style={styles.locationContainer}>
                    <Image
                        style={styles.locationIcon}
                        source={require('@/public/assets/compass.png')}
                    />
                    <Text style={text.locationText}>{address}</Text>
                </View>
            </View>
            {/*구글맵 */}
            <GoogleMap
                hospitalList={hospitalList}
                myLocation={myLocation}
                refresh={refresh}
                setFocusedHospital={setFocusedHospital}
                handleRegionChange={handleRegionChange}
                zoomLevel={zoomLevel}
            />
            {/*병원리스트 바텀 시트, 병원 눌렀을 떄는 개별 병원 안내*/}
            {focusedHospital ? (
                <HospitalDescriptor
                    hospital={focusedHospital}
                    location={myLocation}
                    setFocusedHospital={setFocusedHospital}
                />
            ) : (
                <HospitalBottomSheet
                    setDescription={setDescription}
                    setModal={setModal}
                    hospitalList={hospitalList}
                    setSort={setSort}
                    location={myLocation}
                    setFilter={setFilter}
                    setRadius={setRadius}
                    loadMore={loadMore}
                />
            )}
            <GeneralModal
                informText={err}
                modalVisible={errModalVisible}
                switchModal={switchModal}
            />
        </SafeAreaView>
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
    topContainer: {
        position: 'absolute',
        top: 0,
        width: '100%',
        height: 151,
        zIndex: 10,
        paddingVertical: 5,
        paddingHorizontal: 16,
        backgroundColor: 'white',
        paddingTop: 42,
        flexGrow: 1,
    },
    locationContainer: {
        width: '100%',
        height: 43,
        marginTop: 23,
        flexDirection: 'row',
        alignItems: 'center',
    },
    locationIcon: {
        width: 27,
        height: 27,
        marginRight: 5,
    },
    ModalContainer: {
        backgroundColor: color.normal,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 30,
        borderRadius: 12,
        width: 349,
        height: 74,
    },
    position: {
        position: 'absolute',
        top: 0,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        zIndex: 30,
    },
    map: {
        flex: 1,
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
        fontSize: 24,
        fontWeight: 'bold',
        letterSpacing: -0.5,
        lineHeight: 30.6,
    },
    locationText: {
        fontWeight: '600',
        color: color.normal,
        fontSize: 18,
    },
    inactiveText: {
        ...baseText,
        color: color.inactive,
        fontSize: 18,
        lineHeight: 22.4,
    },
    timeText: {
        fontWeight: '500',
        color: color.inactive,
        fontSize: 16,
        lineHeight: 22.4,
        letterSpacing: -0.5,
    },
    ribbonText: {
        ...baseText,
        fontSize: 18,
        lineHeight: 24,
        color: 'white',
    },
    ribbonCountText: {
        ...baseText,
        fontSize: 18,
        lineHeight: 24,
        color: color.ribbon,
    },
} as {
    [key: string]: StyleProp<TextStyle>;
};
