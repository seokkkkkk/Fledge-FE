import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import styled from "styled-components";
import tw from "twin.macro";
import AddIcon from "../../assets/icons/add-icon";
import DeleteIcon from "../../assets/icons/delete-icon";

type ImgProps = {
  presignedUrl: string;
  originalUrl: string;
};
const ImageUploadSection = ({
  status,
  serverImg,
}: {
  status?: string;
  serverImg?: ImgProps[];
}) => {
  const { setValue, getValues, watch } = useFormContext();
  const [imageFiles, setImageFiles] = useState<File[]>([]); // 새로 추가된 파일들
  const [imageUrls, setImageUrls] = useState<string[]>([]); // 기존의 이미지 URL들

  useEffect(() => {
    if (serverImg && serverImg.length > 0) {
      // presignedUrl을 imageUrls에 세팅
      const urls = serverImg.map((img) => img.presignedUrl);
      setImageUrls(urls);

      // 서버에서 제공된 이미지 URL만 따로 관리
      setValue("images", []);
    }
  }, [serverImg]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const filesArray = Array.from(event.target.files);
      setImageFiles((prevFiles) => {
        const newFiles = [...prevFiles, ...filesArray];
        setValue("images", [...watch("images"), ...newFiles]); // 이미지 배열에 새로 추가된 파일들 저장
        return newFiles;
      });
    }
  };

  const handleImageDelete = (index: number) => {
    if (index < imageUrls.length) {
      // URL 삭제
      const updatedUrls = imageUrls.filter((_, i) => i !== index);
      setImageUrls(updatedUrls);
      setValue(
        "images",
        watch("images").filter((_: any, i: number) => i !== index)
      ); // 해당 인덱스의 파일도 삭제
    } else {
      // File 객체 삭제
      const updatedFiles = imageFiles.filter(
        (_, i) => i !== index - imageUrls.length
      );
      setImageFiles(updatedFiles);
      setValue(
        "images",
        watch("images").filter((_: any, i: number) => i !== index)
      ); // 파일 삭제 후 setValue로 반영
    }
  };
  return (
    <Container>
      <div className="flex flex-row items-center w-full mt-24">
        <label>이미지 첨부</label>
        <span className="desc">이미지는 최대 4장 첨부할 수 있어요.</span>
      </div>
      {imageUrls.length + imageFiles.length === 0 && (
        <UploadButtonWrapper>
          <label htmlFor="image-upload">이미지 업로드하기</label>
          <input
            type="file"
            id="image-upload"
            style={{ display: "none" }}
            accept="image/*"
            multiple
            onChange={handleImageUpload}
            disabled={Boolean(status && status !== "PENDING")}
          />
        </UploadButtonWrapper>
      )}
      <ImageContainer>
        {imageUrls.map((url, index) => (
          <ImageWrapper key={index}>
            <img
              src={url}
              alt={`Uploaded ${index}`}
              className="uploaded-image"
            />
            <DeleteIconWrapper onClick={() => handleImageDelete(index)}>
              <DeleteIcon />
            </DeleteIconWrapper>
          </ImageWrapper>
        ))}
        {imageFiles.map((file, index) => (
          <ImageWrapper key={index + imageUrls.length}>
            <img
              src={URL.createObjectURL(file)}
              alt={`Uploaded ${index + imageUrls.length}`}
              className="uploaded-image"
            />
            <DeleteIconWrapper
              onClick={() => handleImageDelete(index + imageUrls.length)}
            >
              <DeleteIcon />
            </DeleteIconWrapper>
          </ImageWrapper>
        ))}
        {imageUrls.length + imageFiles.length > 0 &&
          imageUrls.length + imageFiles.length < 4 && (
            <AddButton as="label" htmlFor="image-upload">
              <AddIcon width={65} height={65} />
              <label>이미지 추가 업로드</label>
              <input
                type="file"
                id="image-upload"
                style={{ display: "none" }}
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                disabled={Boolean(status && status !== "PENDING")}
              />
            </AddButton>
          )}
      </ImageContainer>
    </Container>
  );
};

export default ImageUploadSection;
const Container = styled.div`
  label {
    ${tw`font-medium text-medium-20 text-fontColor3 my-3.5`}
  }
  .desc {
    ${tw`font-medium text-medium-15 text-fontColor2 ml-2.5 mt-1`}
  }
  .background {
    ${tw`
            bg-white p-[0px 21px] rounded-full h-[46px]
            flex gap-[12px] items-center
        `}
  }
`;

const UploadButtonWrapper = styled.div`
  ${tw`flex items-center justify-center w-[182px] h-[46px] bg-mainColor  rounded-full`}
  label {
    ${tw`text-bold-20 font-bold text-background font-sans`}
  }
`;

const ImageContainer = styled.div`
  ${tw`flex flex-row items-center w-full h-[415px]`}
`;
const ImageWrapper = styled.div`
  ${tw`relative mr-6`}
  .uploaded-image {
    ${tw`w-[301px] h-[405px] rounded-[16px] object-cover`}
  }
`;

const DeleteIconWrapper = styled.div`
  ${tw`absolute top-1/2 left-[133px] cursor-pointer z-10`}
`;
const AddButton = styled.div`
  ${tw`flex flex-col items-center justify-center w-[301px] h-[405px] [border-radius: 16px] bg-white`}

  label {
    ${tw`font-sans font-medium text-medium-20 text-mainColor`}
  }
`;
