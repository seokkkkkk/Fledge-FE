import styled from "styled-components";
import tw from "twin.macro";
import Button from "../Common/Button";

type ModalProps = {
    title: string;
    subText?: string;
    left?: string;
    right?: string;
    onCancle?: () => void;
    onApply?: () => void;
};

const Modal = ({
    title,
    subText,
    left,
    right,
    onCancle,
    onApply,
}: ModalProps) => {
    return (
        <Container onClick={onCancle}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
                <p className="title-text">{title}</p>
                {subText && <p className="sub-text">{subText}</p>}
                <div className="button-container">
                    {left && (
                        <Button
                            title={left}
                            small
                            background="white"
                            onClick={onCancle}
                        />
                    )}
                    {right && <Button title={right} small onClick={onApply} />}
                </div>
            </div>
        </Container>
    );
};

export default Modal;

const Container = styled.div`
    ${tw`
        flex items-center justify-center
        fixed top-0 left-0 w-full h-full z-[1000] bg-[rgba(0,0,0,0.4)]
    `}
    .modal {
        ${tw`
        flex flex-col items-center justify-center bg-[black]
        py-[67px] rounded-[16px] bg-background w-[636px]
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
