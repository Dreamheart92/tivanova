import {CollectionCard} from "@/lib/definitions";
import Box from "@/components/box";
import Image from "next/image";
import Link from "next/link";
import {getIdFromShopifyString} from "@/lib/utils/string-utils";

export default function CategoryCard({collection}: { collection: CollectionCard }) {
    return (
        <Box
            wrap
            flex='0 0 calc(100% / 3 - 1em)'
        >
            <Link href={`/collection/${getIdFromShopifyString(collection.id)}`}>
                <Box>
                    <Image
                        src={collection.image.url}
                        alt='Category image'
                        width={800}
                        height={500}
                    />
                </Box>
                <Box
                    column
                    style={{
                        alignItems: 'center',
                        textAlign: 'center',
                        paddingTop: 10,
                    }}
                >
                    <h4 style={{
                        fontWeight: 'bold',
                        textTransform: 'uppercase',
                    }}>{collection.title}</h4>

                    <p style={{
                        maxWidth: '90%'
                    }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                        labore
                        et dolore magna aliqua.</p>
                </Box>
            </Link>
        </Box>
    )
}