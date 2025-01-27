import {fetchCollections} from "@/lib/api/product.api";
import {CollectionDetailsType} from "@/lib/definitions/product.definitions";
import Image from "next/image";
import ContentContainer from "@/components/ui/content-container";
import Link from "next/link";
import {PATHS} from "@/lib/constants/paths";
import {extractShopifyIdFromGID} from "@/lib/utils/shopify.utils";
import {Suspense} from "react";
import {CollectionsSkeleton} from "@/components/skeletons";

const CollectionCard = ({collection}: { collection: CollectionDetailsType }) => {
    const href = `${PATHS.COLLECTION}/${extractShopifyIdFromGID(collection.id)}`;

    return (
        <div className='relative'>
            <Link href={href}>
                <Image
                    src={collection.backdropImage.previewImage.url}
                    alt={collection.title}
                    width={1200}
                    height={500}
                    className='max-h-[500px] object-cover brightness-75'
                />

                <div className='absolute top-1/2 text-center -translate-y-1/2 w-full'>
                    <h1 className='text-stone-200 text-[4em]'>{collection.title}</h1>
                </div>
            </Link>
        </div>
    )
}

const CollectionsWrapper = async () => {
    try {
        const collections = await fetchCollections();

        return (
            <ContentContainer>
                <div className='flex flex-col justify-center items-center gap-4'>
                    {collections.map((collection) => (
                        <CollectionCard key={collection.id} collection={collection}/>
                    ))}
                </div>
            </ContentContainer>
        )
    } catch (error) {
        console.error(error);
        return <CollectionsSkeleton hasError={true}/>
    }
}

export default async function Collections() {
    return (
        <Suspense fallback={<CollectionsSkeleton/>}>
            <CollectionsWrapper/>
        </Suspense>
    )
}