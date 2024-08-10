import React, { useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import AccountForm from "../SponsorRegister/AccountForm";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { SponsorDetailData } from "../../@types/sponsor";
import {
  getProgressInfo,
  getSupportsInfo,
  postDonate,
} from "../../apis/sponsor";
import Progress from "./Progress";
import { useForm, SubmitHandler } from "react-hook-form";
import useAuthStore from "../../storage/useAuthStore";
import ThanksImg from "../../assets/images/sponsership_thanks.png";

function DonateModal({ onClose }: { onClose: () => void }) {
  const { supportId } = useParams() as { supportId: string };

  const { data, isLoading, error } = useQuery<SponsorDetailData>({
    queryKey: ["getSponsorDetail", supportId], //useQuery는 queryKey가 변경될 때마다 호출됨
    queryFn: () => getSupportsInfo(supportId),
  });

  const {
    data: ProgressData,
    isLoading: isProgressLoading,
    error: isProgressError,
  } = useQuery({
    queryKey: ["getSponsorProgress"],
    queryFn: () => getProgressInfo(supportId),
  });
  type FormValue = {
    amount: number;
    bank: string;
    account: string;
  };
  const {
    register,
    handleSubmit,
    getValues,
    watch,
    setValue,
    formState: { isValid },
  } = useForm<FormValue>({
    mode: "onChange",
    defaultValues: {
      bank: "001",
    },
  });
  const accessToken = useAuthStore((state) => state.accessToken);
  const { nickname } = useAuthStore.getState().userData;

  const [isFinished, setIsFinished] = useState(false);
  const navigate = useNavigate();
  const onSubmitHandler: SubmitHandler<FormValue> = async () => {
    const { amount, bank, account } = getValues();
    console.log(amount, bank, account);
    if (!bank || !account) {
      alert("은행명 정보와 계좌번호를 입력해 주세요.");
      return; // 요청 보내지 않음
    }

    const res = await postDonate(
      accessToken!,
      supportId,
      amount,
      bank,
      account
    );

    if (res.success) {
      setIsFinished(true);
      console.log(isFinished);
    }
  };
  console.log(isFinished);

  if (!isLoading && !isProgressLoading && data && ProgressData) {
    return (
      <Overlay onClick={onClose}>
        {!isFinished ? (
          <Wrapper onClick={(e) => e.stopPropagation()}>
            <InputForm onSubmit={handleSubmit(onSubmitHandler)}>
              <span className="d-day">D-{data.leftDays}</span>
              <span className="bold-36">{data.title}</span>
              <Progress
                modal
                totalPrice={ProgressData.totalPrice}
                supportedPrice={ProgressData.supportedPrice}
                progress={ProgressData.progress}
              />
              <label className="medium-20">후원 금액</label>
              <input
                className="amount-input"
                placeholder={`${
                  ProgressData.totalPrice - ProgressData.supportedPrice
                }원 후원 가능`}
                {...register("amount", { required: true })}
              />
              <div className="flex flex-row items-center w-full">
                <label className="medium-20">환불 계좌</label>
                <span className="desc">
                  기간 내 후원금 충족 미달시 환불 받을 계좌를 알려주세요.
                </span>
              </div>
              <div className="flex flex-row items-center w-full justify-between">
                <AccountForm
                  bankValue={watch("bank")}
                  accountValue={watch("account")}
                  onBankChange={(value) => setValue("bank", value)}
                  onAccountChange={(value) => setValue("account", value)}
                />
                <Button type="submit" disabled={!isValid}>
                  후원하기
                </Button>
              </div>
            </InputForm>
          </Wrapper>
        ) : (
          <Wrapper onClick={(e) => e.stopPropagation()}>
            <span className="bold-36">후원이 완료되었습니다.</span>
            <span className="medium-20">
              {nickname} 후원자님의 보탬이 {data.nickname} 님에게 큰 도움이
              되었을 거에요!
            </span>
            <Button onClick={() => navigate("/sponsor")}>
              다른 후원 게시글 보러 가기{" "}
            </Button>
            <img
              src={ThanksImg}
              alt="감사이미지"
              width={423}
              className="mt-5"
            />
          </Wrapper>
        )}
      </Overlay>
    );
  } else {
    return <div> </div>;
  }
}

export default DonateModal;

const Overlay = styled.div`
  ${tw`
        w-full h-full bg-[black] bg-opacity-50 
        fixed top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%]
        flex justify-center items-center
        z-[2]
    `}
`;
const Wrapper = styled.div`
  ${tw`w-[1220px] h-[660px] [border-radius: 16px] bg-background flex flex-col items-center justify-center m-auto`}
  .bold-36 {
    ${tw`font-bold text-bold-36 text-fontColor1 mt-0.5`}
  }
  .medium-20 {
    ${tw`font-medium text-medium-20 text-fontColor3 mt-8`}
  }
`;
const InputForm = styled.form`
  ${tw`w-[1100px] h-[488px] flex flex-col  justify-center font-sans m-auto`}

  .d-day {
    ${tw`font-bold text-bold-36 text-subColor`}
  }

  .desc {
    ${tw`font-medium text-medium-15 text-fontColor2 ml-2.5 mt-8`}
  }

  .amount-input {
    ${tw`w-[257px]  bg-white h-11 rounded-full font-medium text-medium-20 text-fontColor1 p-3 mt-5 mb-2`}
    &:focus {
      ${tw`outline-mainColor`};
    }
  }
`;
const Button = styled.button<{ disabled?: boolean }>`
  ${tw` px-4 h-11 rounded-full font-bold text-bold-20 bg-subColor text-white mt-5`}

  ${({ disabled }) =>
    disabled
      ? tw`bg-[#D9D9D9] text-fontColor1 cursor-default`
      : tw`bg-subColor text-white`}
`;
