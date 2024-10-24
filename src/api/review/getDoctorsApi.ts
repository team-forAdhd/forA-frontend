import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { apiClient } from '../login/loginApi'


interface Doctor {
    doctorId: string,
    name: string,
    image: string,
}

export const getDoctorsApi = async (hospitalId: string) => {
    try {
        const token = await AsyncStorage.getItem('accessToken')
        const response = await apiClient.get(`/hospitals/${hospitalId}/doctors/brief`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )

        if (response.status === 200) {
            console.log('의사 목록 조회 성공')

            return response.data.doctorList;
        } else {
            console.log('응답 실패, 상태 코드:', response.status)
        }

    } catch (error) {
        console.log('Error pressing bookmark: ', error)
        throw error
    }
};
