import { apiClient } from '@/api/login/loginApi';
import { ReportType } from '@/domains/TodayPostDetail/components/ReportPostModal';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

type ReportPostRequest = {
    postId: number;
    reportType: ReportType;
};
function reportPost({ postId, reportType }: ReportPostRequest) {
    return apiClient.post(`/posts/${postId}/report`, {
        reportType,
    });
}

export function useReportPostMutation({
    options,
}: {
    options: UseMutationOptions<AxiosResponse<any>, unknown, ReportPostRequest>;
}) {
    return useMutation({ mutationFn: reportPost, ...options });
}
