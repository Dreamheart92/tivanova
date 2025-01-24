'use server';

import {createWishlist, fetchWishlist, updateRemoteWishlist} from "@/lib/api/wishlist.api";
import {cookies} from "next/headers";
import {revalidateTag} from "next/cache";
import {TAGS} from "@/lib/constants/tags";
import {FeaturedProductType} from "@/lib/definitions/product";

export const createWishlistAndStoreCookie = async (customerId?: string, lines?: string[]) => {
    const wishlist = await createWishlist(customerId, lines);
    await createWishlistCookie(wishlist.id);
    return wishlist.id;
}

export const createWishlistCookie = async (wishlistId: string) => (await cookies()).set('wishlist', wishlistId);

export const getWishlistId = async () => (await cookies()).get('wishlist')?.value;

export const deleteWishlistCookie = async () => (await cookies()).delete('wishlist');

export const transferGuestWishlistToCustomer = async (customerWishlistId: string, guestWishlist: FeaturedProductType[]) => {
    const customerWishlist = await fetchWishlist(customerWishlistId);

    const newGuestProductIds = guestWishlist
        .filter((guestProduct) => !customerWishlist?.lines.some((customerProduct: FeaturedProductType) => customerProduct.id === guestProduct.id))
        .map((product) => product.id);

    const existingCustomerProductIds = customerWishlist?.lines.map((product: FeaturedProductType) => product.id);

    await updateRemoteWishlist(customerWishlistId, [...newGuestProductIds, ...existingCustomerProductIds]);
    revalidateTag(TAGS.WISHLIST);
}

export const updateWishlistAction = async (wishlist: string[]) => {
    const wishlistId = await getWishlistId();
    await updateRemoteWishlist(wishlistId, wishlist);
    revalidateTag(TAGS.WISHLIST);
}