import { View, TouchableOpacity, Image, Text, ScrollView } from 'react-native'
import { styles, text } from './ribbonEvaluationStyle'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import EvaluationFinish from '../evaluationFinish/evaluationFinish'

interface RibbonEvaluationProp {
    hospitalName: string
    setRibbonOpen: React.Dispatch<React.SetStateAction<boolean>>
    ribbonCount: number
}
export default function RibbonEvaluation({
    hospitalName,
    setRibbonOpen,
    ribbonCount,
}: RibbonEvaluationProp) {
    //병원 정보 체크할 배열
    const [hospitalCheck, setHospitalCheck] = useState<boolean[]>(
        new Array(hospitalQuestions.length).fill(false),
    )
    //평가를 마친 경우 다음 화면을 띄우기 위한 상태
    const [finish, setFinish] = useState<boolean>(false)

    const { t } = useTranslation('ribbonEvaluation')
    return !finish ? (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={{ flex: 1 }}>
                {/*헤더 */}
                <View style={styles.header}>
                    <TouchableOpacity
                        onPress={() => {
                            setRibbonOpen(false)
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
                        <Text style={text.hospitalText}>{hospitalName}</Text>
                        <Text style={text.questionText}>{t('question')}</Text>
                    </Text>
                </View>
                {/*체크 리스트 */}
                <View style={styles.checkListContainer}>
                    {hospitalQuestions.map((hospitalName, index) => (
                        <TouchableOpacity
                            onPress={() => {
                                const temp = [...hospitalCheck]
                                temp[index] = !temp[index]
                                setHospitalCheck(temp)
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
                                {index + 1 + '. ' + hospitalName}
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
                </View>
            </ScrollView>
            <View style={styles.ButtonsContainer}>
                {/*취소 버튼 */}
                <TouchableOpacity
                    style={styles.cancelContainer}
                    onPress={() => {
                        setRibbonOpen(false)
                    }}
                >
                    <Text style={text.cancelText}>{t('cancel')}</Text>
                </TouchableOpacity>
                {/*평가 완료 버튼 */}
                <TouchableOpacity
                    style={
                        !hospitalCheck.every((element) => element === false) //하나라도 해당되는 항목이 있는 경우
                            ? [styles.finishContainer, styles.activeBackground]
                            : [
                                  styles.finishContainer,
                                  styles.inactiveBackground,
                              ]
                    }
                    onPress={() => {
                        console.log('평가 완료')
                        setFinish(true)
                    }}
                >
                    <Text style={text.finishText}>{t('finish')}</Text>
                </TouchableOpacity>
            </View>
        </View>
    ) : (
        <EvaluationFinish
            hospitalName="용산구정신건강의학과의원"
            setRibbonOpen={setRibbonOpen}
            setFinish={setFinish}
            score={hospitalCheck.filter((item) => item === true).length}
            ribbonCount={ribbonCount}
        />
    )
}

const hospitalQuestions = [
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
]
