'use client';

import {ProductImage} from "@/lib/definitions";
import {Dialog, DialogContent, DialogTitle} from "@/components/ui/dialog";
import {VisuallyHidden} from "@radix-ui/react-visually-hidden";
import {useEffect, useState} from "react";
import Image from "next/image";

type ProductGalleryZoomProps = {
    images: ProductImage[];
    open: boolean;
    onClose: () => void;
    selectedImageIndex: number | null;
}
export default function ProductGalleryZoom({images, open, onClose, selectedImageIndex}: ProductGalleryZoomProps) {
    const [selectedImage, setSelectedImage] = useState(selectedImageIndex);

    useEffect(() => {
        setSelectedImage(selectedImageIndex);
    }, [selectedImageIndex]);

    return (
        <Dialog
            open={open}
            onOpenChange={onClose}
        >
            <DialogTitle>
                <VisuallyHidden>Product Image Gallery</VisuallyHidden>
            </DialogTitle>
            <DialogContent
                className='min-w-full h-full p-0 m-0 border-0'
                style={{borderRadius: 'unset'}}
            >
                <div className='w-full h-full overflow-y-scroll'>
                    {selectedImage !== null && (
                        <Image src={images[selectedImage].node.url} alt='Product Image' width={1920} height={1000}
                               quality={100}/>
                    )}
                </div>

                <div className='absolute left-8 top-1/2 animate-slideInFromLeft'>
                    {images.map((image, index) => (
                        <Image
                            key={image.node.url}
                            src={image.node.url}
                            alt='Product Image'
                            width={70}
                            height={50}
                            className={`my-4 ${index === selectedImage ? 'opacity-100' : 'opacity-50'} cursor-pointer`}
                            onMouseEnter={() => setSelectedImage(index)}
                        />
                    ))}
                </div>
            </DialogContent>
        </Dialog>
    )
}