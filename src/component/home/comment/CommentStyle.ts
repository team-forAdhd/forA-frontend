import { StyleProp, StyleSheet, TextStyle } from 'react-native'

export const styles = StyleSheet.create({
    commentContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderColor: '#eee',
    },
    modalContainer: {
        position: 'absolute',
        top: 360,
        left: 13,
        justifyContent: 'center',
        alignItems: 'center',
    },
    overlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // 흐림 효과를 위한 반투명 배경
    },
    profileImage: {
        width: 30,
        height: 30,
        borderRadius: 20,
        marginRight: 8,
    },
    replyProfileImage: {
        width: 23,
        height: 23,
        borderRadius: 20,
        marginRight: 8,
    },
    commentContent: {
        flex: 1,
    },
    commentHeader: {
        flexDirection: 'row',
    },
    actionButton: {
        position: 'absolute',
        right: 0,
        alignItems: 'center',
        justifyContent: 'space-between',
        width: 48,
        height: 24,
        marginHorizontal: 5,
        borderRadius: 4,
        backgroundColor: '#fff',
        shadowColor: 'rgba(0, 0, 0, 0.15)',
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.5,
        shadowRadius: 3,
        elevation: 2,
    },
    marginBox: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 8,
        marginTop: 2,
    },
    commentBottom: {
        flexDirection: 'row',
        marginLeft: 38,
    },
    deleteButton: {
        alignSelf: 'flex-start',
        marginLeft: 8,
    },
    replyBox: {
        marginLeft: 16, 
        marginTop: 16
    }
})

export const text = {
    fontFamily: 'Pretendard',
    fontStyle: 'normal',
    nicknameText: {
        color: '#232323',
        fontSize: 16,
        fontWeight: '600',
        lineHeight: 22.4,
    },
    timestampText: {
        color: '#949494',
        fontSize: 14,
        fontWeight: '400',
        lineHeight: 19.6,
        letterSpacing: -0.7,
    },
    commentText: {
        color: '#232323',
        fontSize: 16,
        fontWeight: '400',
        lineHeight: 22.4,
        letterSpacing: -0.9,
        marginBottom: 4,
        marginLeft: 38,
    },
    replyButtonText: {
        color: '#232323',
        fontSize: 14,
        fontWeight: '400',
        lineHeight: 19.6,
        letterSpacing: -0.7,
    },
    deleteButtonText: {
        color: '#555',
        fontSize: 14,
        fontWeight: '400',
        lineHeight: 19.6,
        letterSpacing: -0.7,
    },
} as {
    [key: string]: StyleProp<TextStyle>
}
