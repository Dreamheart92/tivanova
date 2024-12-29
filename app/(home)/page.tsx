import Hero from "@/app/(home)/components/hero";
import {fetchLatestProducts} from "@/lib/api/product.api";
import FeaturedProducts from "@/components/featured-products";

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
    const products = await fetchLatestProducts();

    return (
        <>
            <Hero/>
            <FeaturedProducts
                products={products}
                meta={featuredProductSections.newArrivals}
            />

            <FeaturedProducts
                products={products}
                meta={featuredProductSections.featured}
            />
        </>
    )
}