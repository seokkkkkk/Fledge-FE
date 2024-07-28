import styled from "styled-components";
import tw from "twin.macro";

interface ButtonProps {
    title: string;
    onClick?: () => void;
}

const Button = ({ title, onClick }: ButtonProps) => {
    return <ButtonContainer onClick={onClick}>{title}</ButtonContainer>;
};

const ButtonContainer = styled.button`
    ${tw`
        p-[6.3px 16.2px]
        bg-subColor
        rounded-[37px]
        text-bold-24
        font-bold
        text-[white]
    `}
`;
export default Button;
