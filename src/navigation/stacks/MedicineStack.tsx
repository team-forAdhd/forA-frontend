import MedDetail from '@/components/medicine/medetails/MedDetail';
import MedReview from '@/components/medicine/medetails/MedReview';
import MedScreen from '@/components/medicine/medicineScreen/MedicineScreen';
import MedNewReview from '@/components/medicine/medNewReview/MedNewReview';
import MedSearchResult from '@/components/medicine/medSearch/MedSearchResult';
import MedSearchScreen from '@/components/medicine/medSearch/MedSearchScreen';
import ShapeSearchScreen from '@/components/medicine/medSearch/ShapeSearchScreen';
import { createStackNavigator } from '@react-navigation/stack';

type MedicineStackParams = {
    MedicineMain: undefined;
    ShapeSearch: undefined;
    MedSearch: undefined;
    MedDetail: { medId: number };
    MedNewReview: { medId: number };
    MedReview: { medId: number };
    MedSearchResult: { resultList: any[]; searchInputValue: string };
};
const Medicine = createStackNavigator<MedicineStackParams>();

export default function MedicineStack() {
    return (
        <Medicine.Navigator
            initialRouteName="MedicineMain"
            screenOptions={{
                headerShown: false,
            }}
        >
            <Medicine.Screen name="MedicineMain" component={MedScreen} />
            <Medicine.Screen name="MedSearch" component={MedSearchScreen} />
            <Medicine.Screen name="ShapeSearch" component={ShapeSearchScreen} />
            <Medicine.Screen
                name="MedSearchResult"
                component={MedSearchResult}
            />
            <Medicine.Screen name="MedDetail">
                {(props) => {
                    const medId =
                        props.route?.params?.medId !== undefined
                            ? props.route.params.medId
                            : 1; // medId 기본값 설정
                    return <MedDetail {...props} medId={medId} />;
                }}
            </Medicine.Screen>
            <Medicine.Screen name="MedReview">
                {(props) => (
                    <MedReview {...props} medId={props.route.params.medId} />
                )}
            </Medicine.Screen>
            <Medicine.Screen name="MedNewReview">
                {(props) => {
                    const medId =
                        props.route?.params?.medId !== undefined
                            ? props.route.params.medId
                            : 1; // medId 기본값 설정
                    return <MedNewReview {...props} medId={medId} />;
                }}
            </Medicine.Screen>
        </Medicine.Navigator>
    );
}
