export type ProductImage = {
    node: {
        url: string;
    }
}

export type Variant = {
    color: string;
    price: string;
    id: string;
    options: [{ id: string, name: string }];
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

export type Product = {
    id: string;
    title: string;
    category: {
        id: string;
        name: string;
    }
    descriptionHtml: string;
    images: {
        edges: ProductImage[]
    }
    priceRange: {
        minVariantPrice: {
            amount: string;
        }
    }
    tags: string[];
    vendor: string;
    variants: {
        edges: ProductVariant[]
    }
}

export type ProductVariant = {
    node: {
        id: string;
        price: string;
        selectedOptions: { name: string; value: string }[]
    }
}

export type Filter = {
    label: string;
    type: string;
    values: FilterValue[];
}

export type FilterValue = {
    id: string;
    input: string;
    label: string;
    count: number;
}