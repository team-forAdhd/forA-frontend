import React, { useState, useRef } from 'react';
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
import { checkExistingMemberApi } from '@/api/join/checkExistingMemberApi';
import { sendAuthApi } from '@/api/join/sendAuthApi';
import profileStore from '@/state/signupState/profileStore';

export default function EmailDuplicateCheck() {
    const { t } = useTranslation('login-join');
    const navigation = useNavigation();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [birthYearMonth, setBirthYearMonth] = useState('');
    const [gender, setGender] = useState('');
    const [inputFocused, setInputFocused] = useState(false);
    const [nameChecked, setNameChecked] = useState(false);
    const [genderChecked, setGenderChecked] = useState(false);
    const [birthChecked, setBirthChecked] = useState(false);
    const [isEmailValid, setIsEmailValid] = useState(false);
    const [emailChecked, setEmailChecked] = useState(false);
    const [emailConfirmed, setEmailConfirmed] = useState(false);

    const gotoBeforeScreen = () => {
        navigation.navigate('Login' as never);
    };
    const gotoNextScreen = () => {
        saveUserdInfo();
        sendAuthApi(email);
        navigation.navigate('AuthCheck' as never);
    };
    const genderInputRef = useRef<TextInput>(null);

    const handleEmailChange = (text: string) => {
        setEmail(text);
        setIsEmailValid(/\S+@\S+\.\S+/.test(text));
        setEmailChecked(false);
    };

    const handleCheckButton = async () => {
        try {
            const isValidEmail = await checkExistingMemberApi(email);
            setEmailChecked(true);
            setEmailConfirmed(isValidEmail);
        } catch (error) {
            setEmailConfirmed(false);
            console.error('Error while checking email in: ', error.response);
        }
    };

    const saveUserdInfo = () => {
        profileStore.setName(name);
        profileStore.setEmail(email);
        profileStore.setBirthYearMonth(birthYearMonth);
        profileStore.setGender(gender);
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
                    <Text style={text.titleText}>{t('join-title')}</Text>
                    <Text style={text.descriptionText}>
                        {t('join-description')}
                    </Text>
                </View>
                <View style={styles.contents}>
                    <View style={styles.inputContainer}>
                        <Text style={text.inputTitleText}>
                            {t('join-name')}
                        </Text>
                        <TextInput
                            style={[
                                text.inputText,
                                inputFocused
                                    ? text.inputUserText
                                    : text.inputText,
                            ]}
                            placeholder={t('join-name-input')}
                            value={name}
                            onChangeText={(text) => {
                                setName(text);
                                setNameChecked(text.length >= 2);
                            }}
                            onFocus={() => setInputFocused(true)}
                            onBlur={() => setInputFocused(false)}
                            maxLength={20}
                        />
                        {nameChecked && (
                            <Image
                                source={require('@/public/assets/check-icon.png')}
                                style={styles.icon}
                            />
                        )}
                        <View
                            style={[
                                styles.inputBar,
                                inputFocused
                                    ? styles.inputUserBar
                                    : styles.inputBar,
                            ]}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <View style={styles.inputRow}>
                            <View style={styles.inputWrapper}>
                                <Text style={text.inputTitleText}>
                                    {t('join-birth')}
                                </Text>
                                <TextInput
                                    style={[
                                        text.inputText,
                                        inputFocused
                                            ? text.inputUserText
                                            : text.inputText,
                                    ]}
                                    placeholder={t('join-birth-input')}
                                    value={birthYearMonth}
                                    onChangeText={(text) => {
                                        if (/^\d+$/.test(text)) {
                                            setBirthYearMonth(text);
                                            setBirthChecked(true);
                                        }
                                    }}
                                    onFocus={() => setInputFocused(true)}
                                    onBlur={() => setInputFocused(false)}
                                    keyboardType="numeric"
                                    maxLength={6}
                                />
                            </View>
                            <View style={styles.inputWrapper}>
                                <Text style={text.inputTitleText}>{null}</Text>
                                <TextInput
                                    style={[
                                        text.inputText,
                                        inputFocused
                                            ? text.inputUserText
                                            : text.inputText,
                                    ]}
                                    placeholder={'- 0 ∙ ∙ ∙ ∙ ∙ ∙'}
                                    value={gender}
                                    onChangeText={(text) => {
                                        setGender(text);
                                        profileStore.setGender(
                                            +text % 2 === 0 ? 'FEMALE' : 'MALE',
                                        );
                                        setGenderChecked(true);
                                    }}
                                    onFocus={() => setInputFocused(true)}
                                    onBlur={() => setInputFocused(false)}
                                    keyboardType="numeric"
                                    maxLength={1}
                                    onSubmitEditing={() => {
                                        if (genderInputRef.current) {
                                            genderInputRef.current.focus();
                                        }
                                    }}
                                />
                            </View>
                            {birthChecked && genderChecked && (
                                <Image
                                    source={require('@/public/assets/check-icon.png')}
                                    style={styles.icon}
                                />
                            )}
                        </View>
                        <View style={styles.inputBar} />
                    </View>

                    <View style={styles.inputDescriptionContainer}>
                        <Text style={text.inputTitleText}>
                            {t('join-email')}
                        </Text>
                        <View
                            style={{
                                flexDirection: 'row',
                                display: 'flex',
                                width: '100%',
                                justifyContent: 'space-between',
                            }}
                        >
                            <TextInput
                                style={[
                                    text.inputText,
                                    inputFocused
                                        ? text.inputUserText
                                        : text.inputText,
                                    { width: '70%' },
                                ]}
                                placeholder={t('join-email-input')}
                                value={email}
                                onChangeText={handleEmailChange}
                                onFocus={() => setInputFocused(true)}
                                onBlur={() => setInputFocused(false)}
                            />
                            <TouchableOpacity
                                style={[
                                    styles.roundButtonDisabled,
                                    isEmailValid
                                        ? styles.roundButtonAbled
                                        : styles.roundButtonDisabled,
                                ]}
                                disabled={!isEmailValid}
                                onPress={handleCheckButton}
                            >
                                <Text
                                    style={[
                                        text.roundButtonDisabledText,
                                        isEmailValid
                                            ? text.roundButtonAbledText
                                            : text.roundButtonDisabledText,
                                    ]}
                                >
                                    {t('join-duplicate-button')}
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View
                            style={[
                                styles.emailInputBar,
                                emailConfirmed && styles.emailInputValidBar,
                                emailChecked &&
                                    !emailConfirmed &&
                                    styles.emailInputInvalidBar,
                            ]}
                        />
                        {emailChecked && (
                            <Text
                                style={
                                    emailConfirmed
                                        ? text.succeedText
                                        : text.failedText
                                }
                            >
                                {emailConfirmed
                                    ? t('join-email-confirmed')
                                    : t('join-email-duplicated')}
                            </Text>
                        )}
                    </View>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={[
                            styles.nextButton,
                            emailConfirmed
                                ? { backgroundColor: '#52A55D' }
                                : { backgroundColor: '#EEE' },
                        ]}
                        disabled={!emailConfirmed}
                        onPress={gotoNextScreen}
                    >
                        <Text
                            style={[
                                text.buttonText,
                                emailConfirmed
                                    ? { color: '#FFF' }
                                    : { color: '#232323' },
                            ]}
                        >
                            {t('join-next-button')}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}
