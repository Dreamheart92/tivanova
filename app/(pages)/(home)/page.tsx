import Hero from "@/app/(pages)/(home)/components/hero";
import {fetchFeaturedProducts, fetchLatestCollections, fetchLatestProducts} from "@/lib/services/product-service";
import FeaturedProducts from "@/components/featured-products";
import Banner from "@/app/(pages)/(home)/components/banner";
import FeaturedCategories from "@/app/(pages)/(home)/components/featured-categories";

export default async function Home() {
    const [latestProducts, featuredProducts, collections] = await Promise.all([
        fetchLatestProducts(),
        fetchFeaturedProducts(),
        fetchLatestCollections(),
    ])

    return (
        <>
            <Hero/>

            <FeaturedProducts
                title='New Arrivals'
                caption='New Styles, New You: Explore what’s just arrived'
                products={latestProducts}
            />

            <FeaturedCategories collections={collections}/>

            <Banner/>

            <FeaturedProducts products={featuredProducts} title='Featured'/>
        </>
    )
}
