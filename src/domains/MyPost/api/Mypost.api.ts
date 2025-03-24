import { apiClient } from '../../../api/login/loginApi';
import { Paging } from '@/types/paging';
import { Post } from '@/domains/TodayPostDetail/types/today.types';
import { useInfiniteQuery } from '@tanstack/react-query';

type MypostResponse = {
    paging: Paging;
    postList: Post[];
};
export const getMyPosts = async (
    sortOption?: 'NEWEST_FIRST' | 'OLDEST_FIRST',
    page?: number,
): Promise<MypostResponse> => {
    const { data } = await apiClient.get(
        `/posts/my-posts?sortOption=${sortOption}&page=${page}`,
    );
    return data;
};

export const useMyPost = () => {
    return useInfiniteQuery({
        queryKey: ['myPost'],
        queryFn: ({ pageParam = 0 }) => getMyPosts('NEWEST_FIRST', pageParam),
        initialPageParam: 0,
        getNextPageParam: (lastPage, allPages) => {
            if (lastPage.paging.isLast) return undefined;
            return allPages.length;
        },
    });
};
