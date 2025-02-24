///api/v1/hospitals/evaluation-questions
import { apiClient } from '../login/loginApi';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

export const getRibbonHospitalQuestion = async () => {
    const response = await apiClient.get(`/hospitals/evaluation-questions`);
    return response.data.hospitalEvaluationQuestionList;
};

type PostEvaluationReviewRequest = {
    hospitalId: string;
    questions: boolean[];
};
export const postEvalutaionReview = ({
    hospitalId,
    questions,
}: PostEvaluationReviewRequest) => {
    const evaluationAnswerList = questions.map((ans, idx) => {
        return {
            hospitalEvaluationQuestionId: idx + 1,
            answer: ans,
        };
    });

    return apiClient.post(`/hospitals/${hospitalId}/evaluation-reviews`, {
        hospitalEvaluationAnswerList: evaluationAnswerList,
    });
};

export const useEvaluationReviewMutation = (
    options?: UseMutationOptions<
        AxiosResponse<any>,
        unknown,
        PostEvaluationReviewRequest
    >,
) => {
    return useMutation<
        AxiosResponse<any>,
        unknown,
        PostEvaluationReviewRequest
    >({
        mutationFn: (req) => postEvalutaionReview(req),
        ...options,
    });
};
