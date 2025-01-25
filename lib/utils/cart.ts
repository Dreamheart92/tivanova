import {CartProductType, CartType} from "@/lib/definitions/cart.definitions";
import {FeaturedProductType, ProductType, ProductVariantType} from "@/lib/definitions/product.definitions";

export const createOrUpdateCartProduct = (existingProduct: CartProductType | undefined, product: ProductType, variant: ProductVariantType) => {
    const quantity = existingProduct ? existingProduct.quantity + 1 : 1;
    const amount = existingProduct ? (Number(existingProduct.cost.totalAmount.amount) + Number(variant.price.amount)).toString() : variant.price.amount;
    const id = existingProduct ? existingProduct.id : product.id;

    return {
        id,
        cost: {
            totalAmount: {
                amount,
                currencyCode: product.priceRange.minVariantPrice.currencyCode,
            },
            amountPerQuantity: {
                amount: product.priceRange.minVariantPrice.amount,
                currencyCode: product.priceRange.minVariantPrice.currencyCode,
            }
        },
        quantity,
        merchandise: {
            product,
            ...variant,
        }
    }
}

export const updateCostAndQuantity = (products: CartProductType[], shippingCost?: string) => {
    const costAndQuantity = products.reduce((accumulator, product) => {
        return {
            cost: accumulator.cost + Number(product.cost.totalAmount.amount),
            quantity: accumulator.quantity + Number(product.quantity)
        }
    }, {
        cost: 0,
        quantity: 0,
    })

    return {
        subtotal: costAndQuantity.cost.toFixed(2),
        quantity: costAndQuantity.quantity,
        total: shippingCost ? (Number(costAndQuantity.cost) + Number(shippingCost)).toFixed(2) : costAndQuantity.cost.toFixed(2),
    }
}

export const getUniqueGuestCartItems = (guestCart: CartType, customerCart: CartType) => {
    return guestCart.lines.filter((product) => {
        return !customerCart.lines.some((customerProduct) => customerProduct.merchandise.id === product.merchandise.id);
    })
}

export const convertProductToShopifyCartLines = (products: CartProductType[]) => {
    return products.map((product) => ({
        merchandiseId: product.merchandise.id,
        quantity: product.quantity,
    }));
}

export const getProductsIds = (products: FeaturedProductType[]) => products.map((product) => product.id);

export const createCartLine = (optionId: string | undefined) => {
    if (!optionId) return undefined;

    return [{
        merchandiseId: optionId,
        quantity: 1,
    }]
}
