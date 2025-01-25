import {
    fetchCustomerDataQuery,
} from "@/lib/api/queries/customer";
import {storeCartAndWishlistIdsToCustomerMutation, updateCustomerMutation} from "@/lib/api/mutations/customer";
import {reshapeShopifyError} from "@/lib/utils/error";
import {reshapeCustomer} from "@/lib/utils/utils";
import {ShopifyError} from "@/lib/errors/ShopifyError";
import {adminFetcher, clientFetcher} from "@/lib/api/shopify";
import {hasShopifyUserError} from "@/lib/utils/shopify";

export const fetchCustomerData = async (accessToken: string) => {
    const data = await clientFetcher(fetchCustomerDataQuery, {
        accessToken,
    })

    return reshapeCustomer(data.customer);
}

export const storeCartAndWishlistIdsToCustomer = async (customerId: string, cartId: string, wishlistId: string) => {
    const data = await adminFetcher(storeCartAndWishlistIdsToCustomerMutation, {
        input: {
            id: `${customerId}`,
            metafields: [
                {
                    namespace: "custom",
                    key: "cartId",
                    type: "single_line_text_field",
                    value: `${cartId}`
                },
                {
                    namespace: "custom",
                    key: "wishlistId",
                    type: "single_line_text_field",
                    value: `${wishlistId}`
                }
            ],
        }
    })

    if (hasShopifyUserError(data?.userErrors)) {
        throw data.userErrors;
    }
}

type CustomerData = {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    password?: string;
}

export const updateCustomer = async (customerData: CustomerData, accessToken: string) => {
    const data = await clientFetcher(updateCustomerMutation, {
        customerAccessToken: accessToken,
        customer: {
            ...customerData,
        }
    })

    const shopifyError = hasShopifyUserError(data?.customerUpdate?.userErrors);

    if (shopifyError) {
        const reshapedErrors = reshapeShopifyError(shopifyError);
        throw new ShopifyError(reshapedErrors);
    }

    return data.customerUpdate;
}
