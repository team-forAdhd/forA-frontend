import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
    TouchableOpacity,
    Text,
    View,
    TextInput,
    Modal,
    Alert,
    Image,
    Linking,
    TouchableWithoutFeedback,
    Keyboard,
} from 'react-native';
import { styles, text } from './LoginStyle';
import { TitleTextIcon } from '@/public/assets/SvgComponents';
import { useNavigation } from '@react-navigation/native';
import { getUserProfileApi } from '@/api/getUserProfileApi';
import { WebView, WebViewNavigation } from 'react-native-webview';
import { useAuthStore } from '@/store/authStore';
import { login } from '@/api/login/loginApi';

export default function LoginScreen() {
    const { t } = useTranslation('login-join');
    const navigation = useNavigation();

    const webViewRef = useRef(null);
    const [showWebView, setShowWebView] = useState(false);
    const [webViewUrl, setWebViewUrl] = useState('');

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [inputFocused, setInputFocused] = useState(false);
    const [loginFailed, setLoginFailed] = useState(false);

    const loginUpdate = useAuthStore((state) => state.login);

    const updateUser = useAuthStore((state) => state.updateUser);

    // const handleWebViewNavigationStateChange = (
    //     navState: WebViewNavigation,
    // ) => {
    //     if (navState.url.includes('callback')) {
    //         // 네비게이션 상태 변경 처리
    //         fetch(navState.url)
    //             .then((response) => response.json())
    //             .then((data) => {
    //                 const {
    //                     accessToken,
    //                     refreshToken,
    //                     hasVerifiedEmail,
    //                     hasProfile,
    //                 } = data;
    //                 // 토큰 및 사용자 정보 처리
    //                 setShowWebView(false);
    //             })
    //             .catch((error) => {
    //                 console.error('Error:', error);
    //                 setShowWebView(false);
    //             });
    //     }
    // };

    const handleLogin = async () => {
        console.log(`email : ${email} || password : ${password}`);
        try {
            const { accessToken, refreshToken } = await login(email, password);

            if (accessToken && refreshToken) {
                loginUpdate(accessToken, refreshToken);
                const userProfile = await getUserProfileApi();

                userProfile &&
                    updateUser({
                        nickname: userProfile.nickname,
                        profileImage: userProfile.profileImage,
                        email: userProfile.email,
                        forAdhdType: userProfile.forAdhdType,
                    });
            } else {
                setLoginFailed(true);
                setEmail('');
                setPassword('');
            }
        } catch (error) {
            if (error instanceof Error) {
                Alert.alert('로그인에 실패했습니다.', error.message);
                setLoginFailed(true);
            }
        }
    };

    const handleKakaoLogin = () => {
        const kakaoAuthUrl = 'https://foradhd.site/oauth2/authorization/kakao';
        Linking.openURL(kakaoAuthUrl);
    };

    const handleWebViewNavigationStateChange = async (
        navState: WebViewNavigation,
    ) => {
        const url = navState.url;

        if (url.includes('callback') && url.includes('accessToken')) {
            try {
                const res = await fetch(url);
                const data = await res.json();

                const {
                    accessToken,
                    refreshToken,
                    hasVerifiedEmail,
                    hasProfile,
                } = data;

                loginUpdate(accessToken, refreshToken);
                const userProfile = await getUserProfileApi();

                userProfile &&
                    updateUser({
                        nickname: userProfile.nickname,
                        profileImage: userProfile.profileImage,
                        email: userProfile.email,
                        forAdhdType: userProfile.forAdhdType,
                    });

                if (!hasVerifiedEmail) {
                    Alert.alert('이메일 인증이 필요합니다.');
                } else if (!hasProfile) {
                    Alert.alert('프로필을 먼저 등록해주세요.');
                }

                setShowWebView(false);
            } catch (err) {
                console.error('WebView 처리 실패:', err);
                setShowWebView(false);
            }
        }
    };

    const gotoJoinScreen = () => {
        navigation.navigate('EmailDuplicateCheck' as never);
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                {/* <TouchableOpacity
                style={styles.header}
                onPress={() => console.log('Home Button pressed')}
            >
                <ArrowIcon />
            </TouchableOpacity> */}
                <View style={styles.title}>
                    <Text style={text.titleText}>{t('intro')}</Text>
                    <TitleTextIcon />
                </View>
                <View style={styles.contents}>
                    <View style={styles.inputContainer}>
                        <Text style={text.inputTitleText}>{t('login-id')}</Text>
                        <TextInput
                            style={[
                                { width: '100%' },
                                text.inputText,
                                inputFocused
                                    ? text.inputUserText
                                    : text.inputText,
                            ]}
                            placeholder={t('login-id-input')}
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
                                { width: '100%' },
                                text.inputText,
                                inputFocused
                                    ? text.inputUserText
                                    : text.inputText,
                            ]}
                            placeholder={t('login-password-input')}
                            //secureTextEntry={true}
                            value={password}
                            secureTextEntry={true}
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
                            <Text style={text.buttonText}>
                                {t('login-button')}
                            </Text>
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
                            {/* <View style={styles.bar} />
                        <TouchableOpacity
                            style={styles.passwordButton}
                            onPress={() =>
                                console.log('Find Password Button pressed')
                            }
                        >
                            <Text style={text.bottomText}>
                                {t('password-button')}
                            </Text>
                        </TouchableOpacity> */}
                        </View>
                    </View>
                </View>
                {/* 간편로그인 */}
                <View style={styles.social}>
                    {/* <View style={styles.socialRow}>
                        <View style={styles.socialBar} />
                        <Text style={text.socialText}>{t('login-social')}</Text>
                        <View style={styles.socialBar} />
                    </View> */}
                    <View style={styles.iconRow}>
                        {/* <TouchableOpacity
                            style={styles.icon}
                            // onPress={() => handleSocialLogin(kakaoLoginApi)}
                            onPress={handleKakaoLogin}
                        >
                            <Image
                                source={require('@/public/assets/sns-kakao.png')}
                                style={styles.icon}
                            />
                        </TouchableOpacity> */}
                        {/* <TouchableOpacity
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
                    </TouchableOpacity> */}
                    </View>
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
                                    onLoadStart={(e) => {
                                        console.log(
                                            'WebView 시작:',
                                            e.nativeEvent.url,
                                        );
                                    }}
                                    onLoadEnd={(e) => {
                                        console.log(
                                            'WebView 끝:',
                                            e.nativeEvent.url,
                                        );
                                    }}
                                    userAgent="Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1"
                                    javaScriptEnabled={true}
                                    domStorageEnabled={true}
                                    startInLoadingState={true}
                                    style={{ flex: 1 }} // 웹뷰가 부모 뷰의 크기에 맞게 늘어나도록
                                />
                            </View>
                        </View>
                    </Modal>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}
