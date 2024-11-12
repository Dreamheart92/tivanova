import ContentBox from "@/components/content-box";
import Box from "@/components/box";
import Image from "next/image";

export default function Banner() {
    return (
        <ContentBox>
            <Box>
                <Image src='/banner.jpeg' alt='Banner' width={1700} height={500}/>
            </Box>
        </ContentBox>
    )
}