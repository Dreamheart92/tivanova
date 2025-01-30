import ContentContainer from "@/components/ui/content-container";
import {search} from "@/lib/api/product.api";
import ProductsGrid from "@/components/products-grid";
import ProductCard from "@/components/product-card";

type SearchProps = {
    searchParams: Promise<{
        query: string;
    }>
}

const Wrapper = ({caption, children}: { caption: string, children?: React.ReactNode }) => {
    return (
        <ContentContainer>
            <div className='pt-12 text-sm lg:text-base'>
                <div className='pb-4'>
                    <h3>Search</h3>
                    <p>{caption}</p>
                </div>

                <div>
                    {children}
                </div>
            </div>
        </ContentContainer>
    )
}

export default async function Search({searchParams}: SearchProps) {
    const {query} = await searchParams;

    if (!query) {
        return (
            <Wrapper caption='Please enter a search query.'/>
        )
    }

    const searchResult = await search(query);
    const caption = `${searchResult.count} results for "${query}"`;

    return (
        <Wrapper caption={caption}>
            <ProductsGrid>
                {searchResult.result.map((product) => (
                    <ProductCard key={product.id} product={product}/>
                ))}
            </ProductsGrid>
        </Wrapper>

    )
}