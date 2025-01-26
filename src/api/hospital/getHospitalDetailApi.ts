import { apiClient } from '../login/loginApi'

export const getHospitalDetails = async (
    hospitalId: string,
    latitude: number,
    longitude: number,
) => {
    try {
        const response = await apiClient.get(
            `/hospitals/${hospitalId}?latitude=${latitude}&longitude=${longitude}`,
        )
        if (response.status === 200) {
            console.log('병원 상세 응답 성공:', response.data)
        } else {
            console.log('응답 실패, 상태 코드:', response.status)
        }
        return response.data
    } catch (error) {
        console.error('Error fetching comments:', error)
        throw error
    }
}
