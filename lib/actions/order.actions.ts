'use server';

import {getCartId, getSession} from "@/lib/session";
import {shapeOrder} from "@/lib/utils/order";
import {orderCreate} from "@/lib/api/order.api";
import {cartLinesRemove} from "@/lib/api/cart.api";
import {revalidateTag} from "next/cache";
import {TAGS} from "@/lib/constants/tags";
import {CartType} from "@/lib/definitions/cart";
import {OrderType} from "@/lib/definitions/order";

const generateCreateOrderResponse = (message: string | null, success: boolean, order?: OrderType) => ({
    message,
    success,
    order,
})

export const createOrder = async (prevState: any, cart: CartType | undefined) => {
    if (!cart) {
        return generateCreateOrderResponse('Cart data is required to create an order.', false);
    }

    const [session, cartId] = await Promise.all([
        getSession(),
        getCartId(),
    ])

    if (!cartId) {
        return generateCreateOrderResponse('Failed to fetch cart', false);
    }

    try {
        if (!cart?.delivery?.selectedDeliveryAddress) {
            return generateCreateOrderResponse('Delivery address is missing. Please select a delivery address before proceeding.', false);
        }

        const order = await orderCreate(shapeOrder({
            orderDetails: {
                deliveryAddress: cart.delivery.selectedDeliveryAddress.address,
                lines: cart.lines,
                cost: cart.cost,
            },
            customerDetails: {
                customerId: session?.id,
                email: cart.buyerIdentity.email,
            }
        }))

        const cartLines = cart.lines.map((line) => line.id);
        await cartLinesRemove(cartId, cartLines);

        revalidateTag(TAGS.CART);

        return generateCreateOrderResponse(null, true, order);
    } catch (error) {
        return generateCreateOrderResponse('An error occurred while creating your order. Please try again.', false);
    }
}