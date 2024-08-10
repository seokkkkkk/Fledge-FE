import styled from "styled-components";
import tw from "twin.macro";
import LikeIcon from "../../assets/icons/like-icon";
import { challengeType } from "../../@types/challenge-category";
import { useState } from "react";

type HeaderProps = {
    categories?: string[];
    title: string;
    desc: string;
    likeCount: number;
    isClicked?: boolean;
    onClick?: () => void;
};

const Header = ({
    categories,
    title,
    desc,
    likeCount,
    isClicked,
    onClick,
}: HeaderProps) => {
    const [isLike, setIsLike] = useState(isClicked);
    return (
        <Container>
            <ChallengeInfo>
                {categories?.map((category) => (
                    <div className="category">
                        {challengeType.find((type) => type.id === category)
                            ?.label || category}
                    </div>
                ))}
                <p className="title">{title}</p>
                <p className="desc">{desc}</p>
            </ChallengeInfo>
            <div
                className="like"
                onClick={() => {
                    setIsLike(!isLike);
                }}
            >
                <LikeIcon small={false} fill={isLike} />
                <p
                    onClick={(e) => {
                        e.stopPropagation();
                    }}
                >
                    {likeCount + (isLike ? 1 : 0)}
                </p>
            </div>
        </Container>
    );
};

export default Header;

const Container = styled.div`
    ${tw`
        flex justify-between items-center w-[1280px]
    `}
    .like {
        ${tw`
            flex flex-col items-center gap-[8.84px]
        `}
        svg {
            ${tw`
                cursor-pointer
            `}
        }
    }
    p {
        ${tw`
            text-bold-20 font-bold text-fontColor3
        `}
    }
`;

const ChallengeInfo = styled.div`
    ${tw`
        w-[1280px] flex flex-col items-start
    `}
    .category {
        ${tw`
            text-medium-20 font-medium text-white
            bg-mainColor rounded-[37px] p-[1px 13px]
        `}
    }
    .title {
        ${tw`
           text-bold-64 font-bold mt-[6.5px] text-fontColor1
        `}
    }
    .desc {
        ${tw`
            text-medium-20 font-medium text-fontColor3 mt-[14px]
        `}
    }
`;
