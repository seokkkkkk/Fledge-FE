import styled from "styled-components";
import tw from "twin.macro";
import Button from "../Common/Button";
import trophy from "../../assets/images/trophy.png";

type CompleteModalProps = {
    onClick: () => void;
};

const CompleteModal = ({ onClick }: CompleteModalProps) => {
    return (
        <Container onClick={onClick}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
                <img src={trophy} alt="trophy" />
                <p className="title-text">챌린지에 참여했습니다.</p>
                <p className="sub-text">
                    시작이 반이다! 멋진 나의 성장을 기대해봐요.
                </p>
                <Button
                    title="닫기"
                    small
                    background="white"
                    onClick={onClick}
                />
            </div>
        </Container>
    );
};

export default CompleteModal;

const Container = styled.div`
    ${tw`
        flex items-center justify-center
        fixed top-0 left-0 w-full h-full z-[1000] bg-[rgba(0,0,0,0.4)]
    `}
    .modal {
        ${tw`
        flex flex-col items-center justify-center bg-[black]
        p-[67px 134px] rounded-[16px] bg-background
    `}
    }
    .title-text {
        ${tw`
            text-bold-36 font-bold text-fontColor1 mb-[16px] mt-[20px]
        `}
    }
    .sub-text {
        ${tw`
            text-medium-20 font-medium text-fontColor3 mb-[30px]
        `}
    }
`;
