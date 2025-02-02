import { apiClient } from '../login/loginApi'

const getUser = async () => {
    try {
        const response = await apiClient.get(`/user`)
        return response.data
    } catch (error) {
        console.error('Error fetching comments:', error)
        throw error
    }
}

export default getUser
