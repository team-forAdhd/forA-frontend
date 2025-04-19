import { useTranslation } from 'react-i18next';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    TextInput,
    TextStyle,
    StyleProp,
    StyleSheet,
    Alert,
} from 'react-native';
import { useState } from 'react';
import { useAuthStore } from '@/store/authStore';
import { changePassword } from '@/domains/Setting/api/changePassword.api';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';

export interface User {
    email: string;
    nickname: string;
    profileImage?: string;
    forAdhdType?: string;
    birthdate: string;
}

export default function ChangePassword() {
    const { t } = useTranslation('AccountSettings');
    const logout = useAuthStore((state) => state.logout);

    const [currentPW, setCurrentPW] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [validPassword, setValidPassword] = useState([false, false, false]);

    const passwordRegex =
        /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@^$!%*#?&])[A-Za-z\d@$^!%*#?&]{8,}$/;

    const handlePasswordChange = (value: string, index: number) => {
        const tempList = [...validPassword];
        if (index === 0) {
            setCurrentPW(value);
            tempList[0] = passwordRegex.test(value);
        } else if (index === 1) {
            setNewPassword(value);
            tempList[1] = passwordRegex.test(value);
        } else {
            setPasswordConfirm(value);
            tempList[2] = newPassword === value;
        }
        setValidPassword(tempList);
    };

    const isFormValid = validPassword.every((v) => v);
    const { mutate, isPending } = useMutation({
        mutationFn: changePassword,
        onSuccess: () => {
            Alert.alert('비밀번호가 변경되었습니다.');
            setCurrentPW('');
            setNewPassword('');
            setPasswordConfirm('');
            setValidPassword([false, false, false]);
        },
        onError: (err) => {
            if (axios.isAxiosError(err)) {
                Alert.alert('비밀번호 변경 실패', err.response?.data.message);
                return;
            } else {
                Alert.alert(
                    '비밀번호 변경 실패',
                    '비밀번호 변경 중 오류가 발생했습니다.',
                );
            }
        },
    });

    function getValue(index: number) {
        if (index === 0) return currentPW;
        if (index === 1) return newPassword;
        return passwordConfirm;
    }

    return (
        <View style={styles.passwordChangeContainer}>
            <Text style={text.passwordTitleText}>{t('change-password')}</Text>
            {['current-password', 'new-password', 'password-confirm'].map(
                (label, index) => (
                    <View
                        key={index}
                        style={[
                            validPassword[index]
                                ? styles.correctPasswordContainer
                                : styles.wrongPasswordContainer,
                            styles.passwordContainer,
                        ]}
                    >
                        <Text style={text.passwordText}>{t(label)}</Text>
                        <View>
                            <TextInput
                                style={styles.inputContainer}
                                placeholder="**********"
                                value={getValue(index)}
                                onChangeText={(text) =>
                                    handlePasswordChange(text, index)
                                }
                                secureTextEntry
                            />
                            {validPassword[index] && (
                                <Image
                                    source={require('@/public/assets/check-icon.png')}
                                    style={styles.checkIcon}
                                />
                            )}
                        </View>
                        {index === 1 && newPassword && !validPassword[1] && (
                            <Text style={text.cautionText}>
                                비밀번호는 8자 이상, 숫자, 특수문자를 포함해야
                                합니다.
                            </Text>
                        )}
                        {index === 2 && newPassword && !validPassword[2] && (
                            <Text style={text.cautionText}>
                                비밀번호가 일치하지 않습니다.
                            </Text>
                        )}
                    </View>
                ),
            )}
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    disabled={!isFormValid}
                    onPress={() => {
                        mutate({
                            prevPassword: currentPW,
                            password: {
                                password: newPassword,
                                passwordConfirm: passwordConfirm,
                            },
                        });
                    }}
                    style={[
                        styles.editButton,
                        isFormValid && { backgroundColor: '#52A55D' },
                    ]}
                >
                    <Text
                        style={
                            isFormValid
                                ? text.activateButtonText
                                : text.buttonText
                        }
                    >
                        변경
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export const styles = StyleSheet.create({
    passwordChangeContainer: {
        width: '100%',
        marginBottom: 30,
        paddingBottom: 20,
        justifyContent: 'flex-start',
        flexDirection: 'column',
        backgroundColor: 'white',
        zIndex: 3,
        paddingHorizontal: 16,
        borderRadius: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.14,
        gap: 20,
        shadowRadius: 6.27,
        flex: 1,
    },
    inputContainer: {
        fontFamily: 'Pretendard',
        fontStyle: 'normal',
        color: '#232323',
        fontSize: 16,
        letterSpacing: -0.5,
        borderWidth: 0,
        padding: 10,
        zIndex: 2,
        height: 44,
    },
    passwordContainer: {
        width: '100%',
        borderBottomColor: '#555555',
        borderBottomWidth: 1,
        flexDirection: 'column',
        zIndex: 2,
    },
    correctPasswordContainer: {
        width: '100%',
        height: 61,
        borderBottomColor: '#52A55D',
        borderBottomWidth: 1,
        flexDirection: 'column',
        zIndex: 2,
    },
    wrongPasswordContainer: {
        width: '100%',
        flexDirection: 'column',
        zIndex: 2,
    },
    checkIcon: {
        width: 20,
        height: 20,
        position: 'absolute',
        top: 6,
        right: 0,
    },
    editButton: {
        padding: 20,
        backgroundColor: '#EEEEEE',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        zIndex: 5,
    },
    buttonContainer: {
        width: '100%',
        marginTop: 50,
        justifyContent: 'center',
    },
});

const baseText = {
    fontFamily: 'Pretendard',
    fontStyle: 'normal',
    fontWeight: '400',
};

const text = {
    passwordTitleText: {
        color: '#232323',
        fontSize: 18,
        fontWeight: '800',
        lineHeight: 22.4,
        alignItems: 'center',
        marginBottom: 21,
        marginTop: 27,
    },
    passwordText: {
        ...baseText,
        color: '#555555',
        fontSize: 12,
        letterSpacing: -0.5,
        alignItems: 'center',
        marginTop: 12,
    },
    cautionText: {
        ...baseText,
        color: '#FE4E4E',
        fontSize: 12,
        alignItems: 'center',
        lineHeight: 16.8,
    },
    buttonText: {
        color: '#555555',
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '600',
        lineHeight: 27.2,
    },
    activateButtonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '600',
        lineHeight: 27.2,
    },
} as {
    [key: string]: StyleProp<TextStyle>;
};
