import {fetchProductById} from "@/lib/api/product.api";
import {organizeProductVariants} from "@/lib/product.utils";
import {notFound} from "next/navigation";
import {ProductSkeleton} from "@/components/skeletons";
import ProductGallery from "@/app/(product)/product/[productId]/components/product-gallery";
import ProductDetails from "@/app/(product)/product/[productId]/components/product-details";
import {Suspense} from "react";

const pageSettings = {
    scrollCaption: 'Scroll for more',
    productDetails: {
        currency: 'EURO',
        colorPicker: {
            label: 'Color',
        },
        sizePicker: {
            label: 'Size',
            placeholder: 'Select a size',
        },
        addToCartButton: 'Add to cart',
        description: 'Description',
        shipping: {
            label: 'Shipping & returns',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
        }
    },
}

const ProductWrapper = async ({productId}: { productId: string }) => {
    const product = await fetchProductById(productId);

    if (!product) {
        notFound();
    }

    const productVariants = organizeProductVariants(product.variants.edges);

    return (
        <div className='flex'>
            <ProductGallery images={product.images.edges} scrollCaption={pageSettings.scrollCaption}/>
            <ProductDetails
                settings={pageSettings.productDetails}
                product={product}
                variants={productVariants}
            />
        </div>
    )
}

type ProductProps = {
    params: Promise<{ productId: string }>;
}

export default async function Product({params}: ProductProps) {
    const {productId} = await params;

    return (
        <Suspense fallback={<ProductSkeleton/>}>
            <ProductWrapper productId={productId}/>
        </Suspense>
    )
}