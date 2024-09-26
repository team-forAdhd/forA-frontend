import { useState, useContext, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigation } from '@react-navigation/native'
import { Text, TouchableOpacity, View, Image, Pressable } from 'react-native'
import { searchStoreContext } from '@/state/searchState'
import { styles, text } from './searchStyle'
import { TextInput } from 'react-native-gesture-handler'
import { Observer } from 'mobx-react'
import { getSearch } from '@/api/myPage/mycommentApi'

export default function SearchScreen() {
    //텍스트 인풋에서 받을 검색어
    const [searchInputValue, setSearchInputValue] = useState<string>('')
    //submit 상태에 따라 화면에 조건부 렌더링
    const [submit, setSubmit] = useState<boolean>(false)
    //검색 결과 리스트
    const [searchResultList, setSearchResultList] = useState([])

    const store = useContext(searchStoreContext)
    //검색창 포커스 여부에 따라 placeholder 변화 주기 위해
    const [isFocused, setIsFocused] = useState<boolean>(false)

    const { t } = useTranslation('search')

    const handleSearch = () => {
        setSubmit(true)
        console.log('Searching for:', searchInputValue)
        store.setSearchTerm(searchInputValue)
    }

    const navigation = useNavigation()

    useEffect(() => {
        const fetchMyComment = async () => {
            try {
                const commentData = await getSearch()
                console.log(commentData)
            } catch (error) {
                console.error(error)
            }
        }
        // fetchToken()
        fetchMyComment()
    }, [])
    useEffect(() => {
        submit && setSearchResultList([])
    }, [submit]) //제출 여부 변경시에 api호출
    return (
        <View style={styles.container}>
            {/*검색창과 취소 버튼 */}
            <View style={styles.header}>
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
                                      : t('search-input-placeholder')
                            }
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                            returnKeyType="search" //키보드 완료 부분이 설정한 문자열로 보이게 설정
                            onSubmitEditing={handleSearch} //완료나 엔터 누른 경우 사용자 입력 처리 이벤트 핸들링
                            style={styles.InputStyles}
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
                <TouchableOpacity
                    onPress={() => {
                        navigation.goBack()
                    }}
                >
                    <Text style={text.deleteText}>{t('cancel')}</Text>
                </TouchableOpacity>
            </View>
            {submit ? ( //검색을 한 경우
                searchResultList.length > 0 ? ( //검색 결과가 있는 경우
                    <View></View>
                ) : (
                    <View style={styles.noneSearchContainer}>
                        <Image
                            source={require('@/public/assets/none.png')}
                            style={styles.bigImage}
                        />
                        <Text style={text.baseText}>
                            {t('search-result-nothing')}
                        </Text>
                    </View> //검색 결과가 없는 경우
                )
            ) : (
                //검색 전
                <View style={styles.searchBeforeContainer}>
                    {/*최근 검색어와 모두지우기 버튼 */}
                    <View style={styles.recentSearchContainer}>
                        <Text style={text.recentSearchText}>
                            {t('recent-search-term')}
                        </Text>
                        <TouchableOpacity
                            onPress={() => {
                                store.deleteAll()
                            }}
                            style={styles.deleteAllContainer}
                        >
                            <Text style={text.deleteAllText}>
                                {t('delete-all')}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    {/*검색 기록 */}
                    <View style={styles.searchHistory}>
                        <Observer>
                            {() => (
                                <View>
                                    {store.recentSearchTerm.map(
                                        (search, index) => (
                                            <View
                                                key={index}
                                                style={
                                                    styles.recentSearchTermContainer
                                                }
                                            >
                                                <Text
                                                    style={
                                                        text.recentSearchValue
                                                    }
                                                >
                                                    {search}
                                                </Text>
                                                <TouchableOpacity
                                                    onPress={() => {
                                                        //누르면 삭제 되게끔
                                                        store.deleteSearchTerm(
                                                            search,
                                                        )
                                                    }}
                                                >
                                                    <Image
                                                        source={require('@/public/assets/searchHistory_cancel.png')}
                                                        style={
                                                            styles.searchHistiryCancel
                                                        }
                                                    />
                                                </TouchableOpacity>
                                            </View>
                                        ),
                                    )}
                                </View>
                            )}
                        </Observer>
                    </View>
                </View>
            )}
        </View>
    )
}
