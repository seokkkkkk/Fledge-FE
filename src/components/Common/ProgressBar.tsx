import styled, { keyframes } from "styled-components";
import tw from "twin.macro";

interface ProgressProps {
    rate: number;
}

const ProgressBar = ({ rate }: ProgressProps) => {
    return (
        <Container>
            <Progress rate={rate} />
        </Container>
    );
};

export default ProgressBar;

const Container = styled.div`
    ${tw`
        w-full
        h-[15px]
        border-2
        border-fontColor3
        rounded-[28px]
        bg-[white]
        relative
    `}
`;

const fillAnimation = (rate: number) => keyframes`
    from {
        width: 0;
    }
    to {
        width: ${rate}%;
    }
`;

const Progress = styled.div<ProgressProps>`
    width: ${({ rate }) => rate}%;
    ${tw`
        top-0
        left-0
        absolute
        h-full
        bg-fontColor3
        break-keep
    `}
    animation: ${({ rate }) => fillAnimation(rate)} 1s ease-out forwards;
`;
