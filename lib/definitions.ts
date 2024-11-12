export type Variation = {
    color: string;
    price: string;
    id: string;
    options: [{ id: string, name: string }];
}

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
        edges: [{
            node: {
                id: string;
                price: string;
                selectedOptions: { name: string; value: string }[]
            }
        }]
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

export type CollectionCard = {
    title: string;
    id: string;
    image: {
        url: string;
    }
}

export type Collection = {
    title: string;
    id: string;
    description: string;
    image: {
        url: string;
    };
    products: {
        nodes: FeaturedProduct[];
    };
}

export type UserData = {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
}

export type ProductAttribute = {
    size: string;
    color: string;
}