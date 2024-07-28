import styled from "styled-components";
import tw from "twin.macro";
import HeartImg from "../../assets/images/heart.png";

interface HeartProps {
    heartCount: number;
}

const Heart = ({ heartCount }: HeartProps) => {
    return (
        <HeartContainer>
            <img src={HeartImg} alt="heart" />
            <HeartCount>{heartCount}</HeartCount>
        </HeartContainer>
    );
};

export default Heart;

const HeartContainer = styled.div`
    ${tw`
        flex
        flex-col
        items-center
        justify-end
    `}
`;

const HeartCount = styled.span`
    ${tw`
        text-bold-10
        font-bold
        text-mainColor
    `}
`;
