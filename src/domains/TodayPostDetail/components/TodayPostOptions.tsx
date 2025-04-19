import useModal from '@/hooks/useModal';
import {
    FlatList,
    Image,
    StyleProp,
    StyleSheet,
    Text,
    TextStyle,
    TouchableOpacity,
    View,
} from 'react-native';
import React from 'react';
import BottomSheet from '@/components/common/ui/BottomSheet';
import BlockModal from '@/domains/TodayPostDetail/components/BlockUserModal';
import { StackScreenProps } from '@react-navigation/stack';
import { TodayStackParams } from '@/navigation/stacks/TodayStack';
import ReportPostModal from '@/domains/TodayPostDetail/components/ReportPostModal';
import AdminActionModal from '@/domains/TodayPostDetail/components/AdminActionModal';

const INFORM_TEXT = {
    차단하기: {
        title: '해당 회원을 차단하시겠습니까?',
        description:
            '이 멤버가 포에이에서 쓴 글과 댓글이 보이지 않고, 알림도 발송되지 않습니다. (차단을 하면 다시 해제하실 수 없습니다.)',
        onSuccess: '회원이 차단되었습니다.',
        onError:
            '회원 차단 처리중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.',
    },
    신고하기: {
        title: '해당 회원을 글을 신고하시겠습니까?',
        description:
            '해당 글을 신고하면, 검토 후 삭제조치와 사용자에 대한 제제가 이루어집니다.',
        onSuccess: '해당 글이 신고되었습니다.',
        onError:
            '글 신고 처리중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.',
    },
} as const;

type PostOptions = keyof typeof INFORM_TEXT;

export default function TodayPostOptions({
    navigation,
    userId,
    postId,
    userRole,
}: { userId: string; postId: number; userRole?: string } & Pick<
    StackScreenProps<TodayStackParams, 'PostDetail'>,
    'navigation'
>) {
    const adminModalHook = useModal();
    const optionBottomSheetHook = useModal();
    const blockModalHook = useModal();
    const reportModalHook = useModal();

    const isAdmin = userRole === 'ADMIN';

    const options = isAdmin
        ? ['차단하기', '신고하기', '신고 처리하기']
        : ['차단하기', '신고하기'];

    function handleOptionModal(item: PostOptions | '신고 처리하기') {
        switch (item) {
            case '차단하기':
                blockModalHook.switchModal();
                break;
            case '신고하기':
                reportModalHook.switchModal();
                break;
            case '신고 처리하기':
                adminModalHook.switchModal();
                break;
        }
        optionBottomSheetHook.switchModal();
    }

    return postId === -1 ? null : (
        <>
            <TouchableOpacity onPress={optionBottomSheetHook.switchModal}>
                <Image
                    source={require('@/public/assets/more.png')}
                    style={{ width: 24, height: 26 }}
                />
            </TouchableOpacity>
            <BottomSheet
                visible={optionBottomSheetHook.modalVisible}
                onClose={optionBottomSheetHook.switchModal}
            >
                <View style={styles.titleContainer}>
                    <Text style={text.titleText}>게시글 관리</Text>
                </View>
                <View style={styles.flatList}>
                    <FlatList
                        data={options}
                        keyExtractor={(item) => item}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={styles.optionContainer}
                                onPress={() =>
                                    handleOptionModal(item as PostOptions)
                                }
                            >
                                <Text style={text.commonText}>{item}</Text>
                            </TouchableOpacity>
                        )}
                    />
                </View>
            </BottomSheet>
            <BlockModal
                modalVisible={blockModalHook.modalVisible}
                navigation={navigation}
                switchModal={blockModalHook.switchModal}
                userId={userId}
            />
            <ReportPostModal
                modalVisible={reportModalHook.modalVisible}
                navigation={navigation}
                switchModal={reportModalHook.switchModal}
                postId={postId}
            />
            <AdminActionModal
                modalVisible={adminModalHook.modalVisible}
                switchModal={adminModalHook.switchModal}
                postId={postId}
            />
        </>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    container: {
        backgroundColor: 'white',
        padding: 20,
        borderWidth: 1,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    optionContainer: {
        left: 8,
        paddingVertical: 15,
        flexDirection: 'row',
    },
    titleContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        paddingHorizontal: 16,
        width: '100%',
        height: 25,
    },
    topLine: {
        marginTop: 12,
        width: 80,
        height: 4,
        borderRadius: 500,
        left: 10,
        marginBottom: 12,
    },
    rangeInnerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 32,
        paddingVertical: 22,
    },
    checkIcon: {
        width: 24,
        height: 24,
        left: 250,
    },
    flatList: {
        marginTop: 10,
    },
});

const baseText = {
    fontFamily: 'Pretendard',
    fontStyle: 'normal',
    fontWeight: '400',
};

const text = {
    titleText: {
        fontWeight: '600',
        color: '#232323',
        fontSize: 18,
        lineHeight: 22.4,
        right: -8,
    },
    commonText: {
        ...baseText,
        fontSize: 18,
        lineHeight: 22.4,
        letterSpacing: -0.9,
        color: '#232323',
    },
    checkText: {
        fontWeight: '600',
        color: '#52A55D',
        fontSize: 18,
        lineHeight: 24,
    },
    viewContentText: {
        ...baseText,
        color: '#52A55D',
        fontSize: 14,
        lineHeight: 19.6,
        letterSpacing: -0.7,
        textDecorationLine: 'underline',
    },
    businessInfoText: {
        ...baseText,
        color: '#949494',
        textAlign: 'center',
    },
} as {
    [key: string]: StyleProp<TextStyle>;
};
