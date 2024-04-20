import axios from 'axios';

export const checkAuthApi = async (authcode: string): Promise<boolean> => {
    try {
        const response = await axios.post('checkAuthApiURL', { authcode });
        return response.data.isValid;
    } catch (error) {
        console.error('Error while checking auth code: ', error);
        throw error;
    }
};
