import styled from "styled-components";
import tw from "twin.macro";

type ProgressProps = {
    totalParticipants: number;
    successParticipants: number;
    successRate: number;
};

const Progress = ({
    totalParticipants,
    successParticipants,
    successRate,
}: ProgressProps) => {
    return (
        <Container>
            <div className="progress-bar">
                <div
                    className="progress"
                    style={{ width: `${successRate}%` }}
                />
            </div>
            <div className="text-field">
                <p>
                    {totalParticipants}명 중 {successParticipants}명 달성
                </p>
                <p>도전 성공률 {successRate}%</p>
            </div>
        </Container>
    );
};

export default Progress;

const Container = styled.div`
    ${tw`
        w-[1280px] flex flex-col gap-[36px]
    `}
    .text-field {
        ${tw`
            flex justify-between text-bold-20 font-bold text-fontColor3
        `}
    }
    .progress-bar {
        ${tw`
            w-[1280px] h-[15.41px] rounded-[28px] border-[3px] border-subColor shadow-[black] bg-white
        `}
    }
    .progress {
        ${tw`
            h-full rounded-[28px] bg-subColor
        `}
    }
`;
