import { apiClient } from '../login/loginApi'

export const getSavedHospitals = async (sort: 'createdAt' | 'desc') => {
    try {
        const response = await apiClient.get(
            `/hospitals/bookmark?page=0&size=10&sort=${sort}`,
        )
        return response.data
    } catch (error) {
        console.error('Error fetching comments:', error)
        throw error
    }
}
