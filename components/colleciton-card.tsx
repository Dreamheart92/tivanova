import Image from "next/image";
import Link from "next/link";
import {PATHS} from "@/lib/constants/paths";
import {CollectionDetailsType} from "@/lib/definitions/product.definitions";
import {extractShopifyIdFromGID} from "@/lib/utils/shopify.utils";

type CollectionCardProps = {
    collection: CollectionDetailsType;
}

export default function CollectionCard({collection}: CollectionCardProps) {
    const href = `${PATHS.COLLECTION}/${extractShopifyIdFromGID(collection.id)}`

    return (
        <div className='cursor-pointer'>
            <Link href={href}>
                <CollectionCardImage imageUrl={collection.image.url} alt={collection.title}/>
                <CollectionCardDetails title={collection.title} description={collection.description}/>

            </Link>
        </div>
    )
}

type CollectionCardImageProps = {
    imageUrl: string;
    alt: string;
}

const CollectionCardImage = ({imageUrl, alt}: CollectionCardImageProps) => {
    return (
        <div>
            <Image
                src={imageUrl}
                alt={alt}
                width={1000}
                height={500}
                className='max-h-[650px] object-cover aspect-[300/300] sm:aspect-[300/500] lg:aspect-[300/500]'
            />
        </div>
    )
}

type CollectionCardDetailsProps = {
    title: string;
    description: string;
}

const CollectionCardDetails = ({title, description}: CollectionCardDetailsProps) => {
    return (
        <div className='text-center py-2 text-sm lg:text-base'>
            <h4 className='font-bold uppercase'>{title}</h4>
            <p className='max-w-[90%] mx-auto'>
                {description}
            </p>
        </div>
    )
}