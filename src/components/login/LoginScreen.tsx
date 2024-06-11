import React, { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
    TouchableOpacity,
    Text,
    View,
    TextInput,
    Image,
    Modal,
} from 'react-native'
import { styles, text } from './LoginStyle'
import { ArrowIcon, TitleTextIcon } from '@/public/assets/SvgComponents'
import { useNavigation } from '@react-navigation/native'
import { loginApi } from '@/api/loginApi'
import { WebView } from 'react-native-webview'
import userStore from '@/store/userStore/userStore'

export default function LoginScreen() {
    const { t } = useTranslation('login-join')
    const navigation = useNavigation()
    const webViewRef = useRef(null)
    const [showWebView, setShowWebView] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [inputFocused, setInputFocused] = useState(false)
    const [loginFailed, setLoginFailed] = useState(false)

    const loginFinished = () => {
        navigation.navigate('Home' as never)
    }
    const gotoJoinScreen = () => {
        navigation.navigate('EmailDuplicateCheck' as never)
    }
    const gotoFindPasswordScreen = () => {
        //  navigation.navigate('화면이름')
    }

    const handleLogin = async () => {
        try {
            const response = await loginApi(email, password)
            if (response.success) {
                userStore.login(response.nickname)
                loginFinished()
            } else {
                setLoginFailed(true)
                setEmail('')
                setPassword('')
            }
        } catch (error) {
            console.error('Error while logging in:', error)
            setLoginFailed(true)
            setEmail('')
            setPassword('')
        }
    }

    const handleAppleLoginClicked = () => {
        setShowWebView(true)
    }
    const handleWebViewNavigationStateChange = (newState: {
        url: string | string[]
    }) => {
        if (newState.url.includes('apple-login-callbck-url')) {
            loginFinished()
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
                        style={[
                            text.inputText,
                            inputFocused ? text.inputUserText : text.inputText,
                        ]}
                        placeholder={t('login-id-input')}
                        caretHidden={true}
                        value={email}
                        onChangeText={setEmail}
                        onFocus={() => setInputFocused(true)}
                        onBlur={() => setInputFocused(false)}
                    />
                    <View
                        style={[
                            styles.inputBar,
                            inputFocused
                                ? styles.inputUserBar
                                : styles.inputBar,
                        ]}
                    />
                    <Text style={text.inputTitleText}>
                        {t('login-password')}
                    </Text>
                    <TextInput
                        style={[
                            text.inputText,
                            inputFocused ? text.inputUserText : text.inputText,
                        ]}
                        placeholder={t('login-password-input')}
                        secureTextEntry={true}
                        caretHidden={true}
                        value={password}
                        onChangeText={setPassword}
                        onFocus={() => setInputFocused(true)}
                        onBlur={() => setInputFocused(false)}
                    />
                    <View
                        style={[
                            styles.inputBar,
                            inputFocused
                                ? styles.inputUserBar
                                : styles.inputBar,
                        ]}
                    />
                    {loginFailed && (
                        <Text style={text.loginFailedText}>
                            {t('login-fail')}
                        </Text>
                    )}
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
                            onPress={gotoJoinScreen}
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
                        onPress={handleAppleLoginClicked}
                    >
                        <Image
                            source={require('@/public/assets/sns-apple.png')}
                            style={styles.icon}
                        />
                    </TouchableOpacity>

                    {/* 간편로그인 웹뷰 */}
                    <Modal
                        visible={showWebView}
                        onRequestClose={() => setShowWebView(false)}
                    >
                        <WebView
                            ref={webViewRef}
                            source={{ uri: 'apple-login-page-url' }}
                            onNavigationStateChange={
                                handleWebViewNavigationStateChange
                            }
                        />
                    </Modal>
                </View>
            </View>
        </View>
    )
}
