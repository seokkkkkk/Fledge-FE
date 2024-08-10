export type ChallengerProps = {
    imgSrc: string;
    name: string;
    desc: string;
    categoryList: string[];
    rank: number;
};

export type BestChallengerProps = {
    memberId: number;
    nickname: string;
    totalCount: number;
    successCount: number;
    successRate: number;
    topCategories: string[];
    profileImageUrl: string;
};

export type ChallengeProps = {
    totalElements: number;
    totalPages: number;
    size: number;
    content: [
        {
            title: string;
            likeCount: number;
            categories: string[];
            type: string;
            description: string;
            successRate: number;
            participationCount: number;
            supportContent: string;
            startDate: string;
            endData: string;
        }
    ];
    number: number;
    sort: {
        empty: boolean;
        sorted: boolean;
        unsorted: boolean;
    };
    numberOfElements: number;
    pageable: {
        offset: {
            empty: boolean;
            sorted: boolean;
            unsorted: boolean;
        };
        paged: boolean;
        pageNumber: number;
        pageSize: number;
        unpaged: boolean;
    };
    first: boolean;
    last: boolean;
    empty: boolean;
};

export type ChallengeDetailProps = {
    categrories: string[];
    despription: string;
    endDate: string | null;
    likeCount: number;
    participantCount: number;
    participating: boolean;
    startDate: string | null;
    successCount: number;
    successRate: number;
    supportContent: string | null;
    title: string;
    type: string;
};
