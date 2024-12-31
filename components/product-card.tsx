'use client';

import {FeaturedProduct} from "@/lib/definitions";
import Image from "next/image";
import {useState} from "react";
import Link from "next/link";
import {PATHS} from "@/lib/constants/paths";
import {getIdFromShopifyString} from "@/lib/utils";

type ProductCardProps = {
    product: FeaturedProduct;
}

export default function ProductCard({product}: ProductCardProps) {
    const [hovered, setIsHovered] = useState(false);

    return (
        <div
            className="relative text-[1.6em] md:text-[1.2em] lg:text-[1em] cursor-pointer basis-[100%] sm:basis-[calc(100%/2-1em)] md:basis-[calc(100%/3-1em)]">
            <Link href={PATHS.PRODUCT_DETAILS(getIdFromShopifyString(product.id))}>
                <div
                    className="relative"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <Image
                        src={product.images.edges[0].node.url}
                        alt={product.title}
                        width={500}
                        height={110}
                        className="max-h-[45rem] sm:max-h-[28rem] md:max-h-[22rem] lg:max-h-[28rem] xl:max-h-[27rem] 2xl:max-h-[35rem]"
                        style={{
                            opacity: hovered ? 0 : 1,
                            transition: 'opacity 0.3s ease-in',
                            objectFit: 'cover',
                            objectPosition: 'center',
                        }}
                    />

                    <Image
                        src={product.images.edges[1].node.url}
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
                    <p className='font-light'>{Number(product.priceRange.minVariantPrice.amount).toFixed(2)} EUR</p>
                </div>
            </Link>
        </div>
    )
}
