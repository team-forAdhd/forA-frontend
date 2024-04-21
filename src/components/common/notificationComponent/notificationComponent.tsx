import React from 'react'
import { View, Image, Text } from 'react-native'
import { styles, text } from './notificationComponentStyle'

interface NotificationProps {
    title: string
    date: string
    click: boolean
}

function NotificationComponent(props: NotificationProps) {
    const { title, date, click } = props
    return (
        // 클릭(조회) 여부에 따라 화면 아이콘 모양 및 컨테이너 배경색 변화
        <View style={click ? styles.clickContainer : styles.container}>
            <Image
                source={
                    click
                        ? require('@/public/assets/click.png')
                        : require('@/public/assets/nonClick.png')
                }
                style={styles.IconImage}
            />
            <View style={styles.contentContainer}>
                <Text style={text.titleText}>{title}</Text>
                <Text style={text.dateText}>{date}</Text>
            </View>
        </View>
    )
}

export default React.memo(NotificationComponent)
