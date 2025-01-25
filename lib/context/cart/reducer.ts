import {ADD_ITEM_TO_CART, CartActions, REMOVE_ITEM_FROM_CART} from "@/lib/context/cart/types";
import {createOrUpdateCartProduct, updateCostAndQuantity} from "@/lib/utils/cart";

import {CartType} from "@/lib/definitions/cart.definitions";

export default function cartReducer(state: CartType | undefined, action: CartActions) {
    switch (action.type) {
        case ADD_ITEM_TO_CART: {
            if (state) {
                const existingProduct = state.lines.find((product) => product.merchandise.id === action.payload.variant.id);
                const product = createOrUpdateCartProduct(existingProduct, action.payload.product, action.payload.variant);

                const updatedProducts = existingProduct
                    ? state.lines.map((cartProduct) => cartProduct.merchandise.id === product.merchandise.id ? product : cartProduct)
                    : [...state.lines, product]

                const updatedCostAndQuantity = updateCostAndQuantity(updatedProducts, state?.deliveryGroups?.selectedDeliveryOption?.estimatedCost?.amount);

                return {
                    ...state,
                    lines: updatedProducts,
                    cost: {
                        totalAmount: {
                            ...state.cost.totalAmount,
                            amount: updatedCostAndQuantity.total,
                        },
                        subtotalAmount: {
                            ...state.cost.subtotalAmount,
                            amount: updatedCostAndQuantity.subtotal,
                        }
                    },
                    totalQuantity: updatedCostAndQuantity.quantity,
                }
            }

            return state;
        }
        case REMOVE_ITEM_FROM_CART: {
            if (state) {
                const updatedProducts = state.lines.filter((cartProduct) => cartProduct.id !== action.payload.variantId);
                const updatedCostAndQuantity = updateCostAndQuantity(updatedProducts, state?.deliveryGroups?.selectedDeliveryOption?.estimatedCost?.amount);

                return {
                    ...state,
                    lines: updatedProducts,
                    cost: {
                        totalAmount: {
                            ...state.cost.totalAmount,
                            amount: updatedCostAndQuantity.total,
                        },
                        subtotalAmount: {
                            ...state.cost.subtotalAmount,
                            amount: updatedCostAndQuantity.subtotal,
                        }
                    },
                    totalQuantity: updatedCostAndQuantity.quantity,
                }
            }
            return state;
        }
        default:
            return state;
    }
}