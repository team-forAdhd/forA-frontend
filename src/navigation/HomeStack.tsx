import { createStackNavigator } from '@react-navigation/stack'
import Home from '@/components/home/Home'
import MyPost from '@/components/myPage/myPost'
import ChooseDoctor from '@/components/review/ChooseDoctor'
import CameraScreen from '@/components/review/CameraScreen'
import HospitalReviewList from '@/components/hospital/HospitalReviewList'
import HospitalReview from '@/components/hospital/HospitalReview'
import HospitalMaps from '@/components/hospital/HospitalMaps'
import ChangeNickName from '@/components/changeNickName/changeNickName'
import AccountSettings from '@/components/accountSettings/accountSettings'
import MyPage from '@/components/myPage/myPage'
import MedNewReview from '@/components/medicine/medNewReview/MedNewReview'
import MedReview from '@/components/medicine/medetails/MedReview'
import MedDetail from '@/components/medicine/medetails/MedDetail'
import MedSearchResult from '@/components/medicine/medSearch/MedSearchResult'
import ShapeSearchScreen from '@/components/medicine/medSearch/ShapeSearchScreen'
import MedSearchScreen from '@/components/medicine/medSearch/MedSearchScreen'
import MedScreen from '@/components/medicine/medicineScreen/MedicineScreen'
import HospitalDetail from '@/components/hospital/HospitalDetail'
import SiocialLoginScreen from '@/components/socialLogin/socialLogin'
import SearchScreen from '@/components/search/searchScreen'
import EditPost from '@/components/editPost/EditPost'
import PostDetail from '@/components/home/postDetail/PostDetail'
import NotificationScreen from '@/components/notification/notificationScreen'

import NewPost from '@/components/newPost/NewPost'
import OnboardingScreen from '@/components/splash-n-onboard/onboard/Onboard'

export type HomeStackParamList = {
    Home: undefined
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
    PostDetail: { postId: number }
    EditPost: { postId: number }
    HospitalDetail: { hospitalId: string; latitude: number; longitude: number }
    HospitalMaps: undefined
    CameraScreen: undefined
    ChooseDoctor: undefined
    MedicineMain: undefined
    OnBoard: undefined
    HospitalReview: undefined
    HospitalReviewList: { hospitalId: string }
    SavedHospitals: { postType: 'savedHospitals' }
    SavedPharmacies: { postType: 'savedPharmacies' }
    MedSearch: undefined
    ShapeSearch: undefined
    MedDetail: { medId: number }
    MedNewReview: { medId: number }
    MedReview: { medId: number }
    MedSearchResult: { resultList: any[]; searchInputValue: string }
} //나의 글, 나의 댓글 등의 페이지로 이동할 때 컴포넌트가 파라미터를 받다보니 타입 정의를 함

const Stack = createStackNavigator<HomeStackParamList>()

interface AppNavigatorProps {
    initialRoute: 'Home' | 'OnBoard'
}

const HomeStack: React.FC<AppNavigatorProps> = ({ initialRoute }) => {
    return (
        <Stack.Navigator
            initialRouteName={initialRoute}
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="NewPost" component={NewPost} />
            <Stack.Screen
                name="OnBoard"
                component={OnboardingScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen name="Notifications" component={NotificationScreen} />
            <Stack.Screen name="PostDetail">
                {(props) => (
                    <PostDetail {...props} postId={props.route.params.postId} />
                )}
            </Stack.Screen>
            <Stack.Screen name="EditPost">
                {(props) => (
                    <EditPost
                        {...props}
                        postId={props.route.params.postId} //
                    />
                )}
            </Stack.Screen>
            <Stack.Screen name="Search" component={SearchScreen} />
            <Stack.Screen
                name="SocialLoginAgree"
                component={SiocialLoginScreen}
            />
            <Stack.Screen name="HospitalDetail">
                {(props) => (
                    <HospitalDetail
                        {...props}
                        hospitalId={props.route.params.hospitalId}
                        latitude={props.route.params.latitude}
                        longitude={props.route.params.longitude}
                    />
                )}
            </Stack.Screen>
            {/* 약탭 */}
            <Stack.Screen name="MedicineMain" component={MedScreen} />
            <Stack.Screen name="MedSearch" component={MedSearchScreen} />
            <Stack.Screen name="ShapeSearch" component={ShapeSearchScreen} />
            <Stack.Screen name="MedSearchResult" component={MedSearchResult} />
            <Stack.Screen name="MedDetail">
                {(props) => {
                    const medId =
                        props.route?.params?.medId !== undefined
                            ? props.route.params.medId
                            : 1 // medId 기본값 설정
                    return <MedDetail {...props} medId={medId} />
                }}
            </Stack.Screen>
            <Stack.Screen name="MedReview">
                {(props) => (
                    <MedReview {...props} medId={props.route.params.medId} />
                )}
            </Stack.Screen>
            <Stack.Screen name="MedNewReview">
                {(props) => {
                    const medId =
                        props.route?.params?.medId !== undefined
                            ? props.route.params.medId
                            : 1 // medId 기본값 설정
                    return <MedNewReview {...props} medId={medId} />
                }}
            </Stack.Screen>
            <Stack.Screen name="MyPage" component={MyPage} />
            <Stack.Screen name="AccountSettings" component={AccountSettings} />
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
            <Stack.Screen name="ChangeNickname" component={ChangeNickName} />
            <Stack.Screen name="HospitalMaps" component={HospitalMaps} />
            <Stack.Screen name="HospitalReview" component={HospitalReview} />
            <Stack.Screen
                name="HospitalReviewList"
                component={HospitalReviewList}
            />
            <Stack.Screen name="CameraScreen" component={CameraScreen} />
            <Stack.Screen name="ChooseDoctor" component={ChooseDoctor} />
            <Stack.Screen
                name="SavedHospitals"
                component={MyPost}
                initialParams={{ postType: 'savedHospitals' }}
            />
            <Stack.Screen
                name="SavedPharmacies"
                component={MyPost}
                initialParams={{ postType: 'savedPharmacies' }}
            />
        </Stack.Navigator>
    )
}

export default HomeStack
