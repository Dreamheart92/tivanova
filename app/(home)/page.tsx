import Hero from "@/app/(home)/components/hero";
import {fetchLatestCollections, fetchLatestProducts} from "@/lib/api/product.api";
import FeaturedProducts from "@/components/featured-products";
import FeaturedCollections from "@/app/(home)/components/featured-collections";
import FeaturedCollection from "@/app/(home)/components/featured-collection";

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

export default async function Home() {
    const [newArrivals, collections] = await Promise.all([
        fetchLatestProducts(),
        fetchLatestCollections(),
    ])

    return (
        <div className='flex flex-col gap-12'>
            <Hero/>
            <FeaturedProducts
                products={newArrivals}
                meta={featuredProductSections.newArrivals}
            />

            <FeaturedCollections collections={collections}/>
            <FeaturedCollection/>

            <FeaturedProducts
                products={newArrivals}
                meta={featuredProductSections.featured}
            />
        </div>
    )
}