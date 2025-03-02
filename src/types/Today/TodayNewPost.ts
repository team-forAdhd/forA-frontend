export type TodayNewPostOrEdit = {
    title: string;
    content: string;
    images: Array<string>;
    anonymous: boolean;
    category: 'TEENS' | 'PARENTS' | 'THIRTIES_AND_ABOVE';
};

export type TodayPostCategory = Pick<
    TodayNewPostOrEdit,
    'category'
>['category'];
