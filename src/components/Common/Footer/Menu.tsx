import styled from "styled-components";
import tw from "twin.macro";

interface MenuProps {
    title: string;
    items: string[];
}

const Menu = ({ title, items }: MenuProps) => {
    return (
        <Container>
            <MenuTitle>{title}</MenuTitle>
            <MenuItems>
                {items.map((item, index) => (
                    <MenuItem key={index}>{item}</MenuItem>
                ))}
            </MenuItems>
        </Container>
    );
};

const MenuItem = styled.span`
    ${tw`
        text-[white]
        text-regular-16
    `}
`;

const MenuItems = styled.div`
    ${tw`
        flex
        flex-col
        gap-[5.28px]
    `}
`;

const MenuTitle = styled.span`
    ${tw`
        text-bold-20
        font-bold
        text-[white]
    `}
`;

const Container = styled.span`
    ${tw`
        flex
        flex-col
        gap-[20.83px]
    `}
`;

export default Menu;
