import ContentContainer from "@/components/ui/content-container";
import ProductCard from "@/components/product-card";
import ProductsGrid from "@/components/products-grid";
import {FeaturedProductType} from "@/lib/definitions/product";

type Meta = {
    title: string;
    caption: string;
}

type FeaturedProductsProps = {
    meta: Meta;
    products: FeaturedProductType[];
}

const SectionMetaData = ({meta}: { meta: Meta }) => {
    return (
        <div className='pb-4 text-[1.4em] lg:text-[1em] text-center lg:text-left'>
            <h3>{meta.title}</h3>
            <h4>{meta.caption}</h4>
        </div>
    )
}

export default function FeaturedProducts({products, meta}: FeaturedProductsProps) {
    return (
        <ContentContainer>
            <div className=''>
                <SectionMetaData meta={meta}/>
                <ProductsGrid>
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product}/>
                    ))}
                </ProductsGrid>
            </div>
        </ContentContainer>
    )
}