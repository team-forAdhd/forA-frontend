import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'

import Home from '../home/Home'
import LoginScreen from '../login/LoginScreen'
import EmailDuplicateCheck from '../join/EmailDuplicateCheck'
import AuthCheck from '../join/AuthCheck'
import SetPassword from '../join/SetPassword'
import SetProfile from '../join/SetProfile'
import JoinLast from '../join/JoinLast'
import JoinDone from '../join/JoinDone'
import NotificationScreen from '../notification/notificationScreen'
import NewPost from '../newPost/NewPost'
import PostDetail from '../home/postDetail/PostDetail'
import EditPost from '../editPost/EditPost'
import SearchScreen from '../search/searchScreen'
import SiocialLoginScreen from '../socialLogin/socialLogin'
import HospitalDetail from '../hospital/HospitalDetail'
import MyPage from '../myPage/myPage'
import MyPost from '../myPage/myPost'
import AccountSettings from '../accountSettings/accountSettings'
import ChangeNickName from '../changeNickName/changeNickName'
import RibbonEvaluation from '../ribbonEvaluataion/ribbonEvaluation'
import GoogleMap from '../hospital/Maps'
import HospitalMaps from '../hospital/HospitalMaps'

export type RootStackParamList = {
    Home: undefined
    Login: undefined
    EmailDuplicateCheck: undefined
    AuthCheck: undefined
    SetPassword: undefined
    SetProfile: undefined
    JoinLast: undefined
    JoinDone: undefined
    Notifications: undefined
    Search: undefined
    SocialLoginAgree: undefined
    MyPage: undefined
    AccountSettings: undefined
    MyPosts: { postType: 'myPosts' }
    MyComments: { postType: 'myComments' }
    MyReviews: { postType: 'myReviews' }
    SavedPosts: { postType: 'savedPosts' }
    ChangeNickname: undefined
    NewPost: undefined
    HospitalDetail: undefined
    Maps: undefined
    HospitalMaps: undefined
} //나의 글, 나의 댓글 등의 페이지로 이동할 때 컴포넌트가 파라미터를 받다보니 타입 정의를 함

const Stack = createStackNavigator<RootStackParamList>()

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                }}
                initialRouteName="Home"
            >
                {/* 구현한 화면 추가 */}
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="NewPost" component={NewPost} />

                <Stack.Screen name="Login" component={LoginScreen} />

                {/* 일반 회원가입 */}
                <Stack.Screen
                    name="EmailDuplicateCheck"
                    component={EmailDuplicateCheck}
                />
                <Stack.Screen name="AuthCheck" component={AuthCheck} />
                <Stack.Screen name="SetPassword" component={SetPassword} />
                <Stack.Screen name="SetProfile" component={SetProfile} />
                <Stack.Screen name="JoinLast" component={JoinLast} />
                <Stack.Screen name="JoinDone" component={JoinDone} />
                <Stack.Screen
                    name="Notifications"
                    component={NotificationScreen}
                />
                {/*<Stack.Screen name="PostDetail" component={PostDetail} />
                <Stack.Screen name="EditPost" component={EditPost} />*/}
                <Stack.Screen name="Search" component={SearchScreen} />
                <Stack.Screen
                    name="SocialLoginAgree"
                    component={SiocialLoginScreen}
                />
                <Stack.Screen
                    name="HospitalDetail"
                    component={HospitalDetail}
                />

                <Stack.Screen name="MyPage" component={MyPage} />
                <Stack.Screen
                    name="AccountSettings"
                    component={AccountSettings}
                />
                <Stack.Screen
                    name="MyPosts"
                    component={MyPost}
                    initialParams={{ postType: 'myPosts' }}
                />
                <Stack.Screen
                    name="MyComments"
                    component={MyPost}
                    initialParams={{ postType: 'myComments' }}
                />
                <Stack.Screen
                    name="MyReviews"
                    component={MyPost}
                    initialParams={{ postType: 'myReviews' }}
                />
                <Stack.Screen
                    name="SavedPosts"
                    component={MyPost}
                    initialParams={{ postType: 'savedPosts' }}
                />
                <Stack.Screen
                    name="ChangeNickname"
                    component={ChangeNickName}
                />
                <Stack.Screen name="Maps" component={GoogleMap} />
                <Stack.Screen name="HospitalMaps" component={HospitalMaps} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppNavigator
