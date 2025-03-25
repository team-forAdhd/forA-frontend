import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { styles, text } from './pharmacyItemStyles';
import { medBookmarkApi } from '@/api/medicine/medBookmarkApi';

type Pharmacy = {
    id: number;
    name: string;
    engName: string;
    manufacturer: string;
    images: string;
    favorite: boolean;
};

interface PharmacyItemProps {
    pharmacies: Pharmacy[];
    setSavedPharmacies: React.Dispatch<React.SetStateAction<Pharmacy[]>>;
}

export default function PharmacyItem({
    pharmacies,
    setSavedPharmacies,
}: PharmacyItemProps) {
    const handleBookmarkToggle = async (medId: number) => {
        try {
            const response = await medBookmarkApi(medId);
            setSavedPharmacies((prev) =>
                prev.map((pharmacy) =>
                    pharmacy.id === medId
                        ? { ...pharmacy, favorite: !pharmacy.favorite }
                        : pharmacy,
                ),
            );
        } catch {
            console.error('북마크 변경 실패:', error);
        }
    };

    return (
        <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
            {pharmacies.length > 0 ? (
                pharmacies.map((pharmacy) => (
                    <View key={pharmacy.id} style={styles.pharmacyContainer}>
                        <Image
                            source={{ uri: pharmacy.images }}
                            style={styles.image}
                        />
                        <View style={styles.infoContainer}>
                            <Text style={text.name}>
                                {pharmacy.name || '이름 없음'}
                            </Text>
                            <Text style={text.engName}>
                                {pharmacy.engName || '영문 이름 없음'}
                            </Text>
                            <Text style={text.manufacturer}>
                                {pharmacy.manufacturer || '제조사 없음'}
                            </Text>
                        </View>
                        <TouchableOpacity
                            style={styles.bookmarkButton}
                            onPress={() => handleBookmarkToggle(pharmacy.id)}
                        >
                            <Image
                                source={require('@/public/assets/bookmark.png')}
                                style={styles.bookmarkIcon}
                            />
                        </TouchableOpacity>
                    </View>
                ))
            ) : (
                <Text style={text.emptyText}>저장된 약이 없습니다.</Text>
            )}
        </ScrollView>
    );
}
