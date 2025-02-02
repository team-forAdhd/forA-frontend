import axios from 'axios'
import { API_URL } from '@env'
import userStore from '@/store/userStore/userStore'
import { Alert, Platform } from 'react-native'

// 이미지 파일을 Blob으로 변환하는 함수
const getBlob = async (uri: string): Promise<Blob> => {
    const response = await fetch(uri)
    const blob = await response.blob()
    return blob
}

export const uploadImageApi = async (
    imageFile: any,
    imagePathPrefix: string = 'DEFAULT_IMAGE',
) => {
    try {
        const formData = new FormData()
        // 파일의 URI로 Blob 변환
        // Blob을 FormData에 추가 (파일 객체로 처리)
        formData.append('imageFileList', {
            uri: imageFile.uri,
            name: imageFile.fileName,
            type: imageFile.mimeType,
        } as any)

        // 추가 데이터 설정 (JSON 데이터)
        formData.append('request', JSON.stringify({}))

        // 서버에 POST 요청 보내기
        const response = await fetch(`${API_URL}/api/v1/files/images`, {
            method: 'POST',
            body: formData,
        })

        if (response.ok) {
            const data = await response.json()
            return data
        }

        const result = await response.text()
        Alert.alert('이미지 업로드에 실패했습니다. 다시 시도해 주세요')
        throw new Error(result)
    } catch (error) {
        console.error('이미지 업로드 실패:', error)
        throw error
    }
}
