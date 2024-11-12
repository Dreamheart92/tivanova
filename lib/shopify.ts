import {createStorefrontApiClient} from "@shopify/storefront-api-client";
import {ApiVersion, shopifyApi} from '@shopify/shopify-api';
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
    apiVersion: ApiVersion.October24, billing: null, isEmbeddedApp: false,
    apiKey: adminApiKey,
    apiSecretKey: adminApiSecret || '',
    hostName: domain
});

const session = {
    accessToken: adminApiAccessToken,
    shop: domain,
}

// @ts-expect-error: Ignoring missing 'state' property for custom session handling
export const adminClient = new shopify.clients.Graphql({session});
