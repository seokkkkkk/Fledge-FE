import { useEffect, useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import LeftArrowIcon from "../../assets/icons/left-arrow";
import RightArrowIcon from "../../assets/icons/right-arrow";
import { getRecommendedChallenges } from "../../apis/challenge";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { ChallengeItem } from "../Challenge/ChallengeItem";

type RecommendedChallengesProps = {
    challengeId?: string;
};

const RecommendedChallenges = ({ challengeId }: RecommendedChallengesProps) => {
    const [page, setPage] = useState<number>(0);
    const [currentChallenges, setCurrentChallenges] = useState([]);
    const {
        data: challengeData,
        isLoading,
        error,
    } = useQuery({
        queryKey: ["getRecommendedChallenges", challengeId],
        queryFn: () => getRecommendedChallenges(challengeId || ""),
        enabled: true,
    });

    useEffect(() => {
        if (challengeData && challengeData.data) {
            const start = page * 4;
            const end = start + 4;
            setCurrentChallenges(challengeData.data.slice(start, end));
        }
    }, [challengeData, page]);

    if (isLoading) return <div></div>;
    if (challengeData === undefined) return <div></div>;

    return (
        <ChallengerContainer>
            <button onClick={() => setPage(page - 1)} disabled={page === 0}>
                <LeftArrowIcon width={24} height={51} />
            </button>
            <ChallengeSlider>
                {currentChallenges.map((challenge: any, index: number) => (
                    <ChallengeItem
                        key={index}
                        title={challenge.title}
                        heartCount={challenge.likeCount}
                        challengeTypes={challenge.categories}
                        description={challenge.description}
                        successRate={challenge.successRate}
                        participants={challenge.participantCount}
                        challengeId={challenge.id}
                        noTag={true}
                    />
                ))}
            </ChallengeSlider>
            <button
                onClick={() => setPage(page + 1)}
                disabled={challengeData.data.length <= (page + 1) * 4}
            >
                <RightArrowIcon width={24} height={51} />
            </button>
        </ChallengerContainer>
    );
};
export default RecommendedChallenges;

const ChallengerContainer = styled.div`
    ${tw`
        flex
        items-center
        justify-between
        gap-[40px]
        mt-[-80px]
        w-[1400px]
    `}
`;

const ChallengeSlider = styled.div`
    ${tw`
    grid grid-cols-4 gap-[23px]
`}
`;
