import Box from "@/components/box";
import styles from "@/app/(pages)/(product)/p/[productId]/components/product/index.module.css";
import Image from "next/image";
import {ProductImage as ProductImageType} from "@/lib/definitions";
import {HeartOutlined} from "@ant-design/icons";

const ProductImage = ({url, width, height}: { url: string, width: number, height: number }) => {
    return (
        <Image
            src={url}
            alt='Product image'
            width={width}
            height={height}
            style={{
                objectFit: 'cover',
            }}
        />
    )
}


export default function Images({images}: { images: ProductImageType[] }) {
    return (
        <Box style={{
            width: '60%',
            maxHeight: '60em',
            overflowY: 'scroll',
            gap: '0.25em',
            position: 'relative',
        }}
             noScrollbar
        >
            <div className={styles.grid}>
                {images.map((image, index) => {
                    const width = index !== 1 && index !== 2 ? 1000 : 500;
                    const height = index !== 1 && index !== 2 ? 1500 : 750;

                    return (
                        <ProductImage
                            key={image.node.url}
                            url={image.node.url}
                            width={width}
                            height={height}
                        />
                    )
                })}
            </div>
            <h4 style={{
                marginTop: '10em',
                transformOrigin: '0 0',
                transform: 'rotate(-90deg)',
            }}>Scroll for more</h4>
        </Box>
    )
}