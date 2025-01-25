import {ProductVariantType, VariantType} from "@/lib/definitions/product";

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
