'use client';

import Image from "next/image";
import {useState} from "react";
import Link from "next/link";
import {PATHS} from "@/lib/constants/paths";
import {FeaturedProductType} from "@/lib/definitions/product";
import {extractShopifyIdFromGID} from "@/lib/utils/shopify";
import {ImageType} from "@/lib/definitions/definitions";
import {clsx} from "clsx";
import {CostType} from "@/lib/definitions/cart";

type ProductCardProps = {
    product: FeaturedProductType;
    width?: number;
    height?: number;
    maxHeight?: number;
}

export default function ProductCard({product, width = 500, height = 500, maxHeight = 570}: ProductCardProps) {


    return (
        <div
            className="relative text-[1.6em] md:text-[1.2em] lg:text-[1em] cursor-pointer">
            <Link href={PATHS.PRODUCT_DETAILS(extractShopifyIdFromGID(product.id))}>
                <ProductCardImage
                    images={product.images.slice(0, 2)}
                    alt={product.title}
                    size={{
                        width,
                        height,
                        maxHeight,
                    }}
                />
                <ProductCardDetails
                    details={{
                        vendor: product.vendor,
                        title: product.title,
                        cost: product.priceRange.minVariantPrice,
                    }}
                />
            </Link>
        </div>
    )
}

type ProductCardImageProps = {
    images: ImageType[];
    alt: string;
    size: {
        width: number;
        height: number;
        maxHeight: number;
    }
}

const ProductCardImage = ({images, alt, size}: ProductCardImageProps) => {
    const [hovered, setIsHovered] = useState(false);

    return (
        <div
            className="relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <Image
                src={images[0].url}
                alt={alt}
                width={size.width}
                height={size.height}
                className={clsx('transition-opacity 0.3s ease-in object-cover object-center', `max-h-[${size.maxHeight}px]`)}
            />

            <Image
                src={images[1].url}
                alt={alt}
                fill
                className={clsx('object-cover opacity-0 transition-opacity duration-500', {
                    'opacity-100': hovered,
                })}
            />
        </div>
    )
}

type ProductCardDetailsProps = {
    details: {
        vendor: string;
        title: string;
        cost: CostType;
    }
}

const ProductCardDetails = ({details}: ProductCardDetailsProps) => {
    return (
        <div className='py-2 px-1 lg:p-0'>
            <h4 className='uppercase font-bold'>{details.vendor}</h4>
            <h5>{details.title}</h5>
            <p className='font-light'>{Number(details.cost.amount).toFixed(2)} {details.cost.currencyCode}</p>
        </div>
    )
}