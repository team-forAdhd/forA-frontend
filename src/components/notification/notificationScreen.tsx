import React, { useState, useEffect, useContext } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import { styles, text } from './notificationStyle'
import { Text, TouchableOpacity, View, Image } from 'react-native'
import NotificationComponent from '../common/notificationComponent/notificationComponent'
import EventSource from 'react-native-event-source'
import { notificationStoreContext } from '@/state/notificationState'
import { NotificationType } from '@/state/notificationState/notificationStore'
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
interface Notification {
    title: string
    date: string
    // 필요한 다른 필드들 추가 가능
}
export default function NotificationScreen() {
    const [notifications, setNotifications] = useState<Notification[]>([])

    // 컴포넌트가 언마운트 되더라도 알림을 확인했는지 여부는 전역 관리
    const store = useContext(notificationStoreContext)

    const { t } = useTranslation('notification')

    const navigation = useNavigation()

    useEffect(() => {
        // SSE 연결 생성
        const eventSource = new EventSource(
            'https://foradhd.site/api/v1/notifications/sse',
        )

        // 메시지 수신 이벤트
        eventSource.addEventListener('message', (event: any) => {
            console.log('New message:', event.data)

            try {
                const parsedData: Notification[] = JSON.parse(event.data)
                setNotifications(parsedData)
            } catch (error) {
                console.error('Failed to parse SSE message:', error)
            }
        })

        // 에러 이벤트를 addEventListener로 처리 일단은 타입을 any로 정의
        eventSource.addEventListener('error', (error: any) => {
            console.error('SSE error:', error)
        })

        // 컴포넌트가 언마운트될 때 연결 종료
        return () => {
            eventSource.close()
        }
    }, [])

    return (
        <View style={styles.container}>
            {/* 헤더 */}
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
                <Text style={text.notificationText}>{t('notification')}</Text>
            </View>
            {/* 알림창 */}
            <View style={styles.notificationContainer}>
                {/* 알림 개수에 따라 화면 조건부 렌더링 */}
                {notifications && notifications.length > 0 ? (
                    <>
                        {notifications.map((noti, index) => {
                            return (
                                <Observer key={index}>
                                    {() => (
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
                            source={require('@/public/assets/none.png')}
                            style={styles.bigImage}
                        />
                        <Text style={text.baseText}>{t('none')}</Text>
                    </View>
                )}
            </View>
        </View>
    )
}
