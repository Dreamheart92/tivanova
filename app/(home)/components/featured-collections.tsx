import {CollectionMeta} from "@/lib/definitions";
import CollectionCard from "@/components/colleciton-card";
import ContentContainer from "@/components/ui/content-container";

type FeaturedCollectionsProps = {
    collections: CollectionMeta[];
}

export default function FeaturedCollections({collections}: FeaturedCollectionsProps) {
    return (
        <ContentContainer>
            <div className='flex gap-4 flex-wrap md:flex-nowrap'>
                {collections.map((collection) => (
                    <CollectionCard key={collection.id} collection={collection}/>
                ))}
            </div>
        </ContentContainer>
    )
}