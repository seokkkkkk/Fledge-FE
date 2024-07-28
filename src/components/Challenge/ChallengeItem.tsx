import styled, { css } from "styled-components";
import tw from "twin.macro";
import BubbleHot from "../../assets/images/bubble-hot.png";
import BubbleNew from "../../assets/images/bubble-new.png";
import BubblePartnership from "../../assets/images/bubble-partnership.png";
import BubbleOrganization from "../../assets/images/bubble-organization.png";
import ProgressBar from "../Common/ProgressBar";
import Heart from "../Common/Heart";
import Benefit, { BenefitProps } from "./Benefit";

interface ChallengeItemProps {
    title: string;
    bubbleType: string;
    heartCount: number;
    challengeTypes: string[];
    description: string;
    successRate: number;
    participants: number;
}

const ChallengeItem = ({
    title,
    bubbleType,
    heartCount,
    challengeTypes,
    description,
    successRate,
    participants,
}: ChallengeItemProps) => {
    const BubbleType = bubbleType === "hot" ? BubbleHot : BubbleNew;

    return (
        <Container>
            <Bubble src={BubbleType} alt="bubble-hot" />
            <Background>
                <div>
                    <ChallengeHeader>
                        <Title>{title}</Title>
                        <Heart heartCount={heartCount} />
                    </ChallengeHeader>
                    <ChallengeTypeList>
                        {challengeTypes.map((type, index) => (
                            <ChallengeType key={index}>{type}</ChallengeType>
                        ))}
                    </ChallengeTypeList>
                    <ChallengeDescription>{description}</ChallengeDescription>
                </div>
                <ChallengeParticipants>
                    <ParticipantText>
                        <span>{successRate}% 성공!</span>
                        <span>{participants}명 참여</span>
                    </ParticipantText>
                    <ProgressBar rate={successRate} />
                </ChallengeParticipants>
            </Background>
        </Container>
    );
};

interface ChallengeLargeItemProps {
    title: string;
    bubbleType: string;
    partnerImages?: string[];
    heartCount: number;
    challengeTypes: string[];
    description: string;
    successRate: number;
    participants: number;
    benefits?: BenefitProps[];
    date: string;
}

const ChallengeItemLarge = ({
    title,
    bubbleType,
    partnerImages,
    heartCount,
    challengeTypes,
    description,
    successRate,
    participants,
    benefits,
    date,
}: ChallengeLargeItemProps) => {
    const BubbleType =
        bubbleType === "partnership" ? BubblePartnership : BubbleOrganization;
    const hasPartners = !!(partnerImages && partnerImages.length > 0);

    return (
        <Container>
            <Bubble src={BubbleType} alt="bubble-hot" />
            <BackgroundLarge>
                <div>
                    <PartnerContainer hasPartners={hasPartners}>
                        {partnerImages?.map((image, index) => (
                            <PartnerImage
                                key={index}
                                src={image}
                                alt="partner"
                            />
                        ))}
                        <Heart heartCount={heartCount} />
                    </PartnerContainer>
                    <ChallengeHeader>
                        <Title>{title}</Title>
                    </ChallengeHeader>
                    <ChallengeTypeList>
                        {challengeTypes.map((type, index) => (
                            <ChallengeType key={index}>{type}</ChallengeType>
                        ))}
                    </ChallengeTypeList>
                </div>
                <BodyContainer>
                    <LeftSection>
                        <ChallengeDescriptionLarge>
                            {description}
                        </ChallengeDescriptionLarge>
                        <ChallengeParticipants>
                            <ParticipantText>
                                <span>{successRate}% 성공!</span>
                                <span>{participants}명 참여</span>
                            </ParticipantText>
                            <ProgressBar rate={successRate} />
                        </ChallengeParticipants>
                    </LeftSection>
                    <RightSection>
                        <BenefitList>
                            {benefits?.map((benefit, index) => (
                                <Benefit
                                    key={index}
                                    title={benefit.title}
                                    price={benefit.price}
                                />
                            ))}
                        </BenefitList>
                        <Date>{date}</Date>
                    </RightSection>
                </BodyContainer>
            </BackgroundLarge>
        </Container>
    );
};

export { ChallengeItem, ChallengeItemLarge };

const ChallengeTypeList = styled.div`
    ${tw`
        flex
        gap-[4px]
        mt-[4px]
    `}
`;

const ChallengeHeader = styled.div`
    ${tw`
        flex
        justify-between
    `}
`;

const ChallengeDescription = styled.div`
    ${tw`
        text-medium-15
        font-medium
        text-fontColor2
        break-keep
        mt-[9px]
    `}
`;

const ChallengeDescriptionLarge = styled(ChallengeDescription)`
    ${tw`
        mt-[0]
    `}
`;

const ChallengeParticipants = styled.div`
    ${tw`
        flex
        flex-col
        gap-[5px]
    `}
`;

const ParticipantText = styled.div`
    ${tw`
        flex
        justify-between
        text-medium-15
        font-medium
        text-fontColor3
    `}
`;

const Title = styled.span`
    ${tw`
        text-bold-24
        font-bold
        text-fontColor1
    `}
`;

const ChallengeType = styled.div`
    ${tw`
        text-medium-15
        font-bold
        text-[white]
        bg-mainColor
        rounded-[28px]
        p-[3px 7px]
    `}
`;

const Container = styled.div`
    ${tw`
        flex
        flex-col
        items-end
        gap-[6px]
    `}
`;

const Bubble = styled.img``;

const Background = styled.div`
    ${tw`
        bg-[white]
        p-[20px]
        h-[216px]
        w-[301px]
        rounded-[16px]
        flex
        flex-col
        justify-between
    `}
`;

const BackgroundLarge = styled(Background)`
    ${tw`
        w-[625px]
        h-[274px]
    `}
`;

const BodyContainer = styled.div`
    ${tw`
        flex
        gap-[24px]
        h-[100%]
        mt-[10px]
    `}
`;

const LeftSection = styled.div`
    ${tw`
        flex
        flex-col
        gap-[9px]
        justify-between
        w-[50%]
    `}
`;

const RightSection = styled.div`
    ${tw`
        flex
        flex-col
        justify-between
        w-[50%]
    `}
`;

const BenefitList = styled.div`
    ${tw`
        flex
        flex-col
        text-medium-15
        text-fontColor1
        font-medium
    `}
`;

const Date = styled.span`
    ${tw`
        text-medium-15
        text-fontColor3
        font-medium
    `}
`;

const PartnerContainer = styled.div<{ hasPartners: boolean }>`
    ${tw`
        flex
        h-[65px]
        w-full
        justify-between
        items-center
    `}
    ${({ hasPartners }) =>
        !hasPartners &&
        css`
            justify-content: flex-end;
        `}
`;

const PartnerImage = styled.img`
    ${tw`
        w-[240px]
    `}
`;
