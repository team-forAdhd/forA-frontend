import AsyncStorage from '@react-native-async-storage/async-storage'
import { apiClient } from '../login/loginApi'

export const getMedListApi = async () => {
    try {
        const response = await apiClient.get(`/medicines/sorted`)
        if (response.status === 200) {
            console.log('약 목록 불러오기 성공')

            return response.data.medicineList
        } else {
            console.log('응답 실패, 상태 코드:', response.status)
        }
    } catch (error) {
        console.error('Error fetching medicine list:', error)
        throw error
    }
}

export const getSingleMedInfoApi = async (medId: number) => {
    try {
        const response = await apiClient.get(`/medicines/${medId}`)

        if (response.status === 200) {
            console.log(`약 상세정보 불러오기 성공 (Med Id: ${medId})`)

            return response.data
        } else {
            console.log('응답 실패, 상태 코드:', response.status)
        }
    } catch (error) {
        console.error('Error fetching single medication info:', error)
        throw error
    }
}

export const getMedListByIngredientApi = async (ingredientType: string) => {
    try {
        const response = await apiClient.get(
            `/medicines/sorted-by-ingredient?ingredientType=${ingredientType}`,
            {
                params: { ingredientType },
            },
        )

        return response.data.medicineList
    } catch (error) {
        console.error('Error fetching medicine list by ingredient:', error)
        return []
    }
}
