'use client';

import {Dialog, DialogContent, DialogTitle} from "@/components/ui/dialog";
import {VisuallyHidden} from "@radix-ui/react-visually-hidden";
import {forwardRef, useEffect, useState} from "react";
import Image from "next/image";
import {ImageType} from "@/lib/definitions/definitions";

type ProductGalleryZoomProps = {
    images: ImageType[];
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
                onOpenAutoFocus={(event) => event.preventDefault()}
            >
                <div className='w-full h-full overflow-y-auto overflow-x-hidden'>
                    {selectedImage !== null && (
                        <Image
                            src={images[selectedImage].url}
                            alt='Product Image'
                            width={1920}
                            height={1000}
                            quality={100}
                            className='w-full object-cover object-center'
                        />
                    )}

                    <div
                        className='fixed bottom-0 flex md:block gap-4 md:left-8 md:top-1/2 animate-slideInFromBottom md:animate-slideInFromLeft w-fit'>
                        {images.map((image, index) => (
                            <Image
                                key={image.url}
                                src={image.url}
                                alt='Product Image'
                                width={70}
                                height={50}
                                className={`my-4 ${index === selectedImage ? 'opacity-100' : 'opacity-50'} cursor-pointer`}
                                onMouseEnter={() => setSelectedImage(index)}
                            />
                        ))}
                    </div>
                </div>

            </DialogContent>
        </Dialog>
    )
}
