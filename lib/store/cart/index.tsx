'use client';

import {createContext, useContext, useMemo, useState} from "react";
import {CartContextType, CartProduct, CartState} from "@/lib/store/cart/types";
import {flushSync} from "react-dom";
import {
    addItemToCartService,
    removeItemFromCartService,
    updateItemQuantityInCartService
} from "@/lib/services/cart-service";
import {calcTotalPrice} from "@/lib/utils/product-utils";

const CartContext = createContext<CartContextType | undefined>(undefined);

function CartProvider({children, cartInitialState}: {
    children: React.ReactNode,
    cartInitialState: { products: CartProduct[], quantity: number, totalPrice: number }
}) {

    const [cart, setCart] = useState<CartState>(cartInitialState);
    const [isCartOpen, setIsCartOpen] = useState(false);

    const openCart = () => setIsCartOpen(true);
    const closeCart = () => setIsCartOpen(false);

    const addItemToCart = async (product: CartProduct, localProductId: string) => {
        const isItemInCart = cart.products.findIndex((cartProduct) => cartProduct.merchandise.id === product.merchandise.id);

        if (isItemInCart === -1) {
            const rollback = [...cart.products];

            flushSync(() => {
                setCart((cart) => ({
                    ...cart,
                    products: [
                        ...cart.products,
                        product,
                    ],
                    totalPrice: calcTotalPrice(cart.totalPrice, Number(product.merchandise.product.priceRange.minVariantPrice.amount)),
                    quantity: cart.quantity + 1,
                }))

                openCart();
            });

            try {
                const newProductId = await addItemToCartService(
                    product.merchandise.id,
                    product.attributes,
                );

                setCart((cart) => ({
                    ...cart,
                    products: cart.products.map((cartProduct) => {
                        if (cartProduct.id === localProductId) {
                            return {
                                ...cartProduct,
                                id: newProductId,
                            }
                        }

                        return cartProduct;
                    })
                }))
            } catch (error) {
                console.log(error);
                setCart((cart) => ({
                    ...cart,
                    products: rollback,
                }))
            }
        }
    }

    const removeItemFromCart = async (product: CartProduct) => {
        const lineId = product.id;

        const itemIndex = cart.products.findIndex((cartProduct) => cartProduct.id === lineId);

        if (itemIndex !== -1) {
            const rollback = [...cart.products];

            const productTotalPrice = Number(product.merchandise.product.priceRange.minVariantPrice.amount) * product.quantity;

            setCart((prevState) => ({
                ...prevState,
                products: rollback.filter((cartProduct) => cartProduct.id !== lineId),
                totalPrice: calcTotalPrice(cart.totalPrice, productTotalPrice, 'divide'),
                quantity: cart.quantity - 1,
            }))

            try {
                await removeItemFromCartService(lineId);
            } catch (error) {
                console.log(error);
                setCart((cart) => ({
                    ...cart,
                    products: rollback,
                }))
            }
        }
    }

    const updateItemQuantity = async (cartLineId: string, quantity: number) => {
        let productPrice = 0;

        flushSync(() => {
            setCart((cart) => ({
                ...cart,
                products: cart.products.map((cartProduct) => {
                    if (cartProduct.id === cartLineId) {
                        productPrice = Number(cartProduct.merchandise.product.priceRange.minVariantPrice.amount);

                        return {
                            ...cartProduct,
                            quantity,
                        }
                    }

                    return cartProduct;
                }),
                totalPrice: productPrice > 0 ? calcTotalPrice(cart.totalPrice, productPrice) : cart.totalPrice,
            }))
            openCart();
        });

        try {
            await updateItemQuantityInCartService(cartLineId, quantity);
        } catch (error) {
            console.log(error);
            // TODO : Rollback and handle error
        }
    }

    const updateCart = (state: CartState) => {
        setCart((cart) => ({
            ...cart,
            ...state,
        }));
    }

    const clearCart = () => {
        setCart((cart) => ({
            ...cart,
            products: [],
            totalPrice: 0,
            quantity: 0,
        }))
    }

    const contextValue = useMemo(() => ({
        cart,
        isCartOpen,
        openCart,
        closeCart,
        addItemToCart,
        removeItemFromCart,
        updateItemQuantity,
        updateCart,
        clearCart,
    }), [cart, isCartOpen]);

    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    )
}

export function useCart() {
    const context = useContext(CartContext);

    if (!context) {
        throw new Error('useCart hook must be used inside CartProvider');
    }

    return context;
}

export default CartProvider;
