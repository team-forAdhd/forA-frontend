import axios from 'axios';
import { API_URL } from '@env';
import userStore from '@/store/userStore/userStore';

export const getMedListApi = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/v1/medicines/sorted?tabletType=SOFT_CAPSULE`, {
      headers: {
        Authorization: `Bearer ${userStore.accessToken}`,
      },
    });
    console.log('API response', response.data)
    return response.data.medicineList.map((med: { id: number; itemName: string; entpName: string; itemImage: string; drugShape: string; colorClass1: string; itemEngName: string; fromCodeName: string; rating: number; favorite: boolean; }) => ({
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

export const getSingleMedInfoApi = async (medId: number) => {
  try {
    const response = await axios.get(`${API_URL}/api/v1/medicines/${medId}`);
    return response.data;
} catch (error) {
    console.error('Error fetching single medication info:', error);
    throw error;
}
}

export const getMedListByIngredientApi = async (ingredientType: string) => {
  try {
    const response = await axios.get(`${API_URL}/api/v1/medicines/sorted-by-ingredient`, {
      params: { ingredientType },
      headers: {
        Authorization: `Bearer ${userStore.accessToken}`,
      },
    });
    return response.data.medicineList.map((med: { itemName: string; entpName: string; itemImage: string; drugShape: string; colorClass1: string; itemEngName: string; fromCodeName: string; rating: number; favorite: boolean; }) => ({
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
    console.error('Error fetching medicine list by ingredient:', error);
    return [];
  }
};
