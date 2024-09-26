import axios, { AxiosError } from 'axios';

export const sendAuthApi = async (): Promise<void> => {
  try {
    const apiUrl = 'api address';
    await axios.post(apiUrl);
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      throw new Error('Error while sending authentication request: ' + axiosError.message);
    } else {
      throw new Error('Unknown error occurred while sending authentication request.');
    }
  }
}
