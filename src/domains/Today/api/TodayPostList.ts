import { apiClient } from '@/api/login/loginApi';
import {
    Post,
    PostCategory,
} from '@/domains/TodayPostDetail/types/today.types';
import { Paging } from '@/types/paging';
import {
    InfiniteData,
    useInfiniteQuery,
    UseInfiniteQueryResult,
} from '@tanstack/react-query';

type PostList = {
    postList: Post[];
    paging: Paging;
};
export async function getTodayTopPosts({
    page = 0,
}: {
    page: number;
}): Promise<PostList> {
    const { data } = await apiClient.get<PostList>(
        `/posts/main/top?sortOption=NEWEST_FIRST&page=${page}`,
    );
    return data;
}

export function useTodayTopPosts(): UseInfiniteQueryResult<
    InfiniteData<PostList, number>
> {
    return useInfiniteQuery({
        queryKey: ['todayTopPosts'],
        queryFn: async ({ pageParam = 0 }) =>
            getTodayTopPosts({ page: pageParam }),
        initialPageParam: 0,
        getNextPageParam: (lastPage, allPages) => {
            if (lastPage.paging.isLast) return undefined;
            return allPages.length;
        },
        staleTime: 1000 * 60 * 5,
    });
}

export async function getTodayPostsByCategory({
    category,
    page = 0,
}: {
    category: PostCategory;
    page: number;
}): Promise<PostList> {
    const { data } = await apiClient.get<PostList>(
        `/posts/category?category=${category}&page=${page}&sortOption=NEWEST_FIRST`,
    );
    return data;
}

export function useTodayPostsByCategory({
    category,
}: {
    category: PostCategory;
}): UseInfiniteQueryResult<InfiniteData<PostList, number>> {
    return useInfiniteQuery({
        queryKey: ['todayPosts', category],
        queryFn: async ({ pageParam = 0 }) =>
            getTodayPostsByCategory({ page: pageParam, category }),
        initialPageParam: 0,
        getNextPageParam: (lastPage, allPages) => {
            if (lastPage.paging.isLast) return undefined;
            return allPages.length;
        },
        staleTime: 1000 * 60 * 5,
    });
}
