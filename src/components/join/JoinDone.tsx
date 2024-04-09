import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigation } from '@react-navigation/native'
import { TouchableOpacity, Text, View, Image } from 'react-native'
import { styles, text } from './JoinStyle'
import { ProfileStoreContext } from '@/state/signupState'
import { sendUserInfoApi } from '@/api/join/sendUserInfoApi'

export default function JoinDone() {
    const { t } = useTranslation('login-join')
    const navigation = useNavigation()
    const profileStore = useContext(ProfileStoreContext)

    const gotoNextScreen = () => {
        handleSendUserInfo
        navigation.navigate('Home' as never)
    }

    const handleSendUserInfo = async () => {
        try {
            const userInfo = {
                nickName: profileStore.nickName,
                imageUrl: profileStore.imageUrl,
                name: profileStore.name,
                birthYearMonth: profileStore.birthYearMonth,
                gender: profileStore.gender,
                email: profileStore.email,
                password: profileStore.password,
                isAdhd: profileStore.isAdhd,
            }

            await sendUserInfoApi(userInfo)
            console.log('User info sent successfully:', userInfo)
        } catch (error) {
            console.error('Error sending user info:', error)
        }
    }

    return (
        <View style={styles.JoinDone}>
            <View style={styles.JoinDoneContents}>
                <Image
                    source={require('@/public/assets/image.png')}
                    style={styles.photoPlaceholder}
                />
                <Text style={text.joinDoneText}>{t('join-finished')}</Text>
                <Text style={text.enjoyText}>{t('finished-enjoy-1')}</Text>
                <Text style={text.enjoyText}>{t('finished-enjoy-2')}</Text>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[styles.nextButton, { backgroundColor: '#52A55D' }]}
                    onPress={gotoNextScreen}
                >
                    <Text style={[text.buttonText, { color: '#FFF' }]}>
                        {t('finished-button')}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
