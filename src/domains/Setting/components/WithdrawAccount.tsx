import ConfirmModal from '@/components/common/modals/ConfirmModal';
import LoadingModal from '@/components/common/modals/loadingModal';
import { withdrawAccount } from '@/domains/Setting/api/withdrawAccount.api';
import { useAuthStore } from '@/store/authStore';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, StyleSheet, Text, TouchableOpacity } from 'react-native';

export default function WithdrawAccount() {
    const { t } = useTranslation('AccountSettings');
    const logout = useAuthStore((state) => state.logout);
    const [withDrawModal, setWithdrawModal] = useState<boolean>(false);
    const [withDrawConfirmModal, setWithdrawConfirmModal] =
        useState<boolean>(false);
    const { mutate, isPending } = useMutation({
        mutationFn: withdrawAccount,
        onError: () => {
            Alert.alert('회원탈퇴 오류', '회원탈퇴 중 오류가 발생했습니다.');
        },
        onSuccess: () => {
            Alert.alert('회원탈퇴 완료', '회원탈퇴가 완료되었습니다.');
            logout();
        },
    });
    return (
        <>
            <TouchableOpacity
                onPress={() => {
                    setWithdrawModal(true);
                }}
            >
                <Text style={styles.deleteAccount}>회원탈퇴</Text>
            </TouchableOpacity>
            {withDrawModal && (
                <ConfirmModal
                    visible={withDrawModal}
                    onCancel={() => setWithdrawModal(false)}
                    onConfirm={() => {
                        setWithdrawModal(false);
                        setWithdrawConfirmModal(true);
                    }}
                    title={'회원 탈퇴'}
                    message={t('Account-question')}
                />
            )}
            {withDrawConfirmModal && (
                <ConfirmModal
                    visible={withDrawConfirmModal}
                    onCancel={() => setWithdrawConfirmModal(false)}
                    onConfirm={() => {
                        mutate();
                        setWithdrawConfirmModal(false);
                    }}
                    title="회원 탈퇴"
                    message={
                        '해당 계정 탈퇴 이후에는 모든 정보가 사라집니다. 정말 탈퇴하시겠습니까?'
                    }
                />
            )}
            <LoadingModal visible={isPending} />
        </>
    );
}

const styles = StyleSheet.create({
    deleteAccount: {
        color: '#949494',
        fontSize: 16,
        letterSpacing: -0.5,
        alignItems: 'center',
        lineHeight: 22.4,
        paddingLeft: 10,
    },
});
