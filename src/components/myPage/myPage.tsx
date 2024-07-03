import { useTranslation } from 'react-i18next'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { styles, text } from './myPageStyle'
import { useContext } from 'react'
import { useNavigation } from '@react-navigation/native'
import TabBar from '../common/tabBar/tabBar'
import { ProfileStoreContext } from '@/state/signupState'
import { Observer } from 'mobx-react'

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
        myScrabNavigation: ['SavedPosts', 'SavedPosts', 'SavedPosts'],
        settings: [
            t('account-setting'),
            t('push-noti'),
            t('allow-locationInfo'),
        ],
    }

    const navigation = useNavigation()

    return (
        <View style={styles.container}>
            {/* 헤더 */}
            <View style={styles.header}>
                <Text style={text.headerText}>{t('my-page')}</Text>
            </View>
            {/* 배경에 깔리는 회색 배경  */}
            <View style={styles.grayContainer}></View>
            {/* 프로필 컨테이너 */}
            <View style={styles.ProfileContainer}>
                <View style={styles.ProfilePositionContainer}>
                    <View style={styles.ProfileImageContainer}>
                        <Image
                            style={styles.profileImage}
                            source={require('@/public/assets/defaultProfile.png')}
                        />
                    </View>
                    <View style={styles.ProfileInnerContainer}>
                        <Text style={text.nickName}>
                            {'코코벤' + store.nickName}
                        </Text>
                        <Text style={text.sirText}>님</Text>
                    </View>
                    <View style={styles.ProfileInnerContainer}>
                        <Text style={text.emailText}>
                            {'example@fora.net' + store.email}
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
                    position: 'absolute',
                    top: 277,
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
                                                        store.setIsPushNotiOn()
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
                            </View>{' '}
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
            <TabBar />
        </View>
    )
}
