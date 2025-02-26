import HospitalListItem from '@/domains/HospitalList/components/hospitalListItem';
import { Hospital } from '@/domains/HospitalList/screens/HospitalMaps';
import { Location } from '@/hooks/useLocation';
import { View } from 'react-native';

export default function HospitalDescriptor({
    hospital,
    location,
    setFocusedHospital,
}: {
    hospital: Hospital;
    location: Location;
    setFocusedHospital: React.Dispatch<React.SetStateAction<Hospital | null>>;
}) {
    return (
        <View
            style={{
                width: '100%',
                padding: 10,
                zIndex: 20,
                position: 'absolute',
                bottom: 0,
                justifyContent: 'center',
                backgroundColor: 'white',
                borderRadius: 20,
            }}
        >
            <HospitalListItem
                hospital={hospital}
                location={location}
                setFocusedHospital={setFocusedHospital}
            />
        </View>
    );
}
