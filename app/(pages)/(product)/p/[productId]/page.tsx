import Product from "@/app/(pages)/(product)/p/[productId]/components/product/product";
import {fetchProductById, fetchRelatedProducts} from "@/lib/services/product-service";

export default async function ProductWrapper({params}: { params: { productId: string } }) {
    const product = await fetchProductById(params.productId);
    const similarProducts = await fetchRelatedProducts(product.tags, product.id);

    return <Product
        product={product}
        similarProducts={similarProducts}
    />
}