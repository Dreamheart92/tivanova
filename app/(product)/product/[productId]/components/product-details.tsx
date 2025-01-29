import {Separator} from "@/components/ui/separator";
import VariantSelector from "@/app/(product)/product/[productId]/components/variant-selector";
import AddToCartButton from "@/app/(product)/product/[productId]/components/add-to-cart-button";
import WishlistButton from "@/app/(product)/product/[productId]/components/wishlist-button";
import {ProductType} from "@/lib/definitions/product.definitions";

type ProductDetailsProps = {
    settings: {
        currency: string;
        colorPicker: {
            label: string;
        }
        sizePicker: {
            label: string;
            placeholder: string;
        },
        addToCartButton: string;
        description: string;
        shipping: {
            label: string;
            content: string;
        }
    }
    product: ProductType;
}

export default function ProductDetails({product, settings}: ProductDetailsProps) {
    return (
        <div className='p-4 md:p-0 md:pt-[5em] w-full md:basis-[30%] flex flex-col gap-4 text-sm md:text-base'>
            <div>
                <div className='flex flex-col md:flex-row md:justify-between md:items-center'>
                    <h3>{product.title}</h3>
                    <p>{Number(product.priceRange.minVariantPrice.amount).toFixed(2)} {product.priceRange.minVariantPrice.currencyCode}</p>
                </div>
                <p className='text-[#919191]'>{product.vendor}</p>
            </div>

            <VariantSelector variants={product.variants}/>

            <div className='flex gap-2'>
                <AddToCartButton product={product}/>
                <WishlistButton product={product}/>
            </div>

            <div>
                <h5 className='font-bold pb-2'>{settings.description}</h5>

                <div dangerouslySetInnerHTML={{__html: product.descriptionHtml}}/>
            </div>

            <Separator/>

            <div>
                <h5 className='font-bold pb-2'>{settings.shipping.label}</h5>

                <p>{settings.shipping.content}</p>
            </div>
        </div>
    )
}