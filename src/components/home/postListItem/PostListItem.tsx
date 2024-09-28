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
        id: number
        userId: string | null
        title: string
        category: string
        viewCount: number
        likeCount: number
        formattedCreatedAt: string
        images?: string[] | null
    }
    index: number
}

type PostDetailParams = {
    PostDetail: { postId: number } //postId: number
}

const PostListItem: React.FC<Props> = ({ post, index }) => {
    const navigation = useNavigation<NavigationProp<PostDetailParams>>()

    const handlePostItemClick = () => {
        navigation.navigate('PostDetail', { postId: post.id })
    }
    const maxTitleLength = post.images ? 19 : 23
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
                    <Text style={text.postListOthersText}>
                        {post.viewCount}
                    </Text>
                    <View style={{ width: 8 }} />
                    <ThumbsUpIcon />
                    <Text style={text.postListOthersText}>
                        {post.likeCount}
                    </Text>
                </View>
                <Text style={text.postListDateText}>
                    {post.formattedCreatedAt}
                </Text>
                {post.images && (
                    <Image
                        source={{ uri: post.images[0] }}
                        style={styles.thumbnailImage}
                    />
                )}
            </View>
        </TouchableOpacity>
    )
}

export default PostListItem
