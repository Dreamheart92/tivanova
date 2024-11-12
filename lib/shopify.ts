import {createStorefrontApiClient} from "@shopify/storefront-api-client";
import {shopifyApi} from '@shopify/shopify-api';
import '@shopify/shopify-api/adapters/node';

const domain = process.env.SHOPIFY_DOMAIN;
const token = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;
const adminApiKey = process.env.SHOPIFY_ADMIN_API_KEY;
const adminApiSecret = process.env.SHOPIFY_ADMIN_API_SECRET_KEY;
const adminApiAccessToken = process.env.SHOPIFY_ADMIN_API_ACCESS_TOKEN;

export const client = createStorefrontApiClient({
    storeDomain: domain,
    apiVersion: '2024-10',
    privateAccessToken: token,
})

const shopify = shopifyApi({
    apiKey: adminApiKey,
    apiSecretKey: adminApiSecret || '',
    hostName: domain,
});

const session = {
    accessToken: adminApiAccessToken,
    shop: domain,
}

export const adminClient = new shopify.clients.Graphql({session});
