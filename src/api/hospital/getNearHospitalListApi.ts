import AsyncStorage from '@react-native-async-storage/async-storage'
import { apiClient } from '../login/loginApi'

export const getNearHospitals = async (
    latitude: number,
    longitude: number,
    radius: number,
    page: number,
    size: number,
    sort: string, // 기본적으로 'reviewCount,desc' 사용
    filter: string, // 기본적으로 'ALL' 사용
) => {
    try {
        const response = await apiClient.get(
            `/hospitals/nearby?latitude=${latitude}&longitude=${longitude}&radius=${radius}&page=${page}&size=${size}&sort=${sort}&filter=${filter}`,
        )
        if (response.status === 200) {
            console.log('응답 성공:', response.data)
        } else {
            console.log('응답 실패, 상태 코드:', response.status)
        }
        return response.data.hospitalList
    } catch (error) {
        console.error('Error fetching comments:', error)
        throw error
    }
}
