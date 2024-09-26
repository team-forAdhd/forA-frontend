import { View, TouchableOpacity, Image, Text, ScrollView } from 'react-native'
import { styles, text } from './evaluationFinishStyle'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import { useState, useContext } from 'react'
import { TextInput } from 'react-native-gesture-handler'
import { ProfileStoreContext } from '@/state/signupState'

interface EvaluationFinishProp {
    hospitalName: string
    setRibbonOpen: React.Dispatch<React.SetStateAction<boolean>>
    setFinish: React.Dispatch<React.SetStateAction<boolean>>
    score: number
    ribbonCount: number
}

export default function EvaluationFinish({
    hospitalName,
    score,
    ribbonCount,
    setRibbonOpen,
}: EvaluationFinishProp) {
    const navigation = useNavigation()

    //텍스트 인풋에서 받을 검색어
    const [inputValue, setInputValue] = useState<string>('')
    //아쉬운 점 제출 상태
    const [submit, setSubmit] = useState<boolean>(false)

    const store = useContext(ProfileStoreContext)

    const handleInput = () => {
        setSubmit(true)
    }

    const { t } = useTranslation('ribbonEvaluation')
    return (
        <View style={styles.container}>
            {' '}
            {submit && ( // 제출 버튼을 누른 경우 배경 변화와 모달
                <View style={styles.finishContainer}>
                    <View style={styles.modalContainer}>
                        <View style={styles.thanksContainer}>
                            <Text style={text.lastText}>
                                {t('last-thanks')}
                            </Text>
                        </View>
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate('Home' as never)
                            }}
                            style={styles.homeContainer}
                        >
                            <Text style={text.bottomButtonText}>
                                {t('go-home')}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
            {/*헤더 */}
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => {
                        setRibbonOpen(false)
                    }}
                >
                    <Image
                        source={require('@/public/assets/x.png')}
                        style={styles.IconImage}
                    />
                </TouchableOpacity>
                <Image
                    source={require('@/public/assets/ribbons.png')}
                    style={styles.Ribbons}
                />
                <View style={styles.IconImage} />
            </View>
            {/*포에이 리뷰 축하  */}
            <View
                style={
                    score > 5
                        ? styles.highTitleContainer
                        : styles.lowTitleContainer
                }
            >
                {score > 5 ? (
                    <Text style={{ textAlign: 'center' }}>
                        <Text style={text.hospitalText}>{hospitalName}</Text>
                        <Text style={text.questionText}>{t('to')}</Text>
                        <Text style={text.hospitalText}>
                            {ribbonCount + t('ribbon-count')}
                        </Text>
                        <Text style={text.questionText}>{t('thanks')}</Text>
                    </Text>
                ) : (
                    <Text style={{ textAlign: 'center' }}>
                        <Text style={text.hospitalText}>{store.nickName}</Text>
                        <Text style={text.questionText}>
                            {t('review-title')}
                        </Text>
                    </Text>
                )}
            </View>
            <View
                style={[
                    {
                        width: '100%',
                        alignItems: 'center',
                        position: 'absolute',
                        top: score > 5 ? 347 : 247,
                    },
                ]}
            >
                <Image
                    source={
                        score > 5
                            ? require('@/public/assets/finish1.png')
                            : require('@/public/assets/finish2.png')
                    }
                    style={
                        score > 5 ? styles.HighScoreImage : styles.lowScoreImage
                    }
                />
            </View>
            <View
                style={
                    score > 5
                        ? [styles.middleContainer, styles.highPosition]
                        : [styles.middleContainer, styles.lowPosition]
                }
            >
                <Text style={text.middleText}>
                    {score > 5
                        ? t('high-thanks')
                        : hospitalName + t('low-thanks')}
                </Text>
            </View>
            {score < 6 && ( //점수가 60점 미만인 경우 아쉬운점 수집
                <ScrollView
                    style={
                        inputValue
                            ? [
                                  styles.InputContainer,
                                  { borderColor: '#FF5D5D' },
                              ]
                            : [
                                  styles.InputContainer,
                                  { borderColor: '#949494' },
                              ]
                    }
                >
                    <TextInput
                        placeholder={t('place-holder')}
                        multiline={true}
                        numberOfLines={7}
                        value={inputValue}
                        onChangeText={(text) => {
                            setSubmit(false)
                            setInputValue(text)
                        }}
                        returnKeyType="search"
                        onSubmitEditing={handleInput}
                        style={styles.InputStyles}
                        selectionColor="#FF5D5D"
                        placeholderTextColor="#949494"
                        maxLength={500}
                    />
                    <Text style={text.inputCountText}>
                        {inputValue.length + '/500'}
                    </Text>
                </ScrollView>
            )}
            <View style={styles.bottomContainer}>
                <Text style={text.bottomText}>{t('bottom-thanks')}</Text>
            </View>
            <TouchableOpacity
                style={styles.buttonBottomContainer}
                onPress={() => {
                    score > 5 ? setRibbonOpen(false) : setSubmit(true)
                }}
            >
                <Text style={text.bottomButtonText}>
                    {score > 5 ? t('close') : t('opinion')}
                </Text>
            </TouchableOpacity>
        </View>
    )
}
