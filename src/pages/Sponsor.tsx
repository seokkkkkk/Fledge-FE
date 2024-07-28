import React from "react";

import Sponsorship from "../assets/images/sponsership.png";
import Slider from "../components/Sponsor/Slider";
import NavBar from "../components/NavBar";
import AllPostSection from "../components/Sponsor/AllPostSection";
import styled from "styled-components";
import tw from "twin.macro";
function Sponsor() {
  return (
    <Wrapper>
      <NavBar />

      {/* 헤더 */}
      <Header>
        <div className="text-wrapper">
          <span className="title-text">후원하기</span>
          <span className="description-text">
            자립준비청년에게는 아직 선배들의 도움이 필요합니다. 작은 보탬을 통해
            청년들의 지속 가능한 자립을 응원해주세요.
          </span>
        </div>
        <div className="image-background">
          <img src={Sponsorship} alt="후원이미지" />
        </div>
      </Header>

      {/* 기한 임박 후원글 목록 */}
      <ContentWrapper>
        <span className="main-text">기한 임박 후원글</span>
        <span className="sub-text">
          곧 후원 기간이 끝나는 후원글이에요! 청년들에게 도움의 손길을
          건네주세요.
        </span>
      </ContentWrapper>
      <Slider />

      {/* 모든 후원글 목록 */}
      <ContentWrapper>
        <span className="main-text">후원글 목록</span>
        <span className="sub-text">
          당신의 작은 도움이 자립준비청년들의 큰 가능성을 열어갑니다.
        </span>
      </ContentWrapper>
      <AllPostSection />
    </Wrapper>
  );
}

export default Sponsor;

const Wrapper = styled.div`
  ${tw`max-w-[1412px] flex flex-col m-auto items-center`}
`;

const Header = styled.div`
  ${tw`flex flex-row mt-20 h-[528px] w-[1280px] m-auto justify-between`}

  .text-wrapper {
    ${tw`flex flex-col w-1/2 mt-36`}
    .title-text {
      ${tw`text-bold-48 font-sans text-fontColor1 font-bold mb-5`}
    }
    .description-text {
      ${tw`text-medium-20 text-fontColor3 font-sans w-[498px] font-medium `}
    }
  }
  .image-background {
    width: 50%;
    height: 528px;
    background: radial-gradient(50% 50% at 50% 50%, #ffd7c0 0%, #faf8f5 100%);
  }
`;

const ContentWrapper = styled.div`
  ${tw`flex flex-col mt-24 w-[1280px] m-auto`}
  .main-text {
    ${tw`text-bold-36 font-sans font-bold text-fontColor1`}
  }
  .sub-text {
    ${tw`text-medium-20 font-sans font-medium text-fontColor3 mt-1`}
  }
`;
