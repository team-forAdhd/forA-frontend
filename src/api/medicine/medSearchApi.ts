import axios from 'axios';
import { API_URL } from '@env';
import userStore from '@/store/userStore/userStore';

export const getMedSearchResult = async (itemName: string) => {
  try {
    const response = await axios.get(`${API_URL}/api/v1/medicines/search?itemName=${itemName}`, {
      params: { itemName },
      headers: {
        Authorization: `Bearer ${userStore.accessToken}`,
      },
    });
    return response.data.data.map((med: { id: number; itemImage?: string; itemName: string; entpName: string; itemEngName: string;}) => ({
        id: med.id,
        itemImage: med.itemImage || 'https://nedrug.mfds.go.kr/pbp/cmn/itemImageDownload/147427768615900053',
        itemName: med.itemName,
        entpName: med.entpName,
        itemEngName: med.itemEngName,
    }));

  } catch (error) {
    console.error('Error fetching medicine list:', error);
    return [];
  }
};

export const getShapeColorSearchResult = async (shape: string, tabletType: string, color: string) => {
  try {
    // 쿼리 파라미터를 동적으로 추가
    let queryParams = [];

    if (shape) {
      queryParams.push(`shape=${encodeURIComponent(shape)}`);
    }
    if (color) {
      queryParams.push(`color1=${encodeURIComponent(color)}`);
    }
    if (tabletType) {
      queryParams.push(`tabletType=${encodeURIComponent(tabletType)}`);
    }

    // 셋 중 하나는 반드시 있음
    const queryString = queryParams.length > 0 ? `?${queryParams.join('&')}` : '';

    const response = await axios.get(`${API_URL}/api/v1/medicines/sorted${queryString}`, {
      headers: {
        Authorization: `Bearer ${userStore.accessToken}`,
      },
    });

    return response.data.medicineList.map((med: {
      id: number;
      itemName: string;
      entpName: string;
      itemImage: string;
      drugShape: string;
      colorClass1: string;
      itemEngName: string;
      fromCodeName: string;
      rating: number;
      favorite: boolean;
    }) => ({
      id: med.id,
      itemName: med.itemName,
      entpName: med.entpName,
      itemImage: med.itemImage || 'https://nedrug.mfds.go.kr/pbp/cmn/itemImageDownload/147427768615900053',
      drugShape: med.drugShape,
      colorClass1: med.colorClass1,
      itemEngName: med.itemEngName,
      fromeCodeName: med.fromCodeName,
      rating: med.rating,
      favorite: med.favorite,
    }));

  } catch (error) {
    console.error('Error fetching medicine list:', error);
    return [];
  }
};


export const getMedRecentSearchApi = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/v1/medicines/recent-searches`, {
      headers: {
        Authorization: `Bearer ${userStore.accessToken}`,
      },
    });
    return response.data;

  } catch (error) {
    console.error('Error fetching recent searches:', error);
    return [];
  }
};

export const deleteMedRecentSearchApi = async (searchId: number) => { // searchId가 아닌, 각 검색어 인덱스 배열 num
  try {
    const response = await axios.delete(`${API_URL}/api/v1/medicines/recent-searches/${searchId}`, {
      headers: {
        Authorization: `Bearer ${userStore.accessToken}`,
      },
    });
    return response.data;

  } catch (error) {
    console.error('Error deleting recent search:', error);
    return null;
  }
};
