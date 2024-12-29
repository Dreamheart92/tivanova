export type ProductImage = {
    node: {
        url: string;
    }
}

export type FeaturedProduct = {
    id: string;
    images: {
        edges: ProductImage[]
    }
    title: string;
    vendor: string;
    priceRange: {
        minVariantPrice: {
            amount: string;
        };
    }
}