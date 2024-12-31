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
