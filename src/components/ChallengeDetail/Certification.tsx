import styled from "styled-components";
import tw from "twin.macro";
import AddIcon from "../../assets/icons/add-icon";
import ContentHeader from "../Common/ContentHeader";
import { useState } from "react";
import ThumbsUpModal from "./ThumbsUpModal";
import ProofModal from "./ProofModal";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getChallengeProofs } from "../../apis/challenge";
import useAuthStore from "../../storage/useAuthStore";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { getOrdinalText } from "../../@types/challenge-category";

type CertificationProps = {
    title: string;
    challengeId: string;
};

const Certification = ({ title, challengeId }: CertificationProps) => {
    const [proofModalOpen, setProofModalOpen] = useState(false);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const { accessToken } = useAuthStore();

    const handleProofSuccess = () => {
        setProofModalOpen(false);
        setIsSuccessModalOpen(true);
    };

    const {
        data: ChallengeProofData,
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ["getChallengeProof", challengeId, accessToken],
        queryFn: () => getChallengeProofs(challengeId!, accessToken!),
        placeholderData: keepPreviousData,
    });

    if (isLoading) return <div>Loading...</div>;

    console.log(ChallengeProofData);

    return (
        <>
            <Container>
                <ContentHeader
                    title="인증 내역"
                    desc={`'${title}’ 챌린지를 달성하기 위해 총 ${ChallengeProofData.data.totalProofs}번의 인증이 필요해요.`}
                />
                <StyledSwiper spaceBetween={23} slidesPerView={4}>
                    {ChallengeProofData.data.proofDetailResponses.map(
                        (proof: any, index: number) => (
                            <div key={index}>
                                {proof.status ? (
                                    <ProofSlide>
                                        <div className="certification-item">
                                            <Background />
                                            <img
                                                src={
                                                    proof.proofImageUrl
                                                        ? proof.proofImageUrl
                                                        : "https://via.placeholder.com/100x100"
                                                }
                                                alt="certification"
                                            />
                                            <div className="description">
                                                <p className="title-text">
                                                    {getOrdinalText(index)} 인증
                                                </p>
                                                <p className="sub-text">
                                                    {proof.description}
                                                </p>
                                            </div>
                                        </div>
                                    </ProofSlide>
                                ) : (
                                    <SwiperSlide>
                                        <div
                                            className="need-certification"
                                            onClick={() => {
                                                setProofModalOpen(true);
                                            }}
                                        >
                                            <AddIcon
                                                width={65}
                                                height={65}
                                                color="#EF7F18"
                                            />
                                            <span>인증 내역 추가 업로드</span>
                                        </div>
                                    </SwiperSlide>
                                )}
                            </div>
                        )
                    )}
                </StyledSwiper>
            </Container>
            {proofModalOpen && (
                <ProofModal
                    onSuccess={handleProofSuccess}
                    onCancle={() => setProofModalOpen(false)}
                    challengeId={challengeId}
                    accessToken={accessToken!}
                />
            )}

            {isSuccessModalOpen && (
                <ThumbsUpModal
                    onClose={() => {
                        setIsSuccessModalOpen(false);
                    }}
                />
            )}
        </>
    );
};

export default Certification;

const Background = styled.div`
    ${tw`absolute inset-0 [border-radius: 16px] flex flex-col`}
    background: linear-gradient(180deg, rgba(255, 255, 255, 0) 10.44%, rgba(0, 0, 0, 0.5) 120.07%);
`;

const ProofSlide = styled(SwiperSlide)`
    ${tw`
        relative object-contain
    `}
    .description {
        ${tw`
            absolute bottom-0 p-[29px 22px] text-white
        `}
        .title-text {
            ${tw`
                text-bold-36 font-bold
            `}
        }
        .sub-text {
            ${tw`
                text-medium-20 font-medium text-ellipsis overflow-hidden
            `}
            display: -webkit-box;
            -webkit-line-clamp: 2; /* Number of lines to show */
            -webkit-box-orient: vertical;
        }
    }
    img {
        ${tw`
            object-contain
        `}
    }
`;

const StyledSwiper = styled(Swiper)`
    ${tw`
            mt-[50px] w-[1280px]
        `}
    img {
        ${tw`
                w-[301px] h-[415px] rounded-[16px]
            `}
    }
    .need-certification {
        ${tw`
                cursor-pointer w-[301px] h-[415px] rounded-[16px] bg-white flex flex-col items-center justify-center gap-[23px]
            `}
        span {
            ${tw`
                    text-medium-20 font-medium text-fontColor3
                `}
        }
    }
`;

const Container = styled.div`
    ${tw`
        mt-[243px]
    `}
    .certification-list {
        ${tw`
            flex gap-[23px] mt-[50px]
        `}
        img {
            ${tw`
                w-[301px] h-[415px] rounded-[16px]
            `}
        }
        .need-certification {
            ${tw`
                cursor-pointer w-[301px] h-[415px] rounded-[16px] bg-white flex flex-col items-center justify-center gap-[23px]
            `}
            span {
                ${tw`
                    text-medium-20 font-medium text-fontColor3
                `}
            }
        }
    }
`;
