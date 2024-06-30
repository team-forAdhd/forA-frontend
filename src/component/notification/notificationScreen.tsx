import React, { useState, useEffect, useContext } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import { styles, text } from './notificationStyle'
import { Text, TouchableOpacity, View, Image } from 'react-native'
import NotificationComponent from '../common/notificationComponent/notificationComponent'

import { notificationStoreContext } from '@/src/state/notificationState'
import { NotificationType } from '@/src/state/notificationState/notificationStore'
import { Observer } from 'mobx-react'
//더미 알림
const notificationDummy = [
    {
        id: 1,
        title: '내 글이 TOP 10 게시글로 등록되었어요!',
        date: '2023/03/25 00:11',
    },
    {
        id: 2,
        title: '새로운 댓글이 달렸어요: 사실 전에 ...',
        date: '2023/03/25 00:11',
    },
    {
        id: 3,
        title: '새로운 댓글이 달렸어요: 사실 전에...',
        date: '2023/03/25 00:11',
    },
]

export default function NotificationScreen() {
    const [notifications, setNotifications] = useState<NotificationType[]>([])

    //컴포넌트가 언마운트 되더라도 알림을 확인했는지(클릭)여부는 보존이 되도록 전역관리
    const store = useContext(notificationStoreContext)

    const { t } = useTranslation('notification')

    const navigation = useNavigation()

    // notifications를 업데이트
    useEffect(() => {
        setNotifications(notificationDummy)
    }, [])

    // notifications가 업데이트된 후 실행
    useEffect(() => {
        if (notifications.length > 0) {
            store.setNotifications(notifications)
        }
    }, [notifications])

    return (
        <View style={styles.container}>
            {/*헤더 */}
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => {
                        navigation.goBack()
                    }}
                >
                    <Image
                        source={require('@/resources/assets/back.png')}
                        style={styles.IconImage}
                    />
                </TouchableOpacity>
                <Text style={text.notificationText}>{t('notification')}</Text>
            </View>
            {/* 알림창 */}
            <View style={styles.notificationContainer}>
                {/* 알림 개수에 따라 화면 조건부 렌더링 */}
                {notifications.length > 0 ? (
                    <>
                        {notifications.map((noti, index) => {
                            return (
                                //store.clicks배열 변경 감지하고 알림 컴포넌트에 새prop을 내려 리랜더링 되도록
                                <Observer>
                                    {() => (
                                        //직접적으로 jsx넣으면 에러 -> mobX가 반응할 대상이 함수 안에 정의되어 있어야함
                                        <TouchableOpacity
                                            key={index}
                                            onPress={() => {
                                                store.handleClick(index)
                                            }}
                                        >
                                            <NotificationComponent
                                                title={noti.title}
                                                date={noti.date}
                                                click={store.clicks[index]}
                                            />
                                        </TouchableOpacity>
                                    )}
                                </Observer>
                            )
                        })}
                    </>
                ) : (
                    <View style={styles.noneNotificationContainer}>
                        <Image
                            source={require('@/resources/assets/none.png')}
                            style={styles.bigImage}
                        />
                        <Text style={text.baseText}>{t('none')}</Text>
                    </View>
                )}
            </View>
        </View>
    )
}
