import styled from "styled-components";
import tw from "twin.macro";
import InformationImg from "../../assets/images/information.png";

interface InfoItemProps {
    title: string;
    date: string;
    type: string;
    state: string;
}

const InfoItem = ({ title, date, type, state }: InfoItemProps) => {
    return (
        <InfoContainer>
            <Image src={InformationImg} alt="information" />
            <div>
                <InfoDateSection>
                    <InfoDate>{date}</InfoDate>
                    <InfoState>{state}</InfoState>
                </InfoDateSection>
                <InfoContent>
                    <InfoType>{type}</InfoType>
                    <InfoTitle>{title}</InfoTitle>
                </InfoContent>
            </div>
        </InfoContainer>
    );
};

export default InfoItem;

const Image = styled.img`
    ${tw`
        h-[339px]
        rounded-[16px]
        object-cover
    `}
`;

const InfoContainer = styled.div`
    ${tw`
        flex
        flex-col
        gap-[24px]
        w-[301px]
    `}
`;

const InfoDateSection = styled.div`
    ${tw`
        flex
        items-center
        justify-between
    `}
`;

const InfoDate = styled.div`
    ${tw`
        text-medium-15
        font-medium
        text-[white]
        bg-mainColor
        p-[2px 10px]
        rounded-[28px]
    `}
`;

const InfoState = styled.span`
    ${tw`
        text-medium-15
        font-medium
        text-mainColor
    `}
`;

const InfoContent = styled.div`
    ${tw`
        flex
        flex-col
        gap-[6px]
        mt-[11px]
    `}
`;

const InfoType = styled.span`
    ${tw`
        text-bold-20
        font-bold
        text-subColor
    `}
`;

const InfoTitle = styled.span`
    ${tw`
        text-bold-20
        font-bold
        break-keep
    `}
`;
