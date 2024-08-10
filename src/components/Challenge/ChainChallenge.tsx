import styled from "styled-components";
import tw from "twin.macro";
import ContentHeader from "../Common/ContentHeader";
import chain from "../../assets/images/challenge_chain.png";
import ChainChallengeList from "./ChainChallengeList";

export type ChallengeGridProps = {
    onePage?: boolean;
    mt?: string;
    mb?: string;
    ml?: string;
    mr?: string;
};

const ChainChallenge = ({ onePage, mt, mb, ml, mr }: ChallengeGridProps) => {
    return (
        <Container>
            <ContentHeader
                title="연계 챌린지"
                desc="정부나 전담기관 지원 챌린지, 기업 파트너십 챌린지에 도전해보세요!"
                imgSrc={chain}
                mt={mt}
                mb={mb}
                ml={ml}
                mr={mr}
            />
            <ChainChallengeList onePage={onePage} />
        </Container>
    );
};

export default ChainChallenge;

const Container = styled.div`
    ${tw`
        mt-[50px] flex flex-col items-center relative w-full
    `}
`;
