import React, { useEffect, useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import Button from "../Common/Button";
import { useFormContext } from "react-hook-form";
import PostalCode from "../MyPage/PostalCode";

import { getAddress } from "../../apis/sponsor";
import useAuthStore from "../../storage/useAuthStore";

interface postCode {
  address: string;
  zonecode: number | string;
  detailAddress?: string;
}

// prop 타입 정의
interface AddressSectionProps {
  serverData?: postCode;
}

function AddressSection({ serverData }: AddressSectionProps) {
  const { register, setValue, watch } = useFormContext();
  const accesstoken = useAuthStore((state) => state.accessToken);
  const [addressData, setAddressData] = useState({
    address: serverData ? serverData.address : "",
    detailAddress: serverData ? serverData.detailAddress : "",
    zonecode: serverData ? serverData.zonecode : "",
  });

  // console.log(addressData);

  //마이페이지 정보 불러오기
  const getAddressData = async () => {
    const res = await getAddress(accesstoken!);
    if (res.success) {
      console.log(res.data);
      const { address, detailAddress, zip, name, phone } = res.data;
      console.log(address, detailAddress, zip, name, phone);
      setValue("address", address, { shouldValidate: true });
      setValue("detailAddress", detailAddress, { shouldValidate: true });
      setValue("zip", zip, { shouldValidate: true });
      setValue("recipientName", name, { shouldValidate: true });
      setValue("phone", phone, { shouldValidate: true });
      setAddressData({ address, detailAddress, zonecode: zip });
    }
  };

  const handleAddressChange = (data: postCode) => {
    setValue("address", data.address);
    setValue("detailAddress", data.detailAddress);
    setValue("zip", data.zonecode);
  };
  return (
    <>
      <Title>배송지 입력</Title>
      <div className="w-[212px] my-9">
        <Button
          title="마이페이지 정보 가져오기"
          mainColor
          small
          onClick={getAddressData}
        />
      </div>
      {/* 우편번호검색 */}
      <PostalCode
        initialAddress={addressData}
        onChange={handleAddressChange}
        sponsor={true}
      />

      <AddressFormContainer className="w-[650px]">
        <InputBox className="w-[300px]">
          <label>*수령자</label>
          <input
            type="text"
            className="background"
            {...register("recipientName")}
          />
        </InputBox>
        <InputBox>
          <label>*연락처</label>
          <input type="text" className="background" {...register("phone")} />
        </InputBox>
      </AddressFormContainer>
    </>
  );
}

export default AddressSection;

const Title = styled.span`
  ${tw`font-bold text-bold-36 text-fontColor1 my-8`}
`;

const AddressFormContainer = styled.div`
  ${tw`flex flex-row items-end justify-between `}
`;

const InputBox = styled.div`
  ${tw`flex flex-col mr-5 my-1.5`}
  label {
    ${tw`font-medium text-medium-20 text-fontColor3 my-3.5`}
  }
  .background {
    ${tw`
            bg-white p-[0px 21px] rounded-full h-[46px]
            flex gap-[12px] items-center
        `}
  }
  input {
    ${tw`bg-white h-11 rounded-full font-medium text-medium-20 text-fontColor1 p-3 w-full`}
    &:focus {
      ${tw`outline-mainColor`};
    }
  }
`;
