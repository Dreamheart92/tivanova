import {ProductVariant, Variant} from "@/lib/definitions";

export const organizeProductVariants = (variants: ProductVariant[]): Variant[] => {
    const productVariants: Variant[] = [];

    variants.forEach((edge => {
        const [color, size] = edge.node.selectedOptions;

        const colorIndex = productVariants.findIndex((variation) => variation.color === color.value);

        if (colorIndex === -1) {
            productVariants.push({
                color: color.value,
                price: edge.node.price,
                id: edge.node.id,
                options: [{
                    name: size.value,
                    id: edge.node.id,
                }],
            })
        } else {
            productVariants[colorIndex].options.push({
                name: size.value,
                id: edge.node.id,
            });
        }
    }))

    return productVariants;
}

export const findVariantByColor = (variants: Variant[], color: string) =>  variants.find((variant) => variant.color === color);