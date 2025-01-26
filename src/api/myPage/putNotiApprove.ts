import AsyncStorage from '@react-native-async-storage/async-storage'
import { apiClient } from '../login/loginApi'

interface PushNotificationApproval {
    pushNotificationApprovalId: number
    approved: boolean
}

const updatePushNotificationApprovals = async (approvalData: {
    pushNotificationApprovals: PushNotificationApproval[]
}) => {
    try {
        const response = await apiClient.put(
            `/user/push-notification-approvals`,
            approvalData,
        )
        console.log('Push notification approval updated:', response.status)
        return response.data
    } catch (error) {
        console.error('Error updating push notification approval:', error)
        throw error
    }
}

export default updatePushNotificationApprovals
