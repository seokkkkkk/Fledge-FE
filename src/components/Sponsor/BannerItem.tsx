import React from "react";
import tw from "twin.macro";
import { styled, keyframes } from "styled-components";
import PostImg from "../../assets/images/postDummyImg.png";
type SponsorItemProps = {
  remained: number;
  detail: string;
  progressNum: number;
};
function BannerItem(data: SponsorItemProps) {
  return (
    <Card>
      <Image imageUrl={PostImg} />
      <Background />
      <Content remained={1}>
        <span className="d-day-text">D-{data.remained}</span>
        <span className="title-text">{data.detail}</span>
        <div className="progress-wrapper">
          <span className="progress-text">진행률</span>
          <span className="progress-text">{data.progressNum}%</span>
        </div>
        <ProgressBar progress={data.progressNum} />
      </Content>
    </Card>
  );
}

export default BannerItem;

type ImageProps = {
  imageUrl: string;
};
const Card = styled.div`
  ${tw`w-[300px] h-[415px] [border-radius: 16px] flex flex-col overflow-hidden relative `}
  flex: 0 0 auto; // 고정 너비를 유지
`;

const Image = styled.div<ImageProps>`
  ${tw`absolute inset-0 bg-center bg-cover transition-transform duration-300 ease-in-out`}
  background-image: url(${(props) => props.imageUrl});

  ${Card}:hover & {
    transform: scale(1.05);
  }
`;
const Background = styled.div`
  ${tw`absolute inset-0 [border-radius: 16px] flex flex-col`}
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0) 10.44%,
    #000000 120.07%
  );
`;

const Content = styled.div<{ remained: number }>`
  ${tw`flex flex-col mt-64 z-10 w-64 mx-auto `}
  span {
    cursor: default;
  }

  .d-day-text {
    ${tw`font-sans text-bold-36 font-bold`}
    color: ${({ remained }: { remained: number }) => {
      if (remained === 3) return "#FFE9E9";
      if (remained === 2) return "#FFB6B6";
      if (remained === 1) return "#EE5D5D";
      if (remained === 0) return "#F84141";
      return "#FFFFFF"; // default color
    }};
  }

  .title-text {
    ${tw`font-sans text-bold-20 font-bold text-white`}
  }

  .progress-wrapper {
    ${tw`flex flex-row justify-between mt-1.5`}
    .progress-text {
      ${tw`text-medium-15 font-sans font-medium text-white`}
    }
  }
`;

// 애니메이션 정의
const progressAnimation = keyframes`
  from {
    width: 0;
  }
  to {
    width: ${({ progress }: { progress: number }) =>
      progress}%; // 진행률에 맞춰서 너비 설정
  }
`;

const ProgressBar = styled.div<{ progress: number }>`
  ${tw`relative min-w-full h-4 [border-radius: 28px] border-2 border-white mt-1`}

  &::before {
    content: "";
    ${tw`absolute top-0 left-0 h-full bg-white`} // ProgressBar가 채워지는 부분
    width: ${({ progress }) => progress}%; // 진행률에 맞춰서 너비 설정
    border: 2px solid #ffff;
    border-radius: 27px; // 모서리 둥글게
    animation: ${progressAnimation} 1s ease-in-out forwards; // 애니메이션 추가
  }
`;
