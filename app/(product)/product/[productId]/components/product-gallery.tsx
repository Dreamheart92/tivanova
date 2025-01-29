'use client';

import Image from "next/image";
import {resolveImageSize} from "@/lib/utils/utils";
import ProductGalleryZoom from "@/app/(product)/product/[productId]/components/product-gallery-zoom";
import {useState} from "react";
import {Swiper, SwiperSlide} from "swiper/react";
import {ImageType} from "@/lib/definitions/definitions";

import 'swiper/css';
import 'swiper/css/pagination';
import {Pagination} from "swiper/modules";

type ProductGalleryProps = {
    images: ImageType[];
    scrollCaption: string;
}

export default function ProductGallery({images, scrollCaption}: ProductGalleryProps) {
    const [isGalleryOpen, setIsGalleryOpen] = useState<{ state: boolean, selectedImageIndex: null | number }>({
        state: false,
        selectedImageIndex: null,
    });

    const handleCloseGallery = () => {
        setIsGalleryOpen((prevState) => ({
            ...prevState,
            state: false,
        }))
    }

    const handleOpenGallery = (imageIndex: number) => {
        setIsGalleryOpen({
            state: true,
            selectedImageIndex: imageIndex,
        })
    }

    return (
        <>
            <div
                className="relative hidden md:flex basis-[60%] max-h-[93.6vh] overflow-y-scroll no-scrollbar scroll-smooth">
                <div className='product-details-grid relative'>
                    {images.map((image, index) => {
                        const imageSize = resolveImageSize(index);

                        return (
                            <Image
                                key={image.url}
                                src={image.url}
                                alt='Product Image'
                                width={imageSize.width}
                                height={imageSize.height}
                                className='cursor-zoom-in'
                                onClick={() => handleOpenGallery(index)}
                            />
                        )
                    })}

                    <div className='absolute -right-16 -rotate-90 top-[7.5em]'>
                        <p>{scrollCaption}</p>
                    </div>
                </div>
            </div>

            <div className='w-full flex md:hidden'>
                <ImageSlides images={images} openZoom={handleOpenGallery}/>
            </div>

            <ProductGalleryZoom
                images={images}
                open={isGalleryOpen.state}
                selectedImageIndex={isGalleryOpen.selectedImageIndex}
                onClose={handleCloseGallery}
            />
        </>
    )
}

const ImageSlides = ({images, openZoom}: { images: ImageType[], openZoom: (index: number) => void }) => {
    return (
        <Swiper
            slidesPerView={1}
            loop={true}
            className='mySwiper'
            grabCursor={true}
            pagination={true}
            modules={[Pagination]}
        >
            {images.map((image, index) => (
                <SwiperSlide key={index}>
                    <Image
                        src={image.url}
                        alt='Product image'
                        width={1000}
                        height={500}
                        onClick={() => openZoom(index)}
                    />
                </SwiperSlide>
            ))}
        </Swiper>
    )
}