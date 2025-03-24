export function dateFormat(date: number) {
    const currentDate = new Date();
    const createdAtDate = new Date(date * 1000);
    const diffInMilliseconds = currentDate.getTime() - createdAtDate.getTime();
    const diffInHours = Math.floor(diffInMilliseconds / (1000 * 60 * 60));

    if (diffInHours < 24) {
        // 1일 이내인 경우 "n시간 전"으로 표기
        return `${diffInHours}시간 전`;
    } else {
        // 1일 이상 지난 경우 월/일 형식으로 표기
        return `${createdAtDate.getMonth() + 1}/${createdAtDate.getDate()}`;
    }
}
