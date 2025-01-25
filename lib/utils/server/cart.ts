'use server';

import {CartType} from "@/lib/definitions/cart.definitions";
import {addToCart, fetchCart} from "@/lib/api/cart.api";
import {revalidateTag} from "next/cache";
import {TAGS} from "@/lib/constants/tags";
import {convertProductToShopifyCartLines, getUniqueGuestCartItems} from "@/lib/utils/cart";

export const transferGuestCartToCustomerCart = async (customerCartId: string, guestCart: CartType) => {
    const customerCart = await fetchCart(customerCartId);
    const guestCartProducts = getUniqueGuestCartItems(guestCart, customerCart as CartType);

    const lines = convertProductToShopifyCartLines(guestCartProducts);

    await addToCart(lines, customerCartId);
    revalidateTag(TAGS.CART);
}