import {FeaturedProductType} from "@/lib/definitions/product.definitions";
import {useWishlist} from "@/lib/context/wishlist";
import ProductCard from "@/components/product-card";
import {Button} from "@/components/ui/button";

type WishlistCardProps = {
    product: FeaturedProductType;
    size?: {
        width?: number;
        height?: number;
        maxHeight?: number;
    }
}

export default function WishlistCard({product, size}: WishlistCardProps) {
    const {updateWishlist} = useWishlist();

    const removeItemFromWishlist = async () => {
        updateWishlist('remove', product);
    }

    return (
        <div className='flex flex-col gap-1 lg:gap-4 w-fit'>
            <ProductCard
                product={product}
                height={size?.height}
                width={size?.width}
                maxHeight={size?.maxHeight}
            />

            {/*<form className=''>*/}
            {/*    <Button*/}
            {/*        formAction={removeItemFromWishlist}*/}
            {/*        className='lg:w-full'*/}
            {/*    >*/}
            {/*        Remove from wishlist*/}
            {/*    </Button>*/}
            {/*</form>*/}
        </div>
    )
}