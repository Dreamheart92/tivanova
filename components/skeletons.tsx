import ContentContainer from "@/components/ui/content-container";

import {Skeleton} from "@/components/ui/skeleton";

export const ProductCardSkeleton = () => {
    return (
        <div className='basis-[100%] sm:basis-[calc(100%/2-1em)] md:basis-[calc(100%/4-1em)]'>
            <Skeleton
                className='h-[45rem] sm:h-[28rem] md:h-[22rem] lg:h-[28rem] xl:h-[27rem] 2xl:h-[35rem] rounded-none'/>
            <Skeleton className='w-[3em] h-[1em] rounded-none mt-2'/>
            <Skeleton className='w-[8em] h-[1em] rounded-none mt-2'/>
            <Skeleton className='w-[3em] h-[1em] rounded-none mt-2'/>
        </div>
    )
}

export const FeaturedProductsSkeleton = () => {
    return (
        <ContentContainer>
            <Skeleton className='w-[8em] h-[1em] mb-4 rounded-none'/>
            <Skeleton className='w-[24em] h-[1em] mb-4 rounded-none'/>

            <div className='flex flex-wrap gap-4'>
                <ProductCardSkeleton/>
                <ProductCardSkeleton/>
                <ProductCardSkeleton/>
                <ProductCardSkeleton/>
            </div>
        </ContentContainer>
    )
}

export const CollectionCardSkeleton = () => {
    return (
        <div>
            <Skeleton className='h-[40rem] sm:h-[45rem] w-[35em] rounded-none'/>

            <div className='flex justify-center mt-2 flex-col items-center'>
                <Skeleton className='w-[8em] h-[1em] rounded-none'/>
                <Skeleton className='w-[24em] h-[1em] mt-2 rounded-none'/>
            </div>
        </div>
    )
}

export const FeaturedCollectionsSkeleton = () => {
    return (
        <ContentContainer>
            <div className='flex gap-4'>
                <CollectionCardSkeleton/>
                <CollectionCardSkeleton/>
                <CollectionCardSkeleton/>
            </div>
        </ContentContainer>
    )
}

const ProductDetailsGallerySkeleton = () => {
    return <Skeleton className='w-[1000px] h-[93.6vh] rounded-none'/>
}

const ProductDetailsSkeleton = () => {
    return (
        <div className='mt-[5em] flex gap-4 flex-col'>
            <div className='w-full'>
                <div className='flex justify-between w-full'>
                    <Skeleton className='w-[12em] h-[1em] rounded-none'/>
                    <Skeleton className='w-[6em] h-[1em] rounded-none'/>
                </div>
                <Skeleton className='w-[6em] h-[1em] rounded-none mt-2'/>
            </div>

            <div>
                <Skeleton className='w-[4em] h-[1em] rounded-none mt-2'/>
                <Skeleton className='w-[5em] h-[2em] mt-2'/>
            </div>

            <div>
                <Skeleton className='w-[4em] h-[1em] rounded-none mt-2'/>
                <Skeleton className='w-full h-[2em] mt-2'/>
            </div>

            <div className='flex gap-4'>
                <Skeleton className='basis-4/5 h-[2em] mt-2'/>
                <Skeleton className='flex-1 h-[2em] mt-2'/>
            </div>

            <div>
                <Skeleton className='w-full h-[8em]'/>
            </div>

            <div>
                <Skeleton className='w-full h-[5em]'/>
            </div>

        </div>
    )
}

export const ProductSkeleton = () => {
    return (
        <div className='flex w-full'>
            <div className='basis-[60%]'>
                <ProductDetailsGallerySkeleton/>
            </div>

            <div className='basis-[30%]'>
                <ProductDetailsSkeleton/>
            </div>
        </div>
    )
}