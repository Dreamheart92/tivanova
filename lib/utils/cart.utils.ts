import {addToCart, createCart, fetchCart} from "@/lib/api/cart.api";
import {createCartIdCookie} from "@/lib/session";
import {removeEdgesAndNodes} from "@/lib/utils/product.utils";
import {CartProductType, CartType, RemoteCartLineType} from "@/lib/definitions/cart";
import {FeaturedProductType, ProductType, ProductVariantType} from "@/lib/definitions/product";
import {revalidateTag} from "next/cache";
import {TAGS} from "@/lib/constants/tags";
import {getCountryIso} from "@/lib/utils/customer.utils";

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

export const createCartAndStoreCookie = async (accessToken?: string, lines?: RemoteCartLineType[]) => {
    const countryISO = await getCountryIso();
    const cartId = await createCart(accessToken, lines, countryISO);
    await createCartIdCookie(cartId);

    return cartId;
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

export const transferGuestCartToCustomerCart = async (customerCartId: string, guestCart: CartType) => {
    const customerCart = await fetchCart(customerCartId);
    const guestCartProducts = getUniqueGuestCartItems(guestCart, customerCart as CartType);

    const lines = convertProductToShopifyCartLines(guestCartProducts);

    await addToCart(lines, customerCartId);
    revalidateTag(TAGS.CART);
}

export const reshapeCart = (cart: any) => {
    const deliveryGroups = removeEdgesAndNodes(cart.deliveryGroups)[0];

    return {
        lines: cart.lines.nodes.map((product: any) => ({
            ...product,
            merchandise: {
                ...product.merchandise,
                product: {
                    ...product.merchandise.product,
                    images: removeEdgesAndNodes(product.merchandise.product.images),
                }
            }
        })),
        totalQuantity: cart.totalQuantity,
        cost: cart.cost,
        id: cart.id,
        deliveryGroups: {
            ...deliveryGroups,
        },
        delivery: {
            ...cart.delivery,
            selectedDeliveryAddress: cart.delivery.addresses.find((address: any) => address.selected)
        },
        buyerIdentity: cart.buyerIdentity,
    }
}

export const createCartLine = (optionId: string | undefined) => {
    if (!optionId) return undefined;

    return [{
        merchandiseId: optionId,
        quantity: 1,
    }]
}
