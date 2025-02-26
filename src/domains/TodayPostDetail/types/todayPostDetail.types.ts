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
    nickname: string;
    profileImage: string;
};

export type Post = {
    id: number;
    userId: string;
    title: string;
    content: string;
    anonymous: boolean;
    images: string[] | null;
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
};
