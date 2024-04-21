import { computed, makeAutoObservable } from 'mobx'

export type NotificationType = {
    id: number
    title: string
    date: string
}

class NotificationStore {
    notifications: NotificationType[] = []
    clicks: boolean[] = []

    constructor() {
        makeAutoObservable(this)
    }

    setNotifications(notifications: NotificationType[]) {
        this.notifications = notifications
        // 클릭 배열을 적절한 길이로 조정//서버에서 배열을 받아와서 notifications의 배열길이가 달라진 경우 기존 클릭 배열에 담긴 값은 복사하고 새로 추가된 배열만 false로 채워 넣음
        if (this.clicks.length < notifications.length) {
            this.clicks = [
                ...this.clicks,
                ...new Array(notifications.length - this.clicks.length).fill(
                    false,
                ),
            ]
        }
    }

    handleClick(index: number) {
        const newClicks = [...this.clicks]
        newClicks[index] = true
        this.clicks = newClicks
    }

    getIndex(index: number) {
        return this.clicks.slice(index, index + 1)
    }
}

const notificationStore = new NotificationStore()
export default notificationStore
