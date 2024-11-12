'use client';

import {FeaturedProduct} from "@/lib/definitions";
import ProductCard from "@/components/product-card";
import Box from "@/components/box";
import Button from "@/components/button";
import {useWishlist} from "@/lib/store/wishlist";

export default function WishlistCard({product}: { product: FeaturedProduct }) {
    const {removeItemFromWishlist} = useWishlist();

    return (
        <Box column gap='1em'>
            <ProductCard key={product.id} product={product}/>
            <Box column gap='0.5em' style={{width: '100%'}}>
                <Button
                    onClick={() => removeItemFromWishlist(product.id)}
                    variant='transparent'
                >
                    REMOVE FROM WISHLIST
                </Button>
            </Box>
        </Box>
    )
}