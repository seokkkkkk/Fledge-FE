import styled from "styled-components";
import tw from "twin.macro";
import ContentHeader from "../Common/ContentHeader";
import MentorApply from "../Common/MentorApply";

const MentoringSection = () => {
    return (
        <Contents>
            <ContentHeader
                title="멘토링"
                desc="누구나 멘토가 되어 청년들의 궁금증을 해결해줄 수 있어요! 멘토와의 익명 채팅을 통해 편하게 궁금증을 해결해요."
            />
            <MentorApply />
        </Contents>
    );
};

const Contents = styled.div`
    ${tw`
        flex
        flex-col
        w-full
        relative
    `}
`;

export default MentoringSection;
