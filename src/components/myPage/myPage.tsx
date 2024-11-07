import { useTranslation } from 'react-i18next'
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native'
import { styles, text } from './myPageStyle'
import { useContext, useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import TabBar from '../common/tabBar/tabBar'
import { ProfileStoreContext } from '@/state/signupState'
import { Observer } from 'mobx-react'
import getUser from '@/api/myPage/getUser'
import updatePushNotificationApprovals from '@/api/myPage/putNotiApprove'
import { getUserProfileApi } from '@/api/getUserProfileApi'


interface UserProfile {
    email: string // 이메일 주소
    forAdhdType: 'FOR_MY_ADHD' // 고정된 값이라면, 문자열 리터럴 타입을 사용
    nickname: string // 사용자 닉네임
    profileImage: string // 프로필 이미지 경로 (URL 형태)
}

export default function MyPage() {
    const store = useContext(ProfileStoreContext)

    const { t } = useTranslation('MyPage')

    //리스트에 들어갈 이름과 이미지 주소를 저장한 객체
    const myWrittings = {
        [t('my-article')]: {
            icon: require('@/public/assets/myArticle.png'),
            navigator: 'MyPosts',
        },
        [t('my-comments')]: {
            icon: require('@/public/assets/myComment.png'),
            navigator: 'MyComments',
        },
        [t('my-review')]: {
            icon: require('@/public/assets/myReview.png'),
            navigator: 'MyPosts',
        },
    }
    //유저의 저장 내역과 세팅에 담길 글 배열을 담고 있는 객체
    const user = {
        myScrab: [
            t('my-scrabArticle'),
            t('my-scrabHospital'),
            t('my-scrabMed'),
        ],
        myScrabNavigation: ['SavedPosts', 'SavedHospitals', 'SavedPharmacies'],
        settings: [
            t('account-setting'),
            t('push-noti'),
            t('allow-locationInfo'),
        ],
    }

    useEffect(() => {
        getUserProfile()
    })
    const getUserProfile = async () => {
        const data = await getUserProfileApi()
        
        console.log(data)
    }

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [userInfo, setUserInfo] = useState<UserProfile>()
    useEffect(() => {
        const fetchHospitalData = async () => {
            setIsLoading(true)
            try {
                // 병원 데이터 가져오기
                const userInfo = await getUser()
                setUserInfo(userInfo)
                console.log(userInfo, 'user Info')
            } catch (error) {
                console.error('Error fetching user data:', error)
            } finally {
                setIsLoading(false) // 데이터 가져오기가 완료되면 로딩 상태를 false로 설정합니다.
            }
        }
        fetchHospitalData()
    }, [])
    const navigation = useNavigation()
    //푸시 알림 핸들링
    const handlePushNotificationToggle = async () => {
        try {
            store.setIsPushNotiOn()

            // 서버에 푸시 알림 설정 업데이트 요청 보내기
            await updatePushNotificationApprovals({
                pushNotificationApprovals: [
                    {
                        pushNotificationApprovalId: 1,
                        approved: store.isPushNotiOn,
                    },
                ],
            })
        } catch (error) {
            console.error('Error updating push notification approval:', error)
        }
    }
    return (
        <View style={styles.container}>
            {/* 헤더 */}
            <View style={styles.header}>
                <Text style={text.headerText}>{t('my-page')}</Text>
            </View>

            <View style={styles.scrollContainer}>
            <ScrollView>
            {/* 프로필 컨테이너 */}
            <View style={styles.ProfileContainer}>
                <View style={styles.ProfilePositionContainer}>
                    <View style={styles.ProfileImageContainer}>
                        <Image
                            style={styles.profileImage}
                            source={
                                userInfo?.profileImage
                                    ? { uri: userInfo?.profileImage }
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
                                navigation.navigate(my[1].navigator as never)
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
                <View style={styles.scrabContainer}>
                    {user.myScrab.map((scrab, index) => (
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate(
                                    user.myScrabNavigation[index] as never,
                                )
                            }}
                        >
                            <View
                                style={{
                                    justifyContent: 'space-between',
                                    flexDirection: 'row',
                                }}
                            >
                                <Text style={text.commonText}>{scrab}</Text>
                                <Image
                                    source={require('@/public/assets/next.png')}
                                    style={styles.scrabImage}
                                />
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
                {/*내가 저장한 내용 컨테이너  */}
                <View style={styles.bottomContainer}>
                    {user.settings.map((setting, index) => (
                        <TouchableOpacity
                            onPress={() => {
                                setting === '계정 설정' &&
                                    navigation.navigate(
                                        'AccountSettings' as never,
                                    )
                            }}
                        >
                            <View
                                style={{
                                    justifyContent: 'space-between',
                                    flexDirection: 'row',
                                }}
                            >
                                <Text style={text.commonText}>{setting}</Text>

                                {setting !== '계정 설정' && ( // 계정 설정이 아닌 경우에만 동의 버튼이 뜨게끔
                                    <Observer>
                                        {() => (
                                            <TouchableOpacity
                                                onPress={() => {
                                                    if (index === 1) {
                                                        handlePushNotificationToggle()
                                                    } else if (index === 2) {
                                                        store.setIsLocationAllowed()
                                                    }
                                                    console.log(
                                                        store.isPushNotiOn,
                                                        store.isLocationAllowed,
                                                    )
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

                {/* 맨 밑 화면 (이용약관, 처리방침, 포에이로고, 사업자정보) */}
                <View style={styles.bottomInfoContainer}>
                    <TouchableOpacity>
                        <Text style={text.bottomInfoText}>{t('terms-of-use')}</Text>
                    </TouchableOpacity>
                    <Text style={text.bottomInfoVector}>|</Text>
                    <TouchableOpacity>
                        <Text style={text.bottomInfoText}>{t('privacy-policy')}</Text>
                    </TouchableOpacity>
                    <Text style={text.bottomInfoVector}> | </Text>
                    <TouchableOpacity>
                        <Text style={text.bottomInfoText}>{t('locationInfo-termsOfUse')}</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.foraContainer}>
                    <Image
                        source={require('@/public/assets/forA_gray.png')}
                        style={styles.bottomInfoForaImage}
                    />

                    <Text style={text.bottomInfoText}>사업자: 포에이 | 대표자: 박세진</Text>
                    <Text style={text.bottomInfoText}>사업자등록번호: 836-60-00650</Text>
                    <Text style={text.bottomInfoText}>주소: 서울특별시 용산구 청파로47길 100 (청파동2가)</Text>
                    <Text style={text.bottomInfoText}>이용문의/요청: sejin@foradhd.net</Text>

                    <Text style={[text.bottomInfoText, { fontWeight: '700', marginTop: 30, marginBottom: 20 }]}>{t('copyright')}</Text>

                    <Text style={text.bottomInfoText}>자사 사이트에 게시된 모든 콘텐츠 등 저작권은 포에이에게 있습니다.</Text>
                    <Text style={text.bottomInfoText}>자사의 사이트의 무단적인 수집을 엄격히 금합니다.</Text>

                    <Image
                        source={require('@/public/assets/icon_group.png')}
                        style={styles.bottomInfoIconImage}
                    />
                    
                </View>

            </View>
        
            </ScrollView>
            </View>

            <TabBar />
            
        </View>
    )
}
