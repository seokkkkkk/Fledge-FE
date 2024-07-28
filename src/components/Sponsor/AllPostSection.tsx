import React, { useState } from "react";
import Filter from "./Filter";
import Search from "./Search";
import styled from "styled-components";
import tw from "twin.macro";
import SortOption from "./SortOption";
import BannerItem from "./BannerItem";
import LeftArrowIcon from "../../assets/icons/left-arrow";
import RightArrowIcon from "../../assets/icons/right-arrow";

function AllPostSection() {
  const [currentPage, setCurrentPage] = useState<number>(1);
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
  ];

  const totalPages = 3;

  return (
    <Wrapper>
      <div className="flex flex-row justify-between items-center w-full mt-7">
        {/* 검색창 */}
        <Search />
        {/* 게시물 등록 버튼 */}
        <AddButton>후원 게시물 등록</AddButton>
      </div>

      <div className="flex flex-row justify-between w-full mt-14">
        {/* 필터링 */}
        <Filter />
        <div className="flex flex-col w-3/4  items-end">
          <SortOption />
          <span className="font-sans font-medium text-fontColor3 text-bold-20 mt-3">
            13개의 진행 중인 후원 목록이 있어요
          </span>
          <ItemBox>
            {DummyData.map((data, index) => (
              <BannerItem
                key={index}
                remained={data.remained}
                progressNum={data.progressNum}
                detail={data.detail}
              />
            ))}
          </ItemBox>
          <Pagination>
            <ArrowButton
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <LeftArrowIcon width={12} height={15} />
            </ArrowButton>
            {Array.from({ length: totalPages }, (_, index) => (
              <PageNumber
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                active={currentPage === index + 1}
              >
                {index + 1}
              </PageNumber>
            ))}
            <ArrowButton
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <RightArrowIcon width={12} height={15} />
            </ArrowButton>
          </Pagination>
        </div>
      </div>
    </Wrapper>
  );
}

export default AllPostSection;

const Wrapper = styled.div`
  ${tw`w-full max-w-[1280px]`}
`;
const AddButton = styled.button`
  ${tw`w-52 h-12 bg-subColor font-sans text-bold-24 text-white [border-radius: 37px]`}
`;
const ItemBox = styled.div`
  ${tw`grid grid-cols-3 gap-4 mt-4`}
`;

const Pagination = styled.div`
  ${tw`flex mt-32 items-center justify-center mx-auto`}
`;

const PageNumber = styled.div<{ active: boolean }>`
  ${tw`w-8 h-8 font-sans text-medium-15 font-medium flex items-center justify-center cursor-pointer mx-1 rounded-full`}
  ${({ active }) => active && tw`bg-mainColor text-white`}
  ${({ active }) => !active && tw`text-mainColor`}
  ${({ active }) =>
    active
      ? `background: #EEC65D; color: #FAF8F5;`
      : `background: rgba(250, 248, 245, 0.3); color: #EEC65D; border: 2px solid #EEC65D;`}
`;

const ArrowButton = styled.button`
  ${tw`flex items-center justify-center cursor-pointer mx-1 rounded-full`}
  &:disabled {
    ${tw`opacity-70 cursor-default`}
  }
`;
