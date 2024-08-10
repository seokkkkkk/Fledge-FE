import styled from "styled-components";
import tw from "twin.macro";
import arrow from "../../assets/images/under-arrow-small.png";
import { useState, useRef, useEffect } from "react";

interface InputProps {
    hint?: string;
    items?: string[];
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    width?: string;
    type?: string;
    readOnly?: boolean;
}

const DropDown = ({
    hint,
    value,
    items,
    width,
    type,
    onChange,
    readOnly = false,
}: InputProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleClickOutside = (event: MouseEvent) => {
        if (
            dropdownRef.current &&
            !dropdownRef.current.contains(event.target as Node)
        ) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const typeHandler = (type: string) => {
        switch (type) {
            case "year":
                return Array.from({ length: 100 }, (_, i) => 2024 - i);
            case "month":
                return Array.from({ length: 12 }, (_, i) => i + 1);
            case "day":
                return Array.from({ length: 31 }, (_, i) => i + 1);
            case "gender":
                return ["남성", "여성"];
        }
    };

    const typeItems = type ? typeHandler(type) : items;

    if (!typeItems) return null;

    return (
        <Container style={{ width: width }} ref={dropdownRef}>
            <div style={{ visibility: hint ? "visible" : "hidden" }}>
                {hint || "Placeholder"}
            </div>
            <div>
                <DropdownButton
                    style={{ width: width }}
                    onClick={() => !readOnly && setIsOpen(!isOpen)}
                    readOnly={readOnly}
                >
                    <span>{value ? value : typeItems[0]}</span>
                    <img
                        src={arrow}
                        alt="dropdown-arrow"
                        className={`${isOpen && ` rotate-180`}`}
                    />
                </DropdownButton>
                {isOpen && !readOnly && (
                    <DropdownList style={{ width: width }}>
                        {typeItems.map((item, index) => (
                            <DropdownItem
                                key={index}
                                onClick={() => {
                                    onChange &&
                                        onChange({
                                            target: { value: item },
                                        } as any);
                                    setIsOpen(false);
                                }}
                            >
                                {item}
                            </DropdownItem>
                        ))}
                    </DropdownList>
                )}
            </div>
        </Container>
    );
};

export default DropDown;

const Container = styled.div`
    ${tw`
        flex flex-col gap-[16px]
        text-medium-20 font-medium text-fontColor3
        justify-center items-start
        relative
    `}
`;
const DropdownButton = styled.div<{ readOnly: boolean }>`
    ${tw`
        flex items-center justify-between
         gap-[4px] h-[46px] bg-white px-[19px] rounded-full text-medium-20 font-medium text-fontColor1 cursor-pointer
    `}
    cursor: ${({ readOnly }) =>
        readOnly ? "default" : "pointer"}; // 커서 설정

    span {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
`;

const DropdownList = styled.ul`
    ${tw`
        bg-white rounded-[16px] absolute top-[90px] left-0 z-[1]
    `}
    width: auto; // 너비를 자동 조절
    min-width: 100%; // 최소 너비를 100%로 설정
    max-height: 200px;
    overflow-y: auto;
`;

const DropdownItem = styled.li`
    ${tw`
        px-[19px] text-medium-20 font-medium text-fontColor1 cursor-pointer z-[10]
        flex items-center
    `}
    min-height: 46px; // 최소 높이 유지
    white-space: nowrap; // 텍스트가 한 줄에 표시
    overflow: hidden;
    text-overflow: ellipsis;
    width: auto; // 너비를 자동 조절
    &:hover {
        ${tw`
            bg-background
        `}
    }
`;
