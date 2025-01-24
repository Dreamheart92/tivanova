import {ProductVariantType, VariantType} from "@/lib/definitions/product";

export const removeEdgesAndNodes = (array: any) => {
    return array.edges.map((edge: any) => edge?.node);
}

export const organizeProductVariants = (variants: ProductVariantType[]): VariantType[] => {
    const productVariants: VariantType[] = [];

    variants.forEach((variant => {
        const [color, size] = variant.selectedOptions;

        const colorIndex = productVariants.findIndex((variation) => variation.color === color.value);

        if (colorIndex === -1) {
            productVariants.push({
                color: color.value,
                price: variant.price.amount,
                id: variant.id,
                options: [{
                    name: size.value,
                    id: variant.id,
                }],
            })
        } else {
            productVariants[colorIndex].options.push({
                name: size.value,
                id: variant.id,
            });
        }
    }))

    return productVariants;
}

export const findVariantByColor = (variants: VariantType[], color: string) => variants.find((variant) => variant.color === color);

export const reshapeProduct = (product: any) => {
    return {
        ...product,
        images: removeEdgesAndNodes(product.images),
        variants: removeEdgesAndNodes(product.variants),
    }
}

export const reshapeFeatureProduct = (product: any) => {
    return {
        ...product,
        images: removeEdgesAndNodes(product.images),
    }
}

export const reshapeCollection = (collection: any) => {
    return {
        id: collection.id,
        description: collection.description,
        title: collection.title,
        image: collection.image,
        backdropImage: collection.metafield.reference,
        products: collection.products.edges.map((product: any) => ({
            ...product.node,
            images: removeEdgesAndNodes(product.node.images),
        })),
    }
}