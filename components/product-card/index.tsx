'use client';

import {FeaturedProduct} from "@/lib/definitions";
import Image from "next/image";
import {useState} from "react";
import {useRouter} from "next/navigation";
import Box from "@/components/box";
import {getIdFromShopifyString} from "@/lib/utils/string-utils";

export default function ProductCard({product, width = '28em', maxHeight = '550px'}: {
    product: FeaturedProduct,
    width?: string,
    maxHeight?: string
}) {
    const [hovered, setHovered] = useState(false);

    const router = useRouter();

    const handleRedirect = () => {
        const id = getIdFromShopifyString(product.id);
        router.push(`/p/${id}`);
    }

    return (
        <Box
            column
            props={{
                onMouseEnter: () => setHovered(true),
                onMouseLeave: () => setHovered(false),
                onClick: () => handleRedirect(),
            }}
            style={{
                cursor: 'pointer',
            }}
        >
            <Box style={{
                position: 'relative',
            }}>
                <Image
                    src={product.images.edges[0].node.url}
                    alt='Product image'
                    width={500}
                    height={500}
                    style={{
                        opacity: hovered ? 0 : 1,
                        transition: 'all 0.3s ease-in',
                        objectFit: 'cover',
                        width,
                        maxHeight,
                    }}
                />

                <Image
                    src={product.images.edges[1].node.url}
                    alt='Product image'
                    fill
                    style={{
                        opacity: hovered ? 1 : 0,
                        transition: 'all 0.3s ease-in',
                        objectFit: 'cover',
                    }}
                />
            </Box>

            <Box
                column
                style={{
                    paddingTop: '0.5em',
                }}
            >
                <h4 style={{
                    textTransform: 'uppercase',
                    fontWeight: '500'
                }}>
                    {product.vendor}
                </h4>
                <h5 style={{
                    fontWeight: '300',
                    textTransform: 'uppercase',
                }}>
                    {product.title}
                </h5>
                <p style={{
                    fontWeight: '300'
                }}>{Number(product.priceRange.minVariantPrice.amount).toFixed(2)} EUR</p>
            </Box>
        </Box>
    )
}
