import {FeaturedProduct} from "@/lib/definitions";
import ContentContainer from "@/components/ui/content-container";
import ProductCard from "@/components/product-card";

type Meta = {
    title: string;
    caption: string;
}

type FeaturedProductsProps = {
    meta: Meta;
    products: FeaturedProduct[];
}

const SectionMetaData = ({meta}: { meta: Meta }) => {
    return (
        <div className='pb-4'>
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

                <div className='flex gap-4'>
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product}/>
                    ))}
                </div>
            </div>
        </ContentContainer>
    )
}