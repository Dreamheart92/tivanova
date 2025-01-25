import {CartType} from "@/lib/definitions/cart.definitions";
import {ProductType, ProductVariantType} from "@/lib/definitions/product.definitions";

export interface CartState {
    open: boolean;
    cart: CartType | undefined;
    openCart: () => void;
    closeCart: () => void;
    addItemToCart: (payload: { product: ProductType, variant: ProductVariantType }) => void;
    removeItemFromCart: (payload: { variantId: string }) => void;
}