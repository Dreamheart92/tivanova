import {CartCostType, CartProductType, CartType} from "@/lib/definitions/cart";
import {AddressType} from "@/lib/definitions/customer";

type OrderDetailsType = {
    lines: CartProductType[];
    cost: CartCostType;
    deliveryAddress: AddressType;
}

type CustomerDetails = {
    customerId: string | undefined;
    email: string | null;
}

type OrderProp = {
    orderDetails: OrderDetailsType;
    customerDetails: CustomerDetails;
}

export const shapeOrder = (order: OrderProp) => {
    const lineItems = order.orderDetails.lines.map((product) => ({
        title: product.merchandise.product.title,
        priceSet: {
            shopMoney: {
                amount: product.cost.amountPerQuantity.amount,
                currencyCode: product.cost.amountPerQuantity.currencyCode,
            },
        },
        variantId: product.merchandise.id,
        quantity: product.quantity,
    }))

    const transactions = [
        {
            kind: 'SALE',
            status: 'SUCCESS',
            amountSet: {
                presentmentMoney: {
                    amount: order.orderDetails.cost.totalAmount.amount,
                    currencyCode: order.orderDetails.cost.totalAmount.currencyCode,
                },
                shopMoney: {
                    amount: order.orderDetails.cost.totalAmount.amount,
                    currencyCode: order.orderDetails.cost.totalAmount.currencyCode,
                }
            }
        }
    ]

    return {
        shippingAddress: order.orderDetails.deliveryAddress,
        lineItems,
        transactions,
        test: true,
        customerId: order.customerDetails.customerId,
        email: order.customerDetails.email,
        currency: order.orderDetails.cost.totalAmount.currencyCode,
    }
}