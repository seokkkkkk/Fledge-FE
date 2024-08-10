import styled from "styled-components";
import tw from "twin.macro";
import Button from "../Common/Button";
import { useNavigate } from "react-router-dom";

type RejectModalProps = {
    onClick: () => void;
};

const RejectModal = ({ onClick }: RejectModalProps) => {
    const navigate = useNavigate();
    return (
        <Container onClick={onClick}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
                <p className="title-text">챌린지에 참여할 수 없습니다.</p>
                <p className="sub-text">
                    자립준비청년 인증을 완료해야 챌린지에 참여할 수 있어요.
                </p>
                <div className="button-container">
                    <Button
                        title="닫기"
                        small
                        background="white"
                        onClick={onClick}
                    />
                    <Button
                        title="자립준비청년 인증하기"
                        small
                        onClick={() => {
                            navigate("/mypage");
                            window.scrollTo(0, 0);
                        }}
                    />
                </div>
            </div>
        </Container>
    );
};

export default RejectModal;

const Container = styled.div`
    ${tw`
        flex items-center justify-center
        fixed top-0 left-0 w-full h-full z-[1000] bg-[rgba(0,0,0,0.4)]
    `}
    .modal {
        ${tw`
        flex flex-col items-center justify-center bg-[black]
        p-[67px 80px] rounded-[16px] bg-background
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
