import React, { useState, useTransition } from 'react'
import { View, Text, TouchableOpacity, TextInput, Image } from 'react-native'
import { styles, text } from './MedSelectModalStyle'
import ModalMedListItem from './medListItem/ModalMedListItem'
import { ScrollView } from 'react-native-gesture-handler'
import { useTranslation } from 'react-i18next'
import { searchStoreContext } from '@/state/searchState'
import { useContext } from 'react'
import medStore from '@/state/medState/medStore'
import { observer } from 'mobx-react-lite'

interface MedListItem {
    medId: number
    itemName: string
    itemImage: string
    itemEngName: string
    entpName: string
}

interface MedSelectModalProps {
    onClose: () => void
}

const medList: MedListItem[] = [
    {
        medId: 1,
        itemName: '도모틴캡술 10mg',
        itemImage:
            'https://nedrug.mfds.go.kr/pbp/cmn/itemImageDownload/147426592401600111',
        itemEngName: 'Domotine Cap, 10mg',
        entpName: '㈜한국파마',
    },
    {
        medId: 2,
        itemName: '도모틴캡술 10mg',
        itemImage:
            'https://nedrug.mfds.go.kr/pbp/cmn/itemImageDownload/147426592401600111',
        itemEngName: 'Domotine Cap, 10mg',
        entpName: '㈜한국파마',
    },
    {
        medId: 3,
        itemName: '도모틴캡술 10mg',
        itemImage:
            'https://nedrug.mfds.go.kr/pbp/cmn/itemImageDownload/147426592401600111',
        itemEngName: 'Domotine Cap, 10mg',
        entpName: '㈜한국파마',
    },
    {
        medId: 1,
        itemName: '도모틴캡술 10mg',
        itemImage:
            'https://nedrug.mfds.go.kr/pbp/cmn/itemImageDownload/147426592401600111',
        itemEngName: 'Domotine Cap, 10mg',
        entpName: '㈜한국파마',
    },
    {
        medId: 2,
        itemName: '도모틴캡술 10mg',
        itemImage:
            'https://nedrug.mfds.go.kr/pbp/cmn/itemImageDownload/147426592401600111',
        itemEngName: 'Domotine Cap, 10mg',
        entpName: '㈜한국파마',
    },
    {
        medId: 3,
        itemName: '도모틴캡술 10mg',
        itemImage:
            'https://nedrug.mfds.go.kr/pbp/cmn/itemImageDownload/147426592401600111',
        itemEngName: 'Domotine Cap, 10mg',
        entpName: '㈜한국파마',
    },
    // 추가 항목들...
]

const MedSelectModal: React.FC<MedSelectModalProps> = ({ onClose }) => {
    const { t } = useTranslation('medicine')
    const [selectedMed, setSelectedMed] = useState<MedListItem | null>(null)
    const [searchQuery, setSearchQuery] = useState('')
    //텍스트 인풋에서 받을 검색어
    const [searchInputValue, setSearchInputValue] = useState<string>('')
    //submit 상태에 따라 화면에 조건부 렌더링
    const [submit, setSubmit] = useState<boolean>(false)

    const store = useContext(searchStoreContext)
    //검색창 포커스 여부에 따라 placeholder 변화 주기 위해
    const [isFocused, setIsFocused] = useState<boolean>(false)

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

    // const handleMedSelect = (item: MedListItem) => {
    //     setSelectedMed(item)
    //     // 선택한 항목의 medId와 itemName을 모달을 사용할 컴포넌트에 전달
    //     console.log('Selected Med:', item.medId, item.itemName)
    // }

    const handleMedSelect = (item: MedListItem) => {
        setSelectedMed((prevSelectedMed) => {
            if (prevSelectedMed && prevSelectedMed.medId === item.medId) {
                // 동일한 항목을 다시 선택하면 선택 해제
                return null
            }
            // 새로운 항목 선택
            return item
        })
        console.log('Selected Med:', item.medId, item.itemName)
    }

    const filteredMedList = medList.filter((med) =>
        med.itemName.toLowerCase().includes(searchQuery.toLowerCase()),
    )

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
                {filteredMedList.map((med) => (
                    <ModalMedListItem
                        key={med.medId}
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
