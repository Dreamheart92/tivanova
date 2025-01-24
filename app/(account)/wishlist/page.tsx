'use client';

import {useWishlist} from "@/lib/context/wishlist";
import ContentContainer from "@/components/ui/content-container";
import ProductCard from "@/components/product-card";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {PATHS} from "@/lib/constants/paths";
import {FeaturedProductType} from "@/lib/definitions/product";

const WishlistCard = ({product}: { product: FeaturedProductType }) => {
    const {updateWishlist} = useWishlist();

    const removeItemFromWishlist = async () => {
        updateWishlist('remove', product);
    }

    return (
        <div className='flex flex-col basis-[calc(100%/4-1em)] gap-4'>
            <ProductCard product={product}/>
            <form className=''>
                <Button
                    variant='secondary'
                    formAction={removeItemFromWishlist}
                    className='w-full'
                >
                    Remove from wishlist
                </Button>
            </form>
        </div>
    )
}

const EmptyWishlist = () => {
    return (
        <div className='text-center pt-12'>
            <h3>Your wishlist is currently empty.</h3>
            <p>Explore our collection and save the pieces that inspire your style.</p>

            <div className='pt-2'>
                <Link href={PATHS.SHOP}>
                    <Button className='w-36'>Shop all</Button>
                </Link>
            </div>
        </div>
    )
}

const WishlistItems = ({wishlist}: { wishlist: FeaturedProductType[] }) => {
    return (
        <>
            <div className='py-4'>
                <h2>Explore Your Saved Favorites Below</h2>
            </div>
            <div className='flex flex-wrap gap-4'>
                {wishlist.map((product) => (
                    <WishlistCard key={product.id} product={product}/>
                ))}
            </div>
        </>
    )
}

export default function Wishlist() {
    const {wishlist} = useWishlist();

    return (
        <ContentContainer>
            {wishlist && (
                (wishlist.lines.length > 0 ? (
                    <WishlistItems wishlist={wishlist.lines}/>
                ) : <EmptyWishlist/>)
            )}
        </ContentContainer>
    )
}