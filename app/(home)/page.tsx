import Hero from "@/app/(home)/components/hero";
import {fetchFeaturedProducts, fetchLatestCollections, fetchLatestProducts} from "@/lib/api/product.api";
import FeaturedProducts from "@/components/featured-products";
import FeaturedCollections from "@/app/(home)/components/featured-collections";
import FeaturedCollection from "@/app/(home)/components/featured-collection";
import {Suspense} from "react";
import {FeaturedCollectionsSkeleton, FeaturedProductsSkeleton} from "@/components/skeletons";

const pageSettings = {
    hero: {
        title: 'FALL/WINTER 2024',
    },
    sections: {
        featuredProducts: {
            newArrivals: {
                title: 'New Arrivals',
                caption: 'New Styles, New You: Explore what’s just arrived',
            },
            featured: {
                title: 'Featured',
                caption: 'Handpicked Just for You: Discover Our Top Picks of the Season',
            }
        }
    },
}

const NewArrivalsWrapper = async () => {
    const newArrivals = await fetchLatestProducts();

    return (
        <FeaturedProducts
            products={newArrivals}
            meta={pageSettings.sections.featuredProducts.newArrivals}
        />
    )
}

const FeaturedWrapper = async () => {
    const products = await fetchFeaturedProducts();

    return (
        <FeaturedProducts
            products={products}
            meta={pageSettings.sections.featuredProducts.featured}
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
            <Hero title={pageSettings.hero.title}/>

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