import styled from "styled-components";
import tw from "twin.macro";
import medal from "../../assets/images/no-challenger-medal.png";

type NoChallengerProps = {
    text: string;
};

const NoChallenger = ({ text }: NoChallengerProps) => {
    return (
        <Container>
            <div>아직 {text} 챌린저가 없어요!</div>
            <img src={medal} alt="no-challenger-medal" />
        </Container>
    );
};

export default NoChallenger;

const Container = styled.div`
    ${tw`
        w-full h-[415px] flex flex-col gap-[4px] items-center justify-center
    `}
    div {
        ${tw`
            text-medium-20 font-medium text-fontColor2
        `}
    }
    img {
        ${tw`
            opacity-[63%]
        `}
    }
`;
