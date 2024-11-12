'use server';

import {cookies} from "next/headers";

type SessionProps = {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
    token: string;
    cartId: string;
}

export const setSession = async (userData: SessionProps) => {
    cookies().set('session', JSON.stringify({
        id: userData.id,
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        phone: userData.phone,
        token: userData.token,
        cartId: userData.cartId,
    }), {
        httpOnly: true,
        path: '/',
    });
}

export const getSession = async (): Promise<{ user: SessionProps } | null> => {
    const cookie = cookies().get('session');

    if (cookie) {
        return {
            user: JSON.parse(cookie.value),
        }
    }

    return null;
}

export const deleteSession = async () => {
    cookies().delete('session');
}

export const updateUserSession = async (updatedFields: {
    phone: string,
    email: string,
    firstName: string,
    lastName: string
}) => {
    const session = await getSession();

    if (typeof session?.user !== 'undefined') {
        const updatedUser = {
            ...session.user,
            ...updatedFields,
        }

        await deleteSession();
        await setSession(updatedUser);
    }
}

export const setWishlistSession = async (wishlist: string[]) => {
    cookies().set('wishlist', JSON.stringify(wishlist));
}

export const getWishlistSession = async () => {
    const wishlistCookie = cookies().get('wishlist');

    if (wishlistCookie) {
        return JSON.parse(wishlistCookie.value);
    } else {
        return [];
    }
}

export const clearWishlistSession = async () => {
    cookies().delete('wishlist');
}