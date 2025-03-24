import {
    InfiniteData,
    useInfiniteQuery,
    UseInfiniteQueryResult,
} from '@tanstack/react-query';
import { apiClient } from '../../../api/login/loginApi';
import { Hospital } from '@/components/hospital/types';

type GetHospitalListRequest = {
    latitude: number;
    longitude: number;
    radius: number;
    page: number;
    size: number;
    sort: string;
    filter: string;
};

type Paging = {
    size: number;
    totalPages: number;
    numberOfElements: number;
    totalElements: number;
    isFirst: boolean;
    isLast: boolean;
    isEmpty: boolean;
};

type GetHospitalListResponse = {
    hospitalList: Hospital[];
    paging: Paging;
};

// 병원 목록을 가져오는 함수
const SORT_OPTION = {
    DIST_ASC: 'distance,asc',
    REVIEW_DESC: 'reviewCount,desc',
};
export const getHospitalList = async ({
    filter,
    latitude,
    longitude,
    page,
    radius,
    size,
    sort,
}: GetHospitalListRequest): Promise<GetHospitalListResponse> => {
    const { data } = await apiClient.get<GetHospitalListResponse>(
        `/hospitals/nearby?latitude=${latitude}&longitude=${longitude}&radius=2000&page=${page}&size=${size}&sort=${'distance,asc'}&filter=${filter}`,
    );
    return data;
};

export const useHospitalList = (
    params: Omit<GetHospitalListRequest, 'page'>,
): UseInfiniteQueryResult<InfiniteData<GetHospitalListResponse, number>> => {
    return useInfiniteQuery({
        queryKey: ['hospitalList', params.latitude, params.longitude],
        queryFn: ({ pageParam }) =>
            getHospitalList({ ...params, page: pageParam as number }),
        initialPageParam: 0,
        getNextPageParam: (lastPage, allPages) => {
            if (lastPage.paging.isLast) return undefined;
            return allPages.length + 1;
        },
    });
};
