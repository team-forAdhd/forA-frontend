import { useEffect, useState } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import TabBar from '../common/tabBar/tabBar'
import GoogleMap from './Maps'
import HospitalBottomSheet from '../common/hospitalListBottomSheet/hospitalListBottomSheet'
import { styles, text } from './HospitalMapsStyle'
import RibbonDescription from './ribbonDescription'
import { useTranslation } from 'react-i18next'

export default function HospitalMaps() {
    //포에이 설명 팝업을 띄울지에 관한 상태
    const [description, setDescription] = useState<boolean>(false)
    //포에이 리본 모달
    const [modal, setModal] = useState<boolean>(false)

    const { t } = useTranslation('HospitalModal')
    return (
        <View style={{ flex: 1 }}>
            {/*포에이 리본을 클릭한 경우 리본 평가자 수를 알려주는 모달 */}
            {modal && (
                <View style={styles.position}>
                    <TouchableOpacity
                        onPress={() => {
                            setModal(false)
                        }}
                        style={styles.ModalContainer}
                    >
                        <Text>
                            <Text style={text.ribbonText}>{t('text1')} </Text>
                            <Text style={text.ribbonCountText}>2</Text>
                            <Text style={text.ribbonText}>{t('text2')}</Text>
                        </Text>
                        <Text style={text.ribbonText}>{t('text3')}</Text>
                    </TouchableOpacity>
                </View>
            )}
            {/*포에이 리본을 클릭한 경우 리본 평가자 수를 알려주는 모달 */}
            {description && (
                <RibbonDescription setDescription={setDescription} />
            )}
            {/*본인 위치 상단 바 */}
            <View style={styles.topContainer}>
                <Text style={text.headerText}>병원</Text>
                <View style={styles.locationContainer}>
                    <Image
                        style={styles.locationIcon}
                        source={require('@/public/assets/compass.png')}
                    />
                    <Text style={text.locationText}>
                        서울특별시 용산구 청파로47길 100
                    </Text>
                </View>
            </View>
            {/*구글맵 */}
            <GoogleMap />
            {/*병원리스트 바텀 시트*/}
            <HospitalBottomSheet
                setDescription={setDescription}
                setModal={setModal}
            />
            <TabBar />
        </View>
    )
}
