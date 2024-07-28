import NavBar from "../components/NavBar";
import styled from "styled-components";
import tw from "twin.macro";
import Banner from "../components/Main/Banner";
import TagLine from "../components/Main/TagLine";
import MentoringSection from "../components/Main/MentoringSection";
import DonationSection from "../components/Main/DonationSection";
import Footer from "../components/Common/Footer";
import ChallengeSection from "../components/Main/ChallengeSection";
import InformationSection from "../components/Main/InformationSection";
import Button from "../components/Common/Button";
import Bird from "../assets/images/bird.png";

function Main() {
    return (
        <MainContainer>
            <NavBar />
            <TagLine />
            <Banner />
            <ContentsContainer>
                <DonationSection />
                <ChallengeSection />
                <MentoringSection />
                <InformationSection />
                <FledgeContainer>
                    <Title>fledge 플리지에게 흥미가 생기셨나요?</Title>
                    <Button title="fledge가 뭐에요?" />
                    <img src={Bird} alt="bird" />
                </FledgeContainer>
            </ContentsContainer>
            <Footer />
        </MainContainer>
    );
}

const FledgeContainer = styled.div`
    ${tw`
        flex
        flex-col
        items-center
        gap-[41px]
        mb-[184px]
    `}
`;

const Title = styled.span`
    ${tw`
        text-bold-64
        font-bold
        text-fontColor1
    `}
`;

const MainContainer = styled.div`
    ${tw`
        flex
        flex-col
        items-center
        font-sans
        bg-background
    `}
`;

const ContentsContainer = styled.div`
    ${tw`
        flex
        flex-col
        items-center
        w-[1280px]
        mt-[142px]
        gap-[288px]
    `}
`;

export default Main;
