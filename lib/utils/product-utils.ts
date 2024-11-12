import {CartProductAttribute} from "@/lib/store/cart/types";
import {Product} from "@/lib/definitions";

export const createCartProduct = (variant: {
    id: string,
    attributes: CartProductAttribute[]
}, product: Product, localProductId: string) => {
    return {
        id: localProductId,
        quantity: 1,
        attributes: variant.attributes,
        merchandise: {
            id: variant.id,
            product: {
                id: product.id,
                images: {
                    nodes: [
                        {
                            url: product.images.edges[0].node.url,
                        },
                    ],
                },
                priceRange: {
                    minVariantPrice: {
                        amount: product.priceRange.minVariantPrice.amount,
                    },
                },
                title: product.title,
                vendor: product.vendor,
            },
        },
        cost: {
            totalAmount: {
                amount: product.priceRange.minVariantPrice.amount,
            },
            amountPerQuantity: {
                amount: product.priceRange.minVariantPrice.amount
            }
        }
    }
}

export const calcTotalPrice = (totalPrice: number, productPrice: number, operation?: string) => {
    const totalCents = Math.round(totalPrice * 100);
    const productPriceCents = Math.round(Number(productPrice) * 100);

    const newTotalCents = operation === 'divide' ? totalCents - productPriceCents : totalCents + productPriceCents;
    const newTotal = newTotalCents / 100;

    return Number(newTotal.toFixed(2))
}