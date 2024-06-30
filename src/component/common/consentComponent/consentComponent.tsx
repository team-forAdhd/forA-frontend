import { useContext, Dispatch, SetStateAction } from 'react'
import { TouchableOpacity, Text, View, Image } from 'react-native'
import { styles, text } from './consentStyle'
import { SocialJoinStoresContext } from '@/src/state/socialJoinState'
import { Observer } from 'mobx-react'

interface ConsentType {
    title: string
    essential: string
    ViewContent: string
    index: number
    bottomSheet: boolean[]
    setBottomSheet: Dispatch<SetStateAction<boolean[]>>
    setBottomIndex: Dispatch<SetStateAction<number>>
}
export default function ConsentComponent({
    title,
    essential,
    ViewContent,
    index,
    bottomSheet,
    setBottomSheet,
    setBottomIndex,
}: ConsentType) {
    const store = useContext(SocialJoinStoresContext)

    return (
        <View style={styles.container}>
            <Observer>
                {() => (
                    <View style={styles.agreeContainer}>
                        <TouchableOpacity
                            onPress={() => {
                                store.setCheckEach(index)
                            }}
                        >
                            <Image
                                source={
                                    store.agreeCheckList[index]
                                        ? require('@/resources/assets/check-icon.png')
                                        : require('@/resources/assets/uncheck-icon.png')
                                }
                                style={styles.agreeImage}
                            />
                        </TouchableOpacity>
                        <View style={styles.agreeContainer}>
                            <Text style={text.agreeText}>{title}</Text>
                            <Text
                                style={
                                    essential === '(필수)'
                                        ? text.essentialText
                                        : text.agreeText
                                }
                            >
                                {essential}
                            </Text>
                        </View>
                    </View>
                )}
            </Observer>
            {ViewContent && (
                <TouchableOpacity
                    onPress={() => {
                        const newBottomSheet = Array.from(bottomSheet)
                        newBottomSheet[index] = !bottomSheet[index]
                        setBottomSheet(newBottomSheet)
                        setBottomIndex(index)
                    }}
                >
                    <Text style={text.viewContentText}>{ViewContent}</Text>
                </TouchableOpacity>
            )}
        </View>
    )
}
