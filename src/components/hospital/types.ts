type Hospital = {
    distance: number;
    hospitalId: string;
    isBookmarked: boolean;
    latitude: number;
    longitude: number;
    name: string;
    operationStatus: 'OPEN' | 'BREAKTIME' | 'CLOSED';
    totalEvaluationReviewCount: number;
    totalReceiptReviewCount: number;
};

interface HospitalInfo {
    address: string;
    distance: number;
    doctorList: Array<Doctor>; // Doctor 타입을 따로 정의해야 합니다.
    hospitalId: string;
    isBookmarked: boolean;
    isEvaluationReviewed: boolean;
    latitude: number;
    longitude: number;
    name: string;
    operationEndHour: number;
    operationEndMin: number;
    operationStartHour: number;
    operationStartMin: number;
    operationStatus: 'UNKNOWN' | 'OPEN' | 'CLOSED'; // 가능한 값이 더 있다면 추가하세요.
    phone: string;
    totalEvaluationReviewCount: number;
    totalReceiptReviewCount: number;
}

type Doctor = {
    doctorId: string;
    name: string; // 의사 이름
    image?: string; // 의사 프로필 사진 URL (선택적)
    profile?: string; // 의사의 약력 (선택적)
    totalReceiptReviewCount?: number; // 의사에 대한 총 리뷰 수 (선택적)
};

export { Hospital, HospitalInfo, Doctor };
