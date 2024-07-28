import styled from "styled-components";
import tw from "twin.macro";
import Medal from "../../assets/images/medal.png";
import ContentHeader from "../Common/ContentHeader";
import { ChallengeItem, ChallengeItemLarge } from "../Challenge/ChallengeItem";
import Partner1 from "../../assets/images/partner1.png";
import Partner2 from "../../assets/images/partner2.png";

const challengeList = [
    {
        title: "1주 1권 독서하기",
        bubbleType: "hot",
        heartCount: 3,
        challengeTypes: ["명상", "자기계발"],
        description: "매일 1분, 나를 위한 명상으로 하루를 시작해보세요!",
        successRate: 75,
        participants: 123,
    },
    {
        title: "1주 1권 독서하기",
        bubbleType: "new",
        heartCount: 3,
        challengeTypes: ["명상", "자기계발"],
        description: "매일 1분, 나를 위한 명상으로 하루를 시작해보세요!",
        successRate: 75,
        participants: 123,
    },
    {
        title: "1주 1권 독서하기",
        bubbleType: "hot",
        heartCount: 3,
        challengeTypes: ["명상", "자기계발"],
        description: "매일 1분, 나를 위한 명상으로 하루를 시작해보세요!",
        successRate: 75,
        participants: 123,
    },
    {
        title: "1주 1권 독서하기",
        bubbleType: "new",
        heartCount: 3,
        challengeTypes: ["명상", "자기계발"],
        description: "매일 1분, 나를 위한 명상으로 하루를 시작해보세요!",
        successRate: 75,
        participants: 123,
    },
];

const LargeChallengeList = [
    {
        title: "현대캐피탈 자립준비청년 지원프로그램",
        bubbleType: "partnership",
        heartCount: 3,
        challengeTypes: ["금융", "재정관리", "생활", "자격증", "주거"],
        description:
            "본 사업은 주거지원비 및 생활환경조성비, 자격증취득지원 및 취득 격려금, 1:1 맞춤 금융경제교육을 진행하는 사업입니다.  ",
        successRate: 75,
        participants: 123,
        partnerImages: [Partner1, Partner2],
        benefits: [
            { title: "맞춤형 주거지원", price: "최대 300만원" },
            { title: "자격증 취득 지원", price: "최대 100만원" },
            { title: "자격증 취득 격려금", price: "인당 30만원" },
        ],
        date: "2024년 4월-2024년 12월",
    },
    {
        title: "현대캐피탈 자립준비청년 지원프로그램",
        bubbleType: "org",
        heartCount: 3,
        challengeTypes: ["금융", "재정관리", "생활", "자격증", "주거"],
        description:
            "본 사업은 주거지원비 및 생활환경조성비, 자격증취득지원 및 취득 격려금, 1:1 맞춤 금융경제교육을 진행하는 사업입니다.  ",
        successRate: 75,
        participants: 123,
        benefits: [
            { title: "맞춤형 주거지원", price: "최대 300만원" },
            { title: "자격증 취득 지원", price: "최대 100만원" },
            { title: "자격증 취득 격려금", price: "인당 30만원" },
        ],
        date: "2024년 4월-2024년 12월",
    },
];

const ChallengeSection = () => {
    return (
        <Contents>
            <ContentHeader
                title="챌린지"
                desc="스스로 자립능력을 키워나갈 수 있는 기회! 지금 바로 도전하고, 성장하는 자신을 만나보세요!"
            />
            <ChallengeList>
                {challengeList.map((challenge, index) => (
                    <ChallengeItem key={index} {...challenge} />
                ))}
            </ChallengeList>
            <ChallengeList>
                {LargeChallengeList.map((challenge, index) => (
                    <ChallengeItemLarge key={index} {...challenge} />
                ))}
            </ChallengeList>
            <MedalImage src={Medal} alt="medal" />
        </Contents>
    );
};

export default ChallengeSection;

const ChallengeList = styled.div`
    ${tw`
        flex
        gap-[23px]
        mt-[56px]
    `}
`;

const Contents = styled.div`
    ${tw`
        flex
        flex-col
        w-full
        relative
    `}
`;

const MedalImage = styled.img`
    ${tw`
        w-[336px]
        h-[427px]
        absolute
        z-[-1]
        top-[-180px]
        right-[40px]
    `}
`;
