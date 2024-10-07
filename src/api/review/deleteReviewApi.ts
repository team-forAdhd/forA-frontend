import axios from 'axios';


export async function deleteReviewApi(hospitalReceiptReviewId: string): Promise<void> {
    try {
        await axios.delete(`/api/hospitals/receipt-reviews/${hospitalReceiptReviewId}`)
    } catch (error) {
        throw new Error('Failed to delete receipt review')
    }
}
