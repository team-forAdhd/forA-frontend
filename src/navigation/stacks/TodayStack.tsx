import EditPost from '@/components/editPost/EditPost';
import Home from '@/components/home/Home';
import PostDetail from '@/components/home/postDetail/PostDetail';
import NewPost from '@/components/newPost/NewPost';
import NotificationScreen from '@/components/notification/notificationScreen';
import SearchScreen from '@/components/search/searchScreen';
import SiocialLoginScreen from '@/components/socialLogin/socialLogin';
import OnboardingScreen from '@/components/splash-n-onboard/onboard/Onboard';
import { createStackNavigator } from '@react-navigation/stack';

export type TodayStackParams = {
    Home: undefined;
    OnBoard: undefined;
    Search: undefined;
    Notifications: undefined;
    NewPost: undefined;
    PostDetail: { postId: number };
    EditPost: { postId: number };
    SocialLoginAgree: undefined;
};

const Today = createStackNavigator<TodayStackParams>();
export default function TodayStack() {
    return (
        <Today.Navigator
            initialRouteName="Home"
            screenOptions={{
                headerShown: false,
            }}
        >
            <Today.Screen name="Home" component={Home} />
            <Today.Screen name="Search" component={SearchScreen} />
            <Today.Screen name="NewPost" component={NewPost} />
            <Today.Screen
                name="OnBoard"
                component={OnboardingScreen}
                options={{ headerShown: false }}
            />
            <Today.Screen name="Notifications" component={NotificationScreen} />
            <Today.Screen name="PostDetail">
                {(props) => (
                    <PostDetail {...props} postId={props.route.params.postId} />
                )}
            </Today.Screen>
            <Today.Screen name="EditPost">
                {(props) => (
                    <EditPost
                        {...props}
                        postId={props.route.params.postId} //
                    />
                )}
            </Today.Screen>
            <Today.Screen
                name="SocialLoginAgree"
                component={SiocialLoginScreen}
            />
        </Today.Navigator>
    );
}
