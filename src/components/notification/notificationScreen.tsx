import React, { useState, useEffect, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { styles, text } from './notificationStyle';
import { Text, TouchableOpacity, View, Image, ScrollView } from 'react-native';
import NotificationComponent from '../common/notificationComponent/notificationComponent';
import EventSource from 'react-native-event-source';
import { notificationStoreContext } from '@/state/notificationState';
import { NotificationType } from '@/state/notificationState/notificationStore';
import { Observer } from 'mobx-react';
import { getNotification } from '@/api/notification/getNotificationApi';
import { markNotificationAsRead } from '@/api/notification/getNotificationApi';
import { API_URL } from '@env';

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
];

interface Notification {
    id: number;
    content: string;
    notificationType: string;
    createdAt: string;
    userProfile: {
        nickname: string;
        profileImageUrl: string;
    };
    read: boolean;
}

export default function NotificationScreen() {
    const [notifications, setNotifications] = useState<Notification[]>([]);

    // 컴포넌트가 언마운트 되더라도 알림을 확인했는지 여부는 전역 관리
    const store = useContext(notificationStoreContext);

    const { t } = useTranslation('notification');

    const navigation = useNavigation();

    useEffect(() => {
        // 초기 알림 목록 불러오기
        const fetchNotifications = async () => {
            try {
                const data = await getNotification();
                const sortedData = data.sort(
                    (a, b) =>
                        new Date(b.createdAt).getTime() -
                        new Date(a.createdAt).getTime(),
                );

                setNotifications(sortedData);
            } catch (error) {
                console.error('알림 불러오기 실패:', error);
            }
        };

        fetchNotifications();

        // SSE 연결 생성
        const eventSource = new EventSource(
            `${API_URL}/api/v1/notifications/sse`,
        );

        // 메시지 수신 이벤트
        eventSource.addEventListener('message', (event: any) => {
            try {
                const parsedData: Notification[] = JSON.parse(event.data);
                setNotifications(parsedData);
            } catch (error) {
                console.error('Failed to parse SSE message:', error);
            }
        });

        // 에러 이벤트를 addEventListener로 처리 우선 타입을 any로 정의
        eventSource.addEventListener('error', (error: any) => {
            console.error('SSE error:', error);
        });

        // 컴포넌트가 언마운트될 때 연결 종료
        return () => {
            eventSource.close();
        };
    }, []);

    return (
        <View style={styles.container}>
            {/* 헤더 */}
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => {
                        navigation.goBack();
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
            <ScrollView style={styles.notificationContainer}>
                {/* 알림 개수에 따라 화면 조건부 렌더링 */}
                {notifications && notifications.length > 0 ? (
                    <>
                        {notifications.map((noti, index) => {
                            return (
                                <Observer key={index}>
                                    {() => (
                                        <TouchableOpacity
                                            onPress={async () => {
                                                try {
                                                    await markNotificationAsRead(
                                                        noti.id,
                                                    );
                                                    store.handleClick(index);

                                                    // 읽음 처리된 알림만 업데이트
                                                    setNotifications((prev) =>
                                                        prev.map((item) =>
                                                            item.id === noti.id
                                                                ? {
                                                                      ...item,
                                                                      read: true,
                                                                  }
                                                                : item,
                                                        ),
                                                    );
                                                } catch (e) {
                                                    console.error(
                                                        '알림 읽음 처리 실패:',
                                                        e,
                                                    );
                                                }
                                            }}
                                        >
                                            <NotificationComponent
                                                title={noti.content}
                                                date={noti.createdAt
                                                    .substring(0, 16)
                                                    .replace('T', ' ')}
                                                click={store.clicks[index]}
                                            />
                                        </TouchableOpacity>
                                    )}
                                </Observer>
                            );
                        })}
                        <View style={{ height: 50 }} />
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
            </ScrollView>
        </View>
    );
}
