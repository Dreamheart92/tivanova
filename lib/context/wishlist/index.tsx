'use client';

import {
    createContext, use, useCallback,
    useContext, useEffect,
    useMemo,
    useOptimistic,
} from "react";
import {createWishlistAndStoreCookie, updateWishlistAction} from "@/lib/actions/wishlist.actions";
import {useToast} from "@/hooks/use-toast";
import {generateToastDescription, modifyWishlistProductIds} from "@/lib/utils/wishlist.utils";
import {FeaturedProductType} from "@/lib/definitions/product.definitions";

export type Wishlist = {
    id: string;
    lines: FeaturedProductType[];
}

export type WishlistActionType = 'add' | 'remove';

type WishlistState = {
    wishlist: Wishlist | undefined;
    updateWishlist: (type: WishlistActionType, product: FeaturedProductType) => void;
}

const WishlistContext = createContext<WishlistState | null>(null);

type WishlistProviderProps = {
    wishlistPromise: Promise<Wishlist | undefined>;
    children: React.ReactNode;
}

export default function WishlistProvider({wishlistPromise, children}: WishlistProviderProps) {
    const wishlistInitialState: Wishlist | undefined = use(wishlistPromise);
    const [wishlist, setWishlist] = useOptimistic(wishlistInitialState);
    const {toast} = useToast();

    useEffect(() => {
        if (!wishlist) {
            createWishlistAndStoreCookie();
        }
    }, [wishlist]);

    const addItemToWishlist = useCallback((product: FeaturedProductType) => {
        setWishlist((wishlist) => {
            if (wishlist) {
                return {
                    ...wishlist,
                    lines: [...wishlist.lines, product],
                }
            }
        })
    }, [setWishlist])

    const removeItemFromWishlist = useCallback((product: FeaturedProductType) => {
        setWishlist((wishlist) => {
            if (wishlist) {
                return {
                    ...wishlist,
                    lines: wishlist.lines.filter((wishlistProduct) => wishlistProduct.id !== product.id),
                }
            }
        })
    }, [setWishlist])

    const actionMap: Record<WishlistActionType, (product: FeaturedProductType) => void> = {
        add: addItemToWishlist,
        remove: removeItemFromWishlist,
    }

    const updateWishlist = async (type: WishlistActionType, product: FeaturedProductType) => {
        if (wishlist) {
            actionMap[type](product);
            triggerToast(generateToastDescription(product.title, type));
            await updateWishlistAction(modifyWishlistProductIds(type, wishlist.lines, product.id));
        }
    }


    const triggerToast = (description: string) => {
        // Using setTimeout to execute the toast immediately, before React's state batching completes
        setTimeout(() => {
            toast({
                description: description,
                className: '!bg-stone-900 text-white',
                duration: 2000,
            })
        }, 0)
    }

    const value = useMemo(() => ({
        wishlist,
        updateWishlist,
    }), [wishlist, updateWishlist])

    return (
        <WishlistContext.Provider value={value}>
            {children}
        </WishlistContext.Provider>
    )
}

export function useWishlist() {
    const context = useContext(WishlistContext);

    if (!context) {
        throw new Error('useWishlist must be used inside a WishlistProvider');
    }

    return context;
}