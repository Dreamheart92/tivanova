import ContentContainer from "@/components/ui/content-container";

import {Skeleton} from "@/components/ui/skeleton";
import {Ghost} from "lucide-react";
import ErrorMessage from "@/app/(auth)/components/error-message";
import {clsx} from "clsx";

const ErrorWrapper = ({errorMessage}: { errorMessage: string }) => {
    return (
        <div className='mb-4'>
            <ErrorMessage error={errorMessage} align='left'/>
        </div>
    )
}

const ErrorSkeleton = ({className}: { className: string }) => {
    return (
        <Skeleton
            className={clsx('flex justify-center items-center', className)}>
            <Ghost width={50} height={50}/>
        </Skeleton>
    )
}

export const ProductCardSkeleton = ({error}: { error?: boolean }) => {
    const boxStyle = 'h-[45rem] sm:h-[28rem] md:h-[22rem] lg:h-[28rem] xl:h-[27rem] 2xl:h-[35rem] rounded-none';

    const Box = error ? <ErrorSkeleton className={boxStyle}/> : <Skeleton className={boxStyle}/>

    return (
        <div className='basis-[100%] sm:basis-[calc(100%/2-1em)] md:basis-[calc(100%/4-1em)]'>
            {Box}
            <Skeleton className='w-[3em] h-[1em] rounded-none mt-2'/>
            <Skeleton className='w-[8em] h-[1em] rounded-none mt-2'/>
            <Skeleton className='w-[3em] h-[1em] rounded-none mt-2'/>
        </div>
    )
}

export const FeaturedProductsSkeleton = ({errorMessage}: { errorMessage?: string }) => {
    return (
        <ContentContainer>
            {!errorMessage && (
                <>
                    <Skeleton className='w-[8em] h-[1em] mb-4 rounded-none'/>
                    <Skeleton className='w-[24em] h-[1em] mb-4 rounded-none'/>
                </>
            )}

            {errorMessage && (
                <ErrorWrapper errorMessage={errorMessage}/>
            )}

            <div className='flex flex-wrap gap-4'>
                <ProductCardSkeleton error={!!errorMessage}/>
                <ProductCardSkeleton error={!!errorMessage}/>
                <ProductCardSkeleton error={!!errorMessage}/>
                <ProductCardSkeleton error={!!errorMessage}/>
            </div>
        </ContentContainer>
    )
}

export const CollectionCardSkeleton = ({error}: { error?: boolean }) => {
    const boxStyle = 'h-[40rem] sm:h-[45rem] w-[35em] rounded-none'

    const Box = error ? <ErrorSkeleton className={boxStyle}/> : <Skeleton className={boxStyle}/>

    return (
        <div>
            {Box}
            <div className='flex justify-center mt-2 flex-col items-center'>
                <Skeleton className='w-[8em] h-[1em] rounded-none'/>
                <Skeleton className='w-[24em] h-[1em] mt-2 rounded-none'/>
            </div>
        </div>
    )
}

export const FeaturedCollectionsSkeleton = ({errorMessage}: { errorMessage?: string }) => {
    return (
        <ContentContainer>
            {errorMessage && (<ErrorWrapper errorMessage={errorMessage}/>)}
            <div className='flex gap-4'>
                <CollectionCardSkeleton error={!!errorMessage}/>
                <CollectionCardSkeleton error={!!errorMessage}/>
                <CollectionCardSkeleton error={!!errorMessage}/>
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

export const CatalogueSkeleton = ({errorMessage}: { errorMessage?: string }) => {
    return (
        <ContentContainer>

            {errorMessage ? <ErrorWrapper errorMessage={errorMessage}/> :
                <Skeleton className='w-[8em] h-[1em] rounded-none mb-4'/>}

            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                <ProductCardSkeleton error={!!errorMessage}/>
                <ProductCardSkeleton error={!!errorMessage}/>
                <ProductCardSkeleton error={!!errorMessage}/>
                <ProductCardSkeleton error={!!errorMessage}/>
                <ProductCardSkeleton error={!!errorMessage}/>
                <ProductCardSkeleton error={!!errorMessage}/>
                <ProductCardSkeleton error={!!errorMessage}/>
                <ProductCardSkeleton error={!!errorMessage}/>
            </div>
        </ContentContainer>
    )
}

const CollectionProductSkeleton = ({error}: { error?: boolean }) => {
    const boxStyle = 'w-full h-[750px] rounded-none';

    const Box = error ? <ErrorSkeleton className={boxStyle}/> : <Skeleton className={boxStyle}/>

    return (
        <div>
            {Box}
            <Skeleton className='w-[3em] h-[1em] rounded-none mt-2'/>
            <Skeleton className='w-[8em] h-[1em] rounded-none mt-2'/>
            <Skeleton className='w-[3em] h-[1em] rounded-none mt-2'/>
        </div>
    )
}

export const CollectionSkeleton = ({error}: { error?: boolean }) => {
    const boxStyle = 'w-full h-[750px] rounded-none';

    const Box = error ? <ErrorSkeleton className={boxStyle}/> : <Skeleton className={boxStyle}/>

    return (
        <ContentContainer>
            {Box}
            <div className='py-4 flex justify-center flex-col items-center'>
                <Skeleton className='w-[8em] h-[1em] rounded-none mt-2'/>
                <Skeleton className='w-[24em] h-[1em] rounded-none mt-2'/>
            </div>

            <div className='grid grid-cols-2 gap-4 max-w-[70%] mx-auto mt-6'>
                <CollectionProductSkeleton error={error}/>
                <CollectionProductSkeleton error={error}/>
                <CollectionProductSkeleton error={error}/>
                <CollectionProductSkeleton error={error}/>
            </div>
        </ContentContainer>
    )
}