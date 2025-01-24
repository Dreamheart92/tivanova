import {client} from "@/lib/shopify";
import {
    createCustomerAccessTokenMutation,
    createCustomerMutation,
    deleteCustomerAccessTokenMutation
} from "@/lib/api/mutations/auth";
import {ShopifyError} from "@/lib/errors/ShopifyError";
import {reshapeShopifyError} from "@/lib/utils/error.utils";
import {hasShopifyUserError} from "@/lib/utils/utils";
import {clientFetcher} from "@/lib/api/shopify";

type CustomerData = {
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
    password: string;
}

export const createCustomer = async (customerData: CustomerData) => {
    const data = await clientFetcher(createCustomerMutation, {
        input: customerData
    })

    const userErrors = hasShopifyUserError(data.customerCreate?.customerUserErrors);

    if (userErrors) {
        const reshapedErrors = reshapeShopifyError(userErrors);
        throw new ShopifyError(reshapedErrors);
    }

    return data.customerCreate;
}

export const createCustomerAccessToken = async (email: string, password: string) => {
    const data = await clientFetcher(createCustomerAccessTokenMutation, {
        email,
        password
    })

    const userErrors = hasShopifyUserError(data.customerAccessTokenCreate.customerUserErrors);

    if (userErrors) {
        const reshapedErrors = reshapeShopifyError(userErrors);
        throw new ShopifyError(reshapedErrors);
    }

    return data.customerAccessTokenCreate.customerAccessToken.accessToken;
}

export const deleteCustomerAccessToken = async (accessToken: string) => {
    clientFetcher(deleteCustomerAccessTokenMutation, {
        accessToken,
    })
}