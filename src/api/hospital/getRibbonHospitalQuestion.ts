///api/v1/hospitals/evaluation-questions

import AsyncStorage from '@react-native-async-storage/async-storage'
import { apiClient } from '../login/loginApi'

export const getRibbonHospitalQuestion = async () => {
    try {
        const token = await AsyncStorage.getItem('accessToken')
        const response = await apiClient.get(
            `/hospitals/evaluation-questions`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        )
        if (response.status === 200) {
            console.log(
                '응답 성공:',
                response.data.hospitalEvaluationQuestionList,
            )
        } else {
            console.log('응답 실패, 상태 코드:', response.status)
        }
        return response.data.hospitalEvaluationQuestionList
    } catch (error) {
        console.error('Error fetching comments:', error)
        throw error
    }
}
