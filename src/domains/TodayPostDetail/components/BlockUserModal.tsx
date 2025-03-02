import { useBlockUserMutation } from '@/domains/TodayPostDetail/api/blockUser.api';
import { StackScreenProps } from '@react-navigation/stack';
import { TodayStackParams } from '@/navigation/stacks/TodayStack';
import useModal from '@/hooks/useModal';
import GeneralModal from '@/components/common/modals/modal';
import React from 'react';
import LoadingModal from '@/components/common/modals/loadingModal';
import ConfirmModal from '@/components/common/modals/ConfirmModal';

interface ModalProps {
    modalVisible: boolean;
    switchModal: () => void;
    userId: string;
}

const CONFIRM_MODAL_TEXT = {
    차단하기: {
        title: '해당 회원을 차단하시겠습니까?',
        description:
            '이 멤버가 포에이에서 쓴 글과 댓글이 보이지 않고, 알림도 발송되지 않습니다. (차단을 하면 다시 해제하실 수 없습니다.)',
    },
    신고하기: {
        title: '해당 회원을 글을 신고하시겠습니까?',
        description:
            '해당 글을 신고하면, 검토 후 삭제조치와 사용자에 대한 제제가 이루어집니다.',
    },
} as const;

const RESULT_TEXT = {
    차단하기: {
        onSuccess: '회원이 차단되었습니다.',
        onError:
            '회원 차단 처리중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.',
    },
    신고하기: {
        onSuccess: '해당 글이 신고되었습니다.',
        onError:
            '글 신고 처리중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.',
    },
};
export default function BlockModal({
    modalVisible,
    switchModal,
    userId,
    navigation,
}: ModalProps &
    Pick<StackScreenProps<TodayStackParams, 'PostDetail'>, 'navigation'>) {
    const {
        informText,
        displayModal,
        modalVisible: blockResultModal,
        switchModal: switchResultModal,
    } = useModal();
    const { mutate, isPending } = useBlockUserMutation({
        navigation: navigation,
        options: {
            onSuccess: () => {
                displayModal('회원이 차단되었습니다.');
            },
            onError: (err) => {
                displayModal(
                    '회원 차단 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.',
                );
            },
        },
    });
    return (
        <>
            <ConfirmModal
                visible={modalVisible}
                title="해당 회원을 차단하시겠습니까?"
                message={`이 멤버가 포에이에서 쓴 글과 댓글이 보이지 않고, 알림도 발송되지 않습니다. (차단을 하면 다시 해제하실 수 없습니다.)`}
                onCancel={() => {
                    switchModal();
                }}
                onConfirm={() => {
                    mutate({ blockedUserId: userId });
                    switchModal();
                }}
                confirmText="차단하기"
            />
            <GeneralModal
                informText={informText}
                modalVisible={blockResultModal}
                switchModal={switchResultModal}
                onPressConfirm={() => navigation.pop()}
            />
            <LoadingModal visible={isPending} />
        </>
    );
}
