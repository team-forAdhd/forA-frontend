import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigation } from '@react-navigation/native'
import { TouchableOpacity, Text, View, Image } from 'react-native'
import { styles, text } from './JoinStyle'
import { ArrowIcon } from '@/public/assets/SvgComponents'
import profileStore from '@/state/signupState/profileStore'

export default function JoinLast() {
    const { t } = useTranslation('login-join')
    const navigation = useNavigation()

    const gotoBeforeScreen = () => {
        navigation.navigate('SetPassword' as never)
    }

    const gotoNextScreen = () => {
        saveUserdInfo()
        navigation.navigate('JoinDone' as never)
    }

    const [selectedImages, setSelectedImages] = useState<string>('')
    const [clickedImageIndex, setClickedImageIndex] = useState<number | null>(
        null,
    )

    const handleImageClick = (image: string, index: number) => {
        setSelectedImages(image)
        setClickedImageIndex(index)
    }

    const saveUserdInfo = () => {
        let valueToSend = ''
        if (selectedImages.includes('join-last-1')) {
            valueToSend = 'FOR_MY_ADHD'
        } else if (selectedImages.includes('join-last-2')) {
            valueToSend = 'FOR_CHILDREN_ADHD'
        } else if (selectedImages.includes('join-last-3')) {
            valueToSend = 'FOR_AROUND_ADHD'
        }

        profileStore.setIsAdhd(valueToSend)
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.header} onPress={gotoBeforeScreen}>
                <ArrowIcon />
            </TouchableOpacity>
            <View style={styles.title}>
                <Text style={text.titleText}>{t('last-title')}</Text>
            </View>
            <View style={styles.surveyContents}>
                <View style={styles.surveyContainer}>
                    <TouchableOpacity
                        onPress={() => handleImageClick('join-last-1', 0)}
                    >
                        <Text
                            style={[
                                text.lastText,
                                {
                                    color:
                                        clickedImageIndex === 0
                                            ? '#232323'
                                            : '#555',
                                },
                            ]}
                        >
                            {t('isadhd-question-1')}
                        </Text>
                        <Image
                            source={
                                selectedImages.includes('join-last-1')
                                    ? require('@/public/assets/join-last/join-last-1-1.png')
                                    : require('@/public/assets/join-last/join-last-1.png')
                            }
                            style={styles.surveyButton}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.surveyContainer}>
                    <TouchableOpacity
                        onPress={() => handleImageClick('join-last-2', 1)}
                    >
                        <Text
                            style={[
                                text.lastText,
                                {
                                    color:
                                        clickedImageIndex === 1
                                            ? '#232323'
                                            : '#555',
                                },
                            ]}
                        >
                            {t('isadhd-question-2')}
                        </Text>
                        <Image
                            source={
                                selectedImages.includes('join-last-2')
                                    ? require('@/public/assets/join-last/join-last-2-1.png')
                                    : require('@/public/assets/join-last/join-last-2.png')
                            }
                            style={styles.surveyButton}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.surveyContainer}>
                    <TouchableOpacity
                        onPress={() => handleImageClick('join-last-3', 2)}
                    >
                        <Text
                            style={[
                                text.lastText,
                                {
                                    color:
                                        clickedImageIndex === 2
                                            ? '#232323'
                                            : '#555',
                                },
                            ]}
                        >
                            {t('isadhd-question-3')}
                        </Text>
                        <Image
                            source={
                                selectedImages.includes('join-last-3')
                                    ? require('@/public/assets/join-last/join-last-3-1.png')
                                    : require('@/public/assets/join-last/join-last-3.png')
                            }
                            style={styles.surveyButton}
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[
                        styles.nextButton,
                        selectedImages.length > 0
                            ? { backgroundColor: '#52A55D' }
                            : { backgroundColor: '#EEE' },
                    ]}
                    disabled={selectedImages.length === 0}
                    onPress={gotoNextScreen}
                >
                    <Text
                        style={[
                            text.buttonText,
                            selectedImages.length > 0
                                ? { color: '#FFF' }
                                : { color: '#232323' },
                        ]}
                    >
                        {t('next-button')}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
