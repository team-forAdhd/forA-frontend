export type Comment = {
    id: number;
    content: string;
    userId: string;
    postId: number;
    anonymous: boolean;
    likeCount: number;
    createdAt: number;
    lastModifiedAt: number;
    parentCommentId: number | null;
    children: Comment[];
    isLiked: boolean;
    nickname: string;
    isCommentAuthor: boolean;
    isBlocked: boolean;
    profileImage: string;
};

export type PostDetail = {
    id: number;
    userId: string;
    title: string;
    content: string;
    anonymous: boolean;
    images: string[] | null;
    isLiked?: boolean;
    isScrapped?: boolean;
    likeCount: number;
    commentCount: number;
    scrapCount: number;
    viewCount: number;
    category: string;
    comments: Comment[];
    nickname: string | null;
    profileImage: string | null;
    createdAt: number;
    lastModifiedAt: number;
    isAuthor?: boolean;
    isBlocked?: boolean;
};

export type Post = {
    id: number;
    userId: string;
    title: string;
    content: string;
    anonymous: boolean;
    images: string[] | null;
    isLiked?: boolean;
    isScrapped?: boolean;
    likeCount: number;
    commentCount: number;
    scrapCount: number;
    viewCount: number;
    category: PostCategory;
    nickname: string | null;
    profileImage: string | null;
    createdAt: number;
    lastModifiedAt: number;
    isAuthor?: boolean;
};

export type PostCategory =
    | 'TEENS'
    | 'TWENTIES'
    | 'THIRTIES_AND_ABOVE'
    | 'PARENTS'
    | 'NOTICE';
