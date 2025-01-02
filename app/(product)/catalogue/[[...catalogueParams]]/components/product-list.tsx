import ProductCard from "@/components/product-card";
import {FeaturedProduct} from "@/lib/definitions";

type ProductListProps = {
    products: FeaturedProduct[];
}

export default function ProductList({products}: ProductListProps) {
    return (
        <div className='flex gap-4 flex-wrap'>
            {products.map((product) => (
                <ProductCard key={product.id} product={product}/>
            ))}
        </div>
    )
}