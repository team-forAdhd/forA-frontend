import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { ArrowIcon } from '@/public/assets/SvgComponents';
import {
    TouchableOpacity,
    Text,
    View,
    TextInput,
    Image,
    TouchableWithoutFeedback,
    Keyboard,
} from 'react-native';
import { styles, text } from './JoinStyle';
import profileStore from '@/state/signupState/profileStore';

export default function SetPassword() {
    const { t } = useTranslation('login-join');
    const navigation = useNavigation();

    const gotoBeforeScreen = () => {
        navigation.navigate('AuthCheck' as never);
    };
    const gotoNextScreen = () => {
        saveUserdInfo();
        navigation.navigate('SetProfile' as never);
    };
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordFocused, setPasswordFocused] = useState(false);
    const [confirmFocused, setConfirmFocused] = useState(false);
    const [validPassword, setValidPassword] = useState(false);
    const [validConfirmPassword, setValidConfirmPassword] = useState(false);

    const handleValidatePassword = (password: string) => {
        const passwordRegex =
            /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
        const isValid = passwordRegex.test(password);
        setValidPassword(isValid);
    };

    const handleConfirmPassword = (
        password: string,
        confirmPassword: string,
    ) => {
        const isValid = password === confirmPassword;
        setValidConfirmPassword(isValid);
    };

    const saveUserdInfo = () => {
        profileStore.setPassword(password, confirmPassword);
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <TouchableOpacity
                    style={styles.header}
                    onPress={gotoBeforeScreen}
                >
                    <ArrowIcon />
                </TouchableOpacity>
                <View style={styles.title}>
                    <Text style={text.titleText}>{t('password-title')}</Text>
                    <Text style={text.descriptionText}>
                        {t('password-description')}
                    </Text>
                </View>
                <View style={styles.contents}>
                    <View style={styles.inputContainer}>
                        <Text style={text.inputTitleText}>
                            {t('login-password')}
                        </Text>
                        <TextInput
                            style={[
                                text.inputText,
                                passwordFocused
                                    ? text.inputUserText
                                    : text.inputText,
                            ]}
                            placeholder={t('password-input')}
                            value={password}
                            onChangeText={(text) => {
                                setPassword(text);
                                handleValidatePassword(text);
                            }}
                            secureTextEntry={true}
                            onFocus={() => setPasswordFocused(true)}
                            onBlur={() => setPasswordFocused(false)}
                        />
                        {validPassword && (
                            <Image
                                source={require('@/public/assets/check-icon.png')}
                                style={styles.icon}
                            />
                        )}
                        <View
                            style={[
                                styles.inputBar,
                                passwordFocused
                                    ? validPassword
                                        ? styles.inputUserBar
                                        : {
                                              ...styles.inputUserBar,
                                              borderBottomColor: '#FE4E4E',
                                          }
                                    : styles.inputBar,
                            ]}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={text.inputTitleText}>
                            {t('login-password')}
                        </Text>
                        <TextInput
                            style={[
                                text.inputText,
                                confirmFocused
                                    ? text.inputUserText
                                    : text.inputText,
                            ]}
                            placeholder={t('password-confirm-input')}
                            value={confirmPassword}
                            onChangeText={(text) => {
                                setConfirmPassword(text);
                                handleConfirmPassword(password, text);
                            }}
                            secureTextEntry={true}
                            onFocus={() => setConfirmFocused(true)}
                            onBlur={() => setConfirmFocused(false)}
                        />
                        {validConfirmPassword && (
                            <Image
                                source={require('@/public/assets/check-icon.png')}
                                style={styles.icon}
                            />
                        )}
                        <View
                            style={[
                                styles.inputBar,
                                confirmFocused
                                    ? validConfirmPassword
                                        ? styles.inputUserBar
                                        : {
                                              ...styles.inputUserBar,
                                              borderBottomColor: '#FE4E4E',
                                          }
                                    : styles.inputBar,
                            ]}
                        />
                        {!validConfirmPassword && confirmFocused && (
                            <Text style={[text.failedText, styles.authFailed]}>
                                {t('password-confirm-fail')}
                            </Text>
                        )}
                    </View>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={[
                            styles.nextButton,
                            validConfirmPassword
                                ? { backgroundColor: '#52A55D' }
                                : { backgroundColor: '#EEE' },
                        ]}
                        disabled={!validConfirmPassword}
                        onPress={gotoNextScreen}
                    >
                        <Text
                            style={[
                                text.buttonText,
                                validConfirmPassword
                                    ? { color: '#FFF' }
                                    : { color: '#232323' },
                            ]}
                        >
                            {t('next-button')}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}
