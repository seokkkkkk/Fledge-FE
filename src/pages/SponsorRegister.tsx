import React, { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import DefaultLayout from "../components/Common/DefaultLayout";
import Header from "../components/SponsorRegister/Header";
import styled from "styled-components";
import tw from "twin.macro";
import ContentSection from "../components/SponsorRegister/ContentSection";
import ImageUploadSection from "../components/SponsorRegister/ImageUploadSection";
import AddressSection from "../components/SponsorRegister/AddressSection";
import SubContentSection from "../components/SponsorRegister/SubContentSection";
import AccountSection from "../components/SponsorRegister/AccountSection";
import {
  postAccountItem,
  postAddressItem,
  updateAccountItem,
  updateAddressItem,
} from "../apis/sponsor";
import { useLocation, useNavigate } from "react-router-dom";
import useAuthStore from "../storage/useAuthStore";
import { getPresignedUrl, uploadImageToS3 } from "../apis/file-upload";
import CompleteModal from "../components/SponsorRegister/CompleteModal";
import { formatDateString } from "../utils/format-date";
interface FormData {
  title: string;
  item: string;
  price: number;
  category: string;
  itemUrl: string;
  promise: string;
  recipientName: string;
  phone: string;
  bank: string;
  account: string;
  endDate: string;
  reason: string;
  images: File[]; // 이미지 필드의 타입을 File 배열로 명시
  address: string;
  detailAddress: string;
  zip: string;
}

function SponsorRegister() {
  //mode를 onChange로 설정하여 폼 상태가 변경될때마다 유효성 검사 실행
  const methods = useForm<FormData>({
    mode: "onChange",
    defaultValues: {
      title: "",
      item: "",
      price: 0,
      category: "DAILY_NECESSITY",
      itemUrl: "",
      promise: "ONCE",
      recipientName: "",
      phone: "",
      bank: "001",
      account: "",
      endDate: "",
      reason: "",
      images: [],
      address: "",
      detailAddress: "",
      zip: "",

      // 추가 필드들
    },
  });
  //폼 상태 변경될 때마다 isValid 상태 업데이트
  //isValid: 폼의 유효성을 나타내는 상태
  const {
    watch,
    getValues,
    setValue,
    formState: { isValid },
  } = methods;

  const navigate = useNavigate();
  const selectedCategory = watch("category");
  const accesstoken = useAuthStore((state) => state.accessToken)!;
  const [isCompleted, setIsCompleted] = useState(false);
  const location = useLocation();
  const { data, mode } = location.state || {};

  useEffect(() => {
    if (mode === "update" && data) {
      // Populate form with data from state
      setValue("title", data.title);
      setValue("item", data.item);
      setValue("price", data.price);
      setValue("category", data.supportCategory);
      setValue("itemUrl", data.purchaseUrl);
      setValue("promise", data.promise);

      setValue("endDate", formatDateString(data.expirationDate)); // 날짜 변환
      setValue("reason", data.reason);

      if (
        data.supportCategory === "EDUCATION" ||
        data.supportCategory === "MEDICAL" ||
        data.supportCategory === "LEGAL_AID"
      ) {
        setValue("bank", data.bank);
        setValue("account", data.account);
      } else {
        setValue("address", data.address);
        setValue("detailAddress", data.detailAddress);
        setValue("zip", data.zip);
        setValue("recipientName", data.recipientName);
        setValue("phone", data.phone);
      }
    }
  }, [data, mode, setValue]);

  //서버 api 요청 코드 추가 예정
  const onSubmit = async () => {
    const {
      title,
      item,
      price,
      category,
      itemUrl,
      endDate,
      reason,
      promise,
      images,
    } = getValues();

    let finalImageUrls = [];
    if (mode === "update" && data) {
      const serverImageUrls = data?.images.map(
        (img: { originalUrl: string }) => img.originalUrl
      );

      const newImageFiles = images.filter(
        (file) => !serverImageUrls.includes(file.name)
      );

      const uploadedImages = [];

      if (newImageFiles.length > 0) {
        for (const file of newImageFiles) {
          const presignedData = await getPresignedUrl(
            "support-post",
            file.name,
            accesstoken
          );
          console.log(presignedData.data.url);
          await uploadImageToS3(file, presignedData.data.url);
          uploadedImages.push(presignedData.data.filePath);
        }
      }

      finalImageUrls = [...serverImageUrls, ...uploadedImages];
    } else {
      const uploadedImages = [];
      if (images.length > 0) {
        for (const file of images) {
          const presignedData = await getPresignedUrl(
            "support-post",
            file.name,
            accesstoken
          );
          await uploadImageToS3(file, presignedData.data.url);
          uploadedImages.push(presignedData.data.filePath);
        }
      }
      finalImageUrls = uploadedImages;
    }

    if (
      selectedCategory === "EDUCATION" ||
      selectedCategory === "MEDICAL" ||
      selectedCategory === "LEGAL_AID"
    ) {
      const { bank, account } = getValues();
      if (bank === "" || account === "") {
        alert("은행명 정보와 계좌번호를 입력해 주세요.");
        return; // 요청 보내지 않음
      }
      let itemData = {
        title: title,
        reason: reason,
        item: item,
        price: price,
        supportCategory: category,
        purchaseUrl: itemUrl,
        expirationDate: endDate,
        promise: promise,
        bank: bank,
        account: account,
        images: finalImageUrls,
      };

      if (mode === "create") {
        const res = await postAccountItem(accesstoken, itemData);

        if (res.success) {
          setIsCompleted(true);
        }
      } else {
        const res = await updateAccountItem(
          accesstoken,
          itemData,
          data?.supportId
        );
        if (res.success) {
          setIsCompleted(true);
        }
      }
    } else {
      const { address, detailAddress, zip, recipientName, phone } = getValues();
      if (
        address === "" ||
        detailAddress === "" ||
        zip === "" ||
        recipientName === "" ||
        phone === ""
      ) {
        alert("배송지 정보를 모두 입력해 주세요.");
        return; // 요청 보내지 않음
      }

      let itemData = {
        title: title,
        reason: reason,
        item: item,
        price: price,
        supportCategory: category,
        purchaseUrl: itemUrl,
        expirationDate: endDate,
        promise: promise,
        images: finalImageUrls,
        address: address,
        detailAddress: detailAddress,
        zip: zip,
        recipientName: recipientName,
        phone: phone,
      };
      if (mode === "create") {
        const res = await postAddressItem(accesstoken, itemData);

        if (res.success) {
          setIsCompleted(true);
        }
      } else {
        const res = await updateAddressItem(
          accesstoken,
          itemData,
          data?.supportId
        );
        if (res.success) {
          setIsCompleted(true);
        }
      }
    }
  };

  return (
    <DefaultLayout>
      <>
        {isCompleted && <CompleteModal />}
        <Header />
        <FormProvider {...methods}>
          <RegisterForm onSubmit={methods.handleSubmit(onSubmit)}>
            <ContentSection />
            <ImageUploadSection />
            <SubContentSection />

            {selectedCategory === "EDUCATION" ||
            selectedCategory === "MEDICAL" ||
            selectedCategory === "LEGAL_AID" ? (
              <AccountSection />
            ) : (
              <AddressSection
                serverData={{
                  address: data?.address,
                  detailAddress: data?.detailAddress,
                  zonecode: data?.zip,
                }}
              />
            )}

            <SubmitButton type="submit" disabled={!isValid}>
              등록하기
            </SubmitButton>
          </RegisterForm>
        </FormProvider>
      </>
    </DefaultLayout>
  );
}

export default SponsorRegister;

const RegisterForm = styled.form`
  ${tw`flex flex-col mt-32 w-[1280px]`}
`;

const SubmitButton = styled.button<{ disabled?: boolean }>`
  ${tw`w-52 h-12 font-sans font-bold text-bold-24 rounded-full transition-colors duration-200 my-[105px]`}
  ${({ disabled }) =>
    disabled
      ? tw`bg-[#D9D9D9] text-fontColor1 cursor-default`
      : tw`bg-subColor text-white`}
`;
