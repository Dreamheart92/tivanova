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
            <AnnouncementBanner/>
            <ContentContainer>
                <ProductList products={products}/>
            </ContentContainer>
        </div>
    )
}