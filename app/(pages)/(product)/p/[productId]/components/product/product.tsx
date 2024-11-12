'use client';

import {FeaturedProduct, Product as ProductType, Variation} from "@/lib/definitions";
import Box from "@/components/box";
import Content from "@/app/(pages)/(product)/p/[productId]/components/content";
import Images from "../images";
import {useEffect, useState} from "react";
import {addProductToRecentlyViewed, getRecentlyViewedProducts} from "@/lib/utils/recently-viewed";
import FeaturedProducts from "@/components/featured-products";

export default function Product({product, similarProducts}: {
    product: ProductType,
    similarProducts: FeaturedProduct[]
}) {
    const variations: Variation[] = [];
    const [recentlyViewedProducts, setRecentlyViewedProducts] = useState<FeaturedProduct[]>([]);

    useEffect(() => {
        addProductToRecentlyViewed(product);
        setRecentlyViewedProducts(getRecentlyViewedProducts(product.id));
    }, []);


    product.variants.edges.forEach(edge => {
        const [color, size] = edge.node.selectedOptions;

        const colorIndex = variations.findIndex((variation) => variation.color === color.value);

        if (colorIndex === -1) {
            variations.push({
                color: color.value,
                price: edge.node.price,
                id: edge.node.id,
                options: [{
                    name: size.value,
                    id: edge.node.id,
                }],
            })
        } else {
            variations[colorIndex].options.push({
                name: size.value,
                id: edge.node.id,
            });
        }
    })

    return (
        <Box
            column
            style={{
                width: '100%',
                gap: '2em',
            }}>
            <Box>
                <Images images={product.images.edges}/>
                <Content
                    product={product}
                    variants={variations}
                />
            </Box>
            <Box
                column
                style={{
                    width: '100%',
                    gap: '5em',
                }}>

                {similarProducts.length > 0
                    && (
                        <FeaturedProducts
                            title='You may also love'
                            products={similarProducts}
                        />
                    )}

                {recentlyViewedProducts.length > 0
                    && (
                        <FeaturedProducts
                            title='Recently viewed'
                            products={recentlyViewedProducts}
                        />
                    )}
            </Box>
        </Box>
    )
}