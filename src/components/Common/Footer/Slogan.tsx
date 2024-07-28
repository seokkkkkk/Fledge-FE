import styled from "styled-components";
import FledgeLogo from "../../../assets/images/fledge-white.png";
import tw from "twin.macro";

const Slogan = () => {
    return (
        <SloganContainer>
            <img src={FledgeLogo} alt="Fledge Logo" />
            <SloganText>
                당신의 새 깃털이
                <br />
                돋아날 때까지
            </SloganText>
        </SloganContainer>
    );
};

export default Slogan;

const SloganText = styled.span`
    ${tw`
        text-[white]
        text-bold-36
        font-bold
    `}
`;

const SloganContainer = styled.div`
    ${tw`
        flex
        flex-col
        gap-[23.74px]
    `}
`;
