import {CartType} from "@/lib/definitions/cart";
import {ProductType, ProductVariantType} from "@/lib/definitions/product";

export interface CartState {
    open: boolean;
    cart: CartType | undefined;
    openCart: () => void;
    closeCart: () => void;
    addItemToCart: (payload: { product: ProductType, variant: ProductVariantType }) => void;
    removeItemFromCart: (payload: { variantId: string }) => void;
}