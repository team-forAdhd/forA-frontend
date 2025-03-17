import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, TextInput, Image } from 'react-native'
import { styles, text } from './MedSelectModalStyle'
import ModalMedListItem from './medListItem/ModalMedListItem'
import { ScrollView } from 'react-native-gesture-handler'
import { useTranslation } from 'react-i18next'
import { searchStoreContext } from '@/state/searchState'
import { useContext } from 'react'
//import medStore from '@/state/medState/medStore'
import { observer } from 'mobx-react-lite'
import { getMedListApi } from '@/api/medicine/medListApi'

interface MedListItem {
    id: number
    itemName: string
    itemImage: string
    itemEngName: string
    entpName: string
    favorite: boolean
}

interface MedSelectModalProps {
    onClose: () => void
    onSelectMed: (meds: MedListItem[]) => void
    //savedSelectedMed: MedListItem | null
    savedSelectedMed: MedListItem[]
}

const MedSelectModal: React.FC<MedSelectModalProps> = ({ onClose, onSelectMed, savedSelectedMed }) => {
    const { t } = useTranslation('medicine')
    const [selectedMed, setSelectedMed] = useState<MedListItem[]>(savedSelectedMed || []);
    const [searchQuery, setSearchQuery] = useState('')
    const [data, setData] = useState<any>(null)
    const [modalVisible, setModalVisible] = useState<boolean>(true);

    //텍스트 인풋에서 받을 검색어
    const [searchInputValue, setSearchInputValue] = useState<string>('')
    //submit 상태에 따라 화면에 조건부 렌더링
    const [submit, setSubmit] = useState<boolean>(false)

    const store = useContext(searchStoreContext)
    //검색창 포커스 여부에 따라 placeholder 변화 주기 위해
    const [isFocused, setIsFocused] = useState<boolean>(false)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const medicine = await getMedListApi()
                setData(medicine)
            } catch (error) {
                console.error('Error fetching medication data:', error)
            }
        }

        fetchData()
    }, [])

    useEffect(() => {
        console.log('모달 열릴 때 선택된 약:', savedSelectedMed); 
        if (savedSelectedMed && savedSelectedMed.length > 0) {
            setSelectedMed([...savedSelectedMed]);
        } else {
            setSelectedMed(() => []);
        }
        setTimeout(() => {
            console.log('업데이트된 selectedMed:', selectedMed);
        }, 100); // 상태 변경 후 로그를 찍어서 확인
    }, [modalVisible]); // 모달이 열릴 때마다 업데이트

    const handleSearch = () => {
        setSubmit(true)
        console.log('Searching for:', searchInputValue)
        store.setSearchTerm(searchInputValue)
    }

    const handleConfirm = () => {
        console.log("확인 버튼 눌림, 선택된 약:", selectedMed);
        if (selectedMed.length === 0) {
            console.warn("선택된 약 없음 상태 업데이트 확인 필요")
        }
        onSelectMed([...selectedMed]); 
        onClose()
    };

    const handleMedSelect = (item: MedListItem) => {
        setSelectedMed(prevSelectedMed => {
            if (!prevSelectedMed) return [item]

            const isAlreadySelected = prevSelectedMed.some(med => med.medicineId === item.medicineId);

            if (isAlreadySelected) {
                console.log("이미 선택된 약 제거:", item)
                return prevSelectedMed.filter(med => med.medicineId !== item.medicineId);
            } else {
                console.log("새로운 약 선택:", item)
                return [...prevSelectedMed, item]
            }
        })
        console.log('Selected Med 업데이트:', selectedMed);
    }

    const filteredMedList = data
        ? data.filter((med: { id: number; itemName: string }) =>
              med.itemName.toLowerCase().includes(searchQuery.toLowerCase()),
          )
        : []

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.close} onPress={onClose}>
                <Image
                    style={styles.IconImage}
                    source={require('@/public/assets/cancel-black.png')}
                />
            </TouchableOpacity>
            <View style={styles.header}>
                <View style={styles.search}>
                    <View style={styles.searchBar}>
                        <Image
                            style={styles.IconImage}
                            source={require('@/public/assets/greenSearch.png')}
                        />
                        <TouchableOpacity>
                            <TextInput
                                value={searchInputValue}
                                onChangeText={(text) => {
                                    setSubmit(false)
                                    setSearchInputValue(text)
                                }}
                                placeholder={
                                    isFocused
                                        ? ''
                                        : searchInputValue
                                          ? ''
                                          : t('search-modal')
                                }
                                onFocus={() => setIsFocused(true)}
                                onBlur={() => setIsFocused(false)}
                                returnKeyType="search" //키보드 완료 부분이 설정한 문자열로 보이게 설정
                                onSubmitEditing={handleSearch} //완료나 엔터 누른 경우 사용자 입력 처리 이벤트 핸들링
                                style={[
                                    styles.InputStyles,
                                    isFocused
                                        ? text.searchInput
                                        : text.searchInputPlaceholder,
                                ]}
                                selectionColor="#52A55D" //커서 색 변경
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                setSearchInputValue('')
                            }}
                        >
                            <Image
                                style={styles.IconImage}
                                source={require('@/public/assets/cancel.png')}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <ScrollView>
                {filteredMedList.map((med: MedListItem) => (
                    <ModalMedListItem
                        key={med.medicineId}
                        item={med}
                        onPress={() => handleMedSelect(med)}
                        isSelected={selectedMed.some(selected => selected.medicineId === med.medicineId)} 
                    />
                ))}
            </ScrollView>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                    <Text style={text.cancelText}>{t('search-cancel')}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={
                        selectedMed
                            ? styles.confirmButton
                            : styles.confirmDisableButton
                    }
                    disabled={!selectedMed}
                    onPress={handleConfirm}
                >
                    <Text style={text.confirmText}>{t('search-approve')}</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default observer(MedSelectModal)
