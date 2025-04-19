import AccountSettings from '@/components/accountSettings/accountSettings';
import ChangeNickName from '@/components/changeNickName/changeNickName';
import MyPage from '@/components/myPage/myPage';
import MyPost from '@/components/myPage/myPost';
import { createStackNavigator } from '@react-navigation/stack';
import AdminReport from '@/components/myPage/adminReport';
import MedDetail from '@/components/medicine/medetails/MedDetail';

export type MypageStackParams = {
    MyPage: undefined;
    AccountSettings: undefined;
    ChangeNickname: undefined;
    MyPosts: { postType: 'myPosts' };
    MyComments: { postType: 'myComments' };
    MyReviews: { postType: 'myReviews' };
    SavedPosts: { postType: 'savedPosts' };
    SavedPharmacies: { postType: 'savedPharmacies' };
    AdminReport: undefined;
    MedDetail: { medId: number };
};
const Mypage = createStackNavigator<MypageStackParams>();
export default function MypageStack() {
    return (
        <Mypage.Navigator
            initialRouteName="MyPage"
            screenOptions={{
                headerShown: false,
            }}
        >
            <Mypage.Screen name="MyPage" component={MyPage} />
            <Mypage.Screen name="AccountSettings" component={AccountSettings} />
            <Mypage.Screen name="ChangeNickname" component={ChangeNickName} />
            <Mypage.Screen
                name="MyPosts"
                component={MyPost}
                initialParams={{ postType: 'myPosts' }}
            />
            <Mypage.Screen
                name="MyComments"
                component={MyPost}
                initialParams={{ postType: 'myComments' }}
            />
            <Mypage.Screen
                name="MyReviews"
                component={MyPost}
                initialParams={{ postType: 'myReviews' }}
            />
            <Mypage.Screen
                name="SavedPosts"
                component={MyPost}
                initialParams={{ postType: 'savedPosts' }}
            />
            <Mypage.Screen
                name="SavedPharmacies"
                component={MyPost}
                initialParams={{ postType: 'savedPharmacies' }}
            />
            <Mypage.Screen name="AdminReport" component={AdminReport} />
            <Mypage.Screen name="MedDetail">
                {(props) => {
                    const medId =
                        props.route?.params?.medId !== undefined
                            ? props.route.params.medId
                            : 1; // medId 기본값 설정
                    return <MedDetail {...props} medId={medId} />;
                }}
            </Mypage.Screen>
        </Mypage.Navigator>
    );
}
