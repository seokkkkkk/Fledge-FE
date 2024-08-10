import styled from "styled-components";
import tw from "twin.macro";
import Button from "../Common/Button";
import AddIcon from "../../assets/icons/add-icon";
import { useState } from "react";
import { getPresignedUrl, uploadImageToS3 } from "../../apis/file-upload";
import { postChallengeProof } from "../../apis/challenge";

type ProofModalProps = {
    challengeId: string;
    accessToken: string;
    onCancle: () => void;
    onSuccess: () => void;
};

const ProofModal = ({
    onSuccess,
    onCancle,
    challengeId,
    accessToken,
}: ProofModalProps) => {
    const [text, setText] = useState("");
    const [image, setImage] = useState<File | null>(null);

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setImage(file);
        }
    };

    const onSubmit = async () => {
        const proofDate = new Date().toISOString().split("T")[0];
        let filePath = null;
        if (image) {
            const presignedData = await getPresignedUrl(
                "challenge-proof",
                image.name,
                accessToken
            );
            const presignedUrl = presignedData.data.url;
            filePath = presignedData.data.filePath;
            await uploadImageToS3(image, presignedUrl);
        }
        if (filePath) {
            const res = await postChallengeProof(
                challengeId,
                proofDate,
                filePath,
                accessToken
            );
            if (res && res.success) {
                onSuccess();
            } else {
                alert("인증에 실패했습니다.");
                onCancle();
            }
        }
    };

    return (
        <Modal onClick={onCancle}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
                <div className="input-container">
                    <div
                        className="image-container"
                        onClick={() =>
                            document.getElementById("imageInput")?.click()
                        }
                    >
                        {image ? (
                            <img
                                src={URL.createObjectURL(image)}
                                alt="Uploaded Preview"
                                className="uploaded-image"
                            />
                        ) : (
                            <>
                                <AddIcon width={73} height={65} />
                                <p className="sub-text">이미지 업로드</p>
                            </>
                        )}
                        <input
                            id="imageInput"
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            style={{ display: "none" }}
                        />
                    </div>
                    <textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="인증 내용을 입력해주세요."
                    />
                </div>
                <Button title="챌린지 인증하기" onClick={onSubmit} />
            </div>
        </Modal>
    );
};

export default ProofModal;

const Modal = styled.div`
    ${tw`
        flex items-center justify-center
        fixed top-0 left-0 w-full h-full z-[1000] bg-[rgba(0,0,0,0.4)]
    `}
    .modal {
        ${tw`
        flex flex-col items-center justify-center bg-[black]
        p-[59px 67px] rounded-[16px] bg-background gap-[30px]
    `}
    }
    .input-container {
        ${tw`
            w-[801px] flex flex-col gap-[16px] object-contain cursor-pointer
        `}
        textarea {
            ${tw`
                resize-none w-full bg-[transparent] outline-none text-medium-20 font-medium text-fontColor1
            `}
        }
    }
    .image-container {
        ${tw`
            w-[800px] h-[400px] bg-white rounded-[16px] flex flex-col items-center justify-center gap-[23px]
        `}
        .uploaded-image {
            ${tw`
                w-full h-full object-contain rounded-[16px]
            `}
        }
    }
    .title-text {
        ${tw`
            text-bold-36 font-bold text-fontColor1 mb-[16px]
        `}
    }
    .sub-text {
        ${tw`
            text-medium-20 font-medium text-fontColor3 mb-[30px]
        `}
    }
    .button-container {
        ${tw`
            flex gap-[23px]
        `}
    }
`;
