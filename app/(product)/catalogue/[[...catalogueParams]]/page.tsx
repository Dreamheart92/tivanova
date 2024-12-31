import {fetchCatalogueProducts} from "@/lib/api/product.api";
import ContentContainer from "@/components/ui/content-container";
import ProductCard from "@/components/product-card";

type CatalogueProps = {
    params: Promise<{ category: string }>,
    searchParams: Promise<{ brand?: string, color?: string, size?: string, category?: string }>,
}

export default async function Catalogue({params, searchParams}: CatalogueProps) {
    const search = await searchParams;
    const {products, filters} = await fetchCatalogueProducts(search);

    return (
        <div>
            <div className='text-center bg-red-500 py-3 mb-12 uppercase text-white'>
                <h5 className='animate-bounce font-bold'>New Collection Just Dropped</h5>
            </div>
            <ContentContainer>
                <div className='flex gap-4 flex-wrap'>
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product}/>
                    ))}
                </div>
            </ContentContainer>
        </div>
    )
}