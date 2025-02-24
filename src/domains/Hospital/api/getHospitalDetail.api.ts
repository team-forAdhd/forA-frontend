import { useQuery } from '@tanstack/react-query'
import { apiClient } from '../../../api/login/loginApi'

type getHospitalDetailVariables = {
    hospitalId: string
    latitude: number
    longitude: number
}
export const getHospitalDetail = async ({
    hospitalId,
    latitude,
    longitude,
}: getHospitalDetailVariables) => {
    console.log('뭐여', hospitalId, latitude, longitude)
    const { data } = await apiClient.get(
        `/hospitals/${hospitalId}?latitude=${latitude}&longitude=${longitude}`,
    )
    return data
}
export const useHospitalDetail = ({
    hospitalId,
    latitude,
    longitude,
}: getHospitalDetailVariables) => {
    return useQuery({
        queryKey: ['hospitalDetail', hospitalId],
        queryFn: () => getHospitalDetail({ hospitalId, latitude, longitude }),
        staleTime: 30 * 60 * 1000,
    })
}
