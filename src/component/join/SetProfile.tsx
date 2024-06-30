import React, { useState, useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigation } from '@react-navigation/native'
import { ArrowIcon } from '@/resources/assets/SvgComponents'
import { TouchableOpacity, Text, View, TextInput, Image } from 'react-native'
import { styles, text } from './JoinStyle'
import { CameraIcon } from '@/resources/assets/SvgComponents'
import * as ImagePicker from 'expo-image-picker'
import { ProfileStoreContext } from '@/src/state/signupState'

export default function SetProfile() {
    const { t } = useTranslation('login-join')
    const navigation = useNavigation()

    const gotoBeforeScreen = () => {
        navigation.navigate('SetPassword' as never)
    }
    const gotoNextScreen = () => {
        navigation.navigate('JoinLast' as never)
    }
    const [nickname, setNickname] = useState('')
    const [inputFocused, setInputFocused] = useState(false)
    const [selectedImage, setSelectedImage] = useState(null)
    const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions()

    const store = useContext(ProfileStoreContext)

    const [reRendering, setRerendering] = useState<boolean>(false)
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
        setRerendering(!reRendering)
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.header} onPress={gotoBeforeScreen}>
                <ArrowIcon />
            </TouchableOpacity>
            <View style={styles.title}>
                <Text style={text.titleText}>{t('signup-profile')}</Text>
                <Text style={text.descriptionText}>
                    {t('profile-description')}
                </Text>
            </View>
            <View style={styles.contents}>
                <View style={styles.photoContainer}>
                    {selectedImage ? (
                        <Image
                            source={{ uri: selectedImage }}
                            style={styles.photoPlaceholder}
                        />
                    ) : (
                        <Image
                            source={require('@/resources/assets/image.png')}
                            style={styles.photoPlaceholder}
                        />
                    )}
                    <View style={styles.photoUploadButton}>
                        <TouchableOpacity onPress={uploadImage}>
                            <View style={styles.photoButtonContent}>
                                <CameraIcon />
                                <Text style={text.photoButtonText}>
                                    {t('profile-photo-button')}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.inputContainer}>
                    <Text style={text.inputTitleText}>
                        {t('signup-nickname')}
                    </Text>
                    <TextInput
                        style={[
                            text.inputText,
                            inputFocused ? text.inputUserText : text.inputText,
                        ]}
                        placeholder={t('signup-nickname-input')}
                        value={nickname}
                        onChangeText={(text) => {
                            setNickname(text)
                        }}
                        onFocus={() => setInputFocused(true)}
                        onBlur={() => setInputFocused(false)}
                    />
                    <View
                        style={[
                            styles.inputBar,
                            inputFocused
                                ? styles.inputUserBar
                                : styles.inputBar,
                        ]}
                    />
                </View>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[
                        styles.nextButton,
                        nickname
                            ? { backgroundColor: '#52A55D' }
                            : { backgroundColor: '#EEE' },
                    ]}
                    disabled={!nickname}
                    onPress={gotoNextScreen}
                >
                    <Text
                        style={[
                            text.buttonText,
                            nickname ? { color: '#FFF' } : { color: '#232323' },
                        ]}
                    >
                        {t('next-button')}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
