import styled from "styled-components";
import tw from "twin.macro";
import Button from "../Common/Button";

type ApplyModalProps = {
    onCancle: () => void;
    onApply: () => void;
};

const ApplyModal = ({ onCancle, onApply }: ApplyModalProps) => {
    return (
        <Container onClick={onCancle}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
                <p className="title-text">챌린지에 참여할까요?</p>
                <p className="sub-text">
                    챌린지에 참여하고 성장하는 자신을 만나봅시다!
                </p>
                <div className="button-container">
                    <Button
                        title="뒤로가기"
                        small
                        background="white"
                        onClick={onCancle}
                    />
                    <Button title="참여하기" small onClick={onApply} />
                </div>
            </div>
        </Container>
    );
};

export default ApplyModal;

const Container = styled.div`
    ${tw`
        flex items-center justify-center
        fixed top-0 left-0 w-full h-full z-[1000] bg-[rgba(0,0,0,0.4)]
    `}
    .modal {
        ${tw`
        flex flex-col items-center justify-center bg-[black]
        p-[67px 119px] rounded-[16px] bg-background
    `}
    }
    .title-text {
        ${tw`
            text-bold-36 font-bold text-fontColor1 mb-[16px]
        `}
    }
    .sub-text {
        ${tw`
            text-medium-20 font-medium text-fontColor3 mb-[30px]
        `}
    }
    .button-container {
        ${tw`
            flex gap-[23px]
        `}
    }
`;
