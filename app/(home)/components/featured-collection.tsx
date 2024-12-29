import ContentContainer from "@/components/ui/content-container";
import Image from "next/image";

export default function FeaturedCollection() {
    return (
        <ContentContainer>
            <Image src='/featured-collection.jpeg' alt='Featured Collection' width={1700} height={500}/>
        </ContentContainer>
    )
}