import Hero from "@/app/(home)/components/hero";
import {fetchFeaturedProducts, fetchLatestCollections, fetchLatestProducts} from "@/lib/api/product.api";
import FeaturedProducts from "@/components/featured-products";
import FeaturedCollections from "@/app/(home)/components/featured-collections";
import FeaturedCollection from "@/app/(home)/components/featured-collection";
import {Suspense} from "react";
import {FeaturedCollectionsSkeleton, FeaturedProductsSkeleton} from "@/components/skeletons";

const pageSettings = {
    hero: {
        title: 'Fall-Winter 2025: Style Redefined',
        caption: 'Redefine your wardrobe with timeless layers for the season'
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
    try {
        const newArrivals = await fetchLatestProducts();

        return (
            <FeaturedProducts
                products={newArrivals}
                meta={pageSettings.sections.featuredProducts.newArrivals}
            />
        )
    } catch (error) {
        return (
            <div>
                <FeaturedProductsSkeleton errorMessage='Failed to load products.'/>
            </div>
        )
    }
}

const FeaturedWrapper = async () => {
    try {
        const products = await fetchFeaturedProducts();

        return (
            <FeaturedProducts
                products={products}
                meta={pageSettings.sections.featuredProducts.featured}
            />
        )
    } catch (error) {
        return <FeaturedProductsSkeleton errorMessage='Failed to load products.'/>
    }
}

const CollectionsWrapper = async () => {
    try {
        const collections = await fetchLatestCollections();

        return <FeaturedCollections collections={collections}/>
    } catch (error) {
        return <FeaturedCollectionsSkeleton errorMessage='Failed to load collections.'/>
    }
}

export default async function Home() {

    return (
        <div className='flex flex-col gap-4 lg:gap-12'>
            <Hero title={pageSettings.hero.title} caption={pageSettings.hero.caption}/>

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