import { View, Text, Image, ScrollView } from 'react-native'
import { styles, text } from './ribbonDescriptionStyle'
import { useTranslation } from 'react-i18next'
import { TouchableOpacity } from 'react-native-gesture-handler'

interface DescriptionProps {
    setDescription: React.Dispatch<React.SetStateAction<boolean>>
}

export default function RibbonDescription({
    setDescription,
}: DescriptionProps) {
    const { t } = useTranslation('ribbonDescription')
    return (
        <View style={styles.background}>
            <View style={styles.container}>
                <ScrollView>
                    <View style={[styles.flex, { marginTop: 38 }]}>
                        <Text style={text.headerText}>{t('header')}</Text>
                    </View>
                    <View
                        style={[
                            styles.flex,
                            { marginTop: 34, alignItems: 'center' },
                        ]}
                    >
                        <Image
                            style={styles.IconImage}
                            source={require('@/public/assets/ribbonIcon.png')}
                        />
                    </View>
                    <View style={[styles.flex, { marginTop: 45 }]}>
                        <Text style={text.boldText}>{t('first')}</Text>
                    </View>
                    <View
                        style={[
                            styles.flex,
                            { marginTop: 27, marginBottom: 24 },
                        ]}
                    >
                        <Text style={text.normalText}>{t('second')}</Text>
                    </View>
                    {hospitalQuestions.map((question, index) => (
                        <View
                            style={[styles.flex, { marginTop: 5 }]}
                            key={index}
                        >
                            <Text style={text.normalText}>
                                {index + 1 + '. ' + question}
                            </Text>
                        </View>
                    ))}

                    <View
                        style={[
                            styles.flex,
                            { marginTop: 26, marginBottom: 26 },
                        ]}
                    >
                        <Text style={text.normalText}>{t('third')}</Text>
                    </View>
                </ScrollView>
                <TouchableOpacity
                    onPress={() => {
                        setDescription(false)
                    }}
                    style={styles.buttonContainer}
                >
                    <Text style={text.buttondText}>{t('close')}</Text>
                </TouchableOpacity>
            </View>
        </View>
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
