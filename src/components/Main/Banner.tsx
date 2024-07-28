import styled from "styled-components";
import tw from "twin.macro";
import BannerImg from "../../assets/images/banner.png";
import UnderArrow from "../../assets/images/under-arrow.png";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const Banner = () => {
    const bannerImages = [BannerImg, BannerImg, BannerImg];
    return (
        <SwiperContainer
            autoplay={{
                delay: 6000,
                disableOnInteraction: false,
            }}
            pagination={{
                clickable: true,
            }}
            loop
            modules={[Autoplay, Pagination]}
            touchEventsTarget="wrapper"
        >
            {bannerImages.map((img, idx) => (
                <SwiperSlide key={idx}>
                    <SwiperImg src={img} alt="banner" />
                </SwiperSlide>
            ))}
            <Arrow src={UnderArrow} alt="under-arrow" />
        </SwiperContainer>
    );
};

export default Banner;

const SwiperContainer = styled(Swiper)`
    ${tw`
        w-full
        h-[665px]
        mt-[35px]
    `}
    .swiper-pagination {
        ${tw`
            mb-[610px]
            flex
            justify-center
            gap-[24px]
        `}
    }
    .swiper-pagination-bullet {
        ${tw`
                w-[11px]
                h-[11px]
                bg-[transparent]
                border-2
                border-solid
                border-[white]
                opacity-100
            `}
    }
    .swiper-pagination-bullet-active {
        ${tw`
            bg-[white]
        `}
    }
`;

const SwiperImg = styled.img`
    ${tw`
        w-full
        h-full
        object-cover
    `}
`;

const Arrow = styled.img`
    ${tw`
        absolute
        bottom-[47px]
        left-1/2
        translate-x-[-50%]
        z-10
        cursor-pointer
    `}
`;
