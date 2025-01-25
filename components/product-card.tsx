'use client';

import Image from "next/image";
import {useState} from "react";
import Link from "next/link";
import {PATHS} from "@/lib/constants/paths";
import {FeaturedProductType} from "@/lib/definitions/product";
import {extractShopifyIdFromGID} from "@/lib/utils/shopify";

type ProductCardProps = {
    product: FeaturedProductType;
    width?: number;
    height?: number;
    maxHeight?: number;
}

export default function ProductCard({product, width = 500, height = 500, maxHeight = 570}: ProductCardProps) {
    const [hovered, setIsHovered] = useState(false);

    return (
        <div
            className="relative text-[1.6em] md:text-[1.2em] lg:text-[1em] cursor-pointer">
            <Link href={PATHS.PRODUCT_DETAILS(extractShopifyIdFromGID(product.id))}>
                <div
                    className="relative"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <Image
                        src={product.images[0].url}
                        alt={product.title}
                        width={width}
                        height={height}
                        className={`transition-opacity 0.3s ease-in object-cover object-center`}
                        style={{
                            maxHeight,
                        }}
                    />

                    <Image
                        src={product.images[1].url}
                        alt={product.title}
                        fill
                        style={{
                            objectFit: 'cover',
                            transition: 'opacity 0.3s ease-in',
                            opacity: hovered ? 1 : 0,
                        }}
                    />
                </div>

                <div className='py-2 px-1 lg:p-0'>
                    <h4 className='uppercase font-bold'>{product.vendor}</h4>
                    <h5>{product.title}</h5>
                    <p className='font-light'>{Number(product.priceRange.minVariantPrice.amount).toFixed(2)} {product.priceRange.minVariantPrice.currencyCode}</p>
                </div>
            </Link>
        </div>
    )
}
