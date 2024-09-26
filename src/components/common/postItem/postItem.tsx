import React, { useState } from 'react'
import { View, Image, Text, ImageSourcePropType } from 'react-native'
import { styles, text } from './postItemStyle'
import { TouchableOpacity } from 'react-native-gesture-handler'

interface PostProps {
    page: 'homeRealTime' | 'myPage' | 'homeOther' //페이지에 따라 디자인 변경
    post: {
        postId: string
        title: string
        views: number
        category: string
        recommend: number
        comments: number
        createdAt: string
        images: ImageSourcePropType[]
    }
}

export default function PostItem({ post, page }: PostProps) {
    const {
        postId,
        title,
        views,
        category,
        recommend,
        comments,
        createdAt,
        images,
    } = post
    //게시글에 보일 아이콘과 글자
    const postItems = {
        homeRealTime: {
            images: [
                require('@/public/assets/category.png'),
                require('@/public/assets/views.png'),
                require('@/public/assets/recommend.png'),
            ],
            text: [category, views, recommend],
        },
        homeOther: {
            images: [
                require('@/public/assets/views.png'),
                require('@/public/assets/recommend.png'),
                require('@/public/assets/comments.png'),
            ],
            text: [views, recommend, comments],
        },
        myPage: {
            images: [
                require('@/public/assets/category.png'),
                require('@/public/assets/views.png'),
                require('@/public/assets/recommend.png'),
                require('@/public/assets/comments.png'),
            ],
            text: [category, views, recommend, comments],
        },
    }
    //각 페이지에 따라 게시글에 보일 아이콘 다르게
    const thisPage =
        page === 'homeRealTime'
            ? postItems.homeRealTime
            : page === 'myPage'
              ? postItems.myPage
              : postItems.homeOther

    return (
        <View style={styles.container} key={postId}>
            <View style={styles.RightContainer}>
                <Text style={text.title}>
                    {title.length > 20 ? title.slice(0, 20) + '...' : title}
                    {/*제목 길이 일정 범위 넘길 경우 줄여주기 */}
                </Text>
                <View style={styles.iconContainer}>
                    {thisPage.images.map((imageUri, index) => (
                        <TouchableOpacity style={styles.iconInnerContainer}>
                            <Image source={imageUri} style={styles.iconIamge} />
                            <Text
                                style={
                                    thisPage.text[index] === category
                                        ? text.greenSmallText
                                        : text.blackSmallText
                                }
                            >
                                {thisPage.text[index]}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
                <Text style={text.time}>{createdAt}</Text>
            </View>
            <View style={styles.PictureContainer}>
                <Image source={images[0]} style={styles.picture} />
                {images.length > 1 && (
                    <View style={styles.imagesLength}>
                        {'+' + images.length}
                    </View>
                )}
            </View>
        </View>
    )
}
