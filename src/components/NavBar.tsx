import styled from "styled-components";
import { ReactComponent as Logo } from "../assets/images/fledge.svg";
import tw from "twin.macro";
import { useState } from "react";
import LoginContainer from "./Common/NavBar/LoginContainer";
import UserContainer from "./Common/NavBar/UserContainer";
import Profile from "../assets/images/profile.png";
import { useNavigate } from "react-router-dom";
const NavBar = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  return (
    <Container>
      <MenuContainer>
        <Logo onClick={() => navigate("/")} />
        <MenuItem onClick={() => navigate("/sponsor")}>후원하기</MenuItem>
        <MenuItem>챌린지</MenuItem>
        <MenuItem>멘토링</MenuItem>
        <MenuItem>정보공유</MenuItem>
        <MenuItem>소개</MenuItem>
      </MenuContainer>
      {isLogin ? (
        <UserContainer nickname="카트값줘체리" profile={Profile} />
      ) : (
        <LoginContainer />
      )}
    </Container>
  );
};

export default NavBar;

const Container = styled.div`
  ${tw`
        flex
        justify-between
        w-[1280px]
        h-[85px]
    `}
`;

const MenuContainer = styled.div`
  ${tw`
        flex
        justify-center
        items-center
        gap-[15px]
    `}
`;

const MenuItem = styled.div`
  ${tw`
        text-bold-20
        font-bold
        text-center
        text-fontColor1
        w-[85px]
        cursor-pointer
        font-sans
    `}
`;
