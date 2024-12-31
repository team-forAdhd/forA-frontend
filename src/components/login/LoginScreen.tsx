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
import { getUserProfileApi } from '@/api/getUserProfileApi'
import {
    naverLoginApi,
    kakaoLoginApi,
    googleLoginApi,
    appleLoginApi,
    ApiResponse,
} from '@/api/socialLoginApi'
import { WebView, WebViewNavigation } from 'react-native-webview'
import userStore from '@/store/userStore/userStore'

export default function LoginScreen() {
    const { t } = useTranslation('login-join')
    const navigation = useNavigation()

    const webViewRef = useRef(null)
    const [showWebView, setShowWebView] = useState(false)
    const [webViewUrl, setWebViewUrl] = useState('')

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [inputFocused, setInputFocused] = useState(false)
    const [loginFailed, setLoginFailed] = useState(false)

    // const handleSocialLogin = async (
    //     socialLoginApi: () => Promise<ApiResponse>,
    // ) => {
    //     try {
    //         const response = await socialLoginApi()
    //         if (response.accessToken) {
    //             const userProfile = await getUserProfileApi(
    //                 response.accessToken,
    //             )
    //             userStore.login(
    //                 userProfile.accessToken,
    //                 userProfile.userId,
    //                 userProfile.nickname,
    //                 userProfile.profileImageUrl,
    //             )
    //             setShowWebView(false)
    //             loginFinished()
    //         } else {
    //             setLoginFailed(true)
    //         }
    //     } catch (error) {
    //         console.error('Error during social login:', error)
    //         setLoginFailed(true)
    //     }
    // }
    const handleWebViewNavigationStateChange = (
        navState: WebViewNavigation,
    ) => {
        if (navState.url.includes('callback')) {
            // 네비게이션 상태 변경 처리
            fetch(navState.url)
                .then((response) => response.json())
                .then((data) => {
                    const {
                        accessToken,
                        refreshToken,
                        hasVerifiedEmail,
                        hasProfile,
                    } = data
                    // 토큰 및 사용자 정보 처리
                    setShowWebView(false)
                })
                .catch((error) => {
                    console.error('Error:', error)
                    setShowWebView(false)
                })
        }
    }

    const handleLogin = async () => {
        console.log(`email : ${email} || password : ${password}`)
        try {
            const response = await loginApi(email, password)
            
            if (response.accessToken) {
                console.log(`로그인 성공 : ${response.accessToken}`)

                const userProfile = await getUserProfileApi(response.accessToken)
                userProfile &&
                    userStore.login(
                        userProfile.accessToken,
                        userProfile.userId,
                        userProfile.nickname,
                        userProfile.profileImageUrl,
                    )
                console.log(userProfile)
                
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

    const loginFinished = () => {
        navigation.navigate('Home' as never)
    }
    const gotoJoinScreen = () => {
        navigation.navigate('EmailDuplicateCheck' as never)
    }
    const gotoFindPasswordScreen = () => {
        //  navigation.navigate('화면이름')
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
                            { width: '100%', },
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
                            { width: '100%', },
                            text.inputText,
                            inputFocused ? text.inputUserText : text.inputText,
                        ]}
                        placeholder={t('login-password-input')}
                        //secureTextEntry={true}
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
            {/* 간편로그인 */}
            <View style={styles.social}>
                {/* <View style={styles.socialRow}>
                    <View style={styles.socialBar} />
                    <Text style={text.socialText}>{t('login-social')}</Text>
                    <View style={styles.socialBar} />
                </View>
                <View style={styles.iconRow}>
                    <TouchableOpacity
                        style={styles.icon}
                        onPress={() => handleSocialLogin(kakaoLoginApi)}
                    >
                        <Image
                            source={require('@/public/assets/sns-kakao.png')}
                            style={styles.icon}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.icon}
                        onPress={() => handleSocialLogin(naverLoginApi)}
                    >
                        <Image
                            source={require('@/public/assets/sns-naver.png')}
                            style={styles.icon}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.icon}
                        onPress={() => handleSocialLogin(googleLoginApi)}
                    >
                        <Image
                            source={require('@/public/assets/sns-google.png')}
                            style={styles.icon}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.icon}
                        onPress={() => handleSocialLogin(appleLoginApi)}
                    >
                        <Image
                            source={require('@/public/assets/sns-apple.png')}
                            style={styles.icon}
                        />
                    </TouchableOpacity>
                </View> */}
                {/* 간편로그인 웹뷰 */}
                <Modal
                    visible={showWebView}
                    onRequestClose={() => setShowWebView(false)}
                    animationType="slide" // 모달 애니메이션 추가
                >
                    <View
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <View style={{ width: '100%', maxHeight: '80%' }}>
                            <WebView
                                ref={webViewRef}
                                source={{ uri: webViewUrl }}
                                onNavigationStateChange={
                                    handleWebViewNavigationStateChange
                                }
                                style={{ flex: 1 }} // 웹뷰가 부모 뷰의 크기에 맞게 늘어나도록
                            />
                        </View>
                    </View>
                </Modal>
            </View>
        </View>
    )
}
