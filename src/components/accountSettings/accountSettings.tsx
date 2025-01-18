import { useTranslation } from 'react-i18next'
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Pressable,
    TextInput,
} from 'react-native'
import { styles, text } from './accountSettingsStyle'
import { useContext, useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { ProfileStoreContext } from '@/state/signupState'
import * as ImagePicker from 'expo-image-picker'
import ChoiceModal from '../common/choiceModal/choiceModal'
import { getUserProfileApi } from '@/api/getUserProfileApi'
import AsyncStorage from '@react-native-async-storage/async-storage'

export interface User {
    email: string
    nickname: string
    profileImage?: string
    forAdhdType?: string
}

export default function AccountSettings() {
    const store = useContext(ProfileStoreContext)

    const { t } = useTranslation('AccountSettings')
    const [user, setUser] = useState<User>({
        email: '',
        nickname: '',
        profileImage: '',
        forAdhdType: '',
    })

    const navigation = useNavigation()

    useEffect(() => {
        const getUserProfile = async () => {
            try {
                const token = await AsyncStorage.getItem('accessToken')
                if (token) {
                    const data = await getUserProfileApi(token)
                    if (data) {
                        setUser(data)
                    }
                }
            } catch (error) {
                console.error('Failed to fetch user profile:', error)
            }
        }

        getUserProfile()
    }, [])

    const userProfileList = [
        { label: t('nickname'), value: user.nickname }, //store.nickName
        { label: t('birthdate'), value: '2001.08.07' }, //store.birthYearMonth
        { label: t('email'), value: user.email }, //store.email
    ]
    //권한 접근
    const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions()
    const [reRendering, setRerendering] = useState<boolean>(false)

    //비번 수정중인지 상태
    const [edit, setEdit] = useState<boolean>(false)
    //유저가 입력한 텍스트 배열
    const [passwordText, setPasswordText] = useState<string[]>(['', '', ''])
    //입력한 비밀번호의 타당성 진위 배열
    const [validPassword, setValidPassword] = useState<boolean[]>([
        false,
        false,
        false,
    ])
    //모달 컴포넌트에 내려줄 상태
    const [logOutModal, setLogOutModal] = useState<boolean>(false)
    const [accountModal, setAccountModal] = useState<boolean>(false)

    const uploadImage = async () => {
        // 갤러리 접근 권한 - 갤러리 접속을 허락했는지, 승인하지 않았으면 요청 후 승인
        if (!status?.granted) {
            const permission = await requestPermission()
            if (!permission.granted) {
                return null
            }
        }
        // 이미지 업로드 기능
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images, //어떤 타입의 파일을 받을건지 - 이미지 파일로 설정
            allowsEditing: false, //추가 편집이 가능하게 할 것인지- 불가
            quality: 1, //이미지 압축 여부 1이 가장 높은 화질의 이미지
            aspect: [1, 1], //이미지 비율 설정
        })
        if (result.canceled) {
            return null // 이미지 업로드 취소한 경우
        }
        // 이미지 업로드 결과 및 이미지 경로 업데이트
        store.setImageUrl(result.assets[0].uri)
        setRerendering(!reRendering) //화면 상에 바로 반영이 안되는 문제 보완
    }

    const handleValidatePassword = (password: string, index: number) => {
        const passwordRegex =
            /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/

        const isValid = passwordRegex.test(password)
        const tempList = [...validPassword]
        tempList[index] = isValid
        setValidPassword(tempList)

        if (!edit) {
            setEdit(true)
        }
    }

    const handleConfirmPassword = (password: string, index: number) => {
        const isValid = password === passwordText[1] //새 비번이랑 같은지
        const tempList = [...validPassword]
        tempList[index] = isValid
        setValidPassword(tempList)
        if (!edit) {
            setEdit(true)
        }
    }

    const handleCheckCurrent = (password: string, index: number) => {
        const isValid = password === 'fora22!' //store.password
        const tempList = [...validPassword]
        tempList[index] = isValid
        setValidPassword(tempList)

        if (!edit) {
            setEdit(true)
        }
    }
    //비밀번호 변경컨테이너 반복 리스트
    const inputList = [
        { label: t('current-password'), handleFunction: handleCheckCurrent },
        { label: t('new-password'), handleFunction: handleValidatePassword },
        {
            label: t('password-confirm'),
            handleFunction: handleConfirmPassword,
        },
    ]

    useEffect(() => {}, [passwordText, validPassword])
    return (
        <View style={styles.container}>
            {/* 배경에 깔리는 회색 배경  */}
            <View style={styles.grayContainer}></View>
            {/*헤더 */}
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => {
                        navigation.goBack()
                    }}
                >
                    <Image
                        source={require('@/public/assets/back.png')}
                        style={styles.IconImage}
                    />
                </TouchableOpacity>
                <Text style={text.headerText}>{t('header-title')}</Text>
            </View>
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
                            {profileInfo.label === '닉네임' && (
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
                            )}
                        </View>
                    ))}
                </View>
                <Pressable
                    onPress={uploadImage}
                    style={styles.ProfileImageContainer}
                >
                    <Image
                        source={
                            user.profileImage
                                ? {
                                      uri:
                                          'https://d37m2jfdnaemwx.cloudfront.net' +
                                          user.profileImage,
                                  }
                                : require('@/public/assets/defaultProfile.png')
                        }
                        style={styles.ProfileImage}
                    />
                    <View style={styles.blackZone}>
                        <Image
                            source={require('@/public/assets/camera.png')}
                            style={styles.cameraIcon}
                        />
                    </View>
                </Pressable>
            </View>
            {/*비밀 번호 변경 */}
            <View style={styles.passwordChangeContainer}>
                <Text style={text.passwordTitleText}>
                    {t('change-password')}
                </Text>
                {inputList.map((inputItem, index) => (
                    <View
                        style={
                            passwordText[index] //비번 입력이 되고 있는 경우
                                ? validPassword[index] //올바른 비번인 경우
                                    ? styles.correctPasswordContainer //비번이 올바르지 않은 경우
                                    : styles.wrongPasswordContainer
                                : styles.passwordContainer
                        }
                    >
                        <Text style={text.passwordText}>{inputItem.label}</Text>
                        <View>
                            <TextInput
                                style={styles.inputContainer}
                                placeholder="**********"
                                caretHidden={true}
                                onChangeText={(text) => {
                                    inputItem.handleFunction(text, index)

                                    //비밀번호 업데이트
                                    const tempList2 = [...passwordText]
                                    tempList2[index] = text
                                    setPasswordText(tempList2)
                                }}
                                secureTextEntry={true}
                            />
                            {validPassword[index] && (
                                <Image
                                    source={require('@/public/assets/check-icon.png')}
                                    style={styles.checkIcon}
                                />
                            )}
                        </View>
                        {
                            //입력이 있는데 비밀 번호가 올바르지 않은 경우
                            passwordText[index] && !validPassword[index] && (
                                <Text style={text.cautionText}>
                                    비밀번호가 일치하지 않습니다.
                                </Text>
                            )
                        }
                    </View>
                ))}
                <View
                    style={{
                        width: '100%',
                        marginTop: 140,
                        justifyContent: 'center',
                    }}
                >
                    <TouchableOpacity
                        onPress={() => {
                            store.setPassword(passwordText[0], passwordText[-1])
                        }}
                        style={
                            edit && //수정 중이고 모두 타당한 경우
                            validPassword.every((element) => element === true)
                                ? styles.activateEditButton
                                : styles.editButton
                        }
                    >
                        <Text
                            style={
                                edit && //수정 중이고 모두 타당한 경우
                                validPassword.every(
                                    (element) => element === true,
                                )
                                    ? text.activateButtonText
                                    : text.buttonText
                            }
                        >
                            변경
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            {/*로그아웃 회원탈퇴 */}
            <View style={styles.bottomContainer}>
                <TouchableOpacity
                    onPress={() => {
                        setLogOutModal(true)
                    }}
                    style={styles.logOutContainer}
                >
                    <Text style={text.logOutText}>로그아웃</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        setAccountModal(true)
                    }}
                >
                    <Text style={text.deleteAccount}>회원탈퇴</Text>
                </TouchableOpacity>
            </View>
            {logOutModal && (
                <ChoiceModal
                    modalVisible={logOutModal}
                    setModalVisible={setLogOutModal}
                    question={t('logOut-question')}
                />
            )}
            {accountModal && (
                <ChoiceModal
                    modalVisible={accountModal}
                    setModalVisible={setAccountModal}
                    question={t('Account-question')}
                />
            )}
        </View>
    )
}
