import axios, { AxiosError } from 'axios';

interface ApiResponse {
  success: boolean;
  userId: number;
  nickname: string;
}

export const loginApi = async (email: string, password: string): Promise<ApiResponse> => {
  try {
    const response = await axios.post<ApiResponse>('api address', {
      email,
      password,
    });

    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      throw new Error('Error while logging in: ' + axiosError.message);
    } else {
      throw new Error('Unknown error occurred while logging in.');
    }
  }
};
