export type CartProductAttribute = {
    key: string;
    value: string;
}

export type CartProduct = {
    id: string;
    quantity: number;
    attributes: CartProductAttribute[];
    merchandise: {
        id: string;
        product: {
            id: string;
            images: {
                nodes:
                    {
                        url: string;
                    }[]
            }
            priceRange: {
                minVariantPrice: {
                    amount: string;
                }
            }
            title: string;
            vendor: string;
        }
    }
    cost: {
        totalAmount: {
            amount: string;
        }
        amountPerQuantity: {
            amount: string;
        }
    }
}

export type CartState = {
    products: CartProduct[];
    totalPrice: number;
    quantity: number;
}

export type CartContextType = {
    cart: CartState;
    isCartOpen: boolean;
    openCart: () => void;
    closeCart: () => void;
    addItemToCart: (product: CartProduct, localProductId: string) => void;
    removeItemFromCart: (product: CartProduct) => void;
    updateItemQuantity: (productId: string, quantity: number) => void;
    updateCart: (state: CartState) => void;
    clearCart: () => void;
}