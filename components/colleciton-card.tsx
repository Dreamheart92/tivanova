import Image from "next/image";
import Link from "next/link";
import {PATHS} from "@/lib/constants/paths";
import {CollectionDetailsType} from "@/lib/definitions/product";
import {extractShopifyIdFromGID} from "@/lib/utils/shopify";

type CollectionCardProps = {
    collection: CollectionDetailsType;
}

export default function CollectionCard({collection}: CollectionCardProps) {
    const href = `${PATHS.COLLECTION}/${extractShopifyIdFromGID(collection.id)}`

    return (
        <div className='cursor-pointer'>
            <Link href={href}>
                <div>
                    <Image
                        src={collection.image.url}
                        alt={collection.title}
                        width={1000}
                        height={900}
                        className='max-h-[650px] object-cover'
                    />
                </div>

                <div className='text-center py-4'>
                    <h4 className='font-bold uppercase'>{collection.title}</h4>
                    <p className='max-w-[90%] mx-auto'>
                        {collection.description}
                    </p>
                </div>
            </Link>
        </div>
    )
}