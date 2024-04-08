import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
    TouchableOpacity,
    Text,
    View,
    TextInput,
    Image,
    Pressable,
} from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { styles, text } from './signupProfileStyle'
import { ArrowIcon } from '@/public/assets/SvgComponents'

function SignupProfileScreen() {
    const { t } = useTranslation('signup-profile')
    //권한 접근
    const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions()
    //사용자가 설정한 닉네임
    const [nickName, setNickName] = useState<string>('')
    //현재 이미지 url
    const [ImageUrl, setImageUrl] = useState<string>(
        require('@/public/assets/defaultProfileImage.png'),
    )
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
        setImageUrl(result.assets[0].uri)
    }
    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.header}
                onPress={() => console.log('뒤로가기')}
            >
                <ArrowIcon />
            </TouchableOpacity>
            <View style={styles.title}>
                <Text style={text.titleText}>{t('signup-profile')}</Text>
            </View>
            <View style={styles.profileImageContainer}>
                <Pressable onPress={uploadImage}>
                    <Image
                        style={styles.ProfileImage}
                        source={{ uri: ImageUrl }}
                    />
                    <Image
                        style={styles.cameraIcon}
                        source={require('@/public/assets/camera.png')}
                    />
                </Pressable>
            </View>
            <View style={styles.contents}>
                <View style={styles.inputContainer}>
                    <Text style={text.inputTitleText}>
                        {t('signup-nickname')}
                    </Text>
                    <TextInput
                        style={text.inputText}
                        placeholder={t('signup-nickname-input')}
                        caretHidden={true}
                        value={nickName}
                        onChangeText={setNickName}
                    />
                    <View style={styles.inputBar} />
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.nextButton}
                        onPress={() => {
                            console.log('다음 페이지로 넘어갑니다')
                        }}
                    >
                        <Text style={text.buttonText}>다음</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default SignupProfileScreen
