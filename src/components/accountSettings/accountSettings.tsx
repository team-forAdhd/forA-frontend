import { useTranslation } from 'react-i18next';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Pressable,
    ScrollView,
    SafeAreaView,
} from 'react-native';
import { styles, text } from './accountSettingsStyle';
import { useContext, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ProfileStoreContext } from '@/state/signupState';
import ChoiceModal from '../common/choiceModal/choiceModal';
import { getUserProfileApi } from '@/api/getUserProfileApi';
import { imagePathMerge } from '@/utils/imagePathMerge';
import ChangePassword from '@/domains/Setting/components/ChangePassword';
import WithdrawAccount from '@/domains/Setting/components/WithdrawAccount';
import Header from '@/components/common/ui/header';
import { StackScreenProps } from '@react-navigation/stack';
import { MypageStackParams } from '@/navigation/stacks/MypageStack';

export interface User {
    email: string;
    nickname: string;
    profileImage?: string;
    forAdhdType?: string;
    birthdate: string;
}

export default function AccountSettings({
    navigation,
}: StackScreenProps<MypageStackParams, 'AccountSettings'>) {
    const { t } = useTranslation('AccountSettings');
    const [user, setUser] = useState<User>({
        email: '',
        nickname: '',
        profileImage: '',
        forAdhdType: '',
        birthdate: '',
    });

    useEffect(() => {
        const getUserProfile = async () => {
            try {
                const data = await getUserProfileApi();
                console.log(data);
                if (data) {
                    setUser(data);
                }
            } catch (error) {
                console.error('Failed to fetch user profile:', error);
            }
        };

        getUserProfile();
    }, []);

    const userProfileList = [
        { label: t('nickname'), value: user.nickname }, //store.nickName
        { label: t('birthdate'), value: user.birthdate }, //store.birthYearMonth
        { label: t('email'), value: user.email }, //store.email
    ];

    //모달 컴포넌트에 내려줄 상태
    const [logOutModal, setLogOutModal] = useState<boolean>(false);

    return (
        <SafeAreaView style={{ backgroundColor: 'white' }}>
            <Header
                backIconType="chevron"
                navigation={navigation}
                headerText="계정 설정"
            />
            <ScrollView contentContainerStyle={styles.container}>
                {/* 프로필 컨테이너 */}
                <View style={styles.profileContainer}>
                    <View>
                        <Text style={text.profileTitleText}>
                            {t('profile-title')}
                        </Text>
                        {userProfileList.map((profileInfo) => (
                            <View style={styles.profileItemContainer}>
                                <Text style={text.profileLabelText}>
                                    {profileInfo.label}
                                </Text>
                                <Text
                                    style={
                                        profileInfo.label === '닉네임'
                                            ? text.profileNickNameText
                                            : text.profileValueText
                                    }
                                >
                                    {profileInfo.value}
                                </Text>
                                {/* {profileInfo.label === '닉네임' && (
                                <TouchableOpacity
                                    onPress={() =>
                                        navigation.navigate(
                                            'ChangeNickname' as never,
                                        )
                                    }
                                >
                                    <Image
                                        source={require('@/public/assets/pencil.png')}
                                        style={styles.pencilIcon}
                                    />
                                </TouchableOpacity>
                            )} */}
                            </View>
                        ))}
                    </View>
                    <Pressable
                        onPress={() => {}}
                        style={styles.ProfileImageContainer}
                    >
                        <Image
                            source={
                                user.profileImage
                                    ? {
                                          uri: imagePathMerge(
                                              user.profileImage,
                                          ),
                                      }
                                    : require('@/public/assets/defaultProfile.png')
                            }
                            style={styles.ProfileImage}
                        />
                        {/* <View style={styles.blackZone}>
                        <Image
                            source={require('@/public/assets/camera.png')}
                            style={styles.cameraIcon}
                        />
                    </View> */}
                    </Pressable>
                </View>
                {/*비밀 번호 변경 */}
                <ChangePassword />
                {/*로그아웃 회원탈퇴 */}
                <View style={styles.bottomContainer}>
                    <TouchableOpacity
                        onPress={() => {
                            setLogOutModal(true);
                        }}
                        style={styles.logOutContainer}
                    >
                        <Text style={text.logOutText}>로그아웃</Text>
                    </TouchableOpacity>
                    <WithdrawAccount />
                </View>
                {logOutModal && (
                    <ChoiceModal
                        modalVisible={logOutModal}
                        setModalVisible={setLogOutModal}
                        question={t('logOut-question')}
                    />
                )}
            </ScrollView>
        </SafeAreaView>
    );
}
