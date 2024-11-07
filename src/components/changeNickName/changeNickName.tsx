import { useTranslation } from 'react-i18next'
import { View, Text, Image, TouchableOpacity, TextInput } from 'react-native'
import { styles, text } from './changeNickNameStyle'
import { useNavigation } from '@react-navigation/native'
import { useContext, useEffect } from 'react'
import { ProfileStoreContext } from '@/state/signupState'

export default function ChangeNickName() {
    const store = useContext(ProfileStoreContext)

    const { t } = useTranslation('AccountSettings')

    const navigation = useNavigation()

    useEffect(() => {
        console.log(store)
    })


    return (
        <View style={styles.container}>
            {/*헤더 */}
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => {
                        navigation.goBack()
                    }}
                >
                    <Image
                        source={require('@/public/assets/back.png')}
                        style={styles.IconImage}
                    />
                </TouchableOpacity>
            </View>
            {/* 배경에 깔리는 회색 배경  */}
            <View style={styles.grayContainer}></View>
            {/* 닉네임 변경 */}
            <View style={styles.whiteContainer}>
                <View style={styles.mainContainer}>
                    <Text style={text.nicknameTitleText}>
                        {t('input-prompt')}
                    </Text>
                    <View style={styles.nickNameContainer}>
                        <Text style={text.nicknameText}>
                            {t('label-nickname')}
                        </Text>
                        <TextInput
                            style={styles.inputContainer}
                            placeholder={store.nickname}
                            caretHidden={true}
                            onChangeText={store.setNickName}
                        />
                    </View>
                </View>
            </View>
            {/*다음 버튼 */}
            <TouchableOpacity
                style={styles.nextButton}
                onPress={() => {
                    //서버에 업데이트
                    navigation.goBack() //닉네임이 변경 됐으면 원래 화면으로 돌아가도록
                }}
            >
                <Text style={text.buttonText}>{t('button-next')}</Text>
            </TouchableOpacity>
        </View>
    )
}
