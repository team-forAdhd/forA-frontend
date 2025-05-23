import { TitleTextIcon } from '@/public/assets/SvgComponents';
import { StyleProp, StyleSheet, TextStyle } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        marginTop: 23,
    },
    profileImage: {
        width: 30,
        height: 30,
        borderRadius: 25,
    },
    rateCreatedAtBox: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rateBox: {
        width: 37,
        height: 17,
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 4,
    },
    starIcon: {
        width: 17,
        height: 17,
        justifyContent: 'center',
        alignItems: 'center',
    },
    contentBox: {
        marginTop: 16,
        marginBottom: 10,
    },
    textContainer: {
        marginLeft: 10,
        flex: 1,
    },
    reviewHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    imagesContainer: {
        flexDirection: 'row',
        marginTop: 11,
    },
    reviewImage: {
        width: 120,
        height: 120,
        borderRadius: 8,
        marginRight: 5,
        // borderWidth: 1,
    },
    helpIcon: {
        width: 20,
        height: 21,
        marginRight: 7,
    },
    helpButton: {
        flexDirection: 'row',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 104,
        height: 34,
        borderRadius: 44,
        borderWidth: 1,
        borderColor: '#949494',
        marginBottom: 10,
    },
    helpButtonClicked: {
        flexDirection: 'row',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 104,
        height: 34,
        borderRadius: 44,
        borderWidth: 1,
        borderColor: '#52A55D',
        marginBottom: 10,
        backgroundColor: '#F4F9D9',
    },
    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // 배경 흐림
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: 382,
        height: 382,
        flexShrink: 0,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    modalImage: {
        width: '100%',
        height: '100%',
        borderRadius: 8,
    },
    modalDeleteContainer: {
        width: 300,
        backgroundColor: 'white',
        borderRadius: 12,
        overflow: 'hidden',
    },
    modalDeleteButton: {
        flexDirection: 'row',
        borderTopWidth: 1,
        borderColor: '#ddd',
    },
    modalDeleteConfirmButton: {
        flex: 1,
        paddingVertical: 15,
        alignItems: 'center',
        borderRightWidth: 1,
        borderColor: '#ddd',
        backgroundColor: '#f0f0f0',
        borderBottomLeftRadius: 12,
    },
    modalDeleteCancelButton: {
        flex: 1,
        paddingVertical: 15,
        alignItems: 'center',
        backgroundColor: '#52A55D',
        borderBottomRightRadius: 12,
    },
    modalDeleteCommentContainer: {
        minWidth: 300,
        minHeight: 65,
        paddingVertical: 15,
        paddingHorizontal: 20,
        backgroundColor: 'white',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
});

export const text = {
    fontFamily: 'Pretendard',
    fontStyle: 'normal',
    nicknameText: {
        color: '#000',
        fontSize: 16,
        fontWeight: '600',
        lineHeight: 22.4,
    },
    deleteText: {
        color: '#000',
        fontSize: 16,
        fontWeight: '400',
        lineHeight: 22.4,
        marginRight: 10,
    },
    ageGenederText: {
        color: '#949494',
        fontSize: 14,
        fontWeight: '400',
        lineHeight: 19.6,
        letterSpacing: -0.7,
    },
    rateText: {
        color: '#52A55D',
        fontSize: 12,
        fontWeight: '400',
        lineHeight: 16.8,
        letterSpacing: -0.6,
        marginTop: 1,
    },
    createdAtText: {
        color: '#555',
        fontSize: 12,
        fontWeight: '400',
        lineHeight: 16.8,
        letterSpacing: -0.6,
        marginTop: 1,
    },
    contentText: {
        color: '#000',
        fontSize: 16,
        fontWeight: '400',
        lineHeight: 24,
        letterSpacing: -0.8,
    },
    helpButtonText: {
        color: '#707070',
        fontSize: 14,
        fontWeight: '400',
        lineHeight: 19.6,
        letterSpacing: -0.7,
    },
    helpButtonClickedText: {
        color: '#52A55D',
        fontSize: 16,
        fontWeight: '400',
        lineHeight: 24,
        letterSpacing: -0.8,
    },
    modalDelete: {
        padding: 20,
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '500',
    },
    modalDeleteConfirm: {
        fontSize: 16,
        fontWeight: '500',
    },
    modalDeleteCancel: {
        fontSize: 16,
        fontWeight: '600',
        color: 'white',
    },
    modalDeleteComment: {
        textAlign: 'center',
        fontSize: 16,
        color: '#000',
        width: '100%',
        flexWrap: 'wrap',
        fontWeight: '500',
    },
} as {
    [key: string]: StyleProp<TextStyle>;
};
