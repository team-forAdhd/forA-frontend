import AsyncStorage from '@react-native-async-storage/async-storage'
import { apiClient } from '../login/loginApi'

const getUser = async () => {
    try {
        const token = await AsyncStorage.getItem('accessToken')
        const response = await apiClient.get(`/user`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        //console.log(response.data)
        return response.data
    } catch (error) {
        console.error('Error fetching comments:', error)
        throw error
    }
}

export default getUser
