import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, TextInput, Image } from 'react-native'
import { styles, text } from './MedSelectModalStyle'
import ModalMedListItem from './medListItem/ModalMedListItem'
import { ScrollView } from 'react-native-gesture-handler'
import { useTranslation } from 'react-i18next'
import { searchStoreContext } from '@/state/searchState'
import { useContext } from 'react'
import medStore from '@/state/medState/medStore'
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
}

const MedSelectModal: React.FC<MedSelectModalProps> = ({ onClose }) => {
    const { t } = useTranslation('medicine')
    const [selectedMed, setSelectedMed] = useState<MedListItem | null>(null)
    const [searchQuery, setSearchQuery] = useState('')
    const [data, setData] = useState<any>(null)

    //텍스트 인풋에서 받을 검색어
    const [searchInputValue, setSearchInputValue] = useState<string>('')
    //submit 상태에 따라 화면에 조건부 렌더링
    const [submit, setSubmit] = useState<boolean>(false)

    const store = useContext(searchStoreContext)
    //검색창 포커스 여부에 따라 placeholder 변화 주기 위해
    const [isFocused, setIsFocused] = useState<boolean>(false)

    useEffect(() => {
        // API 호출
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

    const handleSearch = () => {
        setSubmit(true)
        console.log('Searching for:', searchInputValue)
        store.setSearchTerm(searchInputValue)
    }

    const handleConfirm = () => {
        if (selectedMed) {
            medStore.setSelectedMed(selectedMed)
            onClose()
        }
    }

    const handleMedSelect = (item: MedListItem) => {
        setSelectedMed((prevSelectedMed) => {
            if (prevSelectedMed && prevSelectedMed.id === item.id) {
                // 동일한 항목을 다시 선택하면 선택 해제
                return null
            }
            // 새로운 항목 선택
            return item
        })
        console.log('Selected Med:', item.id, item.itemName)
    }

    const filteredMedList = data
        ? data.filter((med: { itemName: string }) =>
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
                        key={med.id}
                        item={med}
                        onPress={() => handleMedSelect(med)}
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
