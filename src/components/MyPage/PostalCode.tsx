import styled from "styled-components";
import Button from "../Common/Button";
import tw from "twin.macro";
import Input from "../Common/Input";
import { useState, useEffect } from "react";
import DaumPost from "../Common/DaumPost";

interface postCode {
  address: string;
  zonecode: number | string;
  detailAddress?: string;
}
interface PostalCodeProps {
  initialAddress?: postCode;
  sponsor?: boolean;
  onChange?: (data: postCode) => void;
}

const PostalCode = ({ initialAddress, onChange, sponsor }: PostalCodeProps) => {
  const [popup, setPopup] = useState(false);

  const [form, setForm] = useState<postCode>(
    initialAddress
      ? initialAddress
      : { address: "", detailAddress: "", zonecode: "" }
  );

  const handlePopup = () => {
    setPopup(!popup);
  };

  useEffect(() => {
    if (sponsor && initialAddress) {
      setForm(initialAddress);
    }
  }, [sponsor, initialAddress]);

  useEffect(() => {
    if (onChange && form.address !== initialAddress?.address) {
      onChange(form);
    }
  }, [form, initialAddress?.address]);

  useEffect(() => {
    if (onChange && form.detailAddress !== initialAddress?.detailAddress) {
      onChange(form);
    }
  }, [form.detailAddress, initialAddress?.detailAddress]);

  const handleDetailAddressChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm((prevForm) => ({ ...prevForm, detailAddress: e.target.value }));
  };

  return (
    <>
      <Container>
        <Input
          hint="거주 주소지"
          placeholder="거주 주소지"
          width="577px"
          value={form.address}
        />
        <Input
          hint="상세 주소"
          placeholder="상세 주소"
          width="199px"
          value={form.detailAddress}
          onChange={handleDetailAddressChange}
        />
        <Input
          hint="우편번호"
          placeholder="12345"
          width="104px"
          value={form.zonecode}
        />
        <Button title="우편번호 검색" mainColor onClick={handlePopup} />
        {popup && <DaumPost handlePopup={handlePopup} setAddress={setForm} />}
      </Container>
      {popup && (
        <Background
          onClick={() => {
            handlePopup();
          }}
        />
      )}
    </>
  );
};

export default PostalCode;

const Container = styled.div`
  ${tw`
            flex gap-[23px] items-baseline relative
        `}
`;

const Background = styled.div`
  ${tw`
        absolute  w-[100dvw] h-[100dvh] z-40 top-0 left-0
    `}
`;
