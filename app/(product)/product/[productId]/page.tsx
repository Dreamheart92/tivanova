import {fetchProductById} from "@/lib/api/product.api";
import {organizeProductVariants} from "@/lib/product.utils";
import {notFound} from "next/navigation";
import {ProductSkeleton} from "@/components/skeletons";
import ProductGallery from "@/app/(product)/product/[productId]/components/product-gallery";
import ProductDetails from "@/app/(product)/product/[productId]/components/product-details";
import {Suspense} from "react";

type ProductProps = {
    params: Promise<{ productId: string }>;
}

const ProductWrapper = async ({productId}: { productId: string }) => {
    const product = await fetchProductById(productId);

    if (!product) {
        notFound();
    }

    const productVariants = organizeProductVariants(product.variants.edges);

    return (
        <div className='flex'>
            <ProductGallery images={product.images.edges}/>
            <ProductDetails product={product} variants={productVariants}/>
        </div>
    )
}

export default async function Product({params}: ProductProps) {
    const {productId} = await params;

    return (
        <Suspense fallback={<ProductSkeleton/>}>
            <ProductWrapper productId={productId}/>
        </Suspense>
    )
}