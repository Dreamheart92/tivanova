import {createStorefrontApiClient} from "@shopify/storefront-api-client";

const domain = process.env.SHOPIFY_DOMAIN;
const token = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;

export const client = createStorefrontApiClient({
    storeDomain: domain as string,
    apiVersion: '2024-10',
    privateAccessToken: token,
})