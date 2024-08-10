import styled from "styled-components";
import tw from "twin.macro";
import Button from "../Common/Button";
import thums from "../../assets/images/thumbs-up.png";

type ThumbsUpModalProps = {
    onClose: () => void;
};

const ThumbsUpModal = ({ onClose }: ThumbsUpModalProps) => {
    return (
        <Modal onClick={onClose}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
                <img src={thums} alt="thums" />
                <p className="title-text">인증을 완료했습니다.</p>
                <p className="sub-text">
                    수고하셨습니다! 또 한 번 성장하셨군요.
                </p>
                <Button
                    title="닫기"
                    small
                    background="white"
                    onClick={onClose}
                />
            </div>
        </Modal>
    );
};

export default ThumbsUpModal;

const Modal = styled.div`
    ${tw`
        flex items-center justify-center
        fixed top-0 left-0 w-full h-full z-[1000] bg-[rgba(0,0,0,0.4)]
    `}
    .modal {
        ${tw`
        flex flex-col items-center justify-center bg-[black]
        w-[636px] py-[67px] rounded-[16px] bg-background
    `}
    }
    .title-text {
        ${tw`
            text-bold-36 font-bold text-fontColor1 mb-[16px] mt-[30px]
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
