import HospitalDetail from '@/components/hospital/HospitalDetail';
import HospitalMaps from '@/components/hospital/HospitalMaps';
import HospitalReview from '@/components/hospital/HospitalReview';
import HospitalReviewList from '@/components/hospital/HospitalReviewList';
import { Doctor, HospitalInfo } from '@/components/hospital/types';
import MyPost from '@/components/myPage/myPost';
import CameraScreen from '@/components/review/CameraScreen';
import ChooseDoctor from '@/components/review/ChooseDoctor';
import { createStackNavigator } from '@react-navigation/stack';

export type HospitalStackParams = {
    HospitalMaps: undefined;
    HospitalReview: {
        hospitalInfo: HospitalInfo;
        price: number;
        choosedDoctor?: Doctor;
    };
    HospitalReviewList: { hospitalId: string };
    SavedHospitals: { postType: 'savedHospitals' };
    SavedPharmacies: { postType: 'savedPharmacies' };
    HospitalDetail: { hospitalId: string; latitude: number; longitude: number };
    ChooseDoctor: { hospitalInfo: HospitalInfo; price: number };
    CameraScreen: { hospitalInfo: HospitalInfo };
};
const Hospital = createStackNavigator<HospitalStackParams>();

export default function HospitalStack() {
    return (
        <Hospital.Navigator
            initialRouteName="HospitalMaps"
            screenOptions={{
                headerShown: false,
            }}
        >
            <Hospital.Screen name="HospitalMaps" component={HospitalMaps} />
            <Hospital.Group screenOptions={{ headerShown: false }}>
                <Hospital.Screen
                    name="HospitalReview"
                    component={HospitalReview}
                />
                <Hospital.Screen
                    name="HospitalReviewList"
                    component={HospitalReviewList}
                />
                <Hospital.Screen name="CameraScreen" component={CameraScreen} />
                <Hospital.Screen name="ChooseDoctor" component={ChooseDoctor} />
                <Hospital.Screen
                    name="SavedHospitals"
                    component={MyPost}
                    initialParams={{ postType: 'savedHospitals' }}
                />
                <Hospital.Screen
                    name="SavedPharmacies"
                    component={MyPost}
                    initialParams={{ postType: 'savedPharmacies' }}
                />
                <Hospital.Screen name="HospitalDetail">
                    {(props) => (
                        <HospitalDetail
                            {...props}
                            hospitalId={props.route.params.hospitalId}
                            latitude={props.route.params.latitude}
                            longitude={props.route.params.longitude}
                        />
                    )}
                </Hospital.Screen>
            </Hospital.Group>
        </Hospital.Navigator>
    );
}
