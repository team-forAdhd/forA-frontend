import {
    View,
    TouchableOpacity,
    Image,
    Text,
    StyleProp,
    TextStyle,
    StyleSheet,
    SafeAreaView,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import React, { useState, useContext } from 'react';
import { TextInput } from 'react-native-gesture-handler';
import { HospitalInfo } from '@/components/hospital/types';
import { HospitalStackParams } from '@/navigation/stacks/hospitalStack';
import { StackNavigationProp } from '@react-navigation/stack';
import { useAuthStore } from '@/store/authStore';

interface EvaluationFinishProp {
    hospitalInfo: HospitalInfo;
    score: number;
    navigation: StackNavigationProp<
        HospitalStackParams,
        'RibbonEvaluation',
        undefined
    >;
}

export default function EvaluationFinish({
    hospitalInfo,
    score,
    navigation,
}: EvaluationFinishProp) {
    //텍스트 인풋에서 받을 검색어
    const [inputValue, setInputValue] = useState<string>('');
    const validity = inputValue.length > 20;
    const inputValidity = !inputValue.length || validity;
    //아쉬운 점 제출 상태
    const [submit, setSubmit] = useState<boolean>(false);

    const nickname = useAuthStore((state) => state.nickname);

    const handleInput = () => {
        setSubmit(true);
    };

    const { t } = useTranslation('ribbonEvaluation');
    return (
        <React.Fragment>
            <SafeAreaView style={styles.container}>
                {/*헤더 */}
                <View style={styles.header}>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.pop(2);
                        }}
                    >
                        <Image
                            source={require('@/public/assets/x.png')}
                            style={styles.IconImage}
                        />
                    </TouchableOpacity>
                    <Image
                        source={require('@/public/assets/ribbons.png')}
                        style={styles.Ribbons}
                    />
                    <View style={styles.IconImage} />
                </View>
                {/*포에이 리뷰 축하  */}
                <View
                    style={{
                        flex: 1,
                        flexDirection: 'column',
                        width: '100%',
                        paddingBottom: 50,
                        justifyContent: 'space-around',
                    }}
                >
                    <View
                        style={
                            score > 5
                                ? styles.highTitleContainer
                                : styles.lowTitleContainer
                        }
                    >
                        {score > 5 ? (
                            <Text style={{ textAlign: 'center' }}>
                                <Text style={text.hospitalText}>
                                    {hospitalInfo.name}
                                </Text>
                                <Text style={text.questionText}>{t('to')}</Text>
                                <Text style={text.hospitalText}>
                                    {hospitalInfo.totalEvaluationReviewCount +
                                        1 +
                                        t('ribbon-count')}
                                </Text>
                                <Text style={text.questionText}>
                                    {t('thanks')}
                                </Text>
                            </Text>
                        ) : (
                            <Text style={{ textAlign: 'center' }}>
                                <Text style={text.hospitalText}>
                                    {nickname}
                                </Text>
                                <Text style={text.questionText}>
                                    {t('review-title')}
                                </Text>
                            </Text>
                        )}
                    </View>
                    <View
                        style={[
                            {
                                width: '100%',
                                alignItems: 'center',
                            },
                        ]}
                    >
                        <Image
                            source={
                                score > 5
                                    ? require('@/public/assets/finish1.png')
                                    : require('@/public/assets/finish2.png')
                            }
                            style={
                                score > 5
                                    ? styles.HighScoreImage
                                    : styles.lowScoreImage
                            }
                        />
                    </View>
                    <View
                        style={
                            score > 5
                                ? [styles.middleContainer, styles.highPosition]
                                : [styles.middleContainer, styles.lowPosition]
                        }
                    >
                        <Text style={text.middleText}>
                            {score > 5
                                ? t('high-thanks')
                                : hospitalInfo.name + t('low-thanks')}
                        </Text>
                    </View>
                    {score < 6 && ( //점수가 60점 미만인 경우 아쉬운점 수집
                        <View
                            style={{
                                width: '100%',
                                justifyContent: 'center',
                                alignItems: 'center',
                                position: 'relative',
                            }}
                        >
                            <TextInput
                                placeholder={t('place-holder')}
                                multiline={true}
                                numberOfLines={7}
                                value={inputValue}
                                onChangeText={(text) => {
                                    setSubmit(false);
                                    setInputValue(text);
                                }}
                                returnKeyType="search"
                                onSubmitEditing={handleInput}
                                style={[
                                    styles.InputStyles,
                                    inputValidity
                                        ? { borderColor: '#949494' }
                                        : { borderColor: '#FF5D5D' },
                                ]}
                                selectionColor="#FF5D5D"
                                placeholderTextColor="#949494"
                                maxLength={500}
                            />
                            <Text
                                style={[
                                    text.inputCountText,
                                    inputValidity
                                        ? { color: '#949494' }
                                        : { color: '#FF5D5D' },
                                ]}
                            >
                                {inputValue.length + '/500'}
                            </Text>
                        </View>
                    )}
                    <View style={styles.bottomContainer}>
                        <Text style={text.bottomText}>
                            {t('bottom-thanks')}
                        </Text>
                    </View>
                    <TouchableOpacity
                        disabled={score > 5 ? false : !validity}
                        style={[
                            styles.buttonBottomContainer,
                            score < 5 && validity
                                ? {}
                                : { backgroundColor: '#949494' },
                        ]}
                        onPress={() => {
                            score > 5 ? navigation.pop(2) : setSubmit(true);
                        }}
                    >
                        <Text style={text.bottomButtonText}>
                            {score > 5 ? t('close') : t('opinion')}
                        </Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
            {submit && ( // 제출 버튼을 누른 경우 배경 변화와 모달
                <View style={styles.finishContainer}>
                    <View style={styles.modalContainer}>
                        <View style={styles.thanksContainer}>
                            <Text style={text.lastText}>
                                {t('last-thanks')}
                            </Text>
                        </View>
                        <TouchableOpacity
                            onPress={() => {
                                navigation.pop(2);
                            }}
                            style={styles.homeContainer}
                        >
                            <Text style={text.bottomButtonText}>
                                {t('go-home')}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </React.Fragment>
    );
}

//자주 반복되는 색 객체로 빼서 사용
const color = {
    primary: '#52A35D',
    inactive: '#555555',
    ribbon: '#FF5D5D',
    normal: '#232323',
    active: '#FF5D5D',
    background: '#F4F9D9',
    cancel: '#EEEEEE',
    InactiveBackground: '#949494',
};
const baseText = {
    fontFamily: 'Pretendard',
    fontStyle: 'normal',
    fontWeight: '400',
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        flexDirection: 'column',
        width: '100%',
        alignItems: 'center',
    },
    finishContainer: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        zIndex: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        opacity: 10,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    },
    modalContainer: {
        width: 364,
        height: 153,
        zIndex: 10,
        justifyContent: 'center',
        flexDirection: 'column',
        borderRadius: 12,
        overflow: 'hidden', //자식 컴포넌트의 테두리가 보여서 설정
    },
    thanksContainer: {
        width: '100%',
        height: '67%',
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    },
    homeContainer: {
        width: '100%',
        height: '33%',
        backgroundColor: color.active,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    },
    header: {
        width: '100%',
        height: 36,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingRight: 16,
        paddingLeft: 16,
        paddingBottom: 14,
        zIndex: 2,
        borderBottomColor: color.active,
        borderBottomWidth: 2,
    },
    highTitleContainer: {
        paddingVertical: 20,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        width: '100%',
    },
    lowTitleContainer: {
        paddingVertical: 20,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        width: '100%',
    },
    middleContainer: {
        width: '100%',
        justifyContent: 'center',
    },
    highPosition: {},
    lowPosition: {},
    bottomContainer: {
        justifyContent: 'center',
        width: '100%',
    },
    flex: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        marginHorizontal: 16,
        width: 382,
        height: 70,
        borderRadius: 8,
        borderWidth: 1,
        marginBottom: 8,
    },
    active: {
        borderColor: color.active,
        backgroundColor: color.background,
    },
    inactive: {
        borderColor: color.inactive,
    },
    checkImage: {
        width: 20,
        height: 20,
        objectFit: 'contain',
    },
    checkListContainer: {
        position: 'absolute',
        top: 246,
        justifyContent: 'center',
    },
    smallImage: {
        width: 23,
        height: 23,
        objectFit: 'contain',
        marginRight: 4,
    },
    IconImage: {
        width: 24,
        height: 24,
        objectFit: 'contain',
    },
    Ribbons: {
        width: 64,
        height: 12,
        objectFit: 'contain',
    },

    InputStyles: {
        width: '92.2%',
        height: 100,
        borderWidth: 1,
        borderRadius: 8,
        padding: 10,
        color: color.normal,
        fontSize: 15,
        lineHeight: 24,
        letterSpacing: -0.5,
        fontFamily: 'Pretendard',
    },
    HighScoreImage: {
        width: 205,
        height: 152.01,
        objectFit: 'contain',
    },
    lowScoreImage: {
        width: 177.27,
        height: 167.21,
        objectFit: 'contain',
    },
    cancelContainer: {
        width: 123,
        height: 60,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: color.cancel,
    },
    activeBackground: {
        backgroundColor: color.active,
    },
    inactiveBackground: {
        backgroundColor: color.InactiveBackground,
    },
    ButtonsContainer: {
        backgroundColor: 'white',
        borderTopWidth: 9,
        borderTopColor: color.cancel,
        zIndex: 3,
        paddingHorizontal: 16,
        paddingTop: 20,
        paddingBottom: 34,
        position: 'absolute',
        bottom: 0,
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: '100%',
        height: 111,
    },
    buttonBottomContainer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: color.active,
    },
});

