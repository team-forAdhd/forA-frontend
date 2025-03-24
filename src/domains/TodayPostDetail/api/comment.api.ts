import { apiClient } from '@/api/login/loginApi';
import {
    InfiniteData,
    useInfiniteQuery,
    UseInfiniteQueryResult,
} from '@tanstack/react-query';
import { Comment } from '@/domains/TodayPostDetail/types/today.types';
import { Paging } from '@/types/paging';

export type CommentResponse = {
    commentList: Comment[];
    paging: Paging;
};

export async function getTodayComments({
    postId,
    page,
}: {
    postId: number;
    page: number;
}): Promise<CommentResponse> {
    const { data } = await apiClient.get<CommentResponse>(
        `/comments/posts/${postId}?sortOption=NEWEST_FIRST&page=${page}&size=20`,
    );
    return data;
}

// export function useTodayComments(
//     postId: number,
// ): UseInfiniteQueryResult<InfiniteData<CommentResponse, number>> {
//     return useInfiniteQuery({
//         queryKey: ['todayComment', postId],
//         queryFn: async ({ pageParam = 0 }) =>
//             getTodayComments({ postId, page: pageParam }),
//         initialPageParam: 0,
//         getNextPageParam: (lastPage, allPages) => {
//             if (lastPage.paging.isLast) return undefined;
//             return allPages.length;
//         },
//     });
// }

export function useTodayComments(
    postId: number,
): UseInfiniteQueryResult<InfiniteData<CommentResponse, number>> {
    return useInfiniteQuery({
        queryKey: ['todayComment', postId],
        queryFn: async ({ pageParam = 0 }) =>
            getTodayComments({ postId, page: pageParam }),
        initialPageParam: 0,
        getNextPageParam: (lastPage, allPages) => {
            if (lastPage.paging.isLast) return undefined;
            return allPages.length;
        },
    });
}
