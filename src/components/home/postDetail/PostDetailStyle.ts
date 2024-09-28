import { StyleProp, StyleSheet, TextStyle } from 'react-native'

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    header: {
        position: 'absolute',
        top: 52,
        width: '100%',
        height: 36,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        paddingRight: 16,
        paddingLeft: 16,
    },
    gobackIcon: {
        position: 'absolute',
        left: 10,
    },
    isAuthorButtonBox: {
        position: 'absolute',
        right: 10,
        flexDirection: 'row',
        alignItems: 'center',
        width: 82,
        height: 35,
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
    scrollViewContainer: {
        flexGrow: 1,
        paddingBottom: 0,
    },
    imageBox: {
        width: '100%',
        height: 414,
    },
    imageCountBox: {
        width: 70,
        height: 20,
        flexShrink: 0,
        borderRadius: 500,
        backgroundColor: 'rgba(0, 0, 0, 0.80)',
        right: 16,
        bottom: 16,
    },
    bodyConatiner: {
        marginTop: 100,
    },
    userInfoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    userInfoTextContainer: {
        flexDirection: 'column',
        marginLeft: 8,
        marginBottom: 12,
    },
    icon: {
        width: 43,
        height: 43,
        borderRadius: 16,
        marginLeft: 16,
    },
    actionButtonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginLeft: 'auto',
        marginRight: 16,
        marginBottom: 11,
    },
    actionButton: {
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
    actionButton2: {
        flexDirection: 'row',
        alignItems: 'center',
        width: 20,
        height: 20,
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
    titleContainer: {
        marginHorizontal: 16,
        marginVertical: 12,
    },
    titleUnderBar: {
        width: '100%',
        height: 1,
        borderBottomWidth: 1,
        borderBottomColor: '#555555',
        flexShrink: 0,
        marginTop: 12,
    },
    marginBox: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 8,
        marginTop: 2,
    },
    contentContainer: {
        marginHorizontal: 16,
        marginVertical: 13,
    },
    addComment: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 48,
        marginHorizontal: 16,
        marginVertical: 16,
        borderRadius: 500,
        borderColor: '#949494',
        borderWidth: 1,
        backgroundColor: '#FFF'
    },
    anonymousIcon: {
        width: 17,
        height: 17,
        justifyContent: 'center',
        alignItems: 'center',
    },
    commentBox: {
        justifyContent: 'flex-start',
    },
    commentButton: {
        position:'absolute',
        right: 7,
        width: 28,
        height: 28,
    },
    sendIcon:{
        width: 28,
        height: 28,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    endOfPostBox: {
        width: '100%',
        height: 40,
        backgroundColor: '#EEE'
    },
    commentContainer: {
        marginTop: 16,
    },
    commentCountConatiner: {
        marginHorizontal: 16,
        marginVertical: 16,
    },
    commentAnonymousContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: 42,
        height: 17,
        marginRight: 10,
        marginLeft: 12,
    },
    endOfCommentBox: {
        width: '100%',
        height: 20,
        backgroundColor: '#EEE'
    }
})

export const text = {
    fontFamily: 'Pretendard',
    fontStyle: 'normal',
    categoryText: {
        color: '#000',
        fontSize: 18,
        fontWeight: '600',
        lineHeight: 22.4,
        textAlign: 'center',
        flex: 1,
    },
    categoryWithImageText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: '600',
        lineHeight: 22.4,
        textAlign: 'center',
        flex: 1,
    },
    userText: {
        color: '#232323',
        fontSize: 16,
        fontWeight: '600',
        lineHeight: 22.4,
    },
    createdAtText: {
        color: '#232323',
        fontSize: 14,
        fontWeight: '400',
        lineHeight: 19.6,
        letterSpacing: -0.7,
    },
    countText: {
        color: '#232323',
        fontSize: 14,
        fontWeight: '400',
        lineHeight: 19.6,
        letterSpacing: -0.7,
        marginLeft: 2,
    },
    titleText: {
        color: '#232323',
        fontSize: 18,
        fontWeight: '600',
        lineHeight: 22.4,
    },
    contentText: {
        color: '#232323',
        fontSize: 18,
        fontWeight: '400',
        lineHeight: 26,
        letterSpacing: -0.9,
    },
    commentCountText:{
        color: '#232323',
        fontSize: 18,
        fontWeight: '600',
        lineHeight: 22.4,
    },
    anonymousText: {
        color: '#52A55D',
        fontSize: 12,
        fontWeight: '400',
        lineHeight: 16.8,
        letterSpacing: -0.6,
        marginLeft: 4,
    },
    notAnonymousText: {
        color: '#949494',
        fontSize: 12,
        fontWeight: '400',
        lineHeight: 16.8,
        letterSpacing: -0.6,
        marginLeft: 4,
    },
    commentBoxText: {
        color: '#232323',
        fontSize: 16,
        fontWeight: '400',
        lineHeight: 22.4,
        letterSpacing: -0.8,
    }
} as {
    [key: string]: StyleProp<TextStyle>
}