const text = {
    headerText: {
        color: color.normal,
        fontSize: 18,
        fontWeight: 'bold',
        letterSpacing: -0.7,
        lineHeight: 22.4,
        textAlign: 'center',
        marginLeft: 70,
    },
    lastText: {
        fontWeight: '800',
        fontSize: 18,
        lineHeight: 24,
        color: color.normal,
    },
    inputCountText: {
        ...baseText,
        color: color.normal,
        fontSize: 14,
        lineHeight: 30,
        position: 'absolute',
        bottom: -30,
        right: 20,
    },
    hospitalText: {
        fontWeight: '800',
        fontSize: 20,
        lineHeight: 30,
        color: color.active,
    },
    questionText: {
        fontWeight: '800',
        fontSize: 20,
        lineHeight: 28,
        color: 'black',
    },
    middleText: {
        ...baseText,
        fontSize: 18,
        lineHeight: 26,
        letterSpacing: -0.5,
        color: color.normal,
        textAlign: 'center',
    },
    bottomText: {
        ...baseText,
        fontSize: 14,
        lineHeight: 19.6,
        letterSpacing: -0.5,
        color: color.InactiveBackground,
        textAlign: 'center',
    },
    cancelText: {
        fontWeight: '700',
        fontSize: 18,
        lineHeight: 24,
        color: color.normal,
    },
    bottomButtonText: {
        fontWeight: '700',
        fontSize: 18,
        lineHeight: 24,
        color: 'white',
    },
} as {
    [key: string]: StyleProp<TextStyle>;
};
