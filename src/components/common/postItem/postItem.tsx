import React from 'react';
import { View, Image, Text, ImageSourcePropType } from 'react-native';
import { styles, text } from './postItemStyle';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation, NavigationProp } from '@react-navigation/native';

interface PostProps {
    page: 'homeRealTime' | 'myPage' | 'homeOther';
    post: {
        anonymous?: boolean;
        category?: string | null;
        commentCount?: number;
        comments?: string[] | null;
        content?: string;
        createdAt: number;
        id?: number;
        images?: string[] | null;
        lastModifiedAt?: number | null;
        likeCount?: number;
        nickname?: string | null;
        profileImage?: string | null;
        scrapCount?: number;
        title?: string;
        userId?: number | null;
        viewCount?: number;
    };
}

type PostDetailParams = {
    PostDetail: { postId: number }; //postId: number
};
export default function PostItem({ post, page }: PostProps) {
    const categoryMap: Record<string, string> = {
        TEENS: '10대',
        TWENTIES: '20대',
        THIRTIES_AND_ABOVE: '30대↑',
        PARENTS: '학부모',
    };

    // post의 각 속성들에 안전하게 접근하도록 변경
    const {
        category,
        comments,
        likeCount,
        title = '',
        viewCount,
        createdAt,
        images,
        id,
    } = post || {};

    // postItems 정의
    const postItems = {
        homeRealTime: {
            images: [
                require('@/public/assets/category.png'),
                require('@/public/assets/views.png'),
                require('@/public/assets/recommend.png'),
            ],
            text: [
                category ? categoryMap[category] : '',
                viewCount ?? 0,
                likeCount ?? 0,
            ],
        },
        homeOther: {
            images: [
                require('@/public/assets/views.png'),
                require('@/public/assets/recommend.png'),
                require('@/public/assets/comments.png'),
            ],
            text: [viewCount ?? 0, likeCount ?? 0, comments?.length ?? 0],
        },
        myPage: {
            images: [
                require('@/public/assets/category.png'),
                require('@/public/assets/views.png'),
                require('@/public/assets/recommend.png'),
                require('@/public/assets/comments.png'),
            ],
            text: [
                category ? categoryMap[category] : '',
                viewCount ?? 0,
                likeCount ?? 0,
                comments?.length ?? 0,
            ],
        },
    };

    // 페이지에 따라 postItems 선택
    const thisPage =
        page === 'homeRealTime'
            ? postItems.homeRealTime
            : page === 'myPage'
              ? postItems.myPage
              : postItems.homeOther;

    const formattedDate = new Date(createdAt * 1000).toLocaleDateString(
        'ko-KR',
        {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        },
    );
    const navigation = useNavigation<NavigationProp<PostDetailParams>>();
    return (
        <TouchableOpacity
            style={styles.container}
            key={id}
            onPress={() => {
                navigation.navigate('PostDetail', { postId: post.id });
            }}
        >
            <View style={styles.RightContainer}>
                <Text style={text.title}>
                    {title.length > 20 ? title.slice(0, 20) + '...' : title}
                </Text>
                <View style={styles.iconContainer}>
                    {thisPage.images.map((imageUri, index) => (
                        <TouchableOpacity
                            key={index}
                            style={styles.iconInnerContainer}
                        >
                            <Image
                                source={imageUri}
                                style={
                                    imageUri ==
                                    require('@/public/assets/views.png')
                                        ? [styles.iconImage, { marginRight: 2 }]
                                        : styles.iconImage
                                }
                            />
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
                <Text style={text.time}>{formattedDate}</Text>
            </View>
            {images && images.length > 0 && (
                <View style={styles.PictureContainer}>
                    <Image source={{ uri: images[0] }} style={styles.picture} />
                    {images.length > 1 && (
                        <View style={styles.imagesLength}>
                            <Text style={text.iamgesLength}>
                                {'+' + images.length}
                            </Text>
                        </View>
                    )}
                </View>
            )}
        </TouchableOpacity>
    );
}
