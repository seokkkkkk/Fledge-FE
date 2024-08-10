import React from "react";
import styled from "styled-components";
import tw from "twin.macro";

import { useNavigate } from "react-router-dom";
function CompleteModal() {
  const navigate = useNavigate();
  return (
    <Overlay>
      <Wrapper>
        <span className="bold-36">게시물 등록이 완료되었습니다.</span>
        <Button onClick={() => navigate("/sponsor")}>닫기</Button>
      </Wrapper>
    </Overlay>
  );
}

export default CompleteModal;

const Overlay = styled.div`
  ${tw`
        w-full h-full bg-[black] bg-opacity-50 
        fixed top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%]
        flex justify-center items-center
        z-[2]
    `}
`;

const Wrapper = styled.div`
  ${tw`w-[546px] h-[263px] [border-radius: 16px] bg-background flex flex-col m-auto items-center justify-center font-sans`}

  .bold-36 {
    ${tw`font-bold text-bold-36 text-fontColor1`}
  }
`;

const Button = styled.button`
  ${tw` px-4 py-2 rounded-full font-bold text-bold-20 text-subColor border-2 border-subColor mt-7`}
`;
