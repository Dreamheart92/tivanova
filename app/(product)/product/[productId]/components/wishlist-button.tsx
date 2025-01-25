'use client';

import {Button} from "@/components/ui/button";
import {Heart} from "lucide-react";
import {useWishlist} from "@/lib/context/wishlist";

import {ProductType} from "@/lib/definitions/product.definitions";

export default function WishlistButton({product}: { product: ProductType }) {
    const {wishlist, updateWishlist} = useWishlist();

    const onWishlist = wishlist?.lines.find((wishlistItem) => wishlistItem.id === product.id);

    const handleWishlist = async () => {
        updateWishlist(onWishlist ? 'remove' : 'add', product);
    }

    return (
        <form className='flex flex-1'>
            <Button
                variant='default'
                className='flex-1'
                formAction={handleWishlist}
            >
                <Heart fill={onWishlist ? 'white' : 'transparent'}/>
            </Button>
        </form>
    )
}