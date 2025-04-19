import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiClient } from '../login/loginApi';

export const medBookmarkApi = async (medId: number) => {
    const response = await apiClient.post(
        `/medicine/bookmarks/toggle?medicineId=${medId}`,
    );
};

export const getSavedPharmacies = async () => {
    try {
        const response = await apiClient.get(`/medicines/bookmarks/my`);
        if (response.status === 200) {
            console.log('약 북마크 리스트 조회 성공');
            return response.data;
        }
    } catch (error) {
        console.error('응답 실패', error);
        throw error;
    }
};

export const BookmarkDelete = async (medId: number) => {
    try {
        if (!medId) {
            throw new Error('유효하지 않은 약 ID');
        }

        // 북마크 API 두 번 호출
        const response1 = await apiClient.post(
            `/medicine/bookmarks/toggle?medicineId=${medId}`,
        );
        const response2 = await apiClient.post(
            `/medicine/bookmarks/toggle?medicineId=${medId}`,
        );

        if (response1.status === 200 && response2.status === 200) {
            console.log(`북마크 해제 성공: ${medId}`);
            return true;
        } else {
            console.error(
                `북마크 해제 실패: 상태 코드 ${response1.status}, ${response2.status}`,
            );
            return false;
        }
    } catch (error) {
        console.error('북마크 해제 실패:', error);
        return false;
    }
};
