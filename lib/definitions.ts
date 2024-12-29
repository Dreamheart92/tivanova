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

export type CollectionMeta = {
    title: string;
    id: string;
    image: {
        url: string;
    }
}