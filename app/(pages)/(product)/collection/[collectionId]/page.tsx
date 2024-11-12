import {fetchCollection, fetchCollectionImage} from "@/lib/services/product-service";
import ProductCard from "@/components/product-card";
import ContentBox from "@/components/content-box";
import Box from "@/components/box";
import Image from "next/image";

export default async function Collection({params}: { params: { collectionId: string } }) {
    const collection = await fetchCollection(params.collectionId);
    const collectionImage = await fetchCollectionImage(collection.title);

    return (
        <Box column>
            <Box style={{position: 'relative', height: '40em', width: '100%'}}>
                <Image src={collectionImage} alt='Collection image' fill quality={100}
                       style={{objectFit: 'cover', objectPosition: 'center'}}/>
            </Box>
            <ContentBox>
                <Box
                    column
                    justify='center'
                    align='center'
                    style={{
                        width: '100%',
                        textAlign: 'center',
                        marginBottom: '2em',
                    }}
                >
                    <h1 style={{
                        fontSize: '1.9em',
                        borderBottom: '1px solid #EEE',
                        paddingBottom: '0.5em',
                        marginBottom: '0.5em'
                    }}>{collection.title}</h1>
                    <p style={{maxWidth: '80%'}}>{collection.description}</p>
                </Box>

                <Box style={{width: '100%', justifyContent: 'center'}}>
                    <Box style={{flexWrap: 'wrap', justifyContent: 'center', gap: '1em'}}>
                        {collection.products.nodes.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                width='35em'
                                maxHeight='45em'
                            />
                        ))}
                    </Box>
                </Box>
            </ContentBox>
        </Box>
    )
}
