import { useState, useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { Text, TouchableOpacity, View, Image, Pressable } from 'react-native';
import { medSearchStoreContext } from '@/state/medSearchState';
import { styles, text } from './MedSearchStyle';
import { TextInput } from 'react-native-gesture-handler';
import { Observer } from 'mobx-react';
import { getMedSearchResult } from '@/api/medicine/medSearchApi';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/components/navigation';

type MedSearchScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    'MedSearchResult'
>;
export default function MedSearchScreen() {
    const navigation = useNavigation<MedSearchScreenNavigationProp>();
    const navigationG = useNavigation();

    //텍스트 인풋에서 받을 검색어
    const [searchInputValue, setSearchInputValue] = useState<string>('');
    //submit 상태에 따라 화면에 조건부 렌더링
    const [submit, setSubmit] = useState<boolean>(false);
    //검색 결과 리스트
    const [searchResultList, setSearchResultList] = useState([]);

    const store = useContext(medSearchStoreContext);
    //검색창 포커스 여부에 따라 placeholder 변화 주기 위해
    const [isFocused, setIsFocused] = useState<boolean>(false);

    const { t } = useTranslation('search');

    const handleSearch = async () => {
        setSubmit(true);
        store.setSearchTerm(searchInputValue);
        const result = await getMedSearchResult(searchInputValue);
        setSearchResultList(result);
    };

    const handlePressRecentSearch = async (search: string) => {
        setSubmit(true);
        const result = await getMedSearchResult(search);
        setSearchResultList(result);
    };

    useEffect(() => {
        if (submit) {
            if (searchResultList.length > 0) {
                // 검색 결과가 있을 경우 MedSearchResult로 이동
                navigation.navigate('MedSearchResult', {
                    resultList: searchResultList,
                    searchInputValue: searchInputValue,
                });
            }
        }
    }, [submit, searchResultList]); // submit 또는 searchResultList가 변경될 때마다 실행

    useEffect(() => {
        submit && setSearchResultList([]);
    }, [submit]); //제출 여부 변경시에 api호출
    // medsearchapi 호출

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
                                setSubmit(false);
                                setSearchInputValue(text);
                            }}
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
                            setSearchInputValue('');
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
                        navigationG.goBack();
                    }}
                >
                    <Text style={text.deleteText}>{t('cancel')}</Text>
                </TouchableOpacity>
            </View>
            {submit ? ( // 검색을 한 경우
                searchResultList.length === 0 ? (
                    // 검색 결과가 없는 경우 UI 처리
                    <View style={styles.noneSearchContainer}>
                        <Image
                            source={require('@/public/assets/none.png')}
                            style={styles.bigImage}
                        />
                        <Text style={text.baseText}>
                            {t('search-result-nothing')}
                        </Text>
                    </View>
                ) : null
            ) : (
                //검색 전
                <View style={styles.searchBeforeContainer}>
                    {/*최근 검색어와 모두지우기 버튼 */}
                    <View style={styles.recentSearchContainer}>
                        <Text style={text.medRecentSearchText}>
                            {t('recent-search-term')}
                        </Text>
                        <TouchableOpacity
                            onPress={() => {
                                store.deleteAll();
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
                                            <TouchableOpacity
                                                onPress={() =>
                                                    handlePressRecentSearch(
                                                        search,
                                                    )
                                                }
                                                key={index}
                                                style={styles.recentSearchBox}
                                            >
                                                <Text
                                                    style={
                                                        text.medRecentSearchValue
                                                    }
                                                >
                                                    {search}
                                                </Text>
                                            </TouchableOpacity>
                                        ),
                                    )}
                                </View>
                            )}
                        </Observer>
                    </View>
                </View>
            )}
        </View>
    );
}
