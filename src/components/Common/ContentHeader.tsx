import styled from "styled-components";
import tw from "twin.macro";
import RightArrow from "../../assets/images/right-arrow.png";

interface ContentHeaderProps {
    title: string;
    desc: string;
    onClick?: () => void;
}

const ContentHeader = ({ title, desc, onClick }: ContentHeaderProps) => {
    return (
        <Container>
            <TextContainer>
                <Title>{title}</Title>
                <Desc>{desc}</Desc>
            </TextContainer>
            <Image src={RightArrow} alt="right-arrow" onClick={onClick} />
        </Container>
    );
};

const Container = styled.div`
    ${tw`
        flex
        justify-between
        items-center
    `}
`;

const Image = styled.img`
    ${tw`
        w-[25.5px]
        h-[51px]
        cursor-pointer
    `}
`;

const TextContainer = styled.div`
    ${tw`
        flex
        flex-col
        gap-[10px]
    `}
`;

const Title = styled.span`
    ${tw`
        text-bold-36
        font-bold
        text-fontColor1
    `}
`;
const Desc = styled.span`
    ${tw`
        text-medium-20
        font-medium
        text-fontColor3
    `}
`;

export default ContentHeader;
