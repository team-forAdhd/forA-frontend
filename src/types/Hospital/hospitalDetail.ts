import { Doctor } from '@/components/hospital/types';

export type hospitalDetail = {
    hospitalId: string;
    name: string;
    address: string;
    phone: string;
    latitude: number;
    longitude: number;
    totalReceiptReviewCount: number;
    totalEvaluationReviewCount: number;
    distance: number;
    isBookmarked: boolean;
    isEvalutaionReviewed: boolean;
    operaionStartHour: number;
    operationStartMin: number;
    operationEndHour: number;
    operationEndMin: number;
    doctorList: Array<Doctor>;
};
