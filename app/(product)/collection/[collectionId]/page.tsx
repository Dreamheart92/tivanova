import {fetchCollection} from "@/lib/api/product.api";
import Image from "next/image";
import ContentContainer from "@/components/ui/content-container";
import ProductCard from "@/components/product-card";
import ProductsGrid from "@/components/products-grid";
import {CollectionSkeleton} from "@/components/skeletons";
import {Suspense} from "react";

type CollectionProps = {
    params: Promise<{ collectionId: string }>;
}

const CollectionWrapper = async ({collectionId}: { collectionId: string }) => {
    try {
        const collection = await fetchCollection(collectionId);

        return (
            <ContentContainer>
                <div>
                    <picture>
                        <source
                            media="(max-width: 768px)"
                            srcSet={collection.image.url}
                        />

                        <img
                            src={collection.backdropImage.previewImage.url}
                            alt="Banner"
                            className='object-cover brightness-90 aspect-[500/500] md:aspect-[1200/550]'
                        />
                    </picture>

                    <div className='text-center py-4'>
                        <h1>{collection.title}</h1>
                        <p>{collection.description}</p>
                    </div>
                </div>

                <div className='md:max-w-[70%] mx-auto'>
                    <ProductsGrid cols={2}>
                        {collection.products.map((product) => (
                            <ProductCard key={product.id} product={product} maxHeight={750} width={1000}/>
                        ))}
                    </ProductsGrid>
                </div>
            </ContentContainer>
        )
    } catch (error) {
        console.error(error);
        return <CollectionSkeleton error={true}/>
    }
}

export default async function Collection({params}: CollectionProps) {
    const {collectionId} = await params;

    return (
        <Suspense fallback={<CollectionSkeleton/>}>
            <CollectionWrapper collectionId={collectionId}/>
        </Suspense>
    )
}