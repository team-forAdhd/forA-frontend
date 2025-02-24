import { View, Text, Image, TouchableOpacity } from 'react-native';
import { styles, text } from './hospitalListItmeStyle';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { Hospital } from '@/domains/HospitalList/screens/HospitalMaps';
import { postBookmark } from '@/domains/Hospital/api/postBookmark.api';
import { useState } from 'react';
import { Location } from '@/hooks/useLocation';

export interface HospitalItemProps {
    hospital: Hospital;
    setModal?: React.Dispatch<React.SetStateAction<boolean>>;
    setRerender?: React.Dispatch<React.SetStateAction<boolean>>;
    reRender?: boolean;
    location?: Location;
}

type HospitalDetailParams = {
    HospitalDetail: { hospitalId: string; latitude: number; longitude: number };
};

export default function HospitalListItem({
    hospital,
    setModal,
    setRerender,
    reRender,
    location,
}: HospitalItemProps) {
    const navigation = useNavigation<NavigationProp<HospitalDetailParams>>();

    // 북마크 상태
    const [bookmark, setBookmark] = useState<boolean>(hospital.isBookmarked);

    const handleToggleBookmark = async () => {
        try {
            // 북마크 상태 반전
            const newBookmarkState = !bookmark;
            setBookmark(newBookmarkState);
            // 반전된 상태에 따라 API 호출
            const response = await postBookmark({
                hospitalId: hospital.hospitalId,
                bookmark: newBookmarkState,
            });
            console.log('Bookmark status updated:', response);

            setRerender?.(!reRender); //아이콘 ui반응 빨리 업데이트 시키려고 부모 컴포넌트의 state를 변경해서 리렌더링해주기
        } catch (error) {
            console.error('Error updating bookmark:', error);
        }
    };

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
                onPress={handleToggleBookmark}
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
