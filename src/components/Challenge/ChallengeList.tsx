import styled from "styled-components";
import tw from "twin.macro";
import ContentHeader from "../Common/ContentHeader";
import ChallengeGrid from "./ChallengeGrid";

type ChallengeListProps = {
    title: string;
    desc: string;
    imgSrc: string;
    type: string;
    categories?: string[];
    noTag?: boolean;
    mt?: string;
    mb?: string;
    ml?: string;
    mr?: string;
};

const ChallengeList = ({
    title,
    desc,
    imgSrc,
    type,
    categories,
    noTag = true,
    mt,
    mb,
    ml,
    mr,
}: ChallengeListProps) => {
    return (
        <Container>
            <ContentHeader
                title={title}
                desc={desc}
                imgSrc={imgSrc}
                mt={mt}
                mb={mb}
                ml={ml}
                mr={mr}
            />
            <ChallengeGrid type={type} categories={categories} noTag={noTag} />
        </Container>
    );
};

export default ChallengeList;

const Container = styled.div`
    ${tw`
        mt-[130px] flex flex-col items-center relative w-full
    `}
`;
