import {ADD_ITEM_TO_CART, CartActions, REMOVE_ITEM_FROM_CART} from "@/lib/context/cart/types";
import {ProductType, ProductVariantType} from "@/lib/definitions/product.definitions";

export default function cartActions(dispatch: React.Dispatch<CartActions>) {
    return {
        addItemToCart(payload: { product: ProductType, variant: ProductVariantType }) {
            dispatch({type: ADD_ITEM_TO_CART, payload})
        },
        removeItemFromCart(payload: { variantId: string }) {
            dispatch({type: REMOVE_ITEM_FROM_CART, payload})
        }
    }
}