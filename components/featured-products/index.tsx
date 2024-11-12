import ContentBox from "@/components/content-box";
import ProductCard from "@/components/product-card";
import {FeaturedProduct} from "@/lib/definitions";

type FeaturedProductsProps = {
    products: FeaturedProduct[];
    title: string;
    caption?: string;
}

export default function FeaturedProducts({products, title, caption}: FeaturedProductsProps) {
    return (
        <ContentBox
            title={title}
            caption={caption}
        >
            <div style={{
                display: 'grid',
                width: '100%',
                gridTemplateColumns: 'repeat(4,1fr)',
                columnGap: '1em',
            }}>
                {products.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                    />
                ))}
            </div>
        </ContentBox>
    )
}