import styled from "styled-components";
import tw from "twin.macro";

interface UserContainerProps {
    nickname: string;
    profile?: string;
}

const UserContainer = ({ nickname, profile }: UserContainerProps) => {
    return (
        <Container>
            <div>
                <Nickname>{nickname}</Nickname> 님,
                <span> 환영합니다!</span>
            </div>
            <Profile src={profile} alt="profile" />
        </Container>
    );
};

export default UserContainer;

const Container = styled.div`
    ${tw`
        text-medium-20
        font-medium
        text-fontColor1
        flex
        items-center
        gap-[2px]
    `}
`;

const Profile = styled.img`
    ${tw`
        pl-[20px]
    `}
`;

const Nickname = styled.span`
    ${tw`
        text-bold-20
        font-bold
        text-fontColor1
    `}
`;
