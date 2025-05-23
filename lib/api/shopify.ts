import {createStorefrontApiClient} from "@shopify/storefront-api-client";
import {createAdminApiClient} from "@shopify/admin-api-client";

const domain = process.env.SHOPIFY_DOMAIN;
const token = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;
const adminApiAccessToken = process.env.SHOPIFY_ADMIN_API_ACCESS_TOKEN;

export const client = createStorefrontApiClient({
    storeDomain: domain as string,
    apiVersion: '2025-01',
    privateAccessToken: token,
})

export const adminClient = createAdminApiClient({
    storeDomain: domain as string,
    apiVersion: '2025-01',
    accessToken: adminApiAccessToken as string,
})

export const clientFetcher = async (query: string, variables?: any) => {
    const {data, errors} = await client.request(query, {
        variables: {
            ...variables,
        }
    });

    if (errors) {
        throw errors;
    }

    return data;
}

export const adminFetcher = async (query: string, variables?: any) => {
    const {data, errors} = await adminClient.request(query, {
        variables: {
            ...variables,
        }
    })

    if (errors) {
        throw errors;
    }

    return data;
}