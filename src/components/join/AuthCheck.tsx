import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigation } from '@react-navigation/native'
import { ArrowIcon } from '@/public/assets/SvgComponents'
import { TouchableOpacity, Text, View, TextInput } from 'react-native'
import { styles, text } from './JoinStyle'
import { sendAuthApi } from '@/api/join/sendAuthApi'
import { checkAuthApi } from '@/api/join/checkAuthApi'

export default function AuthCheck() {
    const { t } = useTranslation('login-join')
    const navigation = useNavigation()

    const gotoBeforeScreen = () => {
        navigation.navigate('EmailDuplicateCheck' as never)
    }
    const gotoNextScreen = () => {
        navigation.navigate('SetPassword' as never)
    }
    const [authcode, setAuthCode] = useState('')
    const [timer, setTimer] = useState(180)
    const [inputFocused, setInputFocused] = useState(false)
    const [authChecked, setAuthChecked] = useState(false)
    const [authConfirmed, setAuthConfirmed] = useState(false)

    const handleGetAuthAgainButton = async () => {
        try {
            sendAuthApi()
        } catch (error) {
            console.error('Error while sending authCode again in: ', error)
        }
        setAuthCode('')
        setTimer(180)
    }

    const handleCheckAuth = async () => {
        try {
            const isValid = await checkAuthApi(authcode)
            if (isValid) {
                gotoNextScreen
            } else {
                setAuthConfirmed(false)
            }
        } catch (error) {
            console.error('Error while checking auth code: ', error)
        }
    }

    useEffect(() => {
        const intervalId = setInterval(() => {
            if (timer > 0) {
                setTimer(timer - 1)
            }
        }, 1000)

        return () => clearInterval(intervalId)
    }, [timer])

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.header} onPress={gotoBeforeScreen}>
                <ArrowIcon />
            </TouchableOpacity>
            <View style={styles.title}>
                <Text style={text.titleText}>{t('auth-title')}</Text>
                <Text style={text.descriptionText}>
                    {t('auth-description')}
                </Text>
            </View>
            <View style={styles.contents}>
                <View style={styles.inputContainer}>
                    <Text style={text.inputTitleText}>{t('auth')}</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <TextInput
                            style={[
                                text.inputText,
                                inputFocused
                                    ? text.inputUserText
                                    : text.inputText,
                            ]}
                            placeholder={t('auth-input')}
                            value={authcode}
                            onChangeText={(text) => {
                                if (/^\d+$/.test(text)) {
                                    setAuthCode(text)
                                }
                                if (text.length >= 6) {
                                    setAuthChecked(true)
                                }
                            }}
                            keyboardType="numeric"
                            maxLength={6}
                            onFocus={() => setInputFocused(true)}
                            onBlur={() => setInputFocused(false)}
                        />
                        <Text style={[text.timerText, styles.timer]}>
                            {formatTime(timer)}
                        </Text>
                    </View>
                    <View
                        style={[
                            styles.inputBar,
                            !inputFocused
                                ? styles.inputBar
                                : !authConfirmed && authChecked
                                  ? {
                                        ...styles.inputUserBar,
                                        borderBottomColor: '#FE4E4E',
                                    }
                                  : styles.inputUserBar,
                        ]}
                    />
                    {!authConfirmed && authChecked && (
                        <Text style={[text.failedText, styles.authFailed]}>
                            {t('auth-failed')}
                        </Text>
                    )}
                    <View style={styles.authUnderDescription}>
                        <Text style={text.underBarText}>{t('auth-re')}</Text>
                        <TouchableOpacity onPress={handleGetAuthAgainButton}>
                            <Text style={text.authAgainText}>
                                {t('auth-re-button')}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[
                        styles.nextButton,
                        authChecked
                            ? { backgroundColor: '#52A55D' }
                            : { backgroundColor: '#EEE' },
                    ]}
                    disabled={!authChecked}
                    onPress={handleCheckAuth}
                >
                    <Text
                        style={[
                            text.buttonText,
                            authChecked
                                ? { color: '#FFF' }
                                : { color: '#232323' },
                        ]}
                    >
                        {t('auth-bottom-button')}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

// 타이며 표시 형식 변환
const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`
}
