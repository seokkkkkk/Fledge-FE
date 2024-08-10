import styled from "styled-components";
import tw from "twin.macro";
import triangle from "../../../assets/images/triangle.png";
import KakaoIcon from "../../../assets/icons/kakao-icon";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../../storage/useAuthStore";

type ProfileMenuProps = {
  onLogout: () => void;
};

const ProfileMenu = ({ onLogout }: ProfileMenuProps) => {
    const navigate = useNavigate();
    const { userData } = useAuthStore();

    return (
        <Container>
            <div className="menu">
                <img src={triangle} alt="triangle" className="triangle" />
                <div>로그인한 카카오 계정</div>
                <div className="kakao">
                    <KakaoIcon />
                    <p>{userData.email}</p>
                </div>
                <hr />
                <div className="notification">
                    <button>알림</button>
                    <div className="number">1</div>
                </div>
                <button
                    onClick={() => {
                        navigate("/mypage");
                    }}
                >
                    마이페이지
                </button>
                <button>내가 등록한 후원 게시물</button>
                <button>내가 참여한 챌린지</button>
                <button>멘토링 채팅</button>
                <hr />
                <button className="sub-text" onClick={onLogout}>
                    로그아웃
                </button>
            </div>
        </Container>
    );
};

export default ProfileMenu;

const Container = styled.div`
  ${tw`
        absolute top-[65px] left-[-131px]
        flex flex-col items-center z-[10]
    `}
    .menu {
        ${tw`
            absolute left-[-125px]
            w-[342px]
            bg-white
            rounded-[16px]
            p-[29px 30px]
            flex flex-col gap-[19px] items-start
            text-bold-20 font-bold text-fontColor3
        `}
    .sub-text {
      ${tw`
                text-fontColor2
            `}
    }
    .kakao {
      ${tw`
                flex items-center justify-center gap-[10px]
                bg-[#FAE100] rounded-[28px] p-[6px 12px]
                text-fontColor1 text-medium-15 font-medium
            `}
    }
    hr {
      ${tw`
                w-full
                border-[1px] border-fontColor2
            `}
    }
    .triangle {
        ${tw`
            absolute top-[-15px] right-[30px]
            transform rotate-180
        `}
  }
  .notification {
    ${tw`
            flex items-center justify-between w-full
        `}
    .number {
      ${tw`
                bg-[#EE5D5D] rounded-full
                text-bold-10 font-bold text-white
                p-[3px 6px]
            `}
    }
  }
`;
