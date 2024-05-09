import { format, formatDistanceToNow } from 'date-fns';

export interface DummyPost {
    postId: string;
    title: string;
    views: number;
    recommend: number;
    category: string;
    createdAt: string;
    imageUrl?: string;
}

const getRandomCategory = (): string => {
    const categories = ['10대', '20대', '30대 이상', '학부모'];
    const randomIndex = Math.floor(Math.random() * categories.length);
    return categories[randomIndex];
};

const generateRandomDate = (): Date => {
    const startDate = new Date();
    const randomDaysAgo = Math.floor(Math.random() * 30) + 1; // 1일부터 30일 사이의 랜덤 값
    startDate.setDate(startDate.getDate() - randomDaysAgo);
    return startDate;
};

export const generateDummyPosts = (): DummyPost[] => {
    const dummyPosts: DummyPost[] = [];

    for (let i = 1; i <= 20; i++) {
        const category = getRandomCategory();
        const createdAt = generateRandomDate();

        // 작성일이 현재 기준 1일 이내인 경우 "n시간 전"으로 표기
        const currentDate = new Date();
        const diffInMilliseconds = currentDate.getTime() - createdAt.getTime();
        const diffInHours = Math.floor(diffInMilliseconds / (1000 * 60 * 60));

        let formattedCreatedAt: string;
        if (diffInHours < 24) {
            // 1일 이내인 경우 "n시간 전"으로 표기
            formattedCreatedAt = `${diffInHours}시간 전`;
        } else {
            // 1일 이상 지난 경우 월/일 형식으로 표기
            formattedCreatedAt = format(createdAt, 'MM/dd');
        }

        const post: DummyPost = {
            postId: `${i}`,
            title: `게시글 제목 ${i}`,
            views: Math.floor(Math.random() * 1000),
            recommend: Math.floor(Math.random() * 1000),
            category: category,
            createdAt: formattedCreatedAt,
            imageUrl: i % 3 === 0 ? `https://placeimg.com/200/200/tech/${i}` : undefined,
        };

        dummyPosts.push(post);
    }

    return dummyPosts;
};
