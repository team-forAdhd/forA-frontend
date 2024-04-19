import React from 'react'
import { useTranslation } from 'react-i18next'
import { TouchableOpacity, Text, View, TextInput, Image } from 'react-native'
import { styles, text } from './LoginStyle'
import { ArrowIcon, TitleTextIcon } from '@/public/assets/SvgComponents'
import { useNavigation } from '@react-navigation/native'
import { loginApi } from '@/api/loginApi'

export default function LoginScreen() {
    const { t } = useTranslation('login-join')
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')

    const navigation = useNavigation()
    const loginFinished = () => {
        // navigation.navigate('화면이름')
    }
    const gotoJoinScreen = () => {
        // navigation.navigate('화면이름')
    }
    const gotoFindPasswordScreen = () => {
        // navigation.navigate('화면이름')
    }
    const handleLogin = async () => {
        try {
            const response = await loginApi(email, password)
            if (response.success) {
                // navigation.navigate('Home')
            } else {
            }
        } catch (error) {
            console.error('Error while logging in:', error)
        }
    }
    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.header}
                onPress={() => console.log('Home Button pressed')}
            >
                <ArrowIcon />
            </TouchableOpacity>
            <View style={styles.title}>
                <Text style={text.titleText}>{t('intro')}</Text>
                <TitleTextIcon />
            </View>
            <View style={styles.contents}>
                <View style={styles.inputContainer}>
                    <Text style={text.inputTitleText}>{t('login-id')}</Text>
                    <TextInput
                        style={text.inputText}
                        placeholder={t('login-id-input')}
                        caretHidden={true}
                        value={email}
                        onChangeText={setEmail}
                    />
                    <View style={styles.inputBar} />
                    <Text style={text.inputTitleText}>
                        {t('login-password')}
                    </Text>
                    <TextInput
                        style={text.inputText}
                        placeholder={t('login-password-input')}
                        secureTextEntry={true}
                        caretHidden={true}
                        value={password}
                        onChangeText={setPassword}
                    />
                    <View style={styles.inputBar} />
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.loginButton}
                        onPress={handleLogin}
                    >
                        <Text style={text.buttonText}>{t('login-button')}</Text>
                    </TouchableOpacity>
                    <View style={styles.buttonRow}>
                        <TouchableOpacity
                            style={styles.joinButton}
                            onPress={() => console.log('Join Button pressed')}
                        >
                            <Text style={text.bottomText}>
                                {t('join-button')}
                            </Text>
                        </TouchableOpacity>
                        <View style={styles.bar} />
                        <TouchableOpacity
                            style={styles.passwordButton}
                            onPress={() =>
                                console.log('Find Password Button pressed')
                            }
                        >
                            <Text style={text.bottomText}>
                                {t('password-button')}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={styles.social}>
                <View style={styles.socialRow}>
                    <View style={styles.socialBar} />
                    <Text style={text.socialText}>{t('login-social')}</Text>
                    <View style={styles.socialBar} />
                </View>
                <View style={styles.iconRow}>
                    <TouchableOpacity
                        style={styles.icon}
                        onPress={() => console.log('Kakao Icon pressed')}
                    >
                        <Image
                            source={require('@/public/assets/sns-kakao.png')}
                            style={styles.icon}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.icon}
                        onPress={() => console.log('Naver Icon pressed')}
                    >
                        <Image
                            source={require('@/public/assets/sns-naver.png')}
                            style={styles.icon}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.icon}
                        onPress={() => console.log('Facebook Icon pressed')}
                    >
                        <Image
                            source={require('@/public/assets/sns-facebook.png')}
                            style={styles.icon}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.icon}
                        onPress={() => console.log('Apple Icon pressed')}
                    >
                        <Image
                            source={require('@/public/assets/sns-apple.png')}
                            style={styles.icon}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}
