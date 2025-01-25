'use client';

import {FeaturedProductType} from "@/lib/definitions/product.definitions";
import {Swiper, SwiperSlide} from "swiper/react";
import ProductCard from "@/components/product-card";

import 'swiper/css';

type ProductsSliderProps = {
    products: FeaturedProductType[];
}

export default function ProductsSlider({products}: ProductsSliderProps) {
    return (
        <Swiper
            slidesPerView={4}
            spaceBetween={15}
            loop={true}
            className='mySwiper'
            grabCursor={true}
        >
            {products.map((product) => (
                <SwiperSlide key={product.id}>
                    <ProductCard product={product}/>
                </SwiperSlide>
            ))}
        </Swiper>
    )
}