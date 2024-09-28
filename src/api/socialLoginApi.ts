import axios, { AxiosError } from 'axios';
import { API_URL } from '@env';

export interface ApiResponse {
  accessToken: string;
  refreshToken: string;
  hasVerifiedEmail: boolean;
  hasProfile: boolean;
}

export const naverLoginApi = async (): Promise<ApiResponse> => {
  try {
    const response = await axios.post<ApiResponse>(`${API_URL}/oauth2/authorization/naver`, {
    }, {
      headers: {
        'Content-Type' : 'application/json'
      },
      timeout: 5000, // 5초 타임아웃
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

export const kakaoLoginApi = async (): Promise<ApiResponse> => {
    try {
      const response = await axios.post<ApiResponse>(`${API_URL}/oauth2/authorization/kakao`, {
      }, {
        headers: {
          'Content-Type' : 'application/json'
        },
        timeout: 5000, // 5초 타임아웃
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

  export const googleLoginApi = async (): Promise<ApiResponse> => {
    try {
      const response = await axios.post<ApiResponse>(`${API_URL}/oauth2/authorization/google`, {
      }, {
        headers: {
          'Content-Type' : 'application/json'
        },
        timeout: 5000, // 5초 타임아웃
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

  export const appleLoginApi = async (): Promise<ApiResponse> => {
    try {
      const response = await axios.post<ApiResponse>(`${API_URL}/oauth2/authorization/apple`, {
      }, {
        headers: {
          'Content-Type' : 'application/json'
        },
        timeout: 5000, // 5초 타임아웃
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