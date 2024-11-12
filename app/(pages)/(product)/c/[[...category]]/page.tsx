import ContentBox from "@/components/content-box";
import Box from "@/components/box";
import Link from "next/link";
import {fetchCatalogueProducts} from "@/lib/services/product-service";
import ProductCard from "@/components/product-card";
import Filter from "@/app/(pages)/(product)/c/[[...category]]/components/filter";
import CatalogueGrid from "@/components/catalogue-grid";

export default async function Shop({params, searchParams}: {
    params: { category: string },
    searchParams: { brand?: string, color?: string, size?: string, category?: string },
}) {
    const categoryId = params.category?.[0];
    const hasQuery = Object.keys(searchParams).length > 0;

    const {products, filters} = await fetchCatalogueProducts(searchParams);

    return (
        <ContentBox>
            <Box
                gap='3em'
                style={{
                    paddingBottom: '0.25em',
                }}
                align='center'
            >
                <Filter filters={filters[0].values} attribute={filters[0].label.toLowerCase()}/>
                <Filter filters={filters[1].values} attribute={filters[1].label.toLowerCase()}/>
                <Filter filters={filters[2].values} attribute={filters[2].label.toLowerCase()}/>
                <Filter filters={filters?.[3]?.values} attribute={filters?.[3]?.label?.toLowerCase()}/>

                {hasQuery && (
                    <Link
                        href={`/c${categoryId ? `/${categoryId}` : ''}`}
                        style={{
                            textDecoration: 'underline',
                        }}
                    >
                        Clear filters
                    </Link>
                )}
            </Box>

            <CatalogueGrid>
                {products.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                    />
                ))}
            </CatalogueGrid>
        </ContentBox>
    )
}
