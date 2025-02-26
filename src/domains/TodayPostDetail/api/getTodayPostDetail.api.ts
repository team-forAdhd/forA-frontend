import { API_URL } from '@env';
import { apiClient } from '@/api/login/loginApi';
import { Post } from '@/domains/TodayPostDetail/types/todayPostDetail.types';
import { useQuery } from '@tanstack/react-query';

const categoryMap: { [key: string]: string } = {
    TEENS: '10대',
    TWENTIES: '20대',
    PARENTS: '학부모',
    THIRTIES_AND_ABOVE: '30대↑',
};
const convertCategory = (category: string): string => {
    return categoryMap[category] || category;
};

export async function getTodayPostDetail(postId: number): Promise<Post> {
    const { data } = await apiClient.get(`${API_URL}/api/v1/posts/${postId}`);
    return data;
}

export function useTodayPostDetail(postId: number) {
    return useQuery({
        queryKey: ['todayPostDetail', postId],
        queryFn: () => getTodayPostDetail(postId),
    });
}
