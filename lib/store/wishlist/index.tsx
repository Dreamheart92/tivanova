'use client';

import {createContext, ReactNode, useContext, useMemo, useState} from "react";
import {WishlistContextType} from "@/lib/store/wishlist/types";
import {addItemsToWishlistService} from "@/lib/services/wishlist-service";
import {clearWishlistSession, setWishlistSession} from "@/lib/session";

const WishlistContext = createContext<WishlistContextType | null>(null);

export function WishlistProvider({initialState, children}: { initialState: string[], children: ReactNode }) {
    const [wishlist, setWishlist] = useState<string[]>(initialState);

    const addItemToWishlist = async (productId: string) => {

        const isProductInWishlist = wishlist.findIndex((wishlistProduct) => wishlistProduct === productId);

        const updatedWishlist = [...wishlist];

        if (isProductInWishlist === -1) {
            updatedWishlist.push(productId);
        } else {
            updatedWishlist.splice(isProductInWishlist, 1);
        }

        setWishlist(updatedWishlist);
        await setWishlistSession(updatedWishlist);

        try {
            await addItemsToWishlistService(updatedWishlist);
        } catch (error) {
            // TODO : Handle error
        }
    }

    const removeItemFromWishlist = async (productId: string) => {
        const isProductInWishlist = wishlist.findIndex((wishlistProduct) => wishlistProduct === productId);

        if (isProductInWishlist !== -1) {
            const updatedWishlist = [...wishlist];
            updatedWishlist.splice(isProductInWishlist, 1);

            setWishlist(updatedWishlist);
            await setWishlistSession(updatedWishlist);

            try {
                await addItemsToWishlistService(updatedWishlist);
            } catch (error) {
                // TODO : Handle error
            }
        }
    }

    const updateWishlist = async (wishlist: string[]) => {
        setWishlist(wishlist);
        await setWishlistSession(wishlist);
    }

    const clearWishlist = async () => {
        setWishlist([]);
        await clearWishlistSession();
    }

    const contextValue = useMemo(() => ({
        wishlist,
        addItemToWishlist,
        removeItemFromWishlist,
        updateWishlist,
        clearWishlist,
    }), [wishlist]);

    return (
        <WishlistContext.Provider value={contextValue}>
            {children}
        </WishlistContext.Provider>
    )
}

export const useWishlist = () => {
    const context = useContext(WishlistContext);

    if (!context) {
        throw new Error('useWishlist inside a Wishlist provider');
    }

    return context;
}