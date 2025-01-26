///api/v1/posts/scraps?category=TWENTIES&sortOption=NEWEST_FIRST
import { apiClient } from '../login/loginApi'

export const getSavedPosts = async (
    category: string,
    sortOption: 'NEWEST_FIRST' | 'OLDEST_FIRST',
) => {
    try {
        const response = await apiClient.get(
            `/posts/scraps?category=${category}&sortOption=${sortOption}`,
        )
        return response.data.postList
    } catch (error) {
        console.error('Error fetching comments:', error)
        throw error
    }
}
