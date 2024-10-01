import axios from 'axios';
import { API_URL } from '@env';
import userStore from '@/store/userStore/userStore';

// 이미지 파일을 Blob으로 변환하는 함수
const getBlob = async (uri: string): Promise<Blob> => {
  const response = await fetch(uri);
  const blob = await response.blob();
  return blob;
};


export const uploadImageApi = async (imageFile: any, imagePathPrefix: string = 'DEFAULT_IMAGE') => {
  const formData = new FormData();

  try {
    // 파일의 URI로 Blob 변환
    const imageBlob = await getBlob(imageFile.uri);

    // FormData에 이미지 파일 추가 (Blob 형식으로 추가)
    formData.append('imageFileList', imageBlob, imageFile.name || `photo_${Date.now()}.jpg`);

    // 추가 정보 설정
    formData.append('request', JSON.stringify({ imagePathPrefix }));

    const response = await axios.post(`${API_URL}/api/v1/images`, formData, {
      headers: {
        'Authorization': `Bearer ${userStore.accessToken}`,
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Image upload failed: Error while trying to upload the image:', error);
    throw error;
  }
};
