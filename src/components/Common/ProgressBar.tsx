import styled from "styled-components";
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
        bg-[whilte]
        relative
    `}
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
`;
