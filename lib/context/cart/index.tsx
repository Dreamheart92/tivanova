'use client';

import {createContext, startTransition, use, useContext, useMemo, useOptimistic, useState} from "react";
import {CartState} from "@/lib/context/cart/definitions";
import cartReducer from "@/lib/context/cart/reducer";
import {ADD_ITEM_TO_CART, REMOVE_ITEM_FROM_CART} from "@/lib/context/cart/types";
import {CartType} from "@/lib/definitions/cart";
import {ProductType, ProductVariantType} from "@/lib/definitions/product";

type CartContextType = CartState;

const CartContext = createContext<CartContextType | null>(null);

export default function CartProvider({cartPromise, children}: {
    children: React.ReactNode,
    cartPromise: Promise<CartType | undefined>
}) {
    const initialCart: CartType | undefined = use(cartPromise);
    const [open, setOpen] = useState(false);

    const [optimisticCart, updateOptimisticCart] = useOptimistic(initialCart, cartReducer);

    const openCart = () => {
        setOpen(true);
    }

    const closeCart = () => {
        setOpen(false);
    }

    const addItemToCart = (payload: { product: ProductType, variant: ProductVariantType }) => {
        triggerCart();
        updateOptimisticCart({type: ADD_ITEM_TO_CART, payload});
    }

    const triggerCart = () => {
        setTimeout(() => {
            openCart();
        }, 0)
    }

    const removeItemFromCart = (payload: { variantId: string }) => {
        startTransition(() => {
            updateOptimisticCart({type: REMOVE_ITEM_FROM_CART, payload});
        })
    }

    const contextValue = useMemo(() => ({
        cart: optimisticCart,
        openCart,
        closeCart,
        addItemToCart,
        removeItemFromCart,
        open,
    }), [optimisticCart, open]);

    return (
        <CartContext value={contextValue}>
            {children}
        </CartContext>
    )
}

export function useCart() {
    const context = useContext(CartContext);

    if (!context) {
        throw new Error('use useCart inside a CartProvider');
    }

    return {...context};
}