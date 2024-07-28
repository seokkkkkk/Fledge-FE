import styled from "styled-components";
import tw from "twin.macro";
import Slogan from "./Footer/Slogan";
import Menu from "./Footer/Menu";

const Footer = () => {
    const menus = [
        {
            title: "후원하기",
            items: ["기간 임박 후원글", "후원글 목록"],
        },
        {
            title: "챌린지",
            items: [
                "베스트 챌린저",
                "인기 있는 챌린지",
                "신규 챌린지",
                "카테고리별 모아보기",
            ],
        },
        {
            title: "멘토링",
            items: [
                "HOT했던 질문들",
                "멘토 신청하기",
                "멘토 살펴보기",
                "멘티 도움 요청",
                "내가 참여한 채팅방",
            ],
        },
        {
            title: "정보공유",
            items: ["자립 지원 정보", "교육 영상"],
        },
        {
            title: "소개",
            items: ["fledge가 뭐에요?", "fledge 이용 가이드"],
        },
    ];
    return (
        <Container>
            <ContentsContainer>
                <Slogan />
                <MenuContainer>
                    {menus.map((menu, index) => (
                        <Menu
                            key={index}
                            title={menu.title}
                            items={menu.items}
                        />
                    ))}
                </MenuContainer>
            </ContentsContainer>
        </Container>
    );
};
export default Footer;

const MenuContainer = styled.div`
    ${tw`
        flex
        gap-[81px]
    `}
`;

const Container = styled.footer`
    ${tw`
       w-full
       h-[477px]
       font-sans
       bg-[#c1af81]
       flex
        justify-center
        items-start
        pt-[41.1px]
    `}
`;

const ContentsContainer = styled.div`
    ${tw`
        flex
        justify-between
        w-[1280px]
        items-center
    `}
`;
