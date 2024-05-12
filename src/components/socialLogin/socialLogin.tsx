import { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigation } from '@react-navigation/native'
import { TouchableOpacity, Text, View, Image } from 'react-native'
import { styles, text } from './socialLoginStyle'
import { ArrowIcon } from '@/public/assets/SvgComponents'
import { SocialJoinStoresContext } from '@/state/socialJoinState'
import { Observer } from 'mobx-react'
import ConsentComponent from '../common/consentComponent/consentComponent'

export default function SiocialLoginScreen() {
    const { t } = useTranslation('socialLogin')

    const store = useContext(SocialJoinStoresContext)
    const navigation = useNavigation()

    //반복될 컴포넌트에 내려줄 props 객체 배열
    const consentItems = [
        {
            title: t('service-using-agreement'),
            essential: t('essential'),
            viewContent: t('view-content'),
            index: 0,
        },
        {
            title: t('personal-information-agreement'),
            essential: t('essential'),
            viewContent: t('view-content'),
            index: 1,
        },
        {
            title: t('14older-check'),
            essential: t('essential'),
            viewContent: '',
            index: 2,
        },
        {
            title: t('marketing-information-agreement'),
            essential: t('choice'),
            viewContent: '',
            index: 3,
        },
    ]
    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.header}
                onPress={() => {
                    navigation.goBack()
                }}
            >
                <ArrowIcon />
            </TouchableOpacity>
            <Image
                source={require('@/public/assets/socialLogin.png')}
                style={styles.socialLoginTitle}
            />
            <View style={styles.titleContainer}>
                <Text style={text.titleText}>{t('join-agreement-offer')}</Text>
            </View>
            <View style={styles.agreeAllContainer}>
                <Observer>
                    {() => (
                        <TouchableOpacity
                            onPress={() => {
                                store.setCheckAll()
                                console.log(store.agreeCheckList)
                            }}
                        >
                            <Image
                                source={
                                    store.agreeCheckList.every(
                                        (element) => element === true,
                                    )
                                        ? require('@/public/assets/check-icon.png')
                                        : require('@/public/assets/uncheck-icon.png')
                                }
                                style={styles.agreeImage}
                            />
                        </TouchableOpacity>
                    )}
                </Observer>
                <Text style={text.agreeText}>{t('agree-all')}</Text>
            </View>
            {consentItems.map((item) => (
                <ConsentComponent
                    key={item.index}
                    title={item.title}
                    essential={item.essential}
                    ViewContent={item.viewContent}
                    index={item.index}
                />
            ))}
            <TouchableOpacity
                style={styles.nextButton}
                onPress={() => {
                    console.log('다음으로 가자')
                    if (
                        store.agreeCheckList
                            .slice(0, 3)
                            .every((x) => x === true) //필수 질문들만 true이면 다음화면으로 넘어갈 수 있도록
                    ) {
                        //navigation
                    }
                }}
            >
                <Text style={text.buttonText}>다음</Text>
            </TouchableOpacity>
        </View>
    )
}
