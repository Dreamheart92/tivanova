import {ProductType, ProductVariantType} from "@/lib/definitions/product.definitions";

export const ADD_ITEM_TO_CART = 'ADD_ITEM_TO_CART';
export const REMOVE_ITEM_FROM_CART = 'REMOVE_ITEM_FROM_CART';


type AddItemToCart = {
    type: typeof ADD_ITEM_TO_CART,
    payload: {
        product: ProductType,
        variant: ProductVariantType,
    }
}

type RemoveItemFromCart = {
    type: typeof REMOVE_ITEM_FROM_CART,
    payload: {
        variantId: string;
    }
}

export type CartActions = AddItemToCart | RemoveItemFromCart;