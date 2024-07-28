import styled from "styled-components";
import tw from "twin.macro";
import { ReactComponent as TagLineImg } from "../../assets/images/tag_line.svg";

const TagLine = () => {
    return (
        <TagLineContainer>
            <TagLineImg />
        </TagLineContainer>
    );
};

const TagLineContainer = styled.div`
    ${tw`
        w-[1280px]
        h-[219px]
        mt-[134px]
        flex
        items-center
    `}
`;

export default TagLine;
