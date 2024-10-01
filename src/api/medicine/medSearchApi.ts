import axios from 'axios';
import { API_URL } from '@env';
import userStore from '@/store/userStore/userStore';

export const getMedSearchResult = async (itemName: string) => {
  try {
    const response = await axios.get(`${API_URL}/api/v1/medicines/search`, {
      params: { itemName },
      headers: {
        Authorization: `Bearer ${userStore.accessToken}`,
      },
    });
    return response.data.data.map((med: { itemImage?: string; itemName: string; entpName: string; itemEngName: string;}) => ({
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
