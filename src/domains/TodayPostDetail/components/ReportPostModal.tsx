import { StackScreenProps } from '@react-navigation/stack';
import { TodayStackParams } from '@/navigation/stacks/TodayStack';
import useModal from '@/hooks/useModal';
import GeneralModal from '@/components/common/modals/modal';
import React, { useState } from 'react';
import LoadingModal from '@/components/common/modals/loadingModal';
import ConfirmModal from '@/components/common/modals/ConfirmModal';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useReportPostMutation } from '@/domains/TodayPostDetail/api/reportPost.api';

interface ModalProps {
    modalVisible: boolean;
    switchModal: () => void;
    postId: number;
}
const reportList = {
    '특정인에 대한 욕설 및 비하': 'INSULT_AND_DEGRADE',
    '잘못된 정보': 'MISINFORMATION',
    '개인정보 유출': 'PERSONAL_INFO_LEAK',
    '상업적 광고 및 판매글': 'COMMERCIAL_ADVERTISEMENT',
    '타인에게 혐오감을 주는 게시글': 'HATEFUL_CONTENT',
} as const;
export type ReportType = (typeof reportList)[keyof typeof reportList];
type ReportKeyType = keyof typeof reportList;

export default function ReportPostModal({
    modalVisible,
    switchModal,
    postId,
    navigation,
}: ModalProps &
    Pick<StackScreenProps<TodayStackParams, 'PostDetail'>, 'navigation'>) {
    const [reportType, setReportType] = useState<ReportType>(
        'COMMERCIAL_ADVERTISEMENT',
    );

    const { modalVisible: confirmModal, switchModal: switchConfirmModal } =
        useModal();
    const {
        informText,
        displayModal,
        modalVisible: reportResultModal,
        switchModal: switchResultModal,
    } = useModal();
    const { mutate, isPending } = useReportPostMutation({
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
            <Modal transparent visible={modalVisible} animationType="fade">
                <View style={styles.modalOverlay}>
                    <View style={styles.reportModalContainer}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                            게시글 신고
                        </Text>
                        <View style={styles.reportModalLine} />
                        {Object.keys(reportList).map((report) => (
                            <TouchableOpacity
                                style={styles.reportModalContent}
                                onPress={() => {
                                    const key = report as ReportKeyType;
                                    setReportType(reportList[key]);
                                    switchConfirmModal();
                                    switchModal();
                                }}
                            >
                                <Text>{report}</Text>
                            </TouchableOpacity>
                        ))}

                        <View style={styles.reportModalExitContainer}>
                            <TouchableOpacity
                                activeOpacity={1}
                                style={styles.reportModalExit}
                                onPress={() => {
                                    switchModal();
                                }}
                            >
                                <Text>닫기</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
            <ConfirmModal
                visible={confirmModal}
                title="해당 글을 신고하시겠습니까?"
                message={`해당 글을 신고하면, 검토 후 삭제조치와 사용자에 대한 제제가 이루어집니다.`}
                onCancel={() => {
                    switchConfirmModal();
                }}
                onConfirm={() => {
                    switchConfirmModal();
                    mutate({ postId, reportType });
                }}
                confirmText="신고하기"
            />
            <GeneralModal
                informText={informText}
                modalVisible={reportResultModal}
                switchModal={switchResultModal}
                onPressConfirm={() => navigation.pop()}
            />
            <LoadingModal visible={isPending} />
        </>
    );
}

const styles = StyleSheet.create({
    modalOverlay: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    reportModalContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 250,
        height: 300,
        borderRadius: 12,
        backgroundColor: 'white',
    },
    reportModalLine: {
        marginVertical: 10,
        width: '100%',
        height: 1,
        backgroundColor: '#EDEDEA',
    },
    reportModalContent: {
        marginVertical: 5,
        paddingLeft: 15,
        width: '100%',
        height: 30,
    },
    reportModalExitContainer: {
        marginTop: 10,
        width: '100%',
        alignItems: 'flex-end',
    },
    reportModalExit: {
        marginRight: 15,
    },
});
