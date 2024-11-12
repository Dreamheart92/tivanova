'use server';

import {adminClient, client} from "@/lib/shopify";
import {getSession} from "@/lib/session";
import {FeaturedProduct} from "@/lib/definitions";

export const addItemsToWishlistService = async (wishlist: string[]) => {
    const cookie = await getSession();

    if (cookie && typeof cookie?.user !== 'undefined') {
        const customerId = cookie.user.id;

        try {
            await adminClient.request(`mutation updateCustomerMetafields($input: CustomerInput!) {
          customerUpdate(input: $input) {
            customer {
              id
              metafields(first: 3) {
                edges {
                  node {
                    id
                    namespace
                    key
                    value
                    type
                  }
                }
              }
            }
            userErrors {
              message
              field
            }
          }
        }`, {
                variables: {
                    input: {
                        id: customerId,
                        metafields: [
                            {
                                namespace: 'custom',
                                key: 'wishlist',
                                type: 'list.product_reference',
                                value: JSON.stringify(wishlist)
                            }
                        ]
                    }
                }
            })
        } catch (error) {
            // TODO : Handle error
            console.log(error);
        }
    }
}

export const fetchWishlist = async (accessToken: string) => {
    try {
        const {data} = await client.request(`query MyQuery {
  customer(customerAccessToken: "${accessToken}") {
    metafield(key: "wishlist", namespace: "custom") {
      key
      value
    }
  }
}`)

        if (data?.customer?.metafield) {
            return JSON.parse(data.customer.metafield.value);
        } else {
            return [];
        }
    } catch (error) {
        console.log(error);
        // TODO : Handle error
    }
}

export const fetchWishlistProducts = async (wishlist: string[]): Promise<FeaturedProduct[]> => {
    try {
        const {data} = await client.request(`query MyQuery {
    nodes(ids: ${JSON.stringify(wishlist)}) {
      ... on Product {
        id
        title
        vendor
        priceRange {
         minVariantPrice {
             amount
         }
        }
        images(first: 2) {
        edges {
          node {
            url
          }
        }
      }
      }
    }
  }`)

        return data.nodes;
    } catch (error) {
        console.log(error);
// TODO : Handle error
        return [];
    }
}