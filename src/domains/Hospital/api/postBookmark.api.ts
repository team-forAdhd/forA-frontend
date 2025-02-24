import { MutationOptions, useMutation } from '@tanstack/react-query'
import { apiClient } from '../../../api/login/loginApi'
import { AxiosError, AxiosResponse } from 'axios'

interface BookmarkVariables {
    hospitalId: string
    bookmark: boolean
}

export const postBookmark = ({ hospitalId, bookmark }: BookmarkVariables) => {
    return apiClient.post(
        `/hospitals/${hospitalId}/bookmark?bookmark=${bookmark}`,
    )
}

export const useBookmarkMutation = (
    options?: MutationOptions<
        AxiosResponse<any>,
        AxiosError,
        BookmarkVariables
    >,
) => {
    return useMutation({
        mutationFn: postBookmark,
        ...options,
    })
}
