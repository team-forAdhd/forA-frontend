import Header from '@/components/common/ui/header';
import { useMyPost } from '@/domains/MyPost/api/Mypost.api';
import MyPostItem from '@/domains/MyPost/components/MypostItem';
import {
    ActivityIndicator,
    FlatList,
    Image,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
} from 'react-native';

export default function MyPost({ navigation }) {
    const { data, error, isPending, fetchNextPage } = useMyPost();
    const myPostList = data?.pages.map((page) => page.postList).flat();

    if (isPending) return <ActivityIndicator size={'large'} color={'green'} />;
    if (error) return <NotFound />;
    if (!myPostList || !myPostList.length) return <NotFound />;

    return (
        <SafeAreaView
            style={{
                flex: 1,
                flexDirection: 'column',
                backgroundColor: '#fff',
            }}
        >
            <Header
                navigation={navigation}
                backIconType="chevron"
                headerText="내가 쓴 글"
            />

            <FlatList
                contentContainerStyle={{
                    paddingTop: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                data={myPostList}
                renderItem={({ item }) => <MyPostItem post={item} />}
                onEndReached={() => fetchNextPage()}
                onEndReachedThreshold={0.5}
            />
        </SafeAreaView>
    );
}

function NotFound() {
    return (
        <View style={styles.emptyContainer}>
            <Image
                style={styles.emptyIcon}
                source={require('@/public/assets/myArticle.png')}
            />
            <Text style={styles.emptyText}>아직 작성한 글이 없어요!</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    emptyContainer: {
        position: 'absolute',
        top: 103,
        backgroundColor: '#EDEDEA',
        width: '100%',
        height: 800,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyIcon: {
        width: 37.09,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 18,
    },
    emptyText: {
        color: '#555555',
        fontSize: 18,
        textAlign: 'center',
    },
});
