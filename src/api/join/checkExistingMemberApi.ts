import axios, { AxiosError, AxiosResponse } from 'axios';

interface ApiResponse {
  isExistingMember: boolean;
}

export const checkExistingMemberApi = async (email: string): Promise<boolean> => {
  try {
    const apiUrl = 'api address';
    const response: AxiosResponse<ApiResponse> = await axios.post(apiUrl, { email });
    const isExistingMember = response.data.isExistingMember;

    return isExistingMember;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      throw new Error('Error while checking existing member: ' + axiosError.message);
    } else {
      throw new Error('Unknown error occurred while checking existing member.');
    }
  }
}
