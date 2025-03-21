// mm/dd hh:mm
export const formatDate = (createdAt: number) => {
    const timestamp = createdAt * 1000;
    const date = new Date(timestamp);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const formattedMonth = month < 10 ? `0${month}` : month;
    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedHours = hours < 10 ? `0${hours}` : hours;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${formattedMonth}/${formattedDay} ${formattedHours}:${formattedMinutes}`;
};

// mm/dd
export const formatDateForPostList = (createdAt: string | number | Date) => {
    const date = new Date(createdAt);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const formattedMonth = month < 10 ? `0${month}` : month;
    const formattedDay = day < 10 ? `0${day}` : day;
    return `${formattedMonth}/${formattedDay}`;
};
