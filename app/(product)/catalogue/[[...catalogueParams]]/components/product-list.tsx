import ProductCard from "@/components/product-card";
import ProductsGrid from "@/components/products-grid";
import {FeaturedProductType} from "@/lib/definitions/product";

type ProductListProps = {
    products: FeaturedProductType[];
}

export default function ProductList({products}: ProductListProps) {
    return (
        <ProductsGrid>
            {products.map((product) => (
                <ProductCard key={product.id} product={product}/>
            ))}
        </ProductsGrid>
    )
}