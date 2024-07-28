import React, { useCallback, useState } from "react";
import tw from "twin.macro";
import styled from "styled-components";
import BannerItem from "./BannerItem";
import LeftArrowIcon from "../../assets/icons/left-arrow";
import RightArrowIcon from "../../assets/icons/right-arrow";

function Slider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const DummyData = [
    { remained: 4, detail: "핸드폰 수리비가 부족해요.", progressNum: 80 },
    { remained: 3, detail: "핸드폰 수리비가 부족해요.", progressNum: 50 },
    { remained: 2, detail: "핸드폰 수리비가 부족해요.", progressNum: 10 },
    { remained: 1, detail: "핸드폰 수리비가 부족해요.", progressNum: 40 },
    { remained: 3, detail: "핸드폰 수리비가 부족해요.", progressNum: 50 },
    { remained: 2, detail: "핸드폰 수리비가 부족해요.", progressNum: 10 },
    { remained: 1, detail: "핸드폰 수리비가 부족해요.", progressNum: 40 },
    { remained: 3, detail: "핸드폰 수리비가 부족해요.", progressNum: 50 },
    { remained: 3, detail: "핸드폰 수리비가 부족해요.", progressNum: 50 },
    { remained: 2, detail: "핸드폰 수리비가 부족해요.", progressNum: 10 },
    { remained: 1, detail: "핸드폰 수리비가 부족해요.", progressNum: 40 },
    { remained: 3, detail: "핸드폰 수리비가 부족해요.", progressNum: 50 },
  ];

  const bannerCount = DummyData.length; // 배너의 총 개수
  const itemsToShow = 4; // 한 번에 보여줄 배너 수

  // 전체 아이템을 페이지 단위로 나누기
  const totalPages = Math.ceil(bannerCount / itemsToShow);
  const handlePrevClick = useCallback(() => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - itemsToShow, 0));
  }, []);

  const handleNextClick = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      Math.min(prevIndex + itemsToShow, (totalPages - 1) * itemsToShow)
    );
  }, [totalPages]);

  return (
    <Wrapper>
      <Button onClick={handlePrevClick} disabled={currentIndex === 0}>
        <LeftArrowIcon width={25} height={51} />
      </Button>
      <SliderContainer>
        <ItemBox
          style={{
            transform: `translateX(-${(300 + 20) * currentIndex}px)`,
          }}
        >
          {DummyData.map((data, index) => (
            <BannerItem
              key={index}
              remained={data.remained}
              progressNum={data.progressNum}
              detail={data.detail}
            />
          ))}
        </ItemBox>
      </SliderContainer>
      <Button
        onClick={handleNextClick}
        disabled={currentIndex >= (totalPages - 1) * itemsToShow}
      >
        <RightArrowIcon width={25} height={51} />
      </Button>
    </Wrapper>
  );
}

export default Slider;

const Wrapper = styled.div`
  ${tw`w-[1412px] flex flex-row items-center justify-between mt-12`}
`;

const SliderContainer = styled.div`
  ${tw`w-[1280px] overflow-hidden`}
`;

const ItemBox = styled.div`
  ${tw`flex items-center transition-transform duration-300`}
  gap: 20px;
`;

const Button = styled.button`
  &:disabled {
    ${tw`opacity-50 cursor-default`}
  }
`;
