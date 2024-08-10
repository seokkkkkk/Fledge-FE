import React, { useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import DefaultProfile from "../../assets/images/profile.png";

import Badge1 from "../../assets/images/badges/badge_knowledge_1.png";
import Badge2 from "../../assets/images/badges/badge_employment_1.png";
import Badge3 from "../../assets/images/badges/badge_health_1.png";
import Badge4 from "../../assets/images/badges/badge_finance_1.png";
import Badge5 from "../../assets/images/badges/badge_mindcontrol_1.png";
import Badge from "../MyPage/Badge";
import Polygon from "../../assets/icons/polygon";

import NoImg from "../../assets/images/no_img.png";
function CanaryModal({
  onClose,
  nickname,
}: {
  onClose: () => void;
  nickname: string;
}) {
  //호버 된 아이템 인덱스를 담을 state
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const Badges = [
    {
      category: ["자기계발", "지식"],
      title: "한 달에 한 권 독서하기",
      date: "2024년 01월 01일 달성",
      image: Badge1,
    },
    {
      category: ["취엄"],
      title: "취업박람회 방문하기",
      date: "2024년 01월 01일 달성",
      image: Badge2,
    },
    {
      category: ["건강"],
      title: "매일 아침 러닝",
      date: "2024년 01월 01일 달성",
      image: Badge3,
    },
    {
      category: ["재정관리", "금융"],
      title: "예적금 들기",
      date: "2024년 01월 01일 달성",
      image: Badge4,
    },
    {
      category: ["마인드컨트롤"],
      title: "멘토링 받기",
      date: "2024년 01월 01일 달성",
      image: Badge5,
    },
  ];

  const histories = [
    { title: "핸드폰 수리비가 부족해요.", price: 20000 },
    { title: "핸드폰 수리비가 부족해요.", price: 20000 },
    { title: "핸드폰 수리비가 부족해요.", price: 20000 },
    { title: "핸드폰 수리비가 부족해요.", price: 20000 },
  ];
  return (
    <Overlay onClick={onClose}>
      <Wrapper>
        <RowBox className="justify-between">
          <ColBox className="w-[298px]">
            <img
              src={DefaultProfile}
              className="profile-img"
              alt="프로필 이미지"
            />
            <span className="nickname">{nickname}</span>
            <RowBox className="mt-4">
              <span className="bold-span">후원 인증률 100% </span>
              <span className="medium-span"> 6/6 인증</span>
            </RowBox>
            <span className="my-intro">
              안녕하세요! UIUX디자이너가 되기 위해 준비하는 카드값줘체리입니다.
              동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세
              무궁화 삼천리 화려강산 대한 사람 대한으로 길이 보전하세 ... ...
            </span>
          </ColBox>
          <ColBox className="w-[620px] ml-5">
            <label className="medium-span">최근 획득한 뱃지</label>
            <RowBox className="w-full my-4 justify-between">
              {Badges.map((badge, index) => (
                <BadgeContainer
                  key={index}
                  onMouseEnter={() => setHoverIndex(index)}
                  onMouseLeave={() => setHoverIndex(null)}
                >
                  <img src={badge.image} alt="badge1" width={100} />
                  {hoverIndex === index && (
                    <HoverContainer>
                      <div className="flex flex-col items-center">
                        <HoverBox>
                          <div className="category">
                            {badge.category.map((item, index) => (
                              <span key={index} className="category-text">
                                {item}
                              </span>
                            ))}
                          </div>
                          <span className="title-text">{badge.title}</span>
                          <span className="sub-text">{badge.date}</span>
                        </HoverBox>
                        <Polygon width={36} height={36} color="#FFFFFF" />
                      </div>
                    </HoverContainer>
                  )}
                </BadgeContainer>
              ))}
            </RowBox>
            <label className="medium-span">최근 후원인증 히스토리 </label>
            <RowBox className="w-full my-4 justify-between">
              {histories.map((history, index) => (
                <Card>
                  <Image imageUrl={NoImg} />
                  <Background />
                  <Content>
                    <span className="bold-15">{history.title}</span>

                    <span className="medium-15">{history.price}원</span>
                  </Content>
                </Card>
              ))}
            </RowBox>
          </ColBox>
        </RowBox>
      </Wrapper>
    </Overlay>
  );
}

export default CanaryModal;
const Overlay = styled.div`
  ${tw`
        w-full h-full bg-[black] bg-opacity-50 
        fixed top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%]
        flex justify-center items-center
        z-[2]
    `}
`;
const Wrapper = styled.div`
  ${tw`w-[1109px] h-[581px] [border-radius: 16px] bg-background flex flex-col m-auto items-center justify-center font-sans p-14`}

  .profile-img {
    ${tw`w-[85px] h-[85px] rounded-full mb-7`}
  }
  .nickname {
    ${tw`font-bold font-sans text-bold-36 text-fontColor1`}
  }
  .bold-span {
    ${tw`font-bold font-sans text-bold-20 text-fontColor3`}
  }
  .medium-span {
    ${tw`font-medium font-sans text-medium-20 text-fontColor3 ml-1`}
  }
  .my-intro {
    ${tw`font-medium text-medium-20 text-fontColor1 mt-10`}
  }
`;

const BadgeContainer = styled.div`
  ${tw`relative flex items-center`}
`;

const HoverContainer = styled.div`
  ${tw`absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2`}
`;

const HoverBox = styled.div`

        ${tw`
            w-[165px] flex flex-col items-center justify-center h-full p-[11px] bg-white rounded-[16px] mb-[-10px]
        `}
        .category {
            ${tw`
                flex gap-[4px]
            `}
            span {
                ${tw`
                    text-medium-15 font-medium text-white bg-mainColor px-[8px] py-[4px] rounded-[28px]
                `}
            }
        }
        .title-text {
            ${tw`
                text-bold-20 font-bold text-fontColor1 text-center 
            `}
        }
        .sub-text {
            ${tw`
                text-medium-12 font-medium text-fontColor3
            `}
        }
    }
`;

const ColBox = styled.div`
  ${tw`flex flex-col`}
`;
const RowBox = styled.div`
  ${tw`flex flex-row`}
`;

type ImageProps = {
  imageUrl: string;
};
const Card = styled.div`
  ${tw`w-[141px] h-[195px] [border-radius: 16px] flex flex-col overflow-hidden relative cursor-pointer `}
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
  background: linear-gradient(180deg, rgba(255, 255, 255, 0) 10.44%, rgba(0, 0, 0, 0.5) 120.07%);
`;

const Content = styled.div`
  ${tw`flex flex-col mt-[140px] z-10 w-11/12 mx-auto `}
  .bold-15 {
    ${tw`font-bold font-sans text-[15px] text-white`}
    white-space: nowrap; // Prevents the text from wrapping to a new line
    overflow: hidden; // Hides any overflow text
    text-overflow: ellipsis; // Adds an ellipsis (...) if the text overflows
  }
  .medium-15 {
    ${tw`font-medium font-sans text-[15px] text-white`}
  }
`;
