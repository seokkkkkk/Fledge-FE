import styled from "styled-components";
import Challenger from "../Challenge/Challenger";
import Button from "../Common/Button";
import ContentHeader from "../Common/ContentHeader";
import tw from "twin.macro";
import { scroll } from "../Challenge/BestChallenger";
import { useQuery } from "@tanstack/react-query";
import { getChallengeParticipants } from "../../apis/challenge";
import { BestChallengerProps } from "../../@types/challenge";

type ChallengerProps = {
    challengeId?: string;
    participating?: boolean;
    onClick?: () => void;
    onCancle?: () => void;
};

const Challengers = ({
    challengeId = "1",
    participating,
    onClick,
    onCancle,
}: ChallengerProps) => {
    const { data: challengerData, isLoading } = useQuery({
        queryKey: ["getChallengeParticipants", challengeId],
        queryFn: () => getChallengeParticipants(challengeId),
    });

    if (isLoading) return <div></div>;

    return (
        <Container>
            <div className="challengers">
                <ContentHeader
                    title="함께 참여하는 챌린저들"
                    desc="이 챌린지에 함께 참여하고 있는 챌린저들이에요. 같이 힘내봐요!"
                />
                {participating ? (
                    <div className="buttons">
                        <Button
                            title="참여 포기"
                            small
                            background="white"
                            margin={false}
                            onClick={onCancle}
                        />
                        <Button
                            title="챌린지 참여중"
                            small
                            gray
                            margin={false}
                        />
                    </div>
                ) : (
                    <Button
                        title="챌린지 참여하기"
                        small
                        margin={false}
                        onClick={onClick}
                    />
                )}
            </div>
            <div className="challenger-list">
                {challengerData.data.map(
                    (challenger: BestChallengerProps, index: number) => (
                        <Challenger
                            key={index}
                            imgSrc={challenger.profileImageUrl}
                            name={challenger.nickname}
                            desc={
                                challenger.successCount +
                                "/" +
                                challenger.totalCount +
                                "개 챌린지 성공!"
                            }
                            categoryList={challenger.topCategories}
                            rank={
                                4 -
                                Math.floor((challenger.successRate * 100) / 30)
                            }
                        />
                    )
                )}
            </div>
        </Container>
    );
};

export default Challengers;

const Container = styled.div`
    ${tw`
        flex flex-col gap-[42px] overflow-hidden items-center w-full
    `}
    .buttons {
        ${tw`
            flex justify-end gap-[23px]
        `}
    }
    .challengers {
        ${tw`
            flex justify-between items-center w-[1280px] overflow-hidden
        `}
    }
    .challenger-list {
        ${tw`
            flex justify-between gap-[40px] w-[100dvw]
        `}
        animation: ${scroll} 30s linear infinite;
        display: flex;
        white-space: nowrap;
        overflow: hidden;
    }
`;
