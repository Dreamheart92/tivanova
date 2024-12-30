import {CollectionMeta} from "@/lib/definitions";
import Image from "next/image";

type CollectionCardProps = {
    collection: CollectionMeta;
}

export default function CollectionCard({collection}: CollectionCardProps) {
    return (
        <div className='cursor-pointer flex flex-col basis-[100%]'>
            <div>
                <Image
                    src={collection.image.url}
                    alt={collection.title}
                    width={100}
                    height={900}
                    className='max-h-[40rem] sm:max-h-[45rem]'
                    layout='responsive'
                    style={{
                        objectFit: 'cover',
                    }}

                />
            </div>

            <div className='text-center py-4'>
                <h4 className='font-bold uppercase'>{collection.title}</h4>
                <p className='max-w-[90%] mx-auto'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                    labore
                    et dolore magna aliqua.
                </p>
            </div>
        </div>
    )
}