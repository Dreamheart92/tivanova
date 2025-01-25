import {ImageType} from "@/lib/definitions/definitions";

export type FeaturedProductType = {
    id: string;
    images: ImageType[]
    title: string;
    vendor: string;
    priceRange: {
        minVariantPrice: {
            amount: string;
            currencyCode: string;
        };
    }
}
export type CollectionType = {
    id: string;
    description: string;
    title: string;
    image: {
        url: string;
    }
    backdropImage: {
        id: string;
        previewImage: {
            url: string;
        }
    }
    products: FeaturedProductType[];
}
export type SelectedProductOptionType = {
    name: string,
    value: string,
}
export type ProductVariantType = {
    id: string;
    price: {
        amount: string,
    };
    selectedOptions: SelectedProductOptionType[]
}
export type ProductType = {
    id: string;
    title: string;
    category: {
        id: string;
        name: string;
    }
    descriptionHtml: string;
    images: ImageType[];
    priceRange: {
        minVariantPrice: {
            amount: string;
            currencyCode: string;
        }
    }
    tags: string[];
    vendor: string;
    variants: ProductVariantType[];
}
export type CollectionDetailsType = {
    title: string;
    id: string;
    image: {
        url: string;
    }
    description: string;
}
export type VariantType = {
    color: string;
    price: string;
    id: string;
    options: [{ id: string, name: string }];
}