import {
    View,
    TouchableOpacity,
    Image,
    Text,
    ScrollView,
    StyleProp,
    TextStyle,
    StyleSheet,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import React, { useEffect, useState } from 'react';
import {
    getRibbonHospitalQuestion,
    useEvaluationReviewMutation,
} from '@/api/hospital/getRibbonHospitalQuestion';
import useModal from '@/hooks/useModal';
import GeneralModal from '@/components/common/modals/modal';
import LoadingModal from '@/components/common/modals/loadingModal';
import EvaluationFinish from './evaluationFinish';
import { StackScreenProps } from '@react-navigation/stack';
import { HospitalStackParams } from '@/navigation/stacks/hospitalStack';

interface RibbonEvaluationProp {
    hospitalName: string;
    setRibbonOpen: React.Dispatch<React.SetStateAction<boolean>>;
    ribbonCount: number;
}

interface hospitalQuestion {
    hospitalEvaluationQuestionId: number;
    seq: number;
    question: string;
}

export default function RibbonEvaluation({
    navigation,
    route,
}: StackScreenProps<HospitalStackParams, 'RibbonEvaluation'>) {
    const { hospitalInfo } = route.params;
    //병원 정보 체크할 배열
    const [hospitalCheck, setHospitalCheck] = useState<boolean[]>(
        new Array(hospitalQuestionsDummy.length).fill(false),
    );
    const [hospitalQuestions, setHospitalQuestions] = useState<
        hospitalQuestion[]
    >([]);
    const {
        modalVisible: errorModal,
        displayModal: pushError,
        switchModal,
        informText,
    } = useModal();
    const { isPending, mutate } = useEvaluationReviewMutation({
        onError: () => {
            pushError('서버 오류로 평가에 실패했습니다. 다시 시도해 주세요.');
        },
        onSuccess: () => {
            setFinish(true);
        },
    });

    //평가를 마친 경우 다음 화면을 띄우기 위한 상태
    const [finish, setFinish] = useState<boolean>(false);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const questionData = await getRibbonHospitalQuestion();
                setHospitalQuestions(questionData);
                setHospitalCheck(new Array(questionData.length).fill(false));
            } catch (error) {
                console.error('Failed to fetch hospital questions:', error);
                // 에러 처리 로직
            }
        };

        fetchQuestions();
    }, []);
    const onPressSubmit = () => {
        mutate({
            hospitalId: hospitalInfo.hospitalId,
            questions: hospitalCheck,
        });
    };

    const { t } = useTranslation('ribbonEvaluation');

    return !finish ? (
        <React.Fragment>
            <View style={styles.container}>
                <View style={{ flex: 1 }}>
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
                        <Text style={text.headerText}>{t('title')}</Text>
                        <View style={styles.IconImage} />
                    </View>
                    {/* 조사 질문 */}
                    <View style={styles.titleContainer}>
                        <Text style={{ textAlign: 'center' }}>
                            <Text style={text.hospitalText}>
                                {hospitalInfo.name}
                            </Text>
                            <Text style={text.questionText}>
                                {t('question')}
                            </Text>
                        </Text>
                    </View>
                    {/*체크 리스트 */}
                    <ScrollView
                        contentContainerStyle={{ alignItems: 'center' }}
                    >
                        {hospitalQuestions &&
                            hospitalQuestions.map((data, index) => (
                                <TouchableOpacity
                                    onPress={() => {
                                        const temp = [...hospitalCheck];
                                        temp[index] = !temp[index];
                                        setHospitalCheck(temp);
                                    }}
                                    style={
                                        hospitalCheck[index]
                                            ? [styles.flex, styles.active]
                                            : [styles.flex, styles.inactive]
                                    }
                                    key={index}
                                >
                                    <Text
                                        style={
                                            hospitalCheck[index]
                                                ? text.activeText
                                                : text.inactiveText
                                        }
                                    >
                                        {data.seq + '. ' + data.question}
                                    </Text>

                                    <Image
                                        source={
                                            hospitalCheck[index]
                                                ? require('@/public/assets/checkRibbon.png')
                                                : require('@/public/assets/uncheckRibbon.png')
                                        }
                                        style={styles.checkImage}
                                    />
                                </TouchableOpacity>
                            ))}
                        <View
                            style={{
                                width: '100%',
                                height: 120,
                                backgroundColor: 'white',
                            }}
                        />
                    </ScrollView>
                </View>
                <View style={styles.ButtonsContainer}>
                    {/*취소 버튼 */}
                    <TouchableOpacity
                        style={styles.cancelContainer}
                        onPress={() => {
                            navigation.pop(2);
                        }}
                    >
                        <Text style={text.cancelText}>{t('cancel')}</Text>
                    </TouchableOpacity>
                    {/*평가 완료 버튼 */}
                    <TouchableOpacity
                        style={
                            !hospitalCheck.every((element) => element === false) //하나라도 해당되는 항목이 있는 경우
                                ? [
                                      styles.finishContainer,
                                      styles.activeBackground,
                                  ]
                                : [
                                      styles.finishContainer,
                                      styles.inactiveBackground,
                                  ]
                        }
                        onPress={onPressSubmit}
                    >
                        <Text style={text.finishText}>{t('finish')}</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <GeneralModal
                informText={informText}
                modalVisible={errorModal}
                switchModal={switchModal}
            />
            <LoadingModal visible={isPending} />
        </React.Fragment>
    ) : (
        <EvaluationFinish
            hospitalInfo={hospitalInfo}
            navigation={navigation}
            score={hospitalCheck.filter((item) => item === true).length}
        />
    );
}

