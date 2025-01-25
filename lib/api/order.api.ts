'use server';

import {fetchAvailableShippingCountriesQuery, fetchOrderByIdQuery} from "@/lib/api/queries/order";
import {CreateOrderType, OrderSummaryType, OrderType} from "@/lib/definitions/order.definitions";
import {AvailableShippingCountryType} from "@/lib/definitions/shop.definitions";
import {orderCreateMutation} from "@/lib/api/mutations/order";
import {fetchCustomerOrdersQuery} from "@/lib/api/queries/customer";
import {adminFetcher, clientFetcher} from "@/lib/api/shopify";
import {hasShopifyUserError, removeEdgesAndNodes} from "@/lib/utils/shopify.utils";

export const orderCreate = async (order: CreateOrderType): Promise<OrderType> => {
    const data = await adminFetcher(orderCreateMutation, {
        order,
    })

    if (hasShopifyUserError(data?.userErrors)) {
        throw data.userErrors;
    }

    return {
        ...data.orderCreate.order,
        lineItems: removeEdgesAndNodes(data.orderCreate.order.lineItems),
    }
}

export const fetchAvailableShippingCountries = async (): Promise<AvailableShippingCountryType[]> => {
    const data = await clientFetcher(fetchAvailableShippingCountriesQuery);

    return data.localization.availableCountries;
}

const reshapeOrders = (orders: any) => {
    return removeEdgesAndNodes(orders).map((order: any) => ({
        ...order,
        lineItems: removeEdgesAndNodes(order.lineItems),
    }));
}

export const fetchCustomerOrders = async (accessToken: string): Promise<OrderSummaryType[]> => {
    const data = await clientFetcher(fetchCustomerOrdersQuery, {
        accessToken,
    })

    return reshapeOrders(data.customer.orders);
}


export const fetchOrderById = async (orderId: string): Promise<OrderType> => {
    const data = await adminFetcher(fetchOrderByIdQuery, {
        orderId: `gid://shopify/Order/${orderId}`
    })

    return {
        ...data.order,
        lineItems: removeEdgesAndNodes(data.order.lineItems),
    }
}