import React, { useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";

import DefaultProfile from "../../assets/images/profile.png";
import { useQuery } from "@tanstack/react-query";
import { getCanaryInfo, getUpdate } from "../../apis/sponsor";
import useAuthStore from "../../storage/useAuthStore";
import DeleteModal from "./DeleteModal";
import DonateModal from "./DonateModal";
import CanaryModal from "./CanaryModal";
import { useNavigate, useParams } from "react-router-dom";
type HeaderProps = {
  memberId: number;
  nickname: string;
};
function Header({ memberId, nickname }: HeaderProps) {
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [isOpenDonate, setIsOpenDonate] = useState(false);
  const [isOpenCanary, setIsOpenCanary] = useState(false);
  const currentUserId = useAuthStore((state) => state.userData.id);
  // const { data, isLoading, error } = useQuery({
  //   queryKey: ["getCanaryInfo"],
  //   queryFn: () => getCanaryInfo(memberId),
  // });
  const navigate = useNavigate();
  const { supportId } = useParams<{ supportId: string }>();
  const accessToken = useAuthStore((state) => state.accessToken);
  // 수정하기 클릭시 함수 호출
  // const handleUpdate = async () => {
  //   const res = await getUpdate(supportId!, accessToken);
  //   if (res.success) {
  //     navigate("/sponsor-register", {
  //       state: { data: res.data, mode: "update" },
  //     });
  //   }
  // };
  return (
    <>
      <Container>
        <RowBox>
          <img
            src={DefaultProfile}
            className="profile-img"
            alt="프로필 이미지"
            onClick={() => setIsOpenCanary(!isOpenCanary)}
          />
          <ColBox className="ml-5">
            <span className="nickname">{nickname}</span>
            <RowBox>
              <span className="bold-span">후원 인증률 100% </span>
              <span className="medium-span"> 6/6 인증</span>
            </RowBox>
          </ColBox>
        </RowBox>
        {memberId !== currentUserId! ? (
          <StyledBtn
            main
            onClick={() =>
              accessToken === ""
                ? alert("로그인 후 이용가능한 기능입니다.")
                : setIsOpenDonate(!isOpenDonate)
            }
          >
            후원하기
          </StyledBtn>
        ) : (
          <>
            {/* // <RowBox className="w-[250px]"> */}
            {/* <StyledBtn main={false} onClick={handleUpdate}>
              수정하기
            </StyledBtn> */}
            <StyledBtn main onClick={() => setIsOpenDelete(!isOpenDelete)}>
              삭제하기
            </StyledBtn>

            {/* // </RowBox> */}
          </>
        )}
      </Container>
      {isOpenDelete && <DeleteModal onClose={() => setIsOpenDelete(false)} />}
      {isOpenDonate && <DonateModal onClose={() => setIsOpenDonate(false)} />}
      {isOpenCanary && (
        <CanaryModal
          onClose={() => setIsOpenCanary(false)}
          nickname={nickname}
        />
      )}
    </>
  );
}

export default Header;
const Container = styled.div`
  ${tw`flex flex-row justify-between w-full items-center mt-28`}
  .profile-img {
    ${tw`w-[85px] h-[85px] rounded-full `}
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
`;

const RowBox = styled.div`
  ${tw`flex flex-row items-center justify-between`}
`;

const ColBox = styled.div`
  ${tw`flex flex-col justify-between`}
`;
const StyledBtn = styled.button<{ main: boolean }>`
  ${tw`h-[46px] px-5 rounded-full font-sans font-bold text-bold-20 `}

  ${({ main }) =>
    main
      ? tw`bg-subColor text-white`
      : tw`bg-none border-2 border-b-subColor text-subColor`}
`;
