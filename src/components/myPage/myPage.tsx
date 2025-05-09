import { useTranslation } from 'react-i18next';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    Linking,
} from 'react-native';
import { styles, text } from './myPageStyle';
import { useContext, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ProfileStoreContext } from '@/state/signupState';
import { Observer } from 'mobx-react';
import getUser from '@/api/myPage/getUser';
import updatePushNotificationApprovals from '@/api/myPage/putNotiApprove';
import { getUserProfileApi } from '@/api/getUserProfileApi';
import { useAuthStore } from '@/store/authStore';
import { SafeAreaView } from 'react-native-safe-area-context';

interface UserProfile {
    email: string;
    forAdhdType: 'FOR_MY_ADHD';
    nickname: string;
    profileImage: string;
    userRole?: string;
}
const TERMS_OF_USE_URL =
    'https://coal-swordfish-3f8.notion.site/13880c35a4168097a4e6cd5fc1b85d73';
const PRIVACY_POLICY_URL =
    'https://coal-swordfish-3f8.notion.site/13880c35a4168095a3dbeabea1e9ca88';
const TERMS_OF_LOCATION_USE_URL =
    'https://coal-swordfish-3f8.notion.site/13880c35a41680cdb461dd6f49aea3d8';

export default function MyPage() {
    const store = useContext(ProfileStoreContext);
    const updateUser = useAuthStore((state) => state.updateUser);

    const { t } = useTranslation('MyPage');

    const myWrittings = {
        [t('my-article')]: {
            icon: require('@/public/assets/myArticle.png'),
            navigator: 'MyPosts',
        },
        [t('my-comments')]: {
            icon: require('@/public/assets/myComment.png'),
            navigator: 'MyComments',
        },
        ['나의 약']: {
            icon: require('@/public/assets/myMedicine.png'),
            navigator: 'SavedPharmacies',
        },
    };
    const user = {
        myScrab: [t('my-scrabArticle'), t('my-scrabHospital'), '나의 약'],
        myScrabNavigation: ['SavedPosts', 'SavedHospitals', 'SavedPharmacies'],
        settings: [
            t('account-setting'),
            // t('push-noti'),
            // t('allow-locationInfo'),
        ],
    };

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [userInfo, setUserInfo] = useState<UserProfile | null>(null);

    useEffect(() => {
        const fetchUserData = async () => {
            setIsLoading(true);
            try {
                // 유저 정보, 병원 데이터 가져옴
                const [profileData, hospitalData] = await Promise.all([
                    getUserProfileApi(),
                    getUser(),
                ]);

                // 상태 업데이트
                const mergedData = { ...hospitalData, ...profileData };
                updateUser(mergedData);
                setUserInfo(mergedData);
                console.log('Fetched User Data:', mergedData);
            } catch (error) {
                console.error('Error fetching user data:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchUserData();
    }, []);

    useEffect(() => {
        console.log('Updated userInfo:', userInfo);
    }, [userInfo]);

    const isAdmin = userInfo?.userRole === 'ADMIN';

    const navigation = useNavigation();
    //푸시 알림 핸들링
    const handlePushNotificationToggle = async () => {
        try {
            store.setIsPushNotiOn();

            // 서버에 푸시 알림 설정 업데이트 요청 보내기
            await updatePushNotificationApprovals({
                pushNotificationApprovals: [
                    {
                        pushNotificationApprovalId: 1, // 푸쉬 알림 설정 식별 ID
                        approved: store.isPushNotiOn, // 푸쉬 알림의 승인 상태
                    },
                ],
            });
        } catch (error) {
            console.error('Error updating push notification approval:', error);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* 헤더 */}
            <View style={styles.header}>
                <Text style={text.headerText}>{t('my-page')}</Text>
            </View>

            <View style={styles.scrollContainer}>
                <ScrollView
                    style={{ backgroundColor: 'white' }}
                    contentContainerStyle={{
                        backgroundColor: '#EDEDEA',
                        paddingTop: 20,
                        paddingBottom: 50,
                    }}
                >
                    {/* 프로필 컨테이너 */}
                    <View style={styles.ProfileContainer}>
                        <View style={styles.ProfilePositionContainer}>
                            <View style={styles.ProfileImageContainer}>
                                <Image
                                    style={styles.profileImage}
                                    source={
                                        userInfo?.profileImage
                                            ? {
                                                  uri:
                                                      'https://d37m2jfdnaemwx.cloudfront.net/' +
                                                      userInfo?.profileImage,
                                              }
                                            : require('@/public/assets/defaultProfile.png')
                                    }
                                />
                            </View>
                            <View style={styles.ProfileInnerContainer}>
                                <Text style={text.nickName}>
                                    {userInfo && userInfo.nickname}
                                </Text>
                                <Text style={text.sirText}>님</Text>
                            </View>
                            <View style={styles.ProfileInnerContainer}>
                                <Text style={text.emailText}>
                                    {userInfo && userInfo.email}
                                </Text>
                            </View>
                        </View>
                    </View>

                    {/*내가 쓴 게시물들*/}
                    <View
                        style={{
                            width: '100%',
                            alignItems: 'center',
                            zIndex: 3,
                        }}
                    >
                        <View style={styles.myWrittingContainer}>
                            {Object.entries(myWrittings).map((my) => (
                                <TouchableOpacity
                                    onPress={() => {
                                        navigation.navigate(
                                            my[1].navigator as never,
                                        );
                                    }}
                                >
                                    <View style={styles.myInnerContainer}>
                                        <Image
                                            source={my[1].icon}
                                            style={styles.myIconImage}
                                        />
                                        <Text style={text.myText}>{my[0]}</Text>
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </View>
                        {/*내가 저장한 내용 컨테이너  */}
                        {/* <View style={styles.scrabContainer}>
                            {user.myScrab.map((scrab, index) => (
                                <TouchableOpacity
                                    onPress={() => {
                                        navigation.navigate(
                                            user.myScrabNavigation[
                                                index
                                            ] as never,
                                        );
                                    }}
                                >
                                    <View
                                        style={{
                                            justifyContent: 'space-between',
                                            flexDirection: 'row',
                                        }}
                                    >
                                        <Text style={text.commonText}>
                                            {scrab}
                                        </Text>
                                        <Image
                                            source={require('@/public/assets/next.png')}
                                            style={styles.scrabImage}
                                        />
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </View> */}
                        {/*내가 저장한 내용 컨테이너  */}
                        <View style={styles.bottomContainer}>
                            {user.settings.map((setting, index) => (
                                <TouchableOpacity
                                    onPress={() => {
                                        navigation.navigate(
                                            'AccountSettings' as never,
                                        );
                                    }}
                                >
                                    <View
                                        style={{
                                            justifyContent: 'space-between',
                                            flexDirection: 'row',
                                        }}
                                    >
                                        <Text style={text.commonText}>
                                            {setting}
                                        </Text>

                                        {setting !== '계정 설정' && ( // 계정 설정이 아닌 경우에만 동의 버튼이 뜨게끔
                                            // 푸쉬 알림 및 위치 권한 상태 관리
                                            <Observer>
                                                {() => (
                                                    <TouchableOpacity
                                                        onPress={() => {
                                                            if (index === 1) {
                                                                handlePushNotificationToggle();
                                                            } else if (
                                                                index === 2
                                                            ) {
                                                                store.setIsLocationAllowed();
                                                            }
                                                            console.log(
                                                                store.isPushNotiOn,
                                                                store.isLocationAllowed,
                                                            );
                                                        }}
                                                    >
                                                        <Image
                                                            source={
                                                                index === 1
                                                                    ? store.isPushNotiOn
                                                                        ? require('@/public/assets/allowButton.png')
                                                                        : require('@/public/assets/notAllowButton.png')
                                                                    : store.isLocationAllowed
                                                                      ? require('@/public/assets/allowButton.png')
                                                                      : require('@/public/assets/notAllowButton.png')
                                                            }
                                                            style={
                                                                styles.allowIconImage
                                                            }
                                                        />
                                                    </TouchableOpacity>
                                                )}
                                            </Observer>
                                        )}
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </View>
                        {/* 어드민 계정일 때만 신고 내역 확인 버튼 활성화 */}
                        {isAdmin && (
                            <View style={styles.complaintContainer}>
                                <TouchableOpacity
                                    onPress={() => {
                                        navigation.navigate(
                                            'AdminReport' as never,
                                        );
                                    }}
                                >
                                    <View
                                        style={{
                                            justifyContent: 'space-between',
                                            flexDirection: 'row',
                                        }}
                                    >
                                        <Text style={text.commonText}>
                                            신고 내역 확인
                                        </Text>
                                        <Image
                                            source={require('@/public/assets/next.png')}
                                            style={styles.scrabImage}
                                        />
                                    </View>
                                </TouchableOpacity>
                            </View>
                        )}

                        {/* 맨 밑 화면 (이용약관, 처리방침, 포에이로고, 사업자정보) */}
                        <View style={styles.bottomInfoContainer}>
                            <TouchableOpacity
                                onPress={() =>
                                    Linking.openURL(TERMS_OF_USE_URL)
                                }
                            >
                                <Text style={text.bottomInfoText}>
                                    {t('terms-of-use')}
                                </Text>
                            </TouchableOpacity>
                            <Text style={text.bottomInfoVector}>|</Text>
                            <TouchableOpacity
                                onPress={() =>
                                    Linking.openURL(PRIVACY_POLICY_URL)
                                }
                            >
                                <Text style={text.bottomInfoText}>
                                    {t('privacy-policy')}
                                </Text>
                            </TouchableOpacity>
                            <Text style={text.bottomInfoVector}> | </Text>
                            <TouchableOpacity
                                onPress={() =>
                                    Linking.openURL(TERMS_OF_LOCATION_USE_URL)
                                }
                            >
                                <Text style={text.bottomInfoText}>
                                    {t('locationInfo-termsOfUse')}
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.foraContainer}>
                            <Image
                                source={require('@/public/assets/forA_gray.png')}
                                style={styles.bottomInfoForaImage}
                            />
                            <Text style={text.bottomTextBold}>포에이</Text>
                            <Text style={text.bottomTextBold}>
                                대표: 박세진
                            </Text>

                            <Text style={text.bottomTextBold}>
                                주소: 서울시 용산구 청파로 47길 90 창업보육센터
                                B201
                            </Text>
                            <Text style={text.bottomTextBold}>
                                제휴문의/이용문의: foradhd2024@gmail.com 혹은
                                카카오톡 채널 ‘포에이’
                            </Text>
                            <Text style={text.bottomTextBold}>
                                (http://pf.kakao.com/_HGqln)
                            </Text>

                            <Text
                                style={{
                                    fontWeight: '700',
                                    fontSize: 12,
                                    marginTop: 30,
                                    marginBottom: 20,
                                }}
                            >
                                {t('copyright')}
                            </Text>

                            <Text style={text.bottomTextNormal}>
                                자사 사이트에 게시된 모든 콘텐츠 등 저작권은
                                포에이에게 있습니다.
                            </Text>
                            <Text style={text.bottomTextNormal}>
                                자사의 사이트의 무단적인 수집을 엄격히 금합니다.
                            </Text>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}
