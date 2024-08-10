import axios from "axios";
import { axiosInstance } from ".";
import { CommonError } from "../@types/api";

export const getChallenges = async (
    page: number,
    size: number,
    type: string,
    categories?: string[]
) => {
    try {
        const params = new URLSearchParams();
        params.append("page", page.toString());
        params.append("size", size.toString());
        params.append("type", type);
        if (categories) {
            categories.forEach((category) => {
                params.append("categories", category);
            });
        }
        const res = await axiosInstance.get(`/public/challenges`, {
            params: params,
        });
        return res.data;
    } catch (error) {
        console.log(error);
        if (axios.isAxiosError<CommonError>(error) && error.response) {
            const errorCode = error.response.data.errorCode;
            const message = error.response.data.message;
            console.log(`${errorCode}: ${message}`);
            alert(message);
        }
    }
};

export const getTopParticipants = async () => {
    try {
        const res = await axiosInstance.get(
            `/public/challenges/top-participants`
        );
        return res.data;
    } catch (error) {
        console.log(error);
        if (axios.isAxiosError<CommonError>(error) && error.response) {
            const errorCode = error.response.data.errorCode;
            const message = error.response.data.message;
            console.log(`${errorCode}: ${message}`);
            alert(message);
        }
    }
};

export const getPartnershipChallenges = async (
    page: number,
    size: number,
    categories?: string[]
) => {
    try {
        const res = await axiosInstance.get(
            `/public/challenges/partnership-and-organization`,
            {
                params: {
                    page: page,
                    size: size,
                    categories: categories,
                },
            }
        );
        return res.data;
    } catch (error) {
        console.log(error);
        if (axios.isAxiosError<CommonError>(error) && error.response) {
            const errorCode = error.response.data.errorCode;
            const message = error.response.data.message;
            console.log(`${errorCode}: ${message}`);
            alert(message);
        }
    }
};

export const getRecommendedChallenges = async (challengeId: string) => {
    try {
        const res = await axiosInstance.get(
            `/public/challenges/${challengeId}/explore`
        );
        return res.data;
    } catch (error) {
        console.log(error);
        if (axios.isAxiosError<CommonError>(error) && error.response) {
            const errorCode = error.response.data.errorCode;
            const message = error.response.data.message;
            console.log(`${errorCode}: ${message}`);
            alert(message);
        }
    }
};

export const getChallengeParticipants = async (challengeId: string) => {
    try {
        const res = await axiosInstance.get(
            `/public/challenges/${challengeId}/participants`
        );
        return res.data;
    } catch (error) {
        console.log(error);
        if (axios.isAxiosError<CommonError>(error) && error.response) {
            const errorCode = error.response.data.errorCode;
            const message = error.response.data.message;
            console.log(`${errorCode}: ${message}`);
            alert(message);
        }
    }
};

export const getChallengeDetail = async (
    challengeId: string,
    accessToken: string | undefined
) => {
    try {
        const res = await axiosInstance.get(
            `/public/challenges/${challengeId}`,
            {
                headers: {
                    ...(accessToken && {
                        Authorization: `Bearer ${accessToken}`,
                    }),
                },
            }
        );
        return res.data;
    } catch (error) {
        console.log(error);
        if (axios.isAxiosError<CommonError>(error) && error.response) {
            const errorCode = error.response.data.errorCode;
            const message = error.response.data.message;
            console.log(`${errorCode}: ${message}`);
            alert(message);
        }
    }
};

export const postChallengeApply = async (
    challengeId: string,
    memberId: number,
    accessToken: string
) => {
    try {
        const res = await axiosInstance.post(
            `https://fledge.site/api/v1/challenges`,
            {
                challengeId: challengeId,
                memberId: memberId,
                startDate: new Date().toISOString().split("T")[0],
            },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );
        return res.data;
    } catch (error) {
        console.log(error);
        if (axios.isAxiosError<CommonError>(error) && error.response) {
            const errorCode = error.response.data.errorCode;
            const message = error.response.data.message;
            console.log(`${errorCode}: ${message}`);
            alert(message);
        }
    }
};

export const getChallengeProofs = async (
    challengeId: string,
    accessToken: string
) => {
    try {
        const res = await axiosInstance.get(
            `https://fledge.site/api/v1/challenges/${challengeId}/my-proof`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );
        return res.data;
    } catch (error) {
        console.log(error);
        if (axios.isAxiosError<CommonError>(error) && error.response) {
            const errorCode = error.response.data.errorCode;
            const message = error.response.data.message;
            console.log(`${errorCode}: ${message}`);
            alert(message);
        }
    }
};

export const postChallengeProof = async (
    participationId: string,
    proofDate: string,
    proofImageUrl: string,
    accessToken: string
) => {
    try {
        const res = await axiosInstance.post(
            `https://fledge.site/api/v1/challenges/${participationId}/proofs`,
            {
                proofDate: proofDate,
                proofImageUrl: proofImageUrl,
            },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );
        return res.data;
    } catch (error) {
        console.log(error);
        if (axios.isAxiosError<CommonError>(error) && error.response) {
            const errorCode = error.response.data.errorCode;
            const message = error.response.data.message;
            console.log(`${errorCode}: ${message}`);
            alert(message);
        }
    }
};
