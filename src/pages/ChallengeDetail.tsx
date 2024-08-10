import styled from "styled-components";
import DefaultLayout from "../components/Common/DefaultLayout";
import tw from "twin.macro";
import Header from "../components/ChallengeDetail/Header";
import Progress from "../components/ChallengeDetail/Progress";
import ContentHeader from "../components/Common/ContentHeader";
import Challengers from "../components/ChallengeDetail/Challengers";
import RecommendedChallenges from "../components/ChallengeDetail/RecommendedChallenges";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../components/Common/Button";
import { useQuery } from "@tanstack/react-query";
import { getChallengeDetail, postChallengeApply } from "../apis/challenge";
import { useCallback, useEffect, useState } from "react";
import ApplyModal from "../components/ChallengeDetail/ApplyModal";
import useAuthStore from "../storage/useAuthStore";
import RejectModal from "../components/ChallengeDetail/RejectModal";
import CompleteModal from "../components/ChallengeDetail/CompleteModal";
import Modal from "../components/ChallengeDetail/Modal";
import Certification from "../components/ChallengeDetail/Certification";
import { getCanaryStatus } from "../apis/canary";

const ChallengeDetail = () => {
    const { userData, accessToken } = useAuthStore();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [failModalOpen, setFailModalOpen] = useState(false);
    const [completeModalOpen, setCompleteModalOpen] = useState(false);
    const [cancleModalOpen, setCancleModalOpen] = useState(false);
    const [cancleCompleteModalOpen, setCancleCompleteModalOpen] =
        useState(false);
    const navigate = useNavigate();
    const { challengeId } = useParams();
    const [participating, setParticipating] = useState(false);
    const {
        data: ChallengeDetailData,
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ["getChallengeDetail", challengeId, accessToken],
        queryFn: () => getChallengeDetail(challengeId!, accessToken),
    });
    const { data: isCanary, isLoading: isCanaryLoading } = useQuery({
        queryKey: ["getCanaryStatus", userData.id, accessToken],
        queryFn: () => getCanaryStatus(userData.id!, accessToken!),
    });

    const handleModalOpen = useCallback(() => {
        if (!isCanaryLoading) {
            if (isCanary.data === 2) {
                setIsModalOpen(true);
            } else {
                setFailModalOpen(true);
            }
        }
    }, [userData.role]);

    const handleApply = async () => {
        if (!challengeId || !userData.id || !accessToken) return;
        const res = await postChallengeApply(
            challengeId,
            userData.id,
            accessToken
        );
        if (res && res.success) {
            setParticipating(true);
            setCompleteModalOpen(true);
            setIsModalOpen(false);
            refetch();
        } else {
            setIsModalOpen(false);
        }
    };

    const handleCancleComplete = () => {
        setCancleModalOpen(false);
        setCancleCompleteModalOpen(true);
    };

    useEffect(() => {
        if (ChallengeDetailData) {
            setParticipating(ChallengeDetailData.data.participating);
        }
    }, [ChallengeDetailData]);

    if (isLoading) return <div></div>;

    return (
        <DefaultLayout>
            <Container>
                <Header
                    categories={ChallengeDetailData.data.categories}
                    title={ChallengeDetailData.data.title}
                    desc={ChallengeDetailData.data.description}
                    likeCount={ChallengeDetailData.data.likeCount}
                />
                <Progress
                    totalParticipants={
                        ChallengeDetailData.data.participantCount
                    }
                    successParticipants={ChallengeDetailData.data.successCount}
                    successRate={ChallengeDetailData.data.successRate}
                />
                <Challengers
                    challengeId={challengeId}
                    participating={participating}
                    onClick={handleModalOpen}
                    onCancle={() => setCancleModalOpen(true)}
                />
                {participating && (
                    <Certification
                        title={ChallengeDetailData.data.title}
                        challengeId={challengeId!}
                    />
                )}
                <OtherChallenge>
                    <ContentHeader
                        title="다른 챌린지 둘러보기"
                        desc="이런 챌린지들은 어떠세요? 다양한 챌린지를 확인해보세요!"
                    />
                    <RecommendedChallenges challengeId={challengeId} />
                    <Button
                        title="챌린지 페이지로 돌아가기"
                        mainColor
                        onClick={() => {
                            navigate("/challenge");
                            window.scrollTo({ top: 0 });
                        }}
                    />
                </OtherChallenge>
            </Container>
            {isModalOpen && (
                <ApplyModal
                    onApply={handleApply}
                    onCancle={() => setIsModalOpen(false)}
                />
            )}
            {failModalOpen && (
                <RejectModal onClick={() => setFailModalOpen(false)} />
            )}
            {completeModalOpen && (
                <CompleteModal onClick={() => setCompleteModalOpen(false)} />
            )}
            {cancleModalOpen && (
                <Modal
                    title="정말로 챌린지를 포기할까요?"
                    subText="챌린지를 포기해도 다시 참여할 수 있어요."
                    left="뒤로가기"
                    right="포기하기"
                    onCancle={() => setCancleModalOpen(false)}
                    onApply={handleCancleComplete}
                />
            )}
            {cancleCompleteModalOpen && (
                <Modal
                    title="챌린지를 포기했습니다."
                    left="확인"
                    onCancle={() => {
                        setCancleCompleteModalOpen(false);
                        navigate("/challenge");
                    }}
                />
            )}
        </DefaultLayout>
    );
};

export default ChallengeDetail;

const OtherChallenge = styled.div`
    ${tw`
        flex flex-col mt-[175px] gap-[129px] w-[1280px] items-center mb-[300px]
    `}
`;

const Container = styled.div`
    ${tw`
        flex flex-col gap-[113px] mt-[45px] w-full items-center
    `}
`;
