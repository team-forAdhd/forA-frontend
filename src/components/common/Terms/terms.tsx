import React, { Dispatch, SetStateAction } from 'react'
import { View, Text, ScrollView, LayoutChangeEvent } from 'react-native'
import Terms from '@/public/termsObject/termsObject'
import { styles, text } from './style'

interface TermsComponentProps {
    termsType: 'termsOfService' | 'individualInfo'
    setTermsHeight: Dispatch<SetStateAction<number>>
}

export default function TermsComponent({
    termsType,
    setTermsHeight,
}: TermsComponentProps) {
    const handleLayout = (event: LayoutChangeEvent) => {
        const { height } = event.nativeEvent.layout
        setTermsHeight(height + 224) // 상위 컴포넌트의 상태 업데이트 함수 호출
    }

    return (
        <ScrollView nestedScrollEnabled={true} onLayout={handleLayout}>
            {Terms[termsType].chapters.map((chapter) => (
                <View style={styles.chapterContainer} key={chapter.chapterId}>
                    <Text style={text.chapterText}>{chapter.title}</Text>
                    {chapter.articles.map((article) => (
                        <View
                            style={styles.articleTitleContainer}
                            key={article.articleId}
                        >
                            <Text style={text.articleTitleText}>
                                {article.title}
                            </Text>
                            <View>
                                <Text style={text.articleSubTitleText}>
                                    {article.subTitle}
                                </Text>
                            </View>
                            <View>
                                <Text style={text.articleContentText}>
                                    {article.content}
                                </Text>
                            </View>
                        </View>
                    ))}
                </View>
            ))}
        </ScrollView>
    )
}
