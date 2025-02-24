import { View, Text, Image, ScrollView, Modal } from 'react-native';
import { styles, text } from './ribbonDescriptionStyle';
import { useTranslation } from 'react-i18next';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { getRibbonHospitalQuestion } from '@/api/hospital/getRibbonHospitalQuestion';
import { useEffect, useState } from 'react';
interface DescriptionProps {
    setDescription: React.Dispatch<React.SetStateAction<boolean>>;
}

type HospitalEvaluationQuestion = {
    hospitalEvaluationQuestionId: number;
    question: string;
    seq: number;
};

export default function RibbonDescription({
    setDescription,
}: DescriptionProps) {
    const { t } = useTranslation('ribbonDescription');
    const [question, setQuestion] = useState<HospitalEvaluationQuestion[]>();
    useEffect(() => {
        const fetchHospitalData = async () => {
            try {
                // 병원 데이터 가져오기
                const data = await getRibbonHospitalQuestion();
                setQuestion(data);
            } catch (error) {
                console.error('Error fetching hospital data:', error);
            }
            console.log(question);
        };

        fetchHospitalData();
    }, []);
    return (
        <Modal transparent={true} animationType="fade">
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
                        {question &&
                            question.map((question, index) => (
                                <View
                                    style={[styles.flex, { marginTop: 5 }]}
                                    key={index}
                                >
                                    <Text style={text.normalText}>
                                        {question.seq +
                                            '. ' +
                                            question.question}
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
                            setDescription(false);
                        }}
                        style={styles.buttonContainer}
                    >
                        <Text style={text.buttondText}>{t('close')}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}
