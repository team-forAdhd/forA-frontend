import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity, Text, View, Image, Alert } from 'react-native';
import { styles, text } from './JoinStyle';
import { ProfileStoreContext } from '@/state/signupState';
import { sendUserInfoApi } from '@/api/join/sendUserInfoApi';
import { uploadImageApi } from '@/api/image/imageApi';
import { useAuthStore } from '@/store/authStore';
import axios from 'axios';

export default function JoinDone() {
    const { t } = useTranslation('login-join');
    const navigation = useNavigation();
    const profileStore = useContext(ProfileStoreContext);
    const login = useAuthStore((state) => state.login);
    const [loading, setLoading] = useState(false);
    const updateUser = useAuthStore((state) => state.updateUser);

    const gotoNextScreen = async () => {
        try {
            setLoading(true);
            const { accessToken, refreshToken } = await handleSendUserInfo();
            Alert.alert(
                '회원가입이 완료되었습니다!',
                '포에이에서 adhd 관련 정보를 알아보세요 :)',
            );
            login(accessToken, refreshToken);
        } catch (error) {
            console.error('final submit error', error);
            Alert.alert('회원가입 중 오류가 발생했습니다.');
        } finally {
            setLoading(false);
        }
    };

    const handleSendUserInfo = async (): Promise<{
        accessToken: string;
        refreshToken: string;
    }> => {
        try {
            let profileImageUrl = profileStore.imageUrl;
            if (profileStore.imageUrl) {
                const imagePath = await uploadImageApi(profileImageUrl); // 이미지 업로드
                profileImageUrl = imagePath;
            }

            const userInfo = {
                name: profileStore.name,
                birth:
                    profileStore.birthYearMonth.at(0) === '0'
                        ? `20${profileStore.birthYearMonth}`
                        : `19${profileStore.birthYearMonth}`,
                gender: +profileStore.gender % 2 === 0 ? 'FEMALE' : 'MALE',
                email: profileStore.email,
                password: {
                    password: profileStore.password,
                    passwordConfirm: profileStore.passwordConfirm, // 비밀번호 확인 필드
                },
                nickname: profileStore.nickname,
                profileImage: profileImageUrl,
                forAdhdType: profileStore.forAdhdType,
                termsApprovals: profileStore.termsApprovals,
                pushNotificationApprovals: [
                    {
                        pushNotificationApprovalId: 1,
                        approved: true,
                    },
                ],
            };

            const { accessToken, refreshToken } =
                await sendUserInfoApi(userInfo);
            return { accessToken, refreshToken };
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Error sending user info:', error.response);
            }
            throw error;
        }
    };

    return (
        <View style={styles.JoinDone}>
            <View style={styles.JoinDoneContents}>
                <Image
                    source={require('@/public/assets/join-last/join-last.png')}
                    style={styles.JoinDoneIcon}
                />
                <Text style={text.joinDoneText}>{t('join-finished')}</Text>
                <Text style={text.enjoyText}>{t('finished-enjoy-1')}</Text>
                <Text style={text.enjoyText}>{t('finished-enjoy-2')}</Text>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[styles.nextButton, { backgroundColor: '#52A55D' }]}
                    onPress={gotoNextScreen}
                    disabled={loading}
                >
                    <Text style={[text.buttonText, { color: '#FFF' }]}>
                        {loading ? '로딩중..' : t('finished-button')}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
