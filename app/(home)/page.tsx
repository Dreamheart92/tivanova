import Hero from "@/app/(home)/components/hero";
import {fetchFeaturedProducts, fetchLatestCollections, fetchLatestProducts} from "@/lib/api/product.api";
import FeaturedProducts from "@/components/featured-products";
import FeaturedCollections from "@/app/(home)/components/featured-collections";
import FeaturedCollection from "@/app/(home)/components/featured-collection";
import {Suspense} from "react";
import {FeaturedCollectionsSkeleton, FeaturedProductsSkeleton} from "@/components/skeletons";

const featuredProductSections = {
    newArrivals: {
        title: 'New Arrivals',
        caption: 'New Styles, New You: Explore what’s just arrived',
    },
    featured: {
        title: 'Featured',
        caption: 'Handpicked Just for You: Discover Our Top Picks of the Season',
    }
}

const NewArrivalsWrapper = async () => {
    const newArrivals = await fetchLatestProducts();

    return (
        <FeaturedProducts
            products={newArrivals}
            meta={featuredProductSections.newArrivals}
        />
    )
}

const FeaturedWrapper = async () => {
    const products = await fetchFeaturedProducts();

    return (
        <FeaturedProducts
            products={products}
            meta={featuredProductSections.newArrivals}
        />
    )
}

const CollectionsWrapper = async () => {
    const collections = await fetchLatestCollections();

    return <FeaturedCollections collections={collections}/>
}

export default async function Home() {

    return (
        <div className='flex flex-col gap-4 lg:gap-12'>
            <Hero/>
            <Suspense fallback={<FeaturedProductsSkeleton/>}>
                <NewArrivalsWrapper/>
            </Suspense>

            <Suspense fallback={<FeaturedCollectionsSkeleton/>}>
                <CollectionsWrapper/>
            </Suspense>

            <FeaturedCollection/>

            <Suspense fallback={<FeaturedProductsSkeleton/>}>
                <FeaturedWrapper/>
            </Suspense>
        </div>
    )
}