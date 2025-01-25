'use server';

import {unstable_cache as nextCache} from 'next/cache';
import {cache} from "react";
import {AddressType} from "@/lib/definitions/customer.definitions";
import {TAGS} from "@/lib/constants/tags";
import {fetchCartQuery} from "@/lib/api/queries/cart";
import {
    addToCartMutation, cartBuyerIdentityMutation,
    cartDeliveryAddressesAddQuery,
    cartDeliveryAddressesUpdateMutation, cartLinesRemoveMutation,
    cartSelectedDeliveryOptionsUpdateMutation,
    createCartMutation,
} from "@/lib/api/mutations/cart";
import {BuyerIdentityType, CartDeliveryAddressType, RemoteCartLineType} from "@/lib/definitions/cart.definitions";
import {clientFetcher} from "@/lib/api/shopify";
import {hasShopifyUserError, reshapeCart} from "@/lib/utils/shopify";

export const fetchCart = nextCache(
    cache(async (cartId: string | undefined) => {
        if (!cartId) {
            return undefined;
        }

        try {
            const data = await clientFetcher(fetchCartQuery, {
                cartId,
            })

            return reshapeCart(data.cart);
        } catch (error) {
            return undefined;
        }
    }),
    [TAGS.CART],
    {
        tags: [TAGS.CART]
    }
)

export const createCart = async (accessToken: string | undefined, lines: RemoteCartLineType[] | undefined, countryISO: string) => {
    try {
        const data = await clientFetcher(createCartMutation, {
            input: {
                buyerIdentity: {
                    customerAccessToken: accessToken,
                    countryCode: countryISO,
                },
                lines,
            },
        })

        if (hasShopifyUserError(data?.userErrors)) {
            throw data.userErrors;
        }

        return data.cartCreate.cart.id;
    } catch (error) {
        return undefined;
    }
}

export const addToCart = async (lines: RemoteCartLineType[], cartId: string) => {
    const data = await clientFetcher(addToCartMutation, {
        cartId,
        lines,
    })
}

export const cartDeliveryAddressesAdd = async (cartId: string, address: AddressType) => {
    const data = await clientFetcher(cartDeliveryAddressesAddQuery, {
        addresses: [
            {
                address: {
                    deliveryAddress: {
                        ...address,
                    }
                },
                selected: true,
                validationStrategy: 'COUNTRY_CODE_ONLY',
            },
        ],
        cartId,
    })

    if (hasShopifyUserError(data?.userErrors)) {
        throw data.userErrors;
    }
}

export const cartDeliveryAddressesUpdate = async (address: CartDeliveryAddressType, cartId: string) => {
    const data = await clientFetcher(cartDeliveryAddressesUpdateMutation, {
        addresses: [
            {
                address: {
                    deliveryAddress: {
                        ...address.address,
                    }
                },
                id: address.id,
                selected: true,
            }
        ],
        cartId,
    })

    if (hasShopifyUserError(data?.userErrors)) {
        throw data.userErrors;
    }
}

export const cartSelectedDeliveryOptionsUpdate = async (cartId: string, deliveryGroupId: string, deliveryOptionHandle: string) => {
    const data = await clientFetcher(cartSelectedDeliveryOptionsUpdateMutation, {
        cartId,
        selectedDeliveryOptions: [
            {
                deliveryGroupId,
                deliveryOptionHandle,
            }
        ]
    })

    if (hasShopifyUserError(data?.userErrors)) {
        throw data.userErrors;
    }
}

export const cartLinesRemove = async (cartId: string, cartLines: string[]) => {
    const data = await clientFetcher(cartLinesRemoveMutation, {
        cartId,
        lineIds: cartLines,
    })

    if (hasShopifyUserError(data?.userErrors)) {
        throw data.userErrors;
    }
}

export const cartBuyerIdentityUpdate = async (cartId: string, buyerIdentity: BuyerIdentityType) => {
    const data = await clientFetcher(cartBuyerIdentityMutation, {
        buyerIdentity,
        cartId,
    })

    if (hasShopifyUserError(data?.userErrors)) {
        throw data.userErrors;
    }
}
