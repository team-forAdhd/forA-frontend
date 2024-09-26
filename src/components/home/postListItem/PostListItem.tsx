import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { styles, text } from '../HomeStyle'
import {
    CategoryIcon,
    ViewIcon,
    ThumbsUpIcon,
} from '@/public/assets/SvgComponents'
import { useNavigation, NavigationProp } from '@react-navigation/native'

interface Props {
    post: {
        postId: string
        title: string
        views: number
        recommend: number
        category: string
        createdAt: string
        imageUrl?: string
    }
    index: number
}

type PostDetailParams = {
    postId: number
}

const PostListItem: React.FC<Props> = ({ post, index }) => {
    const navigation = useNavigation<NavigationProp<PostDetailParams>>()

    const handlePostItemClick = () => {
        // TODO 해당 게시글로 페이지 이동
        navigation.navigate('Home' as never)
    }
    const maxTitleLength = post.imageUrl ? 19 : 23
    const displayedTitle =
        post.title.length > maxTitleLength
            ? `${post.title.slice(0, maxTitleLength)}...`
            : post.title

    return (
        <TouchableOpacity
            onPress={handlePostItemClick}
            style={styles.postItemContainer}
        >
            <View style={styles.postNumberContainer}>
                <Text style={text.postListNumText}>
                    {index + 1 < 10 ? `${index + 1}` : index + 1}
                </Text>
            </View>
            <View style={styles.postContentContainer}>
                <Text style={text.postListTitleText}>{displayedTitle}</Text>
                <View style={styles.postInfo}>
                    <CategoryIcon />
                    <Text style={text.postListCategoryText}>
                        {post.category}
                    </Text>
                    <View style={{ width: 8 }} />
                    <ViewIcon />
                    <Text style={text.postListOthersText}>{post.views}</Text>
                    <View style={{ width: 8 }} />
                    <ThumbsUpIcon />
                    <Text style={text.postListOthersText}>
                        {post.recommend}
                    </Text>
                </View>
                <Text style={text.postListDateText}>{post.createdAt}</Text>
                {post.imageUrl && (
                    <Image
                        source={{ uri: post.imageUrl }}
                        style={styles.thumbnailImage}
                    />
                )}
            </View>
        </TouchableOpacity>
    )
}

export default PostListItem
