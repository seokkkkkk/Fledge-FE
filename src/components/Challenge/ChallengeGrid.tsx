import { useEffect, useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import LeftArrowIcon from "../../assets/icons/left-arrow";
import { ChallengeItem } from "./ChallengeItem";
import RightArrowIcon from "../../assets/icons/right-arrow";
import { getChallenges } from "../../apis/challenge";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { on } from "events";

type ChallengeGridProps = {
    type: string;
    categories?: string[];
    size?: number;
    onePage?: boolean;
    noTag: boolean;
};

const ChallengeGrid = ({
    type,
    categories,
    size,
    onePage = false,
    noTag,
}: ChallengeGridProps) => {
    const [page, setPage] = useState<number>(0);
    const isCategory = categories !== undefined;
    const {
        data: challengeData,
        isLoading,
        error,
    } = useQuery({
        queryKey: ["getChallengeData", page, type, categories || []],
        queryFn: () => getChallenges(page, size || 8, type, categories || []),
        enabled: true,
        placeholderData: keepPreviousData,
    });

    useEffect(() => {
        setPage(0);
    }, [categories]);

    if (isLoading) return <div></div>;
    if (challengeData === undefined) return <div></div>;

    return (
        <ChallengerContainer>
            {!onePage && (
                <button onClick={() => setPage(page - 1)} disabled={page === 0}>
                    <LeftArrowIcon width={24} height={51} />
                </button>
            )}
            <ChallengeSlider size={size}>
                {challengeData.data.content.map(
                    (challenge: any, index: number) => (
                        <ChallengeItem
                            key={index}
                            title={challenge.title}
                            bubbleType={type.toString()}
                            heartCount={challenge.likeCount}
                            challengeTypes={challenge.categories}
                            description={challenge.description}
                            successRate={challenge.successRate}
                            participants={challenge.participantCount}
                            isCategory={isCategory}
                            challengeId={challenge.id}
                            noTag={noTag}
                        />
                    )
                )}
            </ChallengeSlider>
            {!onePage && (
                <button
                    onClick={() => setPage(page + 1)}
                    disabled={challengeData.data.last}
                >
                    <RightArrowIcon width={24} height={51} />
                </button>
            )}
        </ChallengerContainer>
    );
};
export default ChallengeGrid;

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

type ChallengeItemProps = {
    size?: number;
};

const ChallengeSlider = styled.div<ChallengeItemProps>`
    ${tw`
    grid grid-cols-4 gap-[23px]
`}
    //size가 4 이상일 때
    ${({ size }) =>
        size &&
        size > 4 &&
        tw`
        grid-rows-2
    `}
`;
