'use client';

import {useWishlist} from "@/lib/context/wishlist";
import ContentContainer from "@/components/ui/content-container";
import ProductCard from "@/components/product-card";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {PATHS} from "@/lib/constants/paths";
import {FeaturedProductType} from "@/lib/definitions/product.definitions";
import WishlistCard from "@/components/wishlist-card";

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
                <h2 className='text-2xl'>Explore Your Saved Favorites Below</h2>
            </div>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2'>
                {wishlist.map((product) => (
                    <WishlistCard
                        key={product.id}
                        product={product}
                        size={{
                            width: 400,
                            height: 300
                        }}
                    />
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