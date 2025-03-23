import axios, { AxiosError, AxiosResponse } from 'axios';
import { API_URL } from '@env';

interface ApiResponse {
    isValidEmail: boolean;
}

export const checkExistingMemberApi = async (
    email: string,
): Promise<boolean> => {
    const response: AxiosResponse<ApiResponse> = await axios.get(
        `${API_URL}/api/v1/user/email-check?email=${email}`,
    );
    const isExistingMember = response.data.isValidEmail;

    return isExistingMember;
};
