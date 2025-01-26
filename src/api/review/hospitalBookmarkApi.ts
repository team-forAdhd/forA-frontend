import axios from 'axios'

export async function hospitalBookmarkApi(): Promise<void> {
    const API_URL = 'https://428d5c97-d536-4b2c-9520-a1f46ef5a2b0.mock.pstmn.io'

    try {
        const response = await axios.post(
            `${API_URL}/api/v1/hospitals/064377163e0611ef87e706a9c1a84c57/bookmark?bookmark=true`,
        )

        if (response.status === 200) {
            console.log('Bookmark Success')
        } else {
            console.log('Fail to bookmark: ', response.status)
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Axios Error:', error.message)
        } else {
            console.error('Unknown Error:', error)
        }
        throw error
    }
}
