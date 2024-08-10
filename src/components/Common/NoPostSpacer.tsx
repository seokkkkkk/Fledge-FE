import styled from "styled-components";
import tw from "twin.macro";
import NoBanner from "../../assets/images/no_banner.png";

const NoPostSpacer = () => {
    return (
        <NoPostWrapper>
            <span>등록된 게시물이 없어요.</span>
            <img src={NoBanner} alt="x-이미지" width={200} />
        </NoPostWrapper>
    );
};

export default NoPostSpacer;

const NoPostWrapper = styled.div`
    ${tw`w-[1280px] h-[415px] my-5 [border-radius: 16px] flex flex-col items-center justify-center bg-white`}
    span {
        ${tw`font-sans font-medium text-medium-20 text-fontColor2`}
    }
`;
