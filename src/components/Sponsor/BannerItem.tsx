import React from "react";
import tw from "twin.macro";
import { styled, keyframes } from "styled-components";
import NoImg from "../../assets/images/no_img.png";
import { SponsorBannerData } from "../../@types/sponsor";
import { useNavigate } from "react-router-dom";

function BannerItem({
    supportId,
    supportPostImageUrl,
    leftDays,
    title,
    supportRecord,
    banner,
}: SponsorBannerData) {
    const navigate = useNavigate();
    return (
        <Card
            onClick={() => {
                navigate(`/sponsor-detail/${supportId}`);
                window.scrollTo(0, 0);
            }}
            banner={banner}
        >
            <Image
                imageUrl={supportPostImageUrl ? supportPostImageUrl : NoImg}
            />
            <Background />
            {banner && <div className="banner"> {banner}</div>}
            <Content remained={leftDays}>
                <span className="d-day-text">
                    {Number(leftDays) < 0 ? "후원 기간 만료" : `D-${leftDays}`}
                </span>
                <span className="title-text">
                    <p>{title}</p>
                </span>
                <div className="progress-wrapper">
                    <span className="progress-text">
                        진행률 {supportRecord.progress}%
                    </span>
                    <span className="progress-text">
                        {supportRecord.totalPrice}원
                    </span>
                </div>
                <ProgressBar progress={supportRecord.progress} />
            </Content>
        </Card>
    );
}

export default BannerItem;

type ImageProps = {
  imageUrl: string;
};

type CardProps = {
    banner?: string;
};
const Card = styled.div<CardProps>`
    ${tw`w-[300px] h-[415px] [border-radius: 16px] flex flex-col overflow-hidden relative cursor-pointer`}
    flex: 0 0 auto; // 고정 너비를 유지

    .banner {
        ${tw`absolute top-0 right-0 m-[21px] p-[8px 12px] rounded-full text-white font-bold text-bold-15`}

        ${({ banner }) => {
            if (banner === "인증하기") return tw`bg-subColor`;
            if (banner === "진행중") return tw`bg-mainColor`;
            if (banner === "인증완료") return tw`bg-fontColor2`;
            if (banner === "인증실패") return tw`bg-[#EE5D5D]`;
            return tw`bg-white`;
        }}
    }
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
    background: linear-gradient(180deg, rgba(255, 255, 255, 0) 10.44%, rgba(0, 0, 0, 0.5) 120.07%);
`;

const Content = styled.div<{ remained: string }>`
  ${tw`flex flex-col mt-64 z-10 w-64 mx-auto `}
  span {
    cursor: default;
  }

  .d-day-text {
    ${tw`font-sans text-bold-36 font-bold`}
    color: ${({ remained }: { remained: string }) => {
      if (remained === "3") return "#FFE9E9";
      if (remained === "2") return "#FFB6B6";
      if (remained === "1") return "#EE5D5D";
      if (remained === "0") return "#F84141";
      return "#FFFFFF"; // default color
    }};
  }

  .title-text {
    ${tw`font-sans text-bold-20 font-bold text-white`}
    white-space: nowrap; // Prevents the text from wrapping to a new line
    overflow: hidden; // Hides any overflow text
    text-overflow: ellipsis; // Adds an ellipsis (...) if the text overflows
  }

  .progress-wrapper {
    ${tw`flex flex-row justify-between mt-3`}
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
