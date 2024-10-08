import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';


interface Doctor {
    doctorId: string,
    name: string,
    image: string,
}

export const getDoctorsApi = async (): Promise<Doctor[]> => {
    const API_URL = 'https://428d5c97-d536-4b2c-9520-a1f46ef5a2b0.mock.pstmn.io'
    
    try {
        const token = await AsyncStorage.getItem('accessToken')
        const response = await axios.get(
            `${API_URL}/api/v1/hospitals/064377163e0611ef87e706a9c1a84c57/doctors/brief`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            },
        )

        if (response.status === 200) {
            console.log('Success: ', response.data)
        } else {
            console.log('Fail to get doctor list: ', response.status)
        }
        
        return response.data.doctorList;

    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Axios Error:', error.message);
        } else {
            console.error('Unknown Error:', error);
        }
        throw error
    }
};