const hospitalQuestionsDummy = [
    '해당 병원은 뇌파검사를 실시하고 있다.',
    '해당 병원은 CAT 검사를 실시하고 있다.',
    '해당 병원은 풀배터리 검사를 실시하고 있다.',
    '해당 병원은 진료 시스템이 체계적으로 갖추어져 있다.',
    '해당 병원의 전문의는 적절한 상담 태도를 갖추고 있다.',
    '해당 병원의 접근성(자가 불필요, 도보 및 대중교통)이 좋다.',
    '해당 병원은 ADHD 이해도가 높다.(경과를 자세히 살피고 조언함)',
    '해당 병원은 ADHD 전문병원이며, 전문가가 존재한다.',
    '해당 병원은 약에 대한 상세한 설명 및 복용량 조절이 적절하다.',
    '해당 병원은 임상 심리사와 행동 및 인지치료를 위한 기간이 존재한다.',
];

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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    header: {
        marginTop: 70,
        width: '100%',
        height: 36,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingBottom: 14,
        borderBottomColor: color.active,
        borderBottomWidth: 2,
    },
    titleContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        width: '100%',
        padding: 30,
    },
    flex: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        width: '95%',
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
    checkListContainer: {},
    IconImage: {
        width: 24,
        height: 24,
        objectFit: 'contain',
    },
    finishContainer: {
        width: 248,
        height: 60,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
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
});

const baseText = {
    fontFamily: 'Pretendard',
    fontStyle: 'normal',
    fontWeight: '400',
};

export const text = {
    headerText: {
        color: color.normal,
        fontSize: 18,
        fontWeight: 'bold',
        letterSpacing: -0.7,
        lineHeight: 22.4,
        textAlign: 'center',
    },
    activeText: {
        ...baseText,
        color: color.active,
        fontSize: 18,
        lineHeight: 22.4,
        letterSpacing: -0.5,
        width: 310,
    },
    inactiveText: {
        ...baseText,
        color: color.inactive,
        fontSize: 18,
        lineHeight: 22.4,
        letterSpacing: -0.5,
        width: 310,
    },
    hospitalText: {
        fontWeight: '800',
        fontSize: 20,
        lineHeight: 28,
        color: color.active,
    },
    questionText: {
        fontWeight: '800',
        fontSize: 20,
        lineHeight: 28,
        color: 'black',
    },
    finishText: {
        fontWeight: '700',
        fontSize: 18,
        lineHeight: 24,
        color: 'white',
    },
    cancelText: {
        fontWeight: '700',
        fontSize: 18,
        lineHeight: 24,
        color: color.normal,
    },
} as {
    [key: string]: StyleProp<TextStyle>;
};
