import React, { useState } from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { styles, text } from './MedReviewListItemStyle'
import { formatDate } from '@/common/formatDate'
import { ScrollView } from 'react-native-gesture-handler'
import { useTranslation } from 'react-i18next'
import { medReviewHelpApi } from '@/api/medicine/medReviewApi'

interface MedReviewListItemProps {
    review: {
        id: number
        medicineId: number
        content: string
        images: string[]
        grade: number
        helpCount: number
        coMedications: number[]
        nickname: string
        profileImage: string
        ageRange: string
        gender: string
        averageGrade: number
        createdAt: number
        lastModifiedAt: number
    }
}

const MedReviewListItem: React.FC<MedReviewListItemProps> = ({ review }) => {
    const { t } = useTranslation('medicine')
    const [helpCount, setHelpCount] = useState(review.helpCount)
    const [isHelpClicked, setIsHelpClicked] = useState(false)

    const handleHelpClick = async () => {
        if (!isHelpClicked) {
            setHelpCount(helpCount + 1)
            setIsHelpClicked(true)
            await medReviewHelpApi(review.id)
        } else {
            setIsHelpClicked(false)
        }
    }
    return (
        <View style={styles.container}>
            {/* 정보 파트: 닉네임, 나이/등 특성, 별점, 작성일자 */}
            <Image
                source={
                    review.profileImage
                        ? { uri: review.profileImage }
                        : require('@/public/assets/defaultProfile.png')
                }
                style={styles.profileImage}
            />
            {/* 내용 파트 */}
            <View style={styles.textContainer}>
                <Text style={text.nicknameText}>{review.nickname}</Text>
                <Text
                    style={text.ageGenederText}
                >{`${review.ageRange} · ${review.gender === 'FEMALE' ? '여성' : '남성'}`}</Text>
                <View style={styles.rateCreatedAtBox}>
                    <View style={styles.rateBox}>
                        <Image
                            source={require('@/public/assets/med/star.png')}
                            style={styles.starIcon}
                        />
                        <Text style={text.rateText}>{review.grade}</Text>
                    </View>
                    <Text style={text.createdAtText}>
                        {formatDate(review.createdAt)}
                    </Text>
                </View>
                <View style={styles.contentBox}>
                    <Text style={text.contentText}>{review.content}</Text>
                    <View style={styles.imagesContainer}>
                        <ScrollView horizontal>
                            {review.images.map((image, index) => (
                                <Image
                                    key={index}
                                    source={{ uri: image }}
                                    style={styles.reviewImage}
                                />
                            ))}
                        </ScrollView>
                    </View>
                </View>
                {/* 도움돼요 버튼 */}
                <TouchableOpacity onPress={handleHelpClick}>
                    <View
                        style={
                            isHelpClicked
                                ? styles.helpButtonClicked
                                : styles.helpButton
                        }
                    >
                        <Image
                            source={require('@/public/assets/med/helpful.png')}
                            style={styles.helpIcon}
                        />
                        <Text
                            style={
                                isHelpClicked
                                    ? text.helpButtonClickedText
                                    : text.helpButtonText
                            }
                        >
                            {t('help-button')} {helpCount}
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default MedReviewListItem
