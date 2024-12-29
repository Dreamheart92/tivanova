'use client';

import {FeaturedProduct} from "@/lib/definitions";
import Image from "next/image";
import {useState} from "react";

type ProductCardProps = {
    product: FeaturedProduct;
}

export default function ProductCard({product}: ProductCardProps) {
    const [hovered, setIsHovered] = useState(false);

    return (
        <div className="relative cursor-pointer">
            <div
                className="relative"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <Image
                    src={product.images.edges[0].node.url}
                    alt={product.title}
                    width={500}
                    height={550}
                    style={{
                        opacity: hovered ? 0 : 1,
                        transition: 'all 0.3s ease-in',
                        objectFit: 'cover',
                        maxHeight: '550px',
                    }}
                />

                <Image
                    src={product.images.edges[1].node.url}
                    alt={product.title}
                    fill
                    style={{
                        objectFit: 'cover',
                        transition: 'all 0.3s ease-in',
                        opacity: hovered ? 1 : 0,
                    }}
                />
            </div>

            <div>
                <h4 className='uppercase font-bold'>{product.vendor}</h4>
                <h5>{product.title}</h5>
                <p className='font-light'>{Number(product.priceRange.minVariantPrice.amount).toFixed(2)} EUR</p>
            </div>
        </div>
    )
}